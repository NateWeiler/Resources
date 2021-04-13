### How do you pronounce "Urwid"?

Urwid is properly pronounced oor'-wid, from the [German prefix "ur" meaning ancestral or primal](http://lists.excess.org/pipermail/urwid/2008-September/000556.html) and "wid" for widget library. (thank you to Rebecca Breu for sharing this interpretation)

### How do I create drop-downs, floating windows, and scroll bars?

A.K.A. "I want to make my console application look like Borland Turbo Vision, because that was awesome!"

You need to start writing some fairly complex widgets. This functionality hasn't been added to Urwid yet, but if you are willing to write it, we do accept patches. The example programs, and the contributed example are good places to start.

### What does the "AttributeError: XXX object has no attribute 'rows'" error mean?

One of your XXX widgets is being treated like a flow widget by another widget. The `rows()` method is used to calculate the number of screen rows required to display a flow widget, but box widgets may be displayed with any number of columns and rows. For example, you might have put a box widget in a `ListBox` or a `Filler` widget with the wrong arguments.

If you want to use a box widget where a flow widget is expected you need to first wrap it with a widget like `BoxAdapter` that first imposes a fixed number of rows on a box widget.

### What does the "(maxcol,) = size ... ValueError: too many values to unpack" error mean?

One of your flow widgets is being treated like a box widget by another widget or by the MainLoop class. For example, the topmost widget used by the `MainLoop` class and widgets used the body of a Frame widget must be box widgets.

If you want to use a flow widget where a box widget is expected you need to first wrap it with a widget like `Filler` that will take care of filling the empty space above or below what the flow widget displays.

### Why can't I select text in an Urwid program?

By default Urwid's `MainLoop` tells the terminal that it will handle mouse input so it can react to things like selecting widgets with the mouse or activating check boxes.

If you wrote this program and you want to disable Urwid's mouse handling you can set `handle_mouse=False` when creating your `MainLoop` or screen object.

Or you can just hold the SHIFT key while clicking and dragging in to get the normal select text/copy behavior.

### Why are box borders not displayed correctly on the linux vconsole?

To correctly display all characters you need to use an UTF-8 font. You might need to install additional console fonts, which typically reside in `/lib/kbd/consolefonts/`. One of the fonts which is known to work is `LatArCyrHeb-16`.
Sometimes it is also necessary to call `setfonts`.