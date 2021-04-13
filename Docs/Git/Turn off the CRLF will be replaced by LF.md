# How to turn off the “CRLF will be replaced by LF” warning

## CRLF: Line breaks in windows environment
## LF : Line breaks in linux environment

The meaning of this error is that there are two newline characters in the file, git will automatically replace CRLF with LF, so a warning is given.

warning: CRLF will be replaced by LF in [File] . The file will have its original line endings in your working directory.

### Turn the auto-conversion feature off in the settings

```bash
$ git config --global core.autocrlf false
```

### Perform a safecrlf check when the file is submitted.

Refuse to submit a file containing a mixed line break

```bash
$ git config --global core.safecrlf true   
```

### Allow submission of files containing mixed line breaks

```bash
$ git config --global core.safecrlf false   
```

### Warning when submitting a file containing mixed line breaks

```bash
$ git config --global core.safecrlf warn
```
### Convert to LF when submitting, convert to CRLF when checked out

```bash
$ git config --global core.autocrlf true
```

### Convert all CRLF line endings to LF before it stores it in the commit:

```bash
$ git config --global core.autocrlf input
```

### then

```bash
$ git rm --cached -r . && git reset --hard # Warning, your local changes will be lost, so commit FIRST
```

### Convert Cloned Files with CRLF line endings to LF and to update the .gitattributes file to auto enforce the LF line endings.

```bash
find . -type f -exec dos2unix {} \;
```
