import os
import sys
import subprocess
import shutil
import json
import wx
from constants import Config, FileTypes
from os_tools import path


class SettingsDialog(wx.Dialog):
    def __init__(self, fest_file_path, config, parent):
        wx.Dialog.__init__(self,
                           parent,
                           title=_("Settings"),
                           style=wx.DEFAULT_DIALOG_STYLE | wx.RESIZE_BORDER)
        self.fest_file_path = fest_file_path
        self.config = config

        if not self.fest_file_path:
            wx.MessageBox(_("Hi ^_^ Please select a new or existing *.fest file in the 'Current Fest' field.\n"
                            "It will load automatically on each start unless you change it. The configuration\n"
                            "may seem confusing, if you find it so, open the 'File | About' menu item.\n"
                            "Do the best event!"),
                          "Welcome to Fest Engine", wx.OK | wx.ICON_INFORMATION, self)

        self.panel = wx.Panel(self)
        self.top_sizer = wx.BoxSizer(wx.VERTICAL)

        session_sizer = wx.BoxSizer(wx.HORIZONTAL)
        session_sizer.Add(wx.StaticText(self.panel, label=_("Current Fest")), 0, wx.ALIGN_CENTER_VERTICAL | wx.LEFT, 5)
        self.session_picker = wx.FilePickerCtrl(self.panel,
                                                style=wx.FLP_SAVE | wx.FLP_USE_TEXTCTRL,
                                                wildcard="Fest Engine sessions (*.fest)|*.fest;*.fest_bkp")
        self.Bind(wx.EVT_FILEPICKER_CHANGED, self.on_fest_selected, self.session_picker)
        self.session_picker.SetPath(self.fest_file_path)
        session_sizer.Add(self.session_picker, 1, wx.EXPAND | wx.ALL, 5)
        session_sizer.Add(wx.StaticLine(self.panel, style=wx.LI_VERTICAL), 0,
                          wx.EXPAND | wx.TOP | wx.BOTTOM | wx.RIGHT, 5)
        self.session_file_edit_btn = wx.Button(self.panel, wx.ID_ANY, _("All Settings"))
        self.Bind(wx.EVT_BUTTON, self.on_file_edit, self.session_file_edit_btn)
        session_sizer.Add(self.session_file_edit_btn, 0, wx.TOP | wx.RIGHT, 5)
        self.top_sizer.Add(session_sizer, 0, wx.EXPAND)

        # --- Grid ---

        self.top_sizer.Add(wx.StaticLine(self.panel), 0, wx.ALL | wx.EXPAND, 5)

        self.configs_grid = wx.FlexGridSizer(rows=5, cols=2, hgap=5, vgap=5)
        self.configs_grid.AddGrowableCol(1)

        # Projector Screen Selector
        self.screens_combobox = wx.Choice(self.panel)
        screen_names = ["%d: %s (%d,%d) %dx%d" % (
            (i, wx.Display(i).GetName()) + wx.Display(i).GetGeometry().Get()
        ) for i in range(wx.Display.GetCount())]
        screen_names += [_('Windowed (for debugging)')]
        self.screens_combobox.SetItems(screen_names)
        self.screens_combobox.SetSelection(self.config[Config.PROJECTOR_SCREEN])
        self.configs_grid.Add(wx.StaticText(self.panel, label=_("Projector Screen")), 0, wx.ALIGN_CENTER_VERTICAL)
        self.configs_grid.Add(self.screens_combobox, 1, wx.EXPAND)

        # Filename RegEx
        self.filename_re = wx.TextCtrl(self.panel)
        self.filename_re.SetValue(self.config[Config.FILENAME_RE])
        self.configs_grid.Add(wx.StaticText(self.panel, label=_("Filename RegEx")), 0, wx.ALIGN_CENTER_VERTICAL)
        self.configs_grid.Add(self.filename_re, 1, wx.EXPAND)

        # Database File
        self.db_path = wx.FilePickerCtrl(self.panel, wildcard="SQLite Databases|*.sqlite;*.db;*.data")
        self.db_path.SetInitialDirectory(self.fest_file_path)
        self.db_path.SetPath(path.make_abs(self.config[Config.C2_DATABASE_PATH], self.fest_file_path))
        self.configs_grid.Add(wx.StaticText(self.panel, label=_("Cosplay2 Database Path")), 0, wx.ALIGN_CENTER_VERTICAL)
        self.configs_grid.Add(self.db_path, 1, wx.EXPAND)

        # Background Tracks
        self.bg_tracks = wx.DirPickerCtrl(self.panel)
        self.bg_tracks.SetPath(path.make_abs(self.config[Config.BG_TRACKS_DIR], path.fest_file))
        self.configs_grid.Add(wx.StaticText(self.panel, label=_("Background Tracks Dir")), 0, wx.ALIGN_CENTER_VERTICAL)
        self.configs_grid.Add(self.bg_tracks, 1, wx.EXPAND)

        img_wc = "Images ({0})|{0}".format(";".join(["*.%s" % x for x in FileTypes.img_extensions]))
        self.bg_zad = wx.FilePickerCtrl(self.panel, wildcard=img_wc)
        self.bg_zad.SetPath(path.make_abs(self.config[Config.BG_ZAD_PATH], path.fest_file))
        self.configs_grid.Add(wx.StaticText(self.panel, label=_("Background ZAD Path")), 0, wx.ALIGN_CENTER_VERTICAL)
        self.configs_grid.Add(self.bg_zad, 1, wx.EXPAND)

        self.top_sizer.Add(self.configs_grid, 0, wx.EXPAND | wx.ALL, 5)

        # --- Dirs ---

        dirs_box = wx.StaticBox(self.panel, label=_("Files Dirs"))
        dirs_box_sizer = wx.StaticBoxSizer(dirs_box, wx.VERTICAL)
        self.pickers_sizer = wx.BoxSizer(wx.VERTICAL)

        self.dir_pickers = []

        # Add / Remove

        self.dir_buttons_sizer = wx.BoxSizer(wx.HORIZONTAL)

        add_btn = wx.Button(self.panel, label="+")
        add_btn.Bind(wx.EVT_BUTTON, self.add_dir)
        self.dir_buttons_sizer.Add(add_btn, 1)

        rm_dir_btn = wx.Button(self.panel, label="-")
        rm_dir_btn.Bind(wx.EVT_BUTTON, self.rm_dir)
        self.dir_buttons_sizer.Add(rm_dir_btn, 1)

        dirs_box_sizer.Add(self.pickers_sizer, 0, wx.EXPAND | wx.ALL, 5)
        dirs_box_sizer.Add(self.dir_buttons_sizer, 0, wx.EXPAND | wx.BOTTOM | wx.LEFT | wx.RIGHT, 5)

        self.top_sizer.Add(dirs_box_sizer, 0, wx.ALL | wx.EXPAND, 5)

        # --- OK / Cancel ---

        self.top_sizer.Add(wx.StaticLine(self.panel), 0, wx.ALL | wx.EXPAND, 5)

        buttons_sizer = wx.BoxSizer(wx.HORIZONTAL)

        self.button_load = wx.Button(self.panel, wx.ID_OPEN, _("Load"))
        buttons_sizer.Add(self.button_load, 1)
        self.button_load.Bind(wx.EVT_BUTTON, self.on_ok)

        self.button_save = wx.Button(self.panel, wx.ID_SAVE, _("Save"))
        buttons_sizer.Add(self.button_save, 1)
        self.button_save.Bind(wx.EVT_BUTTON, self.on_ok)

        button_cancel = wx.Button(self.panel, wx.ID_CANCEL, _("Cancel"))
        buttons_sizer.Add(button_cancel, 1)

        self.top_sizer.Add(buttons_sizer, 0, wx.EXPAND | wx.ALL, 5)
        self.on_fest_selected(first_run=not self.fest_file_path)

    def add_dir(self, path=None):
        dir_picker = wx.DirPickerCtrl(self.panel)
        self.pickers_sizer.Add(dir_picker, 0, wx.EXPAND)
        if isinstance(path, str):  # Assuming initial calls
            dir_picker.SetPath(path)
        else:  # Assuming manual adding
            self.top_sizer.Layout()
            size = self.GetClientSize()
            size[1] += dir_picker.GetClientSize()[1]
            self.SetClientSize(size)
        self.dir_pickers.append(dir_picker)

    def rm_dir(self, e=None):
        last_picker_height = self.dir_pickers[-1].GetClientSize()[1]
        last_picker = len(self.dir_pickers) - 1
        if last_picker > 0 or not e:  # No limits on manual removing
            del self.dir_pickers[-1]
            self.pickers_sizer.Hide(last_picker)
            self.pickers_sizer.Remove(last_picker)
            self.top_sizer.Layout()
            size = self.GetClientSize()
            size[1] -= last_picker_height
            self.SetClientSize(size)

    def enable_settings(self, enabled):
        def process_children(sizer):
            for sizer_item in sizer.GetChildren():
                widget = sizer_item.GetWindow()
                widget.Enable(enabled)

        list(map(process_children, [self.configs_grid, self.pickers_sizer, self.dir_buttons_sizer]))
        self.session_file_edit_btn.Enable(enabled)

    def on_fest_selected(self, e=None, first_run=False):
        fest_file_exists = os.path.isfile(e.Path) if e else False
        if fest_file_exists:
            self.fest_file_path = path.make_abs(e.Path)
            path.fest_file = self.fest_file_path
            try:
                self.config = json.load(open(e.Path, 'r', encoding='utf-8-sig'))
            except json.decoder.JSONDecodeError as e:
                msg = _("Unfortunately, you broke the JSON format...\n"
                        "Please fix the configuration file%s ASAP.\n\nDetails: %s") % ("", str(e))
                wx.MessageBox(msg, "JSON Error", wx.OK | wx.ICON_ERROR, self)
                self.on_file_edit()
                return
        self.config_to_ui()
        if first_run:
            self.enable_settings(False)
            self.button_save.Enable(False)
            self.button_load.Enable(False)
        else:
            self.enable_settings(not fest_file_exists)
            self.button_save.Enable(not fest_file_exists)
            self.button_load.Enable(fest_file_exists)
            self.session_file_edit_btn.Enable(os.path.exists(self.fest_file_path))

    def config_to_ui(self):
        self.screens_combobox.SetSelection(self.config[Config.PROJECTOR_SCREEN])
        self.db_path.SetPath(path.make_abs(self.config[Config.C2_DATABASE_PATH], path.fest_file))
        self.filename_re.SetValue(self.config[Config.FILENAME_RE])
        self.bg_tracks.SetPath(path.make_abs(self.config[Config.BG_TRACKS_DIR], path.fest_file))
        self.bg_zad.SetPath(path.make_abs(self.config[Config.BG_ZAD_PATH], path.fest_file))
        [self.rm_dir() for i in range(len(self.dir_pickers))]
        [self.add_dir(path.make_abs(d, path.fest_file)) for d in self.config[Config.FILES_DIRS]]
        self.panel.SetSizerAndFit(self.top_sizer)
        self.top_sizer.Fit(self)
        self.SetClientSize((self.GetClientSize()[0] + 300, self.GetClientSize()[1]))
        self.ui_to_config()  # For validation

    def path_validate(self, widget, msg):
        if not widget.GetPath() or os.path.exists(widget.GetPath()):
            return widget.GetPath()
        else:
            wx.MessageBox("%s:\n%s" % (msg, widget.GetPath()), _("Path Error"), wx.OK | wx.ICON_WARNING, self)
            widget.SetPath("")
            return ""

    def path_try_relative(self, p):
        return path.make_rel(p, path.fest_file)

    def ui_to_config(self):
        """ Saves selected values from UI to JSON config """
        # FIXME: prevent .fest file from saving if path validation failed

        self.config[Config.PROJECTOR_SCREEN] = self.screens_combobox.GetSelection()
        self.config[Config.FILENAME_RE] = self.filename_re.GetValue()
        self.config[Config.BG_TRACKS_DIR] = self.path_try_relative(
            self.path_validate(
                self.bg_tracks,
                _("Invalid Background Tracks Dir")
            )
        )
        self.config[Config.C2_DATABASE_PATH] = self.path_try_relative(
            self.path_validate(
                self.db_path,
                _("Cosplay2 database not found")
            )
        )
        self.config[Config.FILES_DIRS] = [
            self.path_try_relative(
                self.path_validate(
                    picker,
                    _("Invalid Files dir")
                )
            )
            for picker in self.dir_pickers
        ]
        self.config[Config.BG_ZAD_PATH] = self.path_try_relative(
            self.path_validate(
                self.bg_zad,
                _("Invalid Background ZAD Path")
            )
        )

    def on_ok(self, e):
        fest_file_path = self.session_picker.GetPath()
        ext = '.bkp.fest'
        if fest_file_path.find(ext) == len(fest_file_path) - len(ext):
            self.fest_file_path = fest_file_path[:-4]
            shutil.copy(fest_file_path, self.fest_file_path)
        else:
            ext = '.fest'
            self.fest_file_path = fest_file_path if fest_file_path.endswith(ext) else fest_file_path + ext

        if e.Id == wx.ID_SAVE:
            # For normal path translation .fest file must exist
            f = open(self.fest_file_path, 'w', encoding='utf-8')
            f.close()

            self.ui_to_config()
            json.dump(self.config, open(self.fest_file_path, 'w', encoding='utf-8'),
                      ensure_ascii=False, indent=4)

        path.fest_file = self.fest_file_path
        with open(Config.LAST_SESSION_PATH, 'w', encoding='utf-8-sig') as f:
            f.write(path.make_rel(self.fest_file_path))

        self.EndModal(e.Id)

    def on_file_edit(self, e=None):
        config_path = self.session_picker.GetPath()

        if sys.platform.startswith('linux'):  # for Linux using the X Server
            subprocess.call(('xdg-open', config_path))
        elif sys.platform == "win32":  # for Windows
            os.startfile(config_path)
        elif sys.platform == "darwin":  # for MacOS
            subprocess.call(('open', config_path))

        with wx.MessageDialog(self, _("The operating system is opening the '%s' file.\n"
                                      "It is in JSON format, use any plain-text editor to open it.\n"
                                      "For instance: AkelPad, Visual Studio Code, Notepad, etc.\n\n"
                                      "Edit the file very carefully and save it.\n"
                                      "Then hit 'OK' to load the new config or 'Cancel' to revert your changes.") %
                                              os.path.basename(config_path),
                              _("Manual Configuration"), wx.OK | wx.CANCEL | wx.ICON_INFORMATION) as restart_dialog:
            action = restart_dialog.ShowModal()
            if action == wx.ID_OK:
                try:
                    self.config = json.load(open(config_path, 'r', encoding='utf-8-sig'))
                    self.EndModal(wx.ID_OPEN)
                except json.decoder.JSONDecodeError as e:
                    msg = _("Unfortunately, you broke the JSON format...\n"
                            "Please fix the configuration file%s ASAP.\n\nDetails: %s") % ("", str(e))
                    wx.MessageBox(msg, "JSON Error", wx.OK | wx.ICON_ERROR, self)
            elif action == wx.ID_CANCEL:
                json.dump(self.config, open(config_path, 'w', encoding='utf-8'),
                          ensure_ascii=False, indent=4)
                self.EndModal(wx.ID_CANCEL)
