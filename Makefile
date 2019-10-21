CXX = g++
CXXFLAGS = #C++ compiler flags

SENSOR_SRC_DIR := sensor/src
SENSOR_OBJ_DIR := sensor/obj
SENSOR_SRC_FILES := $(wildcard $(SENSOR_SRC_DIR)/*.cpp)
SENSOR_OBJ_FILES := $(patsubst $(SENSOR_SRC_DIR)/%.cpp,$(SENSOR_OBJ_DIR)/%.o,$(SENSOR_SRC_FILES))

all: hub sensor

$(SENSOR_OBJ_DIR)/%.o: $(SENSOR_SRC_DIR)/%.cpp
	$(CXX) $(CXXFLAGS) -c -o $@ $<

hub: 

sensor:

clean: clean_sensor clean_hub

clean_sensor:
	rm -f $(SENSOR_OBJ_DIR)/*.o 
