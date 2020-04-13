* OTA updates for sensor
    * ESP32 supports updating without reflashing the firmware, that might be worth setting up
* Settings page on hub to tell sensors how to behave
* Find some way to see stats on which sensors have connected and how long ago they connected
* Sensor could have an external button interrupt to wake it from deep sleep and force it to try to reconnect to the hub and send over data
* Nginx server has bug resulting in reset every 1 minute and 27 seconds
* Batch upload functionality needs to be redone. Currently cuts connection at over ~30 mb of data. Furthermore, there is currently no load bar for user feedback purposes.
    * Using Rabbit-mq and Celery might be a potential solution to allow for async uploading.
* Need to find a better algorithm with which to interpret sensor data and give video recommendations
* Testing infrastructure could be improved.
* Need to improve or redo styling for the website. 
* Add the navigation bar to the admin and bionet sites.
