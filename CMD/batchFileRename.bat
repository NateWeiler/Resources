: This batch file renames file extensions in bulk.
: File extensions are renamed for all matching files in the current folder and in
: all subdirectories.
:
: Script provided by Windows-commandline.com
: For more information on this batch script, visit :
: http://www.windows-commandline.com/2012/07/change-file-extensions.html

@echo off

if not [%3]==[] (
    goto usage
)


if [%2]==[] (
    goto usage
)

if [%1]==[] (
    goto usage
)

CALL SET arg=%2%
CALL SET ext=%%arg:~1%%

if %arg%==* (
forfiles /S /M %1 /C "cmd /c rename @file @fname
) else (
forfiles /S /M %1 /C "cmd /c rename @file @fname%ext%"
)

if %ERRORLEVEL%==0 (
 echo Successfully renamed the file extensions.
  )
goto :eof

:usage
echo Usage:
echo TO rename file extension: batchFileRename.bat *.ext1 *.ext2"
echo To strip file extension: bathFileRename.bat *.ext *