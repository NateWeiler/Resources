Using Chocolately for installation is a great choice with Windows as it's designed to for automated application installation and upgrades, without the need for custom scripting.
Chocolatey provides a similar to experience with application installation as `apt-get` for Linux. 

## Install Chocolately Deliciousness
To install Chocolatey, follow the directions located on [Chocolatey Install](https://chocolatey.org/install). 
From this documentation, you can run this in cmd.exe as admin.

```cmd
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

## Let Chocolately Do the Magic
Then simply run in command prompt or powershell

```powershell
choco upgrade rclone -y
```

Note: Upgrade will install Rclone if does not exist, or upgrade to latest version if it does exist.