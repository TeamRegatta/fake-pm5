"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFakePerformanceMonitor = createFakePerformanceMonitor;
exports.createFakeBleDevice = createFakeBleDevice;
exports["default"] = void 0;

var _lodash = _interopRequireDefault(require("lodash.isequal"));

var _bleDevice = _interopRequireDefault(require("../models/bleDevice"));

var _characteristics = require("./characteristics");

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _device;

var FAKE_DEVICE_MODEL = {
  id: '00000000-0000-0000-0000-000000000000',
  manufacturerData: null,
  isConnectable: true,
  serviceData: null,
  localName: 'PM5 000000000',
  solicitedServiceUUIDs: null,
  overflowServiceUUIDs: null,
  serviceUUIDs: null,
  rssi: -44,
  txPowerLevel: 4,
  name: 'PM5 000000000',
  mtu: 23
};

var randomInt = function randomInt() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9999;
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var createFakeSubscriber = function createFakeSubscriber(name, creator) {
  var interval = null;
  var subscribers = [];
  var data = {};

  function sub(context, fn) {
    subscribers.push(fn);
    if (subscribers.length === 1) _start();
  }

  function unsub(fn) {
    var index = subscribers.indexOf(fn);
    if (index < 0) return;
    subscribers.splice(index, 1);
    if (!subscribers.length) _end();
  }

  function change() {
    subscribers.forEach(function (fn) {
      var prev = data[name];
      var next = creator(prev);

      if (!(0, _lodash["default"])(next, prev)) {
        data[name] = next;

        if (name === _characteristics.EVENTS.onStateChange) {
          return fn(prev, next);
        }

        fn(next);
      }
    });
  }

  function _start() {
    interval = setInterval(change, 1000);
  }

  function _end() {
    clearInterval(interval);
    interval = null;
  }

  return {
    sub: sub,
    unsub: unsub,
    change: change
  };
};

var PerformanceMonitor =
/*#__PURE__*/
function () {
  function PerformanceMonitor(_ref) {
    var _this = this;

    var fakeDevice = _ref.fakeDevice;

    _classCallCheck(this, PerformanceMonitor);

    this.connected = null;

    this.disconnect = function () {
      _this.connected = null;
    };

    this.fakeDevice = fakeDevice;
    this.logEvent = createFakeSubscriber('logEvent', function () {
      return {};
    });
    this[_characteristics.EVENTS.onStateChange] = createFakeSubscriber(_characteristics.EVENTS.onStateChange, function (prevState) {
      var nextState = 3;
      return function () {
        if (_this.connected && prevState !== nextState && nextState < 6) {
          nextState += 1;
        }

        return nextState;
      };
    }());
    this[_characteristics.EVENTS.onRowingGeneralStatus] = createFakeSubscriber(_characteristics.EVENTS.onRowingGeneralStatus, function (prevState) {
      var nextState = {
        elapsedTime: 0,
        distance: 0,
        workoutType: 0,
        intervalType: 0,
        workoutState: 0,
        rowingState: 0,
        strokeState: 0,
        totalWorkDistance: 0,
        workoutDuration: 0,
        workoutDurationType: 0,
        dragFactor: 0
      };
      return function () {
        nextState.distance += randomInt(4, 3);
        return _objectSpread({}, nextState);
      };
    }());
    this[_characteristics.EVENTS.onRowingAdditionalStatus] = createFakeSubscriber(_characteristics.EVENTS.onRowingAdditionalStatus, function (prevState) {
      var nextState = {
        elapsedTime: 0,
        // mili seconds
        speed: 0,
        // m/s (checked the value but it can not be right, is the doc wrong? )
        strokeRate: 0,
        heartRate: 0,
        // bpm
        currentPace: 0,
        // 500m pace
        averagePace: 0,
        // 500m pace
        restDistance: 0,
        restTime: 0,
        // ms
        averagePower: null // null when not multi plexed

      };
      return function () {
        nextState.elapsedTime += 1000;
        nextState.currentPace = randomInt(210000, 180000);
        nextState.averagePace = randomInt(150000, 130000);
        nextState.strokeRate = randomInt(23, 20);
        nextState.heartRate = randomInt(80, 70);
        return _objectSpread({}, nextState);
      };
    }());
    this[_characteristics.EVENTS.onRowingAdditionalStatus2] = createFakeSubscriber(_characteristics.EVENTS.onRowingAdditionalStatus2, function (prevState) {
      var nextState = {
        elapsedTime: 0,
        // mili seconds
        intervalCount: 0,
        averagePower: 0,
        // null when multiplexed
        totalCalories: 0,
        splitAveragePace: 0,
        // ms
        splitAveragePower: 0,
        splitAverageCalories: 0,
        lastSplitTime: 0,
        lastSplitDistance: 0
      };
      return function () {
        nextState.averagePower = randomInt(180, 220);
        nextState.elapsedTime += 1000;
        nextState.totalCalories += randomInt(1, 5);
        return _objectSpread({}, nextState);
      };
    }());
    this[_characteristics.EVENTS.onRowingStrokeData] = createFakeSubscriber(_characteristics.EVENTS.onRowingStrokeData, function (prevState) {
      var nextState = {
        elapsedTime: 0,
        // mili seconds
        distance: 0,
        // meters
        driveLength: 0,
        // meters
        driveTime: 0,
        strokeRecoveryTime: 0,
        strokeDistance: 0,
        peakDriveForce: 0,
        averageDriveForce: 0,
        workPerStroke: 0,
        // null for multi plexed
        strokeCount: 0
      };
      return function () {
        nextState.elapsedTime += 1000;
        return _objectSpread({}, nextState);
      };
    }());
    this[_characteristics.EVENTS.onRowingAdditionalStrokeData] = createFakeSubscriber(_characteristics.EVENTS.onRowingAdditionalStrokeData, function (prevState) {
      var nextState = {
        elapsedTime: 0,
        // mili seconds
        strokePower: 0,
        // watts
        strokeCalories: 0,
        // cal/hr
        strokeCount: 0,
        projectedWorkTime: 0,
        // ms
        projectedWorkDistance: 0,
        // meter
        workPerStroke: 0
      };
      return function () {
        nextState.projectedWorkDistance = randomInt(4300, 4000);
        nextState.strokePower = randomInt(700, 680);
        nextState.strokeCalories = randomInt(10, 220);
        return _objectSpread({}, nextState);
      };
    }());
    this[_characteristics.EVENTS.onRowingSplitIntervalData] = createFakeSubscriber(_characteristics.EVENTS.onRowingSplitIntervalData, function () {
      return {};
    });
    this[_characteristics.EVENTS.onRowingAdditionalSplitIntervalData] = createFakeSubscriber(_characteristics.EVENTS.onRowingAdditionalSplitIntervalData, function () {
      return {};
    });
    this[_characteristics.EVENTS.onWorkoutSummaryData] = createFakeSubscriber(_characteristics.EVENTS.onWorkoutSummaryData, function () {
      return {};
    });
    this[_characteristics.EVENTS.onAdditionalWorkoutSummaryData] = createFakeSubscriber(_characteristics.EVENTS.onAdditionalWorkoutSummaryData, function (prevState) {
      var nextState = {
        averageCalories: 300 // cal/hr

      };
      return function () {
        nextState.averageCalories = randomInt(100, 700);
        return _objectSpread({}, nextState);
      };
    }());
    this[_characteristics.EVENTS.onAdditionalWorkoutSummaryData2] = createFakeSubscriber(_characteristics.EVENTS.onAdditionalWorkoutSummaryData2, function () {
      return {};
    });
    this[_characteristics.EVENTS.onHeartRateBeltInformation] = createFakeSubscriber(_characteristics.EVENTS.onHeartRateBeltInformation, function () {
      return {};
    });
    this[_characteristics.EVENTS.onPowerCurve] = createFakeSubscriber(_characteristics.EVENTS.onPowerCurve, function () {
      return {};
    });
    this.csafeBuffer = {
      clear: function clear() {
        return {
          addRawCommand: function addRawCommand() {
            return {
              send: function send() {
                return null;
              }
            };
          }
        };
      }
    };
  }

  _createClass(PerformanceMonitor, [{
    key: "startScan",
    value: function startScan(found) {
      var device = {
        address: this.fakeDevice.id,
        firmwareRevision: null,
        hardwareRevision: null,
        manufacturer: 'Concept2',
        name: this.fakeDevice.name,
        quality: 10,
        serial: this.fakeDevice.name.split(' ').pop()
      };
      var isFound = found(device);
      if (isFound) this.connected = device;
    }
  }]);

  return PerformanceMonitor;
}();

exports["default"] = PerformanceMonitor;

function createFakePerformanceMonitor(opts) {
  return new PerformanceMonitor(opts);
}

function createFakeBleDevice(_ref2) {
  var onConnectionChange = _ref2.onConnectionChange;

  if (!_device) {
    _device = new _bleDevice["default"](FAKE_DEVICE_MODEL, {
      onConnectionChange: onConnectionChange,
      createMonitor: function createMonitor() {
        var monitor = createFakePerformanceMonitor({
          fakeDevice: FAKE_DEVICE_MODEL
        });
        return new _index["default"]({
          monitor: monitor
        });
      },
      monitorName: 'PM5 Faker'
    });
  }

  return _device;
}