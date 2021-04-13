Tested on a fresh Windows 2016 Server VM

From within an interactive powershell session:

Install [chocolatey](https://chocolatey.org/install)

```
Get-ExecutionPolicy # Check it doesn't say restricted
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco
```

Install go, git and libraries needed by rclone

```
choco install git
choco install golang
go version
choco install WinFSP
choco install MinGW
[Environment]::SetEnvironmentVariable("CPATH", "C:\Program Files\WinFsp\inc\fuse;C:\Program Files (x86)\WinFsp\inc\fuse", "Machine")
$gopath = go env GOPATH
[Environment]::SetEnvironmentVariable("PATH", $env:PATH + ";" + $gopath + "\bin", "User")
```

Logout of powershell and back in to set the environment variables

Install editor and configure git

```
choco install emacs
git config --global user.name "Your Name Goes Here"
git config --global user.email you@example.com
```

Compile rclone with mount support

```
go get github.com/ncw/rclone
cd .\go\src\github.com\ncw\rclone\
go install -tags cmount -v
rclone -V
```
