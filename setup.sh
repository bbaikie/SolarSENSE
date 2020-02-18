#!/bin/bash
#DIR variable is the directory of this file, no matter where you run it from

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"


echo "-----Starting Packages Setup-----"

#update
sudo apt-get update -y
sudo apt-get upgrade -y

#install all necessary packages
echo "Installing necessary packages"

sudo apt-get install -y hostapd dnsmasq nginx python3 python3-dev python3-pip build-essential mongodb-server git bluetooth bluez

sudo pip3 install flask uwsgi flask_wtf pymongo flask_jsonpify flask-cors numpy json-rpc

#python3 -m pip install pymongo==3.9.0
#look into later, might deal with soil data manipulation
git clone https://github.com/ThomDietrich/miflora-mqtt-daemon.git /opt/miflora-mqtt-daemon

echo "-----Finished with Packages Setup-----"



echo "-----Starting Webserver Setup-----"

echo "-----Finished with Webserver Setup-----"



#echo "-----Starting Mongo Setup-----"

#echo "Setting up MongoDB"

#Setup MongoDB as a service
#Might want to change structure of file setup?

#sudo mkdir -p /data/db/

#sudo chown -R `id -un` /data/db/

#sudo service mongodb start

#echo "-----Finished with Mongo Setup-----"



echo "-----Starting Databases Setup-----"

echo "Destroying All Databases if they exist"

#mongo solarsensereports --eval 'db.dropDatabase()'

#mongo Constraint --eval 'db.dropDatabase()'

#mongo CropFactor --eval 'db.dropDatabase()'

#mongo HistoricalClimateData --eval 'db.dropDatabase()'

#mongo Regions --eval 'db.dropDatabase()'

#mongo MeanLightValues --eval 'db.dropDatabase()'

#mongo FarmInfo --eval 'db.dropDatabase()'

echo "Setting Up Databases"

# Setup the SolarSenseReports database, and import data into them

cd $DIR/Database_Structures
#mongoimport - special command saying you're going to import a JSON file into a database
#--db NAME creates a new database if it doesn't exist or if it does it will just access and import the data into that database
#--collection NAME creates a new collection if it doesn't exist or if it does it will just access and import data into collection
#--file give it path to JSON file, takes the JSON file and create a table in the database with what's in the JSON file.

#mongoimport --db FarmInfo --collection fields --file ./DATAFILES/fields.json

#mongoimport --db FarmInfo --collection sensors --file ./DATAFILES/sensors.json

#mongoimport --db FarmInfo --collection sensorData --file ./DATAFILES/sensorData.json

#mongoimport --db FarmInfoTest --collection fields --file ./DATAFILES/fieldsTest.json

#mongoimport --db FarmInfoTest --collection sensors --file ./DATAFILES/sensorsTest.json

#mongoimport --db FarmInfoTest --collection sensorData --file ./DATAFILES/sensorDataTest.json

echo "-----Finished with Databases Setup-----"



echo "-----Starting Sensors Setup-----"

#Look into FlowerCare

#sudo cp $DIR/setup_stuff/autofindFlowerCare /usr/local/bin/autofindFlowerCare

#sudo chmod +x /usr/local/bin/autofindFlowerCare

#move mqtt daemon config file

#sudo cp $DIR/setup_stuff/config.ini /opt/miflora-mqtt-daemon/config.ini

#move miflora dameon to /opt/miflora-mqtt-daemon

#sudo cp $DIR/setup_stuff/miflora-mqtt-daemon.py /opt/miflora-mqtt-daemon

echo "Setting up the miflora part"

#miflora setup

#cd /opt/miflora-mqtt-daemon

#sudo pip3 install -r requirements.txt

#sudo systemctl enable mosquitto.service

echo "-----Finished with Sensors Setup-----"



echo "-----Starting Hotspot Setup-----"

# move configuration files for dhcpcd, dnsmasq, hostapd, and running it all at start up

# dhcpd handles DHCP for the hotspot

# dnsmasq handles DNS, router advertisement, etc

# hostapd allows us to use the wifi chip as a access point

# wifistart is a script that makes an access point network interface work together with the normal wifi interface at boot

# rc.local holds info on scripts to run at start up

sudo cp $DIR/setup_stuff/dhcpcd.conf /etc/dhcpcd.conf

#backup the original dnsmasq.conf file

sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig

sudo cp $DIR/setup_stuff/dnsmasq.conf /etc/dnsmasq.conf

sudo cp $DIR/setup_stuff/hostapd.conf /etc/hostapd/hostapd.conf

sudo iwconfig wlan0 channel 1

sudo cp $DIR/setup_stuff/hostapd /etc/default/hostapd

sudo cp $DIR/setup_stuff/wifistart /usr/local/bin/wifistart

sudo chmod +x /usr/local/bin/wifistart

sudo cp $DIR/setup_stuff/rc.local /etc/rc.local

sudo sed -i "s@DIRECTORY_HERE@$DIR@g" /etc/rc.local

#disable regular resources, since we just defined our own custom ones

echo "Stopping hostapd"

sudo systemctl stop hostapd

echo "Stopping dnsmasq"

sudo systemctl stop dnsmasq

echo "Stopping dhcpcd"

sudo systemctl stop dhcpcd

echo "Disabling hostapd"

sudo systemctl disable hostapd

echo "Disabling dnsmasq"

sudo systemctl disable dnsmasq

echo "Disabling dhcpcd"

sudo systemctl disable dhcpcd

echo "-----Finished with Hotspot Setup-----"

echo "Now rebooting"

sudo reboot



echo "All Done"
