"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NAME = void 0;

var _mobx = require("mobx");

var _model = _interopRequireWildcard(require("./model"));

var _dec, _dec2, _class, _descriptor, _descriptor2, _descriptor3, _temp;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var NAME = '[service:pm5] ConnectionStateChanged';
exports.NAME = NAME;
var ConnectionStateChangedEvent = (_dec = (0, _mobx.action)("".concat(NAME, "#_setModel")), _dec2 = (0, _mobx.action)("".concat(NAME, "#_update")), (_class = (_temp =
/*#__PURE__*/
function (_Characteristic) {
  _inherits(ConnectionStateChangedEvent, _Characteristic);

  function ConnectionStateChangedEvent(data) {
    var _this;

    _classCallCheck(this, ConnectionStateChangedEvent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConnectionStateChangedEvent).call(this, _objectSpread({
      name: _model.EVENTS.onStateChange
    }, data)));

    _initializerDefineProperty(_this, "model", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_setModel", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "_update", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ConnectionStateChangedEvent, [{
    key: "isInactive",
    get: function get() {
      return this.model.value === 0;
    }
  }, {
    key: "isDeviceReady",
    get: function get() {
      return this.model.value === 1;
    }
  }, {
    key: "isScanning",
    get: function get() {
      return this.model.value === 2;
    }
  }, {
    key: "isConnecting",
    get: function get() {
      return this.model.value === 3;
    }
  }, {
    key: "isConnected",
    get: function get() {
      return this.model.value === 4;
    }
  }, {
    key: "areServicesFound",
    get: function get() {
      return this.model.value === 5;
    }
  }, {
    key: "isReadyForCommunication",
    get: function get() {
      return this.model.value === 6;
    }
  }]);

  return ConnectionStateChangedEvent;
}(_model["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "model", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_setModel", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (model) {
      _this2.model = model || {
        prev: null,
        value: 0
      };
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, "isInactive", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isInactive"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isDeviceReady", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isDeviceReady"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isScanning", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isScanning"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isConnecting", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isConnecting"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isConnected", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isConnected"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "areServicesFound", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "areServicesFound"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "isReadyForCommunication", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isReadyForCommunication"), _class.prototype), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "_update", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (prev, value) {
      _this3.model = {
        prev: prev,
        value: value
      };
    };
  }
})), _class));
exports["default"] = ConnectionStateChangedEvent;