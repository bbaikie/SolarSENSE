# SolarSENSE
ASU SER401 SolarSENSE capstone group for the 2019-2020 school year

## Setting Up the Development Environment

### Install Raspbian
[Download the latest iso of Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/)
**or**
[Follow the installation process for NOOBS](https://www.raspberrypi.org/downloads/noobs/)

#### If you chose not to use NOOBS follow one of the methods listed below:
1. Command Line
    - [Linux](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)
    - [Mac OS](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md)
    - [Windows](https://www.raspberrypi.org/documentation/installation/installing-images/windows.md)

2. SD Card Writing Tool
    - [BalenaEtcher](https://www.balena.io/etcher/)

### Installing SSH on the raspberry pi
1. Connect the microSD card with Raspberian installed to a computer.
2. Create an empty file called named ssh in the boot partition of the connected sd card.

### Set up client computer to connect through ethernet
#### Mac OS
1. Navigate to System Preferences -> Sharing.
2. Turn on internet sharing for thunderbolt ethernet.
3. Connect your raspberry pi using an ethernet cable.

#### Windows 7/8/10
- [Set up windows with raspberry pi](https://anwaarullah.wordpress.com/2013/08/12/sharing-wifi-internet-connection-with-raspberry-pi-through-lanethernet-headless-mode/)


### Connecting to the raspberry pi with SSH.

1. Open the terminal and enter:
    `$ ssh pi@192.168.2.2` 
Enter raspberry when prompted for a password.

### Install solarSENSE hub
Use `$ make init` to install dependencies and testing software.

