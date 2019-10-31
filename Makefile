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
PYTHON = python3
#CXXLIBDIR = .
#CXXFLAGS = -I$(LIBDIR) #C++ compiler flags
CXXFLAGS = --coverage

SENSOR_REPORT_DIR := sensor/reports
SENSOR_GCOV_DIR := $(SENSOR_REPORT_DIR)/gcov
SENSOR_GCOV_COV_DIR := $(SENSOR_GCOV_DIR)/cov
SENSOR_GCOV_FILES := $(patsubst $(SENSOR_SRC_DIR)/%.cpp,$(SENSOR_GCOV_DIR)/%.gcov,$(SENSOR_SRC_FILES))
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
HUB_TEST_DIR := hub/src/test
HUB_REPORT_DIR := hub/reports
HUB_PYTEST_DIR := $(HUB_REPORT_DIR)/pytest

#Specifies that those commands don't create files
.PHONY: clean clean_hub clean_sensor all sensor hub help flash_sensor sensor_cppcheck sensor_cppcheck_no_report sensor_clang_analyzer check_sensor eslint prospector pip pip-prospector python npm cpplint pip-cpplint gcov

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

check_sensor: sensor_clang_analyzer sensor_cppcheck gcov

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

pip-cpplint: pip
	pip3 install cpplint

cpplint: pip-cpplint
	#may need to change output format
	cpplint --recursive $(SENSOR_SRC_DIR)

$(SENSOR_GCOV_DIR)/%.gcov: $(SENSOR_SRC_DIR)/%.cpp
	gcov -d -o $(SENSOR_OBJ_DIR) $<

gcov: $(SENSOR_GCOV_FILES)

hub:
	@echo "TODO set up hub directory structure, and what commands need to be run to build it and start it"
	@echo "See the horejsek source in the Makefile for tips on using python in a Makefile"

clean: clean_sensor clean_hub

clean_sensor:
	rm -rf $(SENSOR_OBJ_DIR)/*
	rm -rf $(SENSOR_BIN_DIR)/*
	rm -rf $(SENSOR_REPORT_DIR)

clean_hub:
	@echo "TODO, depends what files the hub code generates"

npm:
	apt install nodejs npm node-semver

# esLint setup
BIN := ./node_modules/.bin
ESLINT ?= $(BIN)/eslint
ESLINTRC := .eslintrc

$(ESLINT): npm
	npm install eslint --save-dev

$(ESLINTRC): $(ESLINT)
	$(ESLINT) --init

eslint: $(ESLINTRC)
	$(ESLINT) $(HUB_SRC_DIR)

#May need to change these depending on how raspberry pi deals with python 2 vs 3. I'm assuming we'll be using 3
python:
	apt install $(PYTHON) $(PYTHON)-pip

pip: python
	$(PYTHON) -m ensurepip --upgrade

pip-prospector: pip
	pip3 install prospector

pip-pytest: pip
	pip3 install -U pytest

prospector: pip-prospector
	prospector $(HUB_SRC_DIR)

#Reference for testing, https://docs.pytest.org/en/latest/getting-started.html
pytest: pip-pytest
	mkdir -p $(HUB_PYTEST_DIR)
	pytest --cov-report=html:$(HUB_PYTEST_DIR) --cov-branch $(HUB_TEST_DIR)
	