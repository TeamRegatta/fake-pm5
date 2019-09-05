"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mobx = require("mobx");

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var NAME = '[model] BleDevice';
var BleDevice = (_dec = (0, _mobx.action)("".concat(NAME, "#_setLog")), _dec2 = (0, _mobx.action)("".concat(NAME, "#connect")), _dec3 = (0, _mobx.action)("".concat(NAME, "#disconnect")), _dec4 = (0, _mobx.action)("".concat(NAME, "#setState")), _dec5 = (0, _mobx.action)("".concat(NAME, "#update")), (_class = (_temp =
/*#__PURE__*/
function () {
  function BleDevice() {
    var _this = this;

    var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var monitorOpts = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, BleDevice);

    this._createMonitor = void 0;
    this._monitorName = void 0;
    this.monitor = void 0;

    _initializerDefineProperty(this, "log", _descriptor, this);

    _initializerDefineProperty(this, "model", _descriptor2, this);

    _initializerDefineProperty(this, "state", _descriptor3, this);

    this.getStatus =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.monitor) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              _context.next = 5;
              return _this.monitor.csafeGetStatus();

            case 5:
              data = _context.sent;

              _this._setSucceedLog('getStatus', data);

              return _context.abrupt("return", data);

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);

              _this._setErrorLog('getStatus', _context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 10]]);
    }));

    this.go =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(status) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this.monitor) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                _context2.prev = 2;
                _context2.t0 = status;
                _context2.next = _context2.t0 === 'idle' ? 6 : _context2.t0 === 'haveId' ? 10 : _context2.t0 === 'inUse' ? 14 : _context2.t0 === 'finished' ? 18 : _context2.t0 === 'ready' ? 22 : 26;
                break;

              case 6:
                _context2.next = 8;
                return _this.monitor.csafeGoIdle();

              case 8:
                data = _context2.sent;
                return _context2.abrupt("break", 27);

              case 10:
                _context2.next = 12;
                return _this.monitor.csafeGoHaveId();

              case 12:
                data = _context2.sent;
                return _context2.abrupt("break", 27);

              case 14:
                _context2.next = 16;
                return _this.monitor.csafeGoInUse();

              case 16:
                data = _context2.sent;
                return _context2.abrupt("break", 27);

              case 18:
                _context2.next = 20;
                return _this.monitor.csafeGoFinished();

              case 20:
                data = _context2.sent;
                return _context2.abrupt("break", 27);

              case 22:
                _context2.next = 24;
                return _this.monitor.csafeGoReady();

              case 24:
                data = _context2.sent;
                return _context2.abrupt("break", 27);

              case 26:
                throw new Error('Invalid status');

              case 27:
                _this._setSucceedLog(status, data);

                return _context2.abrupt("return", data);

              case 31:
                _context2.prev = 31;
                _context2.t1 = _context2["catch"](2);

                _this._setErrorLog(status, _context2.t1);

              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 31]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    this.pause = function () {
      if (!_this.monitor) return;

      _this.monitor.pauseAllSubscriptions();
    };

    this.reset =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var data;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (_this.monitor) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return");

            case 2:
              _context3.prev = 2;
              _context3.next = 5;
              return _this.monitor.csafeReset();

            case 5:
              data = _context3.sent;

              _this._setSucceedLog('reset', data);

              return _context3.abrupt("return", data);

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](2);

              _this._setErrorLog('reset', _context3.t0);

            case 13:
              _context3.prev = 13;

              _this.monitor.resetAllSubscriptions();

              return _context3.finish(13);

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 10, 13, 16]]);
    }));

    this.resume = function () {
      if (!_this.monitor) return;

      _this.monitor.resumeAllSubscriptions();
    };

    this._setErrorLog = function (task, error) {
      return _this._setLog({
        task: task,
        status: 'error',
        data: error.message
      });
    };

    this._setSucceedLog = function (task, data) {
      return _this._setLog({
        task: task,
        status: 'succeed',
        data: JSON.stringify(data, undefined, 2)
      });
    };

    _initializerDefineProperty(this, "connect", _descriptor4, this);

    _initializerDefineProperty(this, "disconnect", _descriptor5, this);

    _initializerDefineProperty(this, "setState", _descriptor6, this);

    _initializerDefineProperty(this, "update", _descriptor7, this);

    this._handleDisconnect = function () {};

    var createMonitor = monitorOpts.createMonitor,
        monitorName = monitorOpts.monitorName,
        onConnectionChange = monitorOpts.onConnectionChange;
    this._createMonitor = createMonitor;
    this._monitorName = monitorName;

    this._onConnectionChange = function (connected) {
      return onConnectionChange && onConnectionChange({
        device: _this,
        connected: connected
      });
    };

    this.log = [];
    this.model = model;
    this.monitor = null;
    this.state = BleDevice.getInitialState();
  }

  _createClass(BleDevice, [{
    key: "_setLog",
    value: function _setLog(log) {
      console.warn("".concat(log.status.toUpperCase(), ": ").concat(log.data));
      this.log.unshift(log);
    }
  }, {
    key: "subscribeToCharacteristics",
    value: function subscribeToCharacteristics(list, fn) {
      var _this$monitor;

      if (!this.monitor) throw new Error('No PM created');
      if (!list || !list.length) throw new Error('Characteristics are required');
      return (_this$monitor = this.monitor).subscribeTo.apply(_this$monitor, _toConsumableArray(list))(fn, 200);
    }
  }, {
    key: "monitorName",
    get: function get() {
      return this._monitorName;
    }
  }, {
    key: "id",
    get: function get() {
      return this.model.id;
    }
  }, {
    key: "isConnected",
    get: function get() {
      return this.state.connected === true;
    }
  }, {
    key: "isError",
    get: function get() {
      return !!this.state.error;
    }
  }, {
    key: "isOutOfRange",
    get: function get() {
      return this.state.outOfRange === true;
    }
  }, {
    key: "isPairing",
    get: function get() {
      return this.state.pairing === true;
    }
  }, {
    key: "name",
    get: function get() {
      return this.model.name;
    }
  }], [{
    key: "getInitialState",
    value: function getInitialState() {
      return {
        connected: false,
        error: null,
        outOfRange: false,
        pairing: false
      };
    }
  }]);

  return BleDevice;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "log", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "model", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "state", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, "_setLog", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "_setLog"), _class.prototype), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "connect", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return (
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var monitor, sub;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _this2.setState({
                  pairing: true
                });

                _context4.prev = 1;

                if (!_this2.monitor) {
                  _context4.next = 5;
                  break;
                }

                _context4.next = 5;
                return _this2.disconnect();

              case 5:
                monitor = _this2._createMonitor();
                _context4.next = 8;
                return monitor.connect(_this2);

              case 8:
                _this2.monitor = monitor;

                if (_this2.model && _this2.model.onDisconnected) {
                  sub = _this2.model.onDisconnected(function () {
                    sub.remove();

                    if (_this2.monitor) {
                      _this2.monitor.disconnect();

                      _this2.monitor = null;
                    }

                    _this2.setState(_objectSpread({}, BleDevice.getInitialState(), {
                      outOfRange: true
                    }));

                    _this2._onConnectionChange(false);
                  });
                }

                _this2.setState({
                  connected: true,
                  error: null,
                  pairing: false
                });

                _this2._onConnectionChange(true);

                return _context4.abrupt("return", _this2.model);

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](1);

                _this2.setState({
                  error: _context4.t0.message,
                  pairing: false
                });

                throw _context4.t0;

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 15]]);
      }))
    );
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "disconnect", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return (
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _this3.monitor.disconnect();

              case 3:
                return _context5.abrupt("return", _this3.model);

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5["catch"](0);
                console.warn(_context5.t0.message);

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 6]]);
      }))
    );
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "setState", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return Object.assign(_this4.state, newState);
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "update", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (newModel) {
      _this5.model = newModel;
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, "id", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "id"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isConnected", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isConnected"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isError", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isError"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isOutOfRange", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isOutOfRange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isPairing", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isPairing"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "name", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "name"), _class.prototype)), _class));
exports["default"] = BleDevice;