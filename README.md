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

### Install solarSENSE hub
1. SSH onto the raspberry pi.
2. Install [git](https://git-scm.com/downloads).
3. Execute the command `$ git clone URL` where URL is the url of the [SolarSENSE](https://github.com/jeremiah-miller/SolarSENSE/tree/dev-sprint3) repository.
4. Navigate to the base directory of the SolarSENSE repo folder.
5. Execute the command `$ make init`.

### To start the Website
1. run `$ gunicorn -w 4 -b 192.168.4.1:8080 Website.wsgi`
2. Connect to the wifi signal NameOfNetwork. The password is AardvarkBadgerHedgehog. You can look in the hostapd.conf file on your pi to change this.
3. Enter 192.168.4.1:8080 into your address bar for any web browser to see the website.

### Setting up Nginx
1. Navigate to the config directory inside the the root of your SolarSENSE repo
2. `$ sudo mv nginx.conf /etc/nginx/`
3. `$ sudo mv gunicorn.service /etc/systemd/system/`
4. `$ sudo mv gunicorn.socket /etc/systemd/system/`
5. `$ sudo systemctl start gunicorn.socket`
6. `$ sudo systemctl enable gunicorn.socket`
7. `$ curl --unix-socket /run/gunicorn.sock 192.168.4.1` should return This is a test.
8. Enter 192.168.4.1/admin into a browser.
9. `$ python3 manage.py createsuperuser` from the directory containing manage.py in your github repo.
10. Connect a device to the hub wifi network.
11. Enter 192.168.4.1/admin into a browser.
12. Login and add a video object under the name mediaImage. Note that an image should be uploaded when prompted.
13. Connect a device to the hub wifi network and enter 192.168.4.1/staticTest into a browser. Two images and one video should display.

#### Troubleshooting
* Nginx Process Logs: sudo journalctl -u nginx
* Nginx Access Logs: sudo less /var/log/nginx/access.log
* Nginx Error Logs: sudo less /var/log/nginx/error.log
* Gunicorn Application Log: sudo journalctl -u gunicorn
* Gunicorn Socket Log: sudo journalctl -u gunicorn.socket

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

### Set up JSON-RPC for C++
This is only necessary for developing for the ESP32 sensor processor board, and should be done on whichever computer is being used for programming, not the hub Raspberry Pi (unless the hub Raspberry Pi is the computer being used to develop for the ESP32).
1. Navigate to the [json-rpc-cpp repository](https://github.com/cinemast/libjson-rpc-cpp#install-the-framework)
2. Follow the instructions for how to install the framework for whichever platform you're developing on.
3. Once the JSON-RPC libraries are installed, the sensor code will be able to be compiled

