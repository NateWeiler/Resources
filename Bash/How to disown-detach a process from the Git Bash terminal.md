# How to disown/detach a process from the Git Bash terminal

The mixture of `cmd` and `start` *does* work, although both of @antonio 's solutions were "visible" for me. I was trying to find another way, more consistent with MinGW.

`mintty bash -mc "commands &>/dev/null < /dev/null &"` seems to always work

------------------------

1.  In `mintty` (the "normal" way)

    -   Stdin on mintty is a pipe rather than a tty and would require `winpty` in order to get a tty (no idea if this matters)

    Execute these commands, then close mintty

    | Command | Works? |
    | --- | --- |
    | `git gui` | Nope, the command `git` is called here, and hooked in, so closing the shell kill the git command |
    | `git-gui` | Works, although this is not calling the CLI git anymore, but the windows GUI executable directly, `git-gui`. This is not a general solution |
    | `sleep 60` | Nope |
    | `sleep 60&` | Only if you press Ctrl+D to close, instead of click the X or pressing Alt+F4 |
    | `bash -c "sleep 60&"` | Yes (Still get a warning when you close mintty, but it doesn't kill `sleep`) |
    | `mintty bash -c "sleep 60&"` | Nope |
    | `mintty bash -mc "sleep 60&"` | **Yes**, fully detached |
    | `./foo.bat&` | Nope, `foo.bat` uses stdout, needs to be redirected |
    | `./foo.bat < /dev/null&` | Only if you press Ctrl+D to close, instead of click the X or pressing Alt+F4 |
    | `mintty bash -mc "./foo.bat < /dev/null&"` | **Yes**, fully detached |
    | `winpty bash -mc "./foo.bat&"` | Nope, when stdin is close, the pty dies |
    | `winpty bash -c "./foo.bat&" < /dev/null` | Does not work the first time, works on additional calls |
    | `winpty bash -mc "./foo.bat&" < /dev/null` | Only works like half the time, random |
    | `winpty bash -c "./foo.bat" < /dev/null &` | Only works like half the time, random |
    | `/c/Python39/python foo.py` | Same result as `sleep`/`foo.bat` |

2.  In PowerShell

    -   Running in powershell does gives stdin a tty

    *Showing different results only*

    | Command | Works? |
    | --- | --- |
    | `sleep 60&` | Nope |
    | `bash -c "sleep 60&"` | Nope |
    | `./foo.bat < /dev/null&` | Nope |
    | `mintty bash -mc "./foo.bat < /dev/null&"` | Nope |
    | `mintty bash -mc "./foo.bat &> /dev/null < /dev/null&"` | **Yes** |
    | `winpty bash -c "./foo.bat&" < /dev/null` | Nope |
    | `winpty bash -c "./foo.bat&" &> /dev/null < /dev/null` | Works half the time, even the first time |
    | `winpty bash -mc "./foo.bat&" < /dev/null` | Nope |
    | `winpty bash -mc "./foo.bat&" &> /dev/null < /dev/null` | Works half the time |
    | `winpty bash -mc "./foo.bat" &> /dev/null < /dev/null &` | Works half the time |

1.  In Command Prompt (cmd)

    -   Running in cmd does gives stdin a tty
    -   Results same as PowerShell
2.  In Windows Terminal

    -   Running in W Terminal does gives stdin a tty
    -   Results same as PowerShell

What's going on here
--------------------

-   Based off of the observations with `start`/`cmd`, I was able to get a combo that used `mintty`. I imagine this will handle more cases when it comes to nested quotes, as this keeps the call within the GNU arguments arena, should the need arise.

-   It took me a while to find the `winpty`/redirect/bg combo that worked, then I found out that if I try it 10 times in a row, it might work 3 times, it might work 8 times, but usually not 10. It's completely unstable

    -   I could now find out why, even using:

        for s in `seq 10`; do winpty bash -c './foo.bat &> foo.$$' < /dev/null; done

    -   Not all 10 foo.# files even existed, telling me the bash command didn't even start to get executed.

    -   `winpty` executes additional path translation on arguments inconsistent with MinGW's path translations rules, so using `winpty` is generally asking for trouble

-   `disown` in bash on MinGW appears to do nothing for or against this endeavor.
