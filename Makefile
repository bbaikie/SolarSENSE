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
SENSOR_CPPCHECK_HTML := $(SENSOR_CPPCHECK_DIR)/index.html
SENSOR_CLANG_ANALYZER_DIR := $(SENSOR_REPORT_DIR)/clang_analyzer
SENSOR_CLANG_ANALYZER_HTML := $(SENSOR_CLANG_ANALYZER_DIR)/index.html
SENSOR_BIN_DIR := sensor/bin
SENSOR_SRC_DIR := sensor/src
SENSOR_OBJ_DIR := sensor/obj
SENSOR_SRC_FILES := $(wildcard $(SENSOR_SRC_DIR)/*.cpp )
SENSOR_OBJ_FILES := $(patsubst $(SENSOR_SRC_DIR)/%.cpp,$(SENSOR_OBJ_DIR)/%.o,$(SENSOR_SRC_FILES))
SENSOR_BIN_FILES := $(patsubst $(SENSOR_OBJ_DIR)/%.o,$(SENSOR_BIN_DIR)/%,$(SENSOR_OBJ_FILES))

HUB_SRC_DIR := hub/src

#Specifies that those commands don't create files
.PHONY: clean clean_hub clean_sensor all sensor hub help flash_sensor sensor_cppcheck sensor_cppcheck_no_report sensor_clang_analyzer check_sensor eslint prospector

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

check_sensor: sensor_clang_analyzer sensor_cppcheck

$(SENSOR_CPPCHECK_XML):
	mkdir -p $(SENSOR_CPPCHECK_DIR)
	cppcheck $(SENSOR_SRC_DIR) --xml 2> $(SENSOR_CPPCHECK_XML)

$(SENSOR_CPPCHECK_HTML): $(SENSOR_CPPCHECK_XML)
	cppcheck-htmlreport --file=$< --report-dir=$(SENSOR_CPPCHECK_DIR)

sensor_cppcheck: $(SENSOR_CPPCHECK_HTML)
	@echo "cppcheck and cppcheck-htmlreport must be installed on your system and in your \$$PATH"

sensor_cppcheck_no_report:
	@echo "cppcheck must be installed on your system and in your \$$PATH"
	cppcheck $(SENSOR_SRC_DIR)

$(SENSOR_CLANG_ANALYZER_HTML):
	mkdir -p $(SENSOR_CLANG_ANALYZER_DIR)
	scan-build -k -o $(SENSOR_CLANG_ANALYZER_DIR) make sensor

sensor_clang_analyzer: $(SENSOR_CLANG_ANALYZER_HTML)
	@echo "clang analyzer must be installed with scan-build in your \$$PATH"
	@echo "Apparently \"Windows users must have Perl installed\""
	@echo "check http://clang-analyzer.llvm.org/scan-build.html if you're having issues"

hub:
	@echo "TODO set up hub directory structure, and what commands need to be run to build it and start it"
	@echo "See the horejsek source in the Makefile for tips on using python in a Makefile"

clean: clean_sensor clean_hub

clean_sensor:
	rm -rf $(SENSOR_OBJ_DIR)/*.o 
	rm -rf $(SENSOR_BIN_DIR)/*
	rm -rf $(SENSOR_REPORT_DIR)

clean_hub:
	@echo "TODO, depends what files the hub code generates"

# esLint setup
BIN := ./node_modules/.bin
ESLINT ?= $(BIN)/eslint
ESLINTRC := .eslintrc

$(ESLINT):
	@echo "Requires Node.js >= 8.10, npm version 3+"
	npm install eslint --save-dev

$(ESLINTRC): $(ESLINT)
	$(ESLINT) --init

eslint: $(ESLINTRC)
	$(ESLINT) $(HUB_SRC_DIR)

prospector:
	@echo "python prospector (https://github.com/PyCQA/prospector) must be installed with prospector in your \$$PATH"
	prospector $(HUB_SRC_DIR)

//testing GitHub connection from terminal to GitHub 

//simple makefile tools

