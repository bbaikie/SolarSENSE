# SolarSENSE
ASU SER401 SolarSENSE capstone group for the 2019-2020 school year
PROJECT DESCRIPTION: The 2019-2020 SolarSENSE capstone group was tasked with improving upon the work performed by the 2018-2019 group. What makes are porject different from last years group is that we will be creating an offline hub that will connect to a sensor via wifi and will project tutorial farming videos to third-world country farmers to help them sustain and manage their farms.
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

#### Update Raspbian 
Ensure you are on Raspbian "Buster"
    - Check current distro by running command\
    Run lsb_release -a\
If current distro is not Buster you can update the raspbian distro using ssh:
1. sudo nano /etc/apt/sources.list  and change instances of  ‘stretch’ to ‘buster’ then save (^o) and exit (^x)
2. sudo nano /etc/apt/sources.list.d/raspi.list and change instances of  ‘stretch’ to ‘buster’ then save (^o) and exit (^x) 
3. run sudo apt-get update
4. run sudo apt-get dist-upgrade and restart

### Install solarSENSE hub
1. SSH onto the raspberry pi.
2. Install [git](https://git-scm.com/downloads).
3. Execute the command `$ git clone URL` where URL is the url of the [SolarSENSE](https://github.com/jeremiah-miller/SolarSENSE/tree/dev-sprint3) repository.
4. Navigate to the base directory of the SolarSENSE repo folder.
5. Execute the command `$ make init`.

### Install the database
1. `$ pip3 install psycopg2`
2. `$ sudo apt-get install libpq-dev postgresql postgresql-contrib`
3. `$ sudo -u postgres psql`
4. `create database solarsense;`
5. `create user admin`
6. `ALTER ROLE admin SET client_encoding TO 'utf8';`
7. `ALTER ROLE admin SET default_transaction_isolation TO 'read committed';`
8. `ALTER ROLE admin SET timezone TO 'UTC';`
9. `GRANT ALL PRIVILEGES ON DATABASE solarsense TO admin;`
10. `show hba_file;`
11. `\q`
12. Navigate to the directory displayed in the last instruction.
13. `sudo nano pg_hba.conf`
14. Change the method to trust for the first three rows in the table at the bottom of the file.
15. `$ sudo service postgresql restart`
16. Navigate to the folder containing the manage.py file. It should be inside the SolarSENSE project folder under Website.
17. run `$ python3 manage.py migrate` which should write some data to the database.