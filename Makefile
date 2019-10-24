#Useful sources:
# C++
# https://hiltmon.com/blog/2013/07/03/a-simple-c-plus-plus-project-structure/
# https://stackoverflow.com/questions/448910/what-is-the-difference-between-the-gnu-makefile-variable-assignments-a
# http://www.cs.colby.edu/maxwell/courses/tutorials/maketutor/
#
# Python
# https://blog.horejsek.com/makefile-with-python/
# https://krzysztofzuraw.com/blog/2016/makefiles-in-python-projects.html

CXX = g++
#CXXLIBDIR = .
#CXXFLAGS = -I$(LIBDIR) #C++ compiler flags

VENV_NAME?=venv
VENV_ACTIVATE=. $(VENV_NAME)/bin/activate
PYTHON=${VENV_NAME}/bin/python3

SENSOR_REPORT_DIR := sensor/reports
SENSOR_CPPCHECK_DIR := $(SENSOR_REPORT_DIR)/cppcheck
SENSOR_CPPCHECK_XML := $(SENSOR_CPPCHECK_DIR)/cppcheck_output.xml
SENSOR_CPPCHECK_HTML := $(SENSOR_CPPCHECK_DIR)/cppcheck_output.html
SENSOR_BIN_DIR := sensor/bin
SENSOR_SRC_DIR := sensor/src
SENSOR_OBJ_DIR := sensor/obj
SENSOR_SRC_FILES := $(wildcard $(SENSOR_SRC_DIR)/*.cpp )
SENSOR_OBJ_FILES := $(patsubst $(SENSOR_SRC_DIR)/%.cpp,$(SENSOR_OBJ_DIR)/%.o,$(SENSOR_SRC_FILES))
SENSOR_BIN_FILES := $(patsubst $(SENSOR_OBJ_DIR)/%.o,$(SENSOR_BIN_DIR)/%,$(SENSOR_OBJ_FILES))

#Specifies that those commands don't create files
.PHONY: clean clean_hub clean_sensor all sensor hub help flash_sensor sensor_cppcheck sensor_cppcheck_no_report

help:
	@echo "TODO list targets and what they do here"

all: hub sensor

$(SENSOR_OBJ_DIR)/%.o: $(SENSOR_SRC_DIR)/%.cpp
	$(CXX) $(CXXFLAGS) -c -o $@ $<

$(SENSOR_BIN_DIR)/%: $(SENSOR_OBJ_DIR)/%.o
	$(CXX) $(CXXFLAGS) -o $@ $^

flash_sensor:
	@echo "TODO Depends on having hardware."

sensor: $(SENSOR_BIN_FILES)

$(SENSOR_CPPCHECK_XML):
	mkdir $(SENSOR_REPORT_DIR)/cppcheck
	cppcheck $(SENSOR_SRC_DIR) --xml 2> $(SENSOR_CPPCHECK_XML)

$(SENSOR_CPPCHECK_HTML): $(SENSOR_CPPCHECK_XML)
	cppcheck-htmlreport --file=$< --report-dir=$(SENSOR_CPPCHECK_DIR)

sensor_cppcheck: $(SENSOR_CPPCHECK_HTML)
	@echo "cppcheck and cppcheck-htmlreport must be installed on your system and in your \$$PATH"

sensor_cppcheck_no_report:
	@echo "cppcheck must be installed on your system and in your \$$PATH"
	cppcheck $(SENSOR_SRC_DIR)

hub:
	@echo "TODO set up hub directory structure, and what commands need to be run to build it and start it"
	@echo "See the horejsek source in the Makefile for tips on using python in a Makefile"

clean: clean_sensor clean_hub

clean_sensor:
	rm -rf $(SENSOR_OBJ_DIR)/*.o 
	rm -rf $(SENSOR_BIN_DIR)/*
	rm -rf $(SENSOR_REPORT_DIR)/*

clean_hub:
	@echo "TODO, depends what files the hub code generates"
