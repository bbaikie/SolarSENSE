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

### Set up client computer to connect to the raspberry pi
#### Mac OS
1. Navigate to System Preferences -> Sharing.
2. Turn on internet sharing for thunderbolt ethernet.
3. Connect your raspberry pi using an ethernet cable.
4. Navigate to system preferences -> Network
5. Wait until thunderbolt ethernet listed in the left changes from "Not connected" to "self-assigned ip"
6. Navigate to /private/var/db/
7. Open up dhcpd_leases and record the ip address listed under raspberrypi
8. Open the terminal and enter:
    `$ ssh pi@YOUR_IP` where YOUR_IP is the ip you found. 
9. When prompted for a password enter raspberry.


#### Windows 7/8/10 
1. Go to control panel -> network sharing center
2. Click change adapter settings
3. Right click on your wireless network connection and select properties. (* *You will need an internal network adapter otherwise this connection won't be visible* *)
4. Click the sharing tab.
5. Make sure both both boxes are selected and the home network connection is set to LAN.
6. Apply the changes and reboot your computer.
7. Attach the raspberry pi to your computer with an ethernet cable.
8. Connect a screen and keyboard to your raspberry
9. Type `$ ifconfig` into the raspberry pi commandline
10. record the ip address listed under eth0
11. Set up your preferred SSH client.
12. Attempt to connect to the raspberry pi and when prompted for a password enter raspberry.

#### Ubuntu
1. Connect Raspberry pi to computer with ethernet cable.
2. System -> Preferences -> Network Connection -> Wired
3. Select eth0 and select edit.
4. Select the IPv4 tab and change the method to shared to other computer.
5. Navigate to /var/lib/misc/
6. Open up dnsmasq.leases and record the ip address listed under raspberry pi.

#### Directly
If you have a spare screen and keyboard you can directly interact with the raspberry pi.
To access the internet add a wifi network following [these](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md) instructions.

### Install solarSENSE hub
1. SSH onto the raspberry pi.
2. Install [git](https://git-scm.com/downloads).
3. Execute the command `$ git clone URL` where URL is the url of the [SolarSENSE](https://github.com/jeremiah-miller/SolarSENSE/tree/dev-sprint3) repository.
4. Navigate to the base directory of the SolarSENSE repo folder.
5. Execute the command `$ make init`.

