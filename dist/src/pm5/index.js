"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NAME = void 0;

var _mobx = require("mobx");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _class, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var NAME = '[service] PM5';
exports.NAME = NAME;
var PM5 = (_class = (_temp =
/*#__PURE__*/
function () {
  function PM5(_ref) {
    var _this = this;

    var monitor = _ref.monitor;

    _classCallCheck(this, PM5);

    this._subscriptions = void 0;

    _initializerDefineProperty(this, "state", _descriptor, this);

    this.on = function (event, callback) {
      _this.monitor[event].sub(_this, callback);

      return function () {
        return _this.monitor[event].unsub(callback);
      };
    };

    this.subscribeTo = function () {
      var _this$_subscriptions;

      for (var _len = arguments.length, list = new Array(_len), _key = 0; _key < _len; _key++) {
        list[_key] = arguments[_key];
      }

      var characteristics = list.reduce(function (result, Characteristic) {
        var sub = new Characteristic({
          pm: _this
        });
        result[sub.name] = sub;
        return result;
      }, {});
      var instances = Object.values(characteristics);

      (_this$_subscriptions = _this._subscriptions).push.apply(_this$_subscriptions, _toConsumableArray(instances));

      return function () {
        var callback = typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'function' ? arguments.length <= 0 ? undefined : arguments[0] : function () {
          return {};
        };
        var timer = typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'number' ? arguments.length <= 0 ? undefined : arguments[0] : arguments.length <= 1 ? undefined : arguments[1];
        var next = callback ? (0, _lodash["default"])(callback, timer) : callback;
        var unsubscribeOnUpdate = instances.map(function (sub) {
          return sub.onUpdate(function () {
            return next(characteristics);
          });
        }); // call immediately

        next(characteristics);
        return function () {
          while (instances.length) {
            instances.pop().unsubscribe();
            unsubscribeOnUpdate.pop()();
          }
        };
      };
    };

    this.pauseAllSubscriptions = function () {
      return _this._subscriptions.forEach(function (_char) {
        return _char.pause();
      });
    };

    this.resetAllSubscriptions = function () {
      return _this._subscriptions.forEach(function (_char2) {
        return _char2.clear();
      });
    };

    this.resumeAllSubscriptions = function () {
      return _this._subscriptions.forEach(function (_char3) {
        return _char3.resume();
      });
    };

    this.unsubscribeAll = function () {
      return _this._subscriptions.forEach(function (_char4) {
        return _char4.unsubscribe();
      });
    };

    this.csafeGetStatus = function () {
      return _this.sendCsafe({
        command: 0x80
      });
    };

    this.csafeReset = function () {
      return _this.sendCsafe({
        command: 0x81
      });
    };

    this.csafeGoIdle = function () {
      return _this.sendCsafe({
        command: 0x82
      });
    };

    this.csafeGoHaveId = function () {
      return _this.sendCsafe({
        command: 0x83
      });
    };

    this.csafeGoInUse = function () {
      return _this.sendCsafe({
        command: 0x85
      });
    };

    this.csafeGoFinished = function () {
      return _this.sendCsafe({
        command: 0x86
      });
    };

    this.csafeGoReady = function () {
      return _this.sendCsafe({
        command: 0x87
      });
    };

    this.sendCsafe =
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2) {
        var command;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                command = _ref2.command;
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  var _resolved = false;

                  var _t = setTimeout(function () {
                    if (_finished()) return;
                    reject(new Error("Didn't get any response after 2 secs"));
                  }, 2000);

                  var _disposeT = function _disposeT() {
                    return clearTimeout(_t);
                  };

                  var _finished = function _finished() {
                    if (_resolved) return true;
                    _resolved = true;

                    _disposeT();

                    return false;
                  };

                  _this.monitor.csafeBuffer.clear().addRawCommand({
                    command: command,
                    waitForResponse: true,
                    onDataReceived: function onDataReceived(data) {
                      if (_finished()) return;
                      resolve(data && data.getUint8 ? data.getUint8(0) : data);
                    },
                    onError: function onError(err) {
                      if (_finished()) return;
                      reject(err);
                    }
                  }).send();
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    this._subscriptions = [];
    this.monitor = monitor;
    this.monitor.autoReConnect = false;
    this.monitor.logLevel = 3;
    this.unsubLog = this.on('logEvent', function () {
      var _console;

      for (var _len2 = arguments.length, data = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        data[_key2] = arguments[_key2];
      }

      return (_console = console).info.apply(_console, ['[pm:logEvent]'].concat(data));
    });
  }

  _createClass(PM5, [{
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(device) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(resolve, reject) {
                    var timeout;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            timeout = setTimeout(function () {
                              return reject(new Error('DEVICE_OUT_OF_RANGE'));
                            }, 5000);

                            try {
                              _this2.monitor.startScan(function (d) {
                                if (!d) reject(d);

                                if (d.name === device.name) {
                                  clearTimeout(timeout);
                                  var address = d.address,
                                      firmwareRevision = d.firmwareRevision,
                                      hardwareRevision = d.hardwareRevision,
                                      manufacturer = d.manufacturer,
                                      name = d.name,
                                      quality = d.quality,
                                      serial = d.serial;
                                  resolve({
                                    address: address,
                                    firmwareRevision: firmwareRevision,
                                    hardwareRevision: hardwareRevision,
                                    manufacturer: manufacturer,
                                    name: name,
                                    quality: quality,
                                    serial: serial,
                                    serviceUUIDs: device.serviceUUIDs || []
                                  });
                                  return true;
                                }
                              });
                            } catch (err) {
                              console.log(err);
                              reject(err);
                            }

                          case 2:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x3, _x4) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function connect(_x2) {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.unsubLog();
      this.unsubscribeAll();
      this.monitor.disconnect();
    }
  }]);

  return PM5;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "state", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class);
exports["default"] = PM5;