this wiki will show a method to run .exe files stored on the mount.

you enable this feature you must add this flag to the rclone mount

`--file-perms=0777`

run a mount like this

`rclone.exe mount remote:\ z: --file-perms=0777 --vfs-cache-mode=full`

now that the mount is active, this is a dir of the folder

`z:\zork>dir`

 `Volume in drive Z is wasabiremote`

 `Volume Serial Number is 384C-E1EB`

 `Directory of z:\zork`

`05/03/2020  05:14 PM    <DIR>          .`

`05/03/2020  05:02 PM    <DIR>          ..`

`07/13/2009  08:13 AM            26,624 ScaleGfx.dll`

`07/28/2019  04:44 PM         1,191,936 zork.exe`

`12/24/1996  11:32 PM            92,160 zork1.dat`

`3 File(s)      1,310,720 bytes`
               
`2 Dir(s)  1,125,899,906,842,624 bytes free`

now i will run the greatest game of all time ZORK

`z:\zork>zork.exe`

![](https://user-images.githubusercontent.com/42986211/80926944-6642f200-8d68-11ea-8e8b-8d637997c87d.PNG)