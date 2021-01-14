[![Typer](https://typer.tiangolo.com/img/logo-margin/logo-margin-vector.svg)](https://typer.tiangolo.com/)

*Typer, build great CLIs. Easy to code. Based on Python type hints.*

---

**Documentation**: [https://typer.tiangolo.com](https://typer.tiangolo.com/)

**Source Code**: <https://github.com/tiangolo/typer>

* * * * *

Typer is a library for building CLI applications that users will **love using** and developers will **love creating**. Based on Python 3.6+ type hints.

The key features are:

-   **Intuitive to write**: Great editor support. Completion everywhere. Less time debugging. Designed to be easy to use and learn. Less time reading docs.
-   **Easy to use**: It's easy to use for the final users. Automatic help, and automatic completion for all shells.
-   **Short**: Minimize code duplication. Multiple features from each parameter declaration. Fewer bugs.
-   **Start simple**: The simplest example adds only 2 lines of code to your app: **1 import, 1 function call**.
-   **Grow large**: Grow in complexity as much as you want, create arbitrarily complex trees of commands and groups of subcommands, with options and arguments.

FastAPI of CLIs[](https://typer.tiangolo.com/#fastapi-of-clis "Permanent link")
-------------------------------------------------------------------------------

[![](https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png)](https://fastapi.tiangolo.com/)

**Typer** is [FastAPI](https://fastapi.tiangolo.com/)'s little sibling.

And it's intended to be the FastAPI of CLIs.

Requirements[](https://typer.tiangolo.com/#requirements "Permanent link")
-------------------------------------------------------------------------

Python 3.6+

**Typer** stands on the shoulders of a giant. Its only internal dependency is [Click](https://click.palletsprojects.com/).

Installation[](https://typer.tiangolo.com/#installation "Permanent link")
-------------------------------------------------------------------------

[](https://typer.tiangolo.com/#)pip install typer████████████████████████████████████████ 100%Successfully installed typer

[restart ↻](https://typer.tiangolo.com/#)

Example[](https://typer.tiangolo.com/#example "Permanent link")
---------------------------------------------------------------

### The absolute minimum[](https://typer.tiangolo.com/#the-absolute-minimum "Permanent link")

-   Create a file `main.py` with:

`import typer

def main(name: str):
    typer.echo(f"Hello {name}")

if __name__ == "__main__":
    typer.run(main)`

### Run it[](https://typer.tiangolo.com/#run-it "Permanent link")

Run your application:

[](https://typer.tiangolo.com/#)💬 Run your applicationpython main.py\
💬 You get a nice error, you are missing NAMEUsage: main.py [OPTIONS] NAME\
Try "main.py --help" for help.

Error: Missing argument 'NAME'.

💬 You get a --help for freepython main.py --help\
Usage: main.py [OPTIONS] NAME

Arguments:\
NAME [required]

Options:\
--install-completion Install completion for the current shell.\
--show-completion Show completion for the current shell, to copy it or customize the installation.\
--help Show this message and exit.

💬 When you create a package you get ✨ auto-completion ✨ for free, installed with --install-completion\
💬 Now pass the NAME argumentpython main.py Camila\
Hello Camila

💬 It works! 🎉\
[restart ↻](https://typer.tiangolo.com/#)

**Note**: auto-completion works when you create a Python package and run it with `--install-completion` or when you use [Typer CLI](https://typer.tiangolo.com/typer-cli/).

Example upgrade[](https://typer.tiangolo.com/#example-upgrade "Permanent link")
-------------------------------------------------------------------------------

This was the simplest example possible.

Now let's see one a bit more complex.

### An example with two subcommands[](https://typer.tiangolo.com/#an-example-with-two-subcommands "Permanent link")

Modify the file `main.py`.

Create a `typer.Typer()` app, and create two subcommands with their parameters.

`import typer

app = typer.Typer()

@app.command() def hello(name: str):
    typer.echo(f"Hello {name}")

@app.command() def goodbye(name: str, formal: bool = False):
    if formal:
        typer.echo(f"Goodbye Ms. {name}. Have a good day.")
    else:
        typer.echo(f"Bye {name}!")

if __name__ == "__main__":
 app() `

And that will:

-   Explicitly create a `typer.Typer` app.
    -   The previous `typer.run` actually creates one implicitly for you.
-   Add two subcommands with `@app.command()`.
-   Execute the `app()` itself, as if it was a function (instead of `typer.run`).

### Run the upgraded example[](https://typer.tiangolo.com/#run-the-upgraded-example "Permanent link")

[](https://typer.tiangolo.com/#)💬 Check the --helppython main.py --help\
Usage: main.py [OPTIONS] COMMAND [ARGS]...

Options:\
--install-completion Install completion for the current shell.\
--show-completion Show completion for the current shell, to copy it or customize the installation.\
--help Show this message and exit.

Commands:\
goodbye\
hello

💬 You have 2 subcommands (the 2 functions): goodbye and hello\
💬 Now get the --help for hello\
python main.py hello --help\
Usage: main.py hello [OPTIONS] NAME

Arguments:\
NAME [required]

Options:\
--help Show this message and exit.

💬 And now get the --help for goodbye\
python main.py goodbye --help\
Usage: main.py goodbye [OPTIONS] NAME

Arguments:\
NAME [required]

Options:\
--formal / --no-formal [default: False]\
--help Show this message and exit.

💬 Automatic --formal and --no-formal for the bool option 🎉\
💬 And if you use it with the hello command\
python main.py hello Camila\
Hello Camila

💬 And with the goodbye command\
python main.py goodbye Camila\
Bye Camila!

💬 And with --formal\
python main.py goodbye --formal Camila\
Goodbye Ms. Camila. Have a good day.

[restart ↻](https://typer.tiangolo.com/#)

### Recap[](https://typer.tiangolo.com/#recap "Permanent link")

In summary, you declare **once** the types of parameters (*CLI arguments* and *CLI options*) as function parameters.

You do that with standard modern Python types.

You don't have to learn a new syntax, the methods or classes of a specific library, etc.

Just standard **Python 3.6+**.

For example, for an `int`:

`total: int`

or for a `bool` flag:

`force: bool`

And similarly for **files**, **paths**, **enums** (choices), etc. And there are tools to create **groups of subcommands**, add metadata, extra **validation**, etc.

**You get**: great editor support, including **completion** and **type checks** everywhere.

**Your users get**: automatic **`--help`**, **auto-completion** in their terminal (Bash, Zsh, Fish, PowerShell) when they install your package or when using [Typer CLI](https://typer.tiangolo.com/typer-cli/).

For a more complete example including more features, see the [Tutorial - User Guide](https://typer.tiangolo.com/tutorial/).

Optional Dependencies[](https://typer.tiangolo.com/#optional-dependencies "Permanent link")
-------------------------------------------------------------------------------------------

Typer uses [Click](https://click.palletsprojects.com/) internally. That's the only dependency.

But you can also install extras:

-   [`colorama`](https://pypi.org/project/colorama/): and Click will automatically use it to make sure your terminal's colors always work correctly, even in Windows.
    -   Then you can use any tool you want to output your terminal's colors in all the systems, including the integrated `typer.style()` and `typer.secho()` (provided by Click).
    -   Or any other tool, e.g. [`wasabi`](https://pypi.org/project/wasabi/), [`blessings`](https://github.com/erikrose/blessings).
-   [`shellingham`](https://github.com/sarugaku/shellingham): and Typer will automatically detect the current shell when installing completion.
    -   With `shellingham` you can just use `--install-completion`.
    -   Without `shellingham`, you have to pass the name of the shell to install completion for, e.g. `--install-completion bash`.

You can install `typer` with `colorama` and `shellingham` with `pip install typer[all]`.

Other tools and plug-ins[](https://typer.tiangolo.com/#other-tools-and-plug-ins "Permanent link")
-------------------------------------------------------------------------------------------------

Click has many plug-ins available that you can use. And there are many tools that help with command line applications that you can use as well, even if they are not related to Typer or Click.

For example:

-   [`click-spinner`](https://github.com/click-contrib/click-spinner): to show the user that you are loading data. A Click plug-in.
    -   There are several other Click plug-ins at [click-contrib](https://github.com/click-contrib) that you can explore.
-   [`tabulate`](https://pypi.org/project/tabulate/): to automatically display tabular data nicely. Independent of Click or Typer.
-   [`tqdm`](https://github.com/tqdm/tqdm): a fast, extensible progress bar, alternative to Typer's own `typer.progressbar()`.
-   etc... you can re-use many of the great available tools for building CLIs.
