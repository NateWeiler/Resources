#!/bin/bash
# author : Joker-Security 
# Tested on Kali Linux / Parrot Os / Archman / ArcoLinux / Termux
# Simple script for Install Optiva-Framework
#Colors
cyan='\e[0;36m'
green='\e[0;32m'
lightgreen='\e[1;32m'
white='\e[1;37m'
red='\e[1;31m'
yellow='\e[1;33m'
blue='\e[1;34m'
#Options
path=`pwd` # Path
name="\e[1;34mOptiva-Framework" #Name
VeR="\e[1;31mV1.0.4" # Version
#Check root exist
#[[ `id -u` -eq 0 ]] > /dev/null 2>&1 || { echo  $red "You must be root to run the script"; exit 1; }
#banner head
function main_menu()
{
    while :
    do
echo """
 ██████╗ ██████╗ ████████╗██╗██╗   ██╗ █████╗                                     
██╔═══██╗██╔══██╗╚══██╔══╝██║██║   ██║██╔══██╗                                    
██║   ██║██████╔╝   ██║   ██║██║   ██║███████║                                    
██║   ██║██╔═══╝    ██║   ██║╚██╗ ██╔╝██╔══██║                                    
╚██████╔╝██║        ██║   ██║ ╚████╔╝ ██║  ██║                                    
 ╚═════╝ ╚═╝        ╚═╝   ╚═╝  ╚═══╝  ╚═╝  ╚═╝                                    
                                                                                  
    ███████╗██████╗  █████╗ ███╗   ███╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗  ██╗
    ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝██║    ██║██╔═══██╗██╔══██╗██║ ██╔╝
    █████╗  ██████╔╝███████║██╔████╔██║█████╗  ██║ █╗ ██║██║   ██║██████╔╝█████╔╝ 
    ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██╔═██╗ 
    ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗╚███╔███╔╝╚██████╔╝██║  ██║██║  ██╗
    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                        Setup Script for $name $VeR                                                                         
"""
echo $yellow "Systems Available : "
echo "$lightgreen 1) $red ✔ Kali Linux / Parrot-Os / Ubuntu "
echo "$lightgreen 2) $red ✔ Black Arch / Arch Linux / Archman"
echo "$lightgreen 3) $red ✔ Termux(Android)"
echo "$lightgreen 0) $red ✔ Exit"
echo -n -e "$lightgreen Select Your System : $red"
read -e joker
case $joker in
'1')
echo $green "[*] Loading... "
sudo apt-get update
sudo apt-get install python-pip
echo "[*] installing requirements...."
pip2 install -r requirements.txt
pip2 install mechanize
pip2 install requests
pip2 install termcolor
pip2 install --upgrade html5lib
pip2 install --upgrade beautifulsoup4
echo $green "[*] Moving Optiva-Framework folder "
mkdir /usr/share/optiva
cp -r ico /usr/share/optiva
cp -r core /usr/share/optiva
cp -r modules /usr/share/optiva
cp -r plugins /usr/share/optiva
cp installer.sh /usr/share/optiva
cp requirements.txt /usr/share/optiva
cp optiva.py /usr/share/optiva
echo $blue "[ ✔ ]Done"
echo $red "[*] Creating Icons Dirctory"
cp -r $path/ico/optiva.desktop /usr/share/applications/optiva.desktop
cp -r $path/ico/optiva.png /usr/share/icons/optiva.png
echo $yellow "[*] Creating shortcut command $red Optiva-Framework"
echo "#!/bin/sh" >> /usr/bin/optiva
echo "cd /usr/share/optiva" >> /usr/bin/optiva
echo "exec python2 optiva.py \"\$@\"" >> /usr/bin/optiva
chmod +x /usr/bin/optiva
echo $green ""
echo "------------------------------------" 
echo "| [ ✔ ]installation completed[ ✔ ] |" 
echo "------------------------------------" 
echo
echo $green "#####################################"
echo $blue "|Now Just Type In Terminal (optiva)|"
echo $green "#####################################"
echo $green "【!】 Main Menu【!】"
read -p "pess any key to return ..."
clear
;;
'2')
echo $green "[*] Loading... "
sudo pacman -Syy
sudo pacman -S python2-pip
echo "[*] installing requirements...."
pip2 install -r requirements.txt
pip2 install mechanize
pip2 install requests
pip2 install termcolor
pip2 install --upgrade html5lib
pip2 install --upgrade beautifulsoup4
echo $green "[*] Moving $red Optiva-Framework folder "
mkdir /usr/share/optiva
cp -r ico /usr/share/optiva
cp -r core /usr/share/optiva
cp -r modules /usr/share/optiva
cp -r plugins /usr/share/optiva
cp installer.sh /usr/share/optiva
cp requirements.txt /usr/share/optiva
cp optiva.py /usr/share/optiva
echo $blue "[ ✔ ]Done"
echo $red "[*] Creating Icons Dirctory"
cp -r $path/ico/optiva.desktop /usr/share/applications/optiva.desktop
cp -r $path/ico/optiva.png /usr/share/icons/optiva.png
echo $yellow "[*] Creating shortcut command Optiva-Framework"
echo "#!/bin/sh" >> /usr/bin/optiva
echo "cd /usr/share/optiva" >> /usr/bin/optiva
echo "exec python2 optiva.py \"\$@\"" >> /usr/bin/optiva
chmod +x /usr/bin/optiva
echo $green ""
echo "------------------------------------" 
echo "| [ ✔ ]installation completed[ ✔ ] |" 
echo "------------------------------------" 
echo
echo $green "#####################################"
echo $blue "|Now Just Type In Terminal (optiva)|"
echo $green "#####################################"
echo $green "【!】 Main Menu【!】"
read -p "pess any key to return ..."
clear
;;
'3')
echo $green "[*] Loading... "
apt install python2
echo "[*] installing requirements...."
pip2 install -r requirements.txt
pip2 install mechanize
pip2 install requests
pip2 install termcolor
pip2 install --upgrade html5lib
pip2 install --upgrade beautifulsoup4
echo $blue "[ ✔ ]Done"
echo $green ""
echo "------------------------------------" 
echo "| [ ✔ ]installation completed[ ✔ ] |" 
echo "------------------------------------" 
echo
echo "------------------------------------" 
echo "| [ ✔ ]Run python2 optiva.py[ ✔ ] |" 
echo "------------------------------------" 
echo $green "#########################################"
echo $blue "| Thanks For Installing Optiva-Framework |"
echo $green "#########################################"
echo $green "【!】 Main Menu【!】"
read -p "pess any key to return ..."
clear

;;
'0')
  echo $red " Good Bye !!"
  echo
  exit 0
  ;;
       esac
    done
}
main_menu                                                              
