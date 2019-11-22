#!/bin/bash

sudo apt install dnsmasq hostapd
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd
sudo cp ~/config/dhcpcd.conf /etc/dhcpcd.conf
sudo service dhcpcd restart
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
sudo cp ~/config/dnsmasq.conf /etc/dnsmasq.conf
sudo service dhcpcd restart
sudo systemctl start dnsmasq
sudo cp ~/config/hostapd.conf /etc/hostapd/hostapd.conf
sudo cp ~/config/hostapd /etc/default/hostapd
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd
sudo cp ~/config/sysctl.conf /etc/sysctl.conf
sudo iptables -t nat -A  POSTROUTING -o eth0 -j MASQUERADE
sudo sh -c "iptables-save > /etc/iptables.ipv4.nat"
sudo cp ~/config/rc.local /etc/rc.local
sudo reboot -h now
\n