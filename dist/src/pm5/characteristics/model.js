"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NAME = exports.EVENTS = void 0;

var _mobx = require("mobx");

var _fbemitter = require("fbemitter");

var _dec, _dec2, _dec3, _dec4, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var EVENTS = {
  onStateChange: 'connectionStateChangedEvent',
  onRowingGeneralStatus: 'rowingGeneralStatusEvent',
  onRowingAdditionalStatus: 'rowingAdditionalStatus1Event',
  onRowingAdditionalStatus2: 'rowingAdditionalStatus2Event',
  onRowingStrokeData: 'rowingStrokeDataEvent',
  onRowingAdditionalStrokeData: 'rowingAdditionalStrokeDataEvent',
  onRowingSplitIntervalData: 'rowingSplitIntervalDataEvent',
  onRowingAdditionalSplitIntervalData: 'rowingAdditionalSplitIntervalDataEvent',
  onWorkoutSummaryData: 'workoutSummaryDataEvent',
  onAdditionalWorkoutSummaryData: 'additionalWorkoutSummaryDataEvent',
  onAdditionalWorkoutSummaryData2: 'additionalWorkoutSummaryData2Event',
  onHeartRateBeltInformation: 'heartRateBeltInformationEvent',
  onPowerCurve: 'powerCurveEvent'
};
exports.EVENTS = EVENTS;

var _emitter = new _fbemitter.EventEmitter();

var NAME = '[pm5] Characteristic';
exports.NAME = NAME;
var Characteristic = (_dec = (0, _mobx.action)("".concat(NAME, "#pause")), _dec2 = (0, _mobx.action)("".concat(NAME, "#pause")), _dec3 = (0, _mobx.action)("".concat(NAME, "#_setModel")), _dec4 = (0, _mobx.action)("".concat(NAME, "#_update")), (_class = (_temp =
/*#__PURE__*/
function () {
  function Characteristic(_ref) {
    var _this = this;

    var _ref$model = _ref.model,
        model = _ref$model === void 0 ? {} : _ref$model,
        name = _ref.name,
        pm = _ref.pm,
        recalculate = _ref.recalculate;

    _classCallCheck(this, Characteristic);

    this._currModel = null;
    this._prevModel = null;

    _initializerDefineProperty(this, "_paused", _descriptor, this);

    _initializerDefineProperty(this, "model", _descriptor2, this);

    this.name = null;
    this.pm = null;

    this.clear = function () {
      _this._currModel = null;
      _this._prevModel = null;

      _this._setModel();
    };

    this.onUpdate = function (fn) {
      var subs = _emitter.addListener(_this.name, fn);

      return function () {
        return subs.remove();
      };
    };

    _initializerDefineProperty(this, "pause", _descriptor3, this);

    _initializerDefineProperty(this, "resume", _descriptor4, this);

    this.unsubscribe = function () {
      return console.warn('unsubscribe not implemented yet!');
    };

    _initializerDefineProperty(this, "_setModel", _descriptor5, this);

    _initializerDefineProperty(this, "_update", _descriptor6, this);

    this.name = name;
    this.pm = pm;
    this.recalculate = recalculate;
    this.unsubscribe = pm.on(name, this._update);

    this._setModel(model);
  }

  _createClass(Characteristic, [{
    key: "isPaused",
    get: function get() {
      return this._paused === true;
    }
  }]);

  return Characteristic;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "_paused", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "model", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "pause", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function () {
      _this2._paused = true;
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "resume", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      _this3._paused = false;
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "_setModel", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (model) {
      _this4.model = model || {};
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "_update", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (model) {
      if (_this5.isPaused) return;
      _this5._prevModel = _this5._currModel;
      _this5._currModel = model;
      if (!_this5._currModel || !_this5._prevModel) return;

      if (_this5.recalculate) {
        _this5.model = Object.keys(model).reduce(function (result, key) {
          if (_this5.recalculate[key]) {
            result[key] = recalculateCurrent(_this5.model[key], _this5._currModel[key], _this5._prevModel[key]);
          } else {
            result[key] = model[key];
          }

          return result;
        }, {});
      } else {
        _this5.model = model;
      }

      _emitter.emit(_this5.name, _this5._prevModel, _this5._currModel);

      return _this5.model;
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, "isPaused", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "isPaused"), _class.prototype)), _class));
exports["default"] = Characteristic;

function recalculateCurrent() {
  var curr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var next = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var prev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return curr + (next - prev);
}