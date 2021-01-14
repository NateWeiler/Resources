/****************
 * Connect Four *
 ****************/

const PLAYERS = ['red', 'black'];
let t = 1;
let grid;

const nextTurn = () => {
  t = t === 0 ? 1 : 0;
  const el = document.querySelector('section');
  clearElement(el);
  el.appendChild(document.createTextNode(`${PLAYERS[t]}'s turn`));
};

const resetGrid = () => {
  // Create an empty array of 6 rows. Fill it with null values in order
  // to map and replace with an array of 7 columns with null values.
  grid = Array(6).fill(null).map(row => Array(7).fill(null));
};

const findEmptyRowByCol = (col) => {
  let row = 5;
  while (grid[row][col] !== null) {
    row--;
    if (row < 0) break;
  }
  return row;
};

const placeByCol = (color, col) => {
  let row = findEmptyRowByCol(col);
  if (row < 0) {
    console.log("Can't, column is filled");
  } else {
    grid[row][col] = color;
    nextTurn();
    drawGrid();
  }
};

const placeOnClick = (e) => {
  if (e.target !== e.currentTarget) {
    placeByCol(PLAYERS[t], e.target.dataset.column);
  }
  e.stopPropagation();
};

const clearElement = (el) => {
  while(el.firstChild) {
    el.removeChild(el.firstChild);
  }
};

const drawGrid = () => {
  const tableEl = document.querySelector('table');
  clearElement(tableEl);

  grid.forEach((row, y) => {
    const rowEl = document.createElement('tr');

    row.forEach((col, x) => {
      const cellEl = document.createElement('td');
      cellEl.dataset.row = y;
      cellEl.dataset.column = x;
      cellEl.dataset.player = col;
      rowEl.appendChild(cellEl);
    });

    tableEl.appendChild(rowEl);
  });
};

const highlightCol = (e, add = true) => {
  if (e.target !== e.currentTarget) {
    const column = e.target.dataset.column;
    const row = findEmptyRowByCol(column);
    const emptyEl = document.querySelector(`td[data-column="${column}"][data-row="${row}"]`);
    const tdClass = 'highlight';
    const tableClass = `column-${column}`;

    if (add) {
      emptyEl.classList.add(tdClass);
      e.currentTarget.classList.add(tableClass);
    } else {
      emptyEl.classList.remove(tdClass);
      e.currentTarget.classList.remove(tableClass);
    }
  }
  e.stopPropagation();
};

const unhighlightCol = (e) => highlightCol(e, false);

const init = () => {
  const tableEl = document.querySelector('table');
  tableEl.addEventListener('click', placeOnClick);
  tableEl.addEventListener('mouseover', highlightCol);
  tableEl.addEventListener('mouseout', unhighlightCol);

  resetGrid();
  nextTurn();
  drawGrid();
};

window.onload = init;
