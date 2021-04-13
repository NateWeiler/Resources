# Introduction

This article explains how to use the Windows PowerShell to store your configuration file password securely in a file and let rclone use it without user interaction.

As explained in the official [documentation](https://rclone.org/docs/#configuration-encryption), Rclone's configuration file contains information for logging in to your cloud services and should therefore be kept in a secure location. As an additional optional security measure rclone lets you encrypt the configuration file. The downside of this is that you will be prompted for the password every time you run an rclone command. You can avoid this by setting the password as the value of environment variable `RCLONE_CONFIG_PASS`, but you may not want to have it in clear text in an environment variable.

As of release 1.51, rclone can be configured to execute a command and read the password from its standard output. The command can be specified in command-line argument `--password-command` or environment variable `RCLONE_PASSWORD_COMMAND`. Windows PowerShell includes built-in support for encryption via the `SecureString` type. This .NET type is intended for sensitive string data that should not be kept as plain text in process memory, but this is not the important feature here. Instead we can utilize the fact that a `SecureString` can be easily transformed into a regular `String` type - and then the content is in encrypted form. The best part of this is that the encryption is based on a built-in component in Windows (Data Protection API, see notes below) which automatically manages the encryption key, so you will not have to enter or figure out how to mange a key or password to encrypt or decrypt!

*There are probably several third party solutions that can be used with the `--password-command` to achieve the same thing, e.g. Gpg4win (GNU Privacy Guard, GnuPG, for Windows) can be used with symmetric cipher and an agent utility (gpg-agent) which caches the password between invocations. The advantage of using Windows PowerShell is that everything you need is included in Windows.*

# Example 1

**Step 1: Store encrypted password file**

Create a file containing your password in encrypted form (for the purpose of this example, `C:\Path\To\Password.sec`):
```
Read-Host -Prompt 'Enter rclone configuration password' -AsSecureString | ConvertFrom-SecureString | Out-File -LiteralPath 'C:\Path\To\Password.sec' -NoNewline
```

**Step 2: Create script for decrypting password file**

Create a PowerShell script (for the purpose of this example, `C:\Path\To\Password.ps1`), to return the decrypted password from the file you created in the previous step (notice how the same file is referenced in the -LiteralPath parameter):

```
New-Object -TypeName System.Net.NetworkCredential -ArgumentList '', (Get-Content -LiteralPath 'C:\Path\To\Password.sec' -Raw | ConvertTo-SecureString) | Select-Object -ExpandProperty Password
```

**Step 3: Test**

We can now instruct rclone to use powershell to execute the script created in the previous step instead of prompting for the password for decrypting the configuration file:

```
rclone -vv --password-command "powershell -NoProfile -File C:\Path\To\Password.ps1" about remote:
```

**Step 4: Use**

As tested in previous step the password command can be supplied as a command-line argument, which is appropriate for your rclone commands in other scripts. But for your interactive use it is not very convenient (unless you have a very long password it would probably be quicker just to drop it and enter the password when rclone prompts for it). To make sure the command is automatically included in your every rclone commands you can store it in environment variable `RCLONE_PASSWORD_COMMAND` instead - set it to value `powershell C:\Path\To\Password.ps1`

From now on you can execute rclone commands without having to enter your configuration file password ever again.

# Example 2

Instead of separating the two operations of (1) encrypting password and storing in file, and (2) reading file and decrypting the password, we can write a combined all-in-one PowerShell code block: It checks if the password file exists, if it does not then prompts the user to enter the configuration password which is then stored encrypted in the file. Later it will just read and decrypt this file without user interaction. The code can be stored in a PowerShell script file and referred to like in example 1 above, but also it can be specified directly as command line argument to powershell.exe.

Base PowerShell code:

```
[Console]::OutputEncoding = [Text.Encoding]::UTF8
if (-not (Test-Path -LiteralPath 'C:\Path\To\Password.sec'))
{
    Read-Host -Prompt 'Enter rclone configuration password' -AsSecureString | ConvertFrom-SecureString | Out-File -LiteralPath 'C:\Path\To\Password.sec' -NoNewline
}
New-Object -TypeName System.Net.NetworkCredential -ArgumentList '', (Get-Content -LiteralPath 'C:\Path\To\Password.sec' -Raw | ConvertTo-SecureString) | Select-Object -ExpandProperty Password
```

It can be condensed into a single-liner that can be supplied directly as command-line argument powershell.exe:

```
powershell -NoProfile -Command [Console]::OutputEncoding = [Text.Encoding]::UTF8; if (-not (Test-Path -LiteralPath 'C:\Path\To\Password.sec')) { Read-Host -Prompt 'Enter rclone configuration password' -AsSecureString | ConvertFrom-SecureString | Out-File -LiteralPath 'C:\Path\To\Password.sec' -NoNewline } New-Object -TypeName System.Net.NetworkCredential -ArgumentList '', (Get-Content -LiteralPath 'C:\Path\To\Password.sec' -Raw | ConvertTo-SecureString) | Select-Object -ExpandProperty Password
```

To make sure the command is automatically executed for every rclone command, you can now just store this entire string as the value of environment variable `RCLONE_PASSWORD_COMMAND`. You can also supply it to rclone command-line argument --password-command with double quotes around it: `rclone lsd remote: --password-command "powershell -NoProfile -Command [Console]::OutputEncoding ..."`. If you want to set the environment variable from command prompt or a batch script remember to escape the `|'`characters into `^|`, like this:

```
SET RCLONE_PASSWORD_COMMAND=powershell -NoProfile -Command [Console]::OutputEncoding = [Text.Encoding]::UTF8; if (-not (Test-Path -LiteralPath 'C:\Path\To\Password.sec')) { Read-Host -Prompt 'Enter rclone configuration password' -AsSecureString ^| ConvertFrom-SecureString ^| Out-File -LiteralPath 'C:\Path\To\Password.sec' -NoNewline } New-Object -TypeName System.Net.NetworkCredential -ArgumentList '', (Get-Content -LiteralPath 'C:\Path\To\Password.sec' -Raw ^| ConvertTo-SecureString) ^| Select-Object -ExpandProperty Password
```

# Notes

## Encryption

Encryption is based on the [Data Protection API (DPAPI)](https://en.wikipedia.org/wiki/Data_Protection_API) component in Windows, which it uses to protect various passwords, certificate private keys, and other sensitive data. It is a symmetric encryption using key derived from the current user account. One of the main advantages of using DPAPI, is that it handles the otherwise difficult problem of explicitly generating and storing a cryptographic key.

**Note that the encrypted content can only be decrypted with the same user account, and in most cases only from the same computer (with possible exception of a domain user account with a roaming profile). Also if you reinstall Windows (on a non-domain joined computer) you will not be able to decrypt the file.**

## Non-ASCII characters

If your password contain non-ascii characters (like German 'ü' or Norwegian 'ø') you will probably have to force UTF-8 encoded console output from the PowerShell executable. PowerShell defaults to writing standard output using the legacy OEM code page, for compatibility with the windows console, and Rclone assumes the data is UTF-8 encoded when reading the command output.

Rclone will report the following error if a mismatch occurs:

`incorrect password: password contains invalid utf8 characters`

The solution is to execute the following statement in your PowerShell script to ensure UTF-8 encoded output:

`[Console]::OutputEncoding = [Text.Encoding]::UTF8`

# References

* https://rclone.org/docs/#configuration-encryption
* https://stackoverflow.com/questions/48083510/getting-a-password-from-secure-text-in-file-to-a-plain-text 1
* https://stackoverflow.com/questions/58438095/powershell-string-variable-with-utf-8-encoding
* https://en.wikipedia.org/wiki/Data_Protection_API