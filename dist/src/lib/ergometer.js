"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateCalories = exports.calculateKilojoules = exports.calculateWatts = exports.formatValue = exports.checkWorkoutDurationType = exports.checkStrokeState = exports.checkRowingState = exports.checkWorkoutState = exports.checkWorkoutType = exports.checkIntervalType = exports.STROKE_STATE = exports.ROWING_STATE = exports.WORKOUT_STATE = exports.INTERVAL_TYPE = exports.WORKOUT_TYPE = exports.formatTime = void 0;

var formatTime = function formatTime() {
  var mili = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  if (mili < 0) mili = 0;
  var totalSecs = Math.floor(mili / 1000);
  var totalMins = Math.floor(totalSecs / 60);
  var totalHours = Math.floor(totalMins / 60);
  var secs = totalSecs % 60;
  var mins = totalMins % 60;
  var hours = totalHours;
  return {
    mili: mili,
    secs: secs,
    mins: mins,
    hours: hours
  };
};

exports.formatTime = formatTime;
var WORKOUT_TYPE = ['justRowNoSplits', 'justRowSplits', 'fixedDistanceNoAplits', 'fixedDistanceSplits', 'fixedTimeNoAplits', 'fixedTimeAplits', 'fixedTimeInterval', 'fixedDistanceInterval', 'variableInterval', 'variableUndefinedRestInterval', 'fixedCalorie', 'fixedWattMinutes'];
exports.WORKOUT_TYPE = WORKOUT_TYPE;
var INTERVAL_TYPE = ['time', 'dist', 'rest', 'timertUndefined', 'distanceRestUndefined', 'restUndefined', 'cal', 'calRestUndefined', 'wattMinute', 'wattMinuteRestUndefined', 'none'];
exports.INTERVAL_TYPE = INTERVAL_TYPE;
var WORKOUT_STATE = ['waitToBegin', 'workoutRow', 'countDownPause', 'intervalRest', 'intervalWorktime', 'intervalWorkDistance', 'intervalRestEndToWorkTime', 'intervalRestEndToWorkDistance', 'intervalWorktimeTorest', 'intervalWorkDistanceToEest', 'workoutEnd', 'terminate', 'workoutLogged', 'rearm'];
exports.WORKOUT_STATE = WORKOUT_STATE;
var ROWING_STATE = ['inactive', 'active'];
exports.ROWING_STATE = ROWING_STATE;
var STROKE_STATE = ['waitingForWheelToReachMinSpeedState', 'waitingForWheelToAccelerateState', 'drivingState', 'dwellingAfterDriveState', 'recoveryState'];
exports.STROKE_STATE = STROKE_STATE;

var checkValueType = function checkValueType(list, type, value) {
  if (!type) return value;
  var index = list.indexOf(type);
  return index === value;
};

var checkIntervalType = function checkIntervalType(type, value) {
  return checkValueType(INTERVAL_TYPE, type, value);
};

exports.checkIntervalType = checkIntervalType;

var checkWorkoutType = function checkWorkoutType(type, value) {
  return checkValueType(WORKOUT_TYPE, type, value);
};

exports.checkWorkoutType = checkWorkoutType;

var checkWorkoutState = function checkWorkoutState(type, value) {
  return checkValueType(WORKOUT_STATE, type, value);
};

exports.checkWorkoutState = checkWorkoutState;

var checkRowingState = function checkRowingState(type, value) {
  return checkValueType(ROWING_STATE, type, value);
};

exports.checkRowingState = checkRowingState;

var checkStrokeState = function checkStrokeState(type, value) {
  return checkValueType(STROKE_STATE, type, value);
};

exports.checkStrokeState = checkStrokeState;

var checkWorkoutDurationType = function checkWorkoutDurationType(type, value) {
  switch (type) {
    case 'timeDuration':
      return value === 0;

    case 'caloriesDuration':
      return value === 64;

    case 'distanceDuration':
      return value === 128;

    case 'wattsDuration':
      return value === 192;
  }
};

exports.checkWorkoutDurationType = checkWorkoutDurationType;

var formatValue = function formatValue(digit) {
  var pow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  digit = digit || 0;
  var str = digit.toFixed(0);
  if (digit >= Math.pow(10, pow)) return str;

  while (str.length < pow) {
    str = "0".concat(str);
  }

  return str;
};

exports.formatValue = formatValue;

var calculateWatts = function calculateWatts(mili) {
  if (!mili) return 0;
  var calculatedWatts = 2.8 / Math.pow(mili / 500000, 3);
  return Math.ceil(calculatedWatts);
};

exports.calculateWatts = calculateWatts;

var calculateKilojoules = function calculateKilojoules(watts, mili) {
  if (!watts || !mili) return 0;
  return watts * (mili / 1000) / 1000;
};

exports.calculateKilojoules = calculateKilojoules;

var calculateCalories = function calculateCalories(kj, mili) {
  if (!kj || !mili) return 0;
  var calories = (4 * kj + 0.35 * (mili / 1000)) / 4.184;
  return calories;
};

exports.calculateCalories = calculateCalories;