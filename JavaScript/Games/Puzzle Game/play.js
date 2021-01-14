// simple WebWorkers shim
(function(global) {
    let index = 0;
    if (!("Worker" in global)) {
        global.Worker = function(src) {
            let publicAPI,
                worker,
                worker_idx = index++,
                queue = [];

            // set up the fake worker environment instance
            Worker["__" + worker_idx] = worker = {
                postMessage: function(msg) {
                    let fn = function() {
                        publicAPI.onmessage(msg);
                    };
                    if (queue === false) setTimeout(fn, 0);
                    else queue.push(fn);
                },
                onmessage: function() {}
            };

            let xhr = (XMLHttpRequest ? new XMLHttpRequest() : global.ActiveXObject("Microsoft.XMLHTTP"));
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    let script_src = "(function(self,importScripts){\n" + xhr.responseText + "\n})(Worker['__" + worker_idx + "'],function(){});",
                        script = document.createElement("script"),
                        fn;
                    script.text = script_src;
                    (document.body || document.getElementsByTagName("body")[0]).appendChild(script);

                    while (fn = queue.shift()) fn();
                    queue = true;
                }
            };
            xhr.open("GET", src);
            xhr.send("");

            publicAPI = {
                postMessage: function(msg) {
                    let fn = function() {
                        worker.onmessage(msg);
                    };
                    if (queue !== true) queue.push(fn);
                    else setTimeout(fn, 0);
                },
                onmessage: function() {},
                terminate: function() {}
            };

            return publicAPI;
        };
    } else {
        delete global.Worker; // make sure to roll back the global native Worker to its pristine state
    }
})(window);




// *******************************************************************************



(function(global) {

    let moving_tiles = {},
        half_tile_width, half_tile_height,
        fn_tile_drop_ok, fn_tile_drop_invalid,
        fn_tile_drag_ok, fn_tile_drag_invalid,
        fn_reset_drag,
        current_tile_id,
        gameboard_cols, gameboard_rows,
        $board, $tiles, $table,
        game_in_progress = false,
        game_img_loading,
        GameWorker;

    function build_gameboard(tiles, rows, cols, tile_size) {
        let $tile = $("<div />"),
            $img,
            $td, $tr, i, cl, row, col;

        $table = $("<table />").attr({
            id: "grid",
            cellspacing: "0",
            cellpadding: "0",
            border: "0"
        });
        $board = $("<div />").attr("id", "gameboard");
        $tiles = $("#tiles");

        gameboard_cols = cols;
        gameboard_rows = rows;

        half_tile_width = half_tile_height = Math.round(tile_size / 2);

        $table.html("<tr><td><span></span></td></tr>");
        $tr = $table.find("tr");
        $td = $tr.find("td");

        for (i = 0; i < (cols - 1); i++) {
            $tr.append($td.clone());
        }
        for (i = 0; i < (rows - 1); i++) {
            $table.append($tr.clone());
        }
        i = 0;
        cl = "dark";
        $table.find("span").each(function() {
            cl = (cl == "dark") ? "light" : "dark";
            $(this).css({
                width: tile_size + "px",
                height: tile_size + "px"
            }).addClass(cl);
            i++;
            if (cols % 2 === 0 && i % cols === 0) {
                cl = (cl == "dark") ? "light" : "dark";
            }
        });

        $tiles.hide();
        for (let idx in tiles) {
            game_img_loading.and(function(done) {
                $img = $("<img />")
                    .bind("load", function() {
                        $(this).unbind("load");
                        done();
                    })
                    .attr({
                        "data-tile-id": idx,
                        src: tiles[idx].data
                    });
            });
            $img.get(0).draggable = false;
            if (tiles[idx].position !== null) {
                row = Math.floor(tiles[idx].position / gameboard_cols);
                col = tiles[idx].position - (row * gameboard_cols);
                $table.find("tr:eq(" + row + ") > td:eq(" + col + ") span").append($img);
            } else {
                $tiles.append($img);
            }
        }
    }

    function setup_game() {
        let board_width = $table.width(),
            board_height = $table.height(),
            can_try_tiles = true;

        $(document)
            .bind("contextmenu", function(evt) {
                evt.preventDefault();
                return false;
            });

        $tiles
            .delegate("img", "mousedown", function(evt) {
                let $img, img_width, img_height, x, y;

                function reset_drag() {
                    tile_drag_invalid();
                }

                function reset_tile() {
                    if ($img) {
                        $img
                            .removeClass("draggable_img")
                            .css({
                                left: "0px",
                                top: "0px",
                                "z-index": 0
                            })
                            .appendTo("#tiles");
                        $img = null;
                    }
                    $(document).unbind("mousemove mouseup");
                    fn_tile_drop_ok = fn_tile_drop_invalid = fn_tile_drag_ok = fn_tile_drag_invalid = fn_reset_drag = null;
                }

                function tile_drop_ok(row, col) {
                    if ($img) {
                        $img
                            .removeClass("draggable_img")
                            .css({
                                left: "0px",
                                top: "0px",
                                "z-index": 0
                            });
                        $table.find("tr:eq(" + row + ") > td:eq(" + col + ") span").append($img);
                        $img = null;
                        current_tile_id = null;
                        can_try_tiles = true;
                    }
                }

                function tile_drop_invalid() {
                    reset_tile();
                    current_tile_id = null;
                    can_try_tiles = true;
                }

                function tile_drag_ok() {
                    GameWorker.postMessage({
                        messageType: "move_tile",
                        tile_id: current_tile_id,
                        x: x,
                        y: y
                    });
                    $(document)
                        .bind("mousemove", function(evt) {
                            if ($img) {
                                x = evt.pageX - half_tile_width;
                                y = evt.pageY - half_tile_height;
                                $img.css({
                                    left: x + "px",
                                    top: y + "px"
                                });
                                GameWorker.postMessage({
                                    messageType: "move_tile",
                                    tile_id: current_tile_id,
                                    x: x,
                                    y: y
                                });
                            }
                        }).bind("mouseup", function(evt) {
                            let x_board, y_board, col, row, position,
                                board_offset = $table.offset();

                            $(document).unbind("mousemove mouseup");
                            x = evt.pageX;
                            y = evt.pageY;

                            x_board = x - board_offset.left;
                            y_board = y - board_offset.top;

                            // are we within the bounds of the gameboard for this drop?
                            if (x_board >= 0 && x_board < board_width && y_board >= 0 && y_board < board_height) {
                                col = Math.floor(x_board / img_width);
                                row = Math.floor(y_board / img_height);
                                position = row * gameboard_cols + col;
                            } else {
                                position = -1; // force drop to be invalid
                            }
                            GameWorker.postMessage({
                                messageType: "try_tile_position",
                                tile_id: current_tile_id,
                                position: position
                            });
                        });
                }

                function tile_drag_invalid() {
                    reset_tile();
                    current_tile_id = null;
                    can_try_tiles = true;
                    return true;
                }

                if (can_try_tiles) {
                    can_try_tiles = false;

                    fn_tile_drop_ok = tile_drop_ok;
                    fn_tile_drop_invalid = tile_drop_invalid;
                    fn_tile_drag_ok = tile_drag_ok;
                    fn_tile_drag_invalid = tile_drag_invalid;
                    fn_reset_drag = reset_drag;

                    $img = $(this);
                    current_tile_id = $img.attr("data-tile-id");
                    moving_tiles[current_tile_id] = $img;
                    img_width = $img.width();
                    img_height = $img.height();
                    x = evt.pageX - half_tile_width;
                    y = evt.pageY - half_tile_height;

                    GameWorker.postMessage({
                        messageType: "take_tile",
                        tile_id: current_tile_id
                    });

                    $img.addClass("draggable_img").css({
                        left: x + "px",
                        top: y + "px",
                        "z-index": 5000
                    }).appendTo("body");
                }

                evt.preventDefault();
                return false;
            });
    }

    function move_tile(tile_id, x, y) {
        if (tile_id != current_tile_id) {
            if (!moving_tiles[tile_id]) {
                moving_tiles[tile_id] = $("#tiles img[data-tile-id='" + tile_id + "']");
                moving_tiles[tile_id].addClass("draggable_img dragged_img").appendTo("body");
            }
            moving_tiles[tile_id].css({
                left: x + "px",
                top: y + "px"
            });
        }
    }

    function position_tile(tile_id, position) {
        let row = Math.floor(position / gameboard_cols),
            col = position - (row * gameboard_cols);

        if (tile_id != current_tile_id) {
            if (!moving_tiles[tile_id]) moving_tiles[tile_id] = $("#tiles img[data-tile-id='" + tile_id + "']");
            moving_tiles[tile_id].removeClass("draggable_img dragged_img").css({
                left: "0px",
                top: "0px",
                "z-index": 0
            });
            $table.find("tr:eq(" + row + ") > td:eq(" + col + ") span").append(moving_tiles[tile_id]);
            moving_tiles[tile_id] = null;
        } else if (fn_tile_drop_ok) {
            fn_tile_drop_ok(row, col);
        }
    }

    function reset_tile(tile_id) {
        if (tile_id != current_tile_id) {
            if (!moving_tiles[tile_id]) moving_tiles[tile_id] = $("#tiles img[data-tile-id='" + tile_id + "']");
            moving_tiles[tile_id].removeClass("draggable_img dragged_img").css({
                left: "0px",
                top: "0px",
                "z-index": 0
            }).appendTo("#tiles");
        } else if (fn_tile_drop_invalid) {
            fn_tile_drop_invalid();
        }
    }

    function reset_player() {
        if (fn_reset_drag) fn_reset_drag();
    }

    global.playGame = function(game_session_id) {
        GameWorker = new Worker("ww.js?_=" + Math.random());
        GameWorker.onmessage = function(evt) {
            if (game_in_progress) {
                if (evt.data.error) {
                    alert("Error: " + evt.data.error);
                } else if (evt.data.tiles) {
                    if (!evt.data.in_play) {
                        game_in_progress = false;
                    }
                    let $img = $("<img />");

                    game_img_loading = global.$AG(function(done) {
                        $img
                            .bind("load", function() {
                                $("#game_overview").append($img);
                                done();
                            })
                            .attr({
                                src: evt.data.overview
                            });
                    });

                    build_gameboard(evt.data.tiles, evt.data.rows, evt.data.cols, evt.data.tile_size);

                    game_img_loading.then(function() {
                        $("#game_overview").show();
                        $board.append($table);
                        $("#game").empty().append($board);
                        $tiles.show();

                        // should we set up and start game play?
                        if (game_in_progress) setup_game();
                        else freezeGameClock();
                    });
                } else if (evt.data.move_tile) {
                    for (let tile_id in evt.data.moves) {
                        move_tile(
                            tile_id,
                            evt.data.moves[tile_id].x,
                            evt.data.moves[tile_id].y
                        );
                    }
                } else if (evt.data.reset_tile) {
                    reset_tile(evt.data.tile_id);
                } else if (evt.data.position_tile) {
                    position_tile(evt.data.tile_id, evt.data.position);
                } else if (evt.data.reset_tile) {
                    reset_tile(evt.data.tile_id);
                } else if (evt.data.reset_player) {
                    reset_player();
                } else if (evt.data.tile_drag_ok) {
                    if (fn_tile_drag_ok) fn_tile_drag_ok();
                } else if (evt.data.tile_drag_invalid) {
                    if (fn_tile_drag_invalid) fn_tile_drag_invalid();
                } else {
                    console.log(evt.data);
                }
            }
        };
        game_in_progress = true;
        GameWorker.postMessage({
            messageType: "start",
            game_session_id: game_session_id
        }); // start the worker
    };

    global.quitGame = function() {
        game_in_progress = false;
        try {
            GameWorker.terminate();
        } catch (err) {}
        GameWorker = null;

        // clean up state
        $("img[data-tile-id]").remove();
        $tiles.undelegate("img", "mousedown");
        $(document).unbind("contextmenu mousemove mouseup");
        $tiles = $board = $table = half_tile_width = half_tile_height = fn_tile_drop_ok = fn_tile_drop_invalid = fn_tile_drag_ok = fn_tile_drag_invalid = fn_reset_drag = current_tile_id = gameboard_cols = gameboard_rows = null;
        moving_tiles = {};
    };

    global.freezeGamePlay = function() {
        game_in_progress = false;
        $tiles.undelegate("img", "mousedown");
        $(document).unbind("mousemove mouseup");

        if ($tiles.is(":empty")) {
            $tiles.hide();
            $("#game_overview").hide();
        }
    };

})(window);