"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFakeDeviceModel = createFakeDeviceModel;
exports.createFakeBleDevice = createFakeBleDevice;
exports["default"] = createFakePM5;

var _bleDevice = _interopRequireDefault(require("./models/bleDevice"));

var _pm = _interopRequireDefault(require("./pm5"));

var _faker = _interopRequireWildcard(require("./pm5/faker"));

var _characteristics = require("./pm5/characteristics");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULT_CHARACTERISTICS_MAP = {
  RowingAdditionalStatus1Event: _characteristics.RowingAdditionalStatus1Event,
  RowingGeneralStatusEvent: _characteristics.RowingGeneralStatusEvent
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createFakeDeviceModel() {
  var id = randomIntFromInterval(1000, 9999);
  var name = "PM5 00000".concat(id);
  return {
    id: "00000000-".concat(id, "-0000-0000-000000000000"),
    manufacturerData: null,
    isConnectable: true,
    serviceData: null,
    localName: name,
    solicitedServiceUUIDs: null,
    overflowServiceUUIDs: null,
    serviceUUIDs: null,
    rssi: -44,
    txPowerLevel: 4,
    name: name,
    mtu: 23
  };
}

function createFakeBleDevice(_ref) {
  var onConnectionChange = _ref.onConnectionChange;
  var model = createFakeDeviceModel();
  var device = new _bleDevice["default"](model, {
    onConnectionChange: onConnectionChange,
    createMonitor: function createMonitor() {
      var monitor = (0, _faker.createFakePerformanceMonitor)({
        fakeDevice: model
      });
      return new _pm["default"]({
        monitor: monitor
      });
    },
    monitorName: 'PM5 Faker'
  });
  return device;
}

function createFakePM5() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onConnectionChange = opts.onConnectionChange,
      _opts$charsMap = opts.charsMap,
      charsMap = _opts$charsMap === void 0 ? DEFAULT_CHARACTERISTICS_MAP : _opts$charsMap;
  var device = createFakeBleDevice({
    onConnectionChange: onConnectionChange
  });
  var characteristics = Object.values(charsMap);

  function connect() {
    return device.connect();
  }

  function disconnect() {
    return device.disconnect();
  }

  function pause() {
    device.pause();
  }

  function start() {
    device.resume();
  }

  function stop() {
    device.pause();
    device.reset();
  }

  function tick(fn) {
    return device.subscribeToCharacteristics(characteristics, fn);
  }

  return {
    device: device,
    connect: connect,
    disconnect: disconnect,
    pause: pause,
    start: start,
    stop: stop,
    tick: tick
  };
}