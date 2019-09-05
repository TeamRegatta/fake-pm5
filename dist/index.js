"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BleDevice", {
  enumerable: true,
  get: function get() {
    return _bleDevice["default"];
  }
});
Object.defineProperty(exports, "PM5", {
  enumerable: true,
  get: function get() {
    return _pm["default"];
  }
});
Object.defineProperty(exports, "FakePerformanceMonitor", {
  enumerable: true,
  get: function get() {
    return _faker["default"];
  }
});
Object.defineProperty(exports, "EVENTS", {
  enumerable: true,
  get: function get() {
    return _characteristics.EVENTS;
  }
});
Object.defineProperty(exports, "AdditionalWorkoutSummaryDataEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.AdditionalWorkoutSummaryDataEvent;
  }
});
Object.defineProperty(exports, "AdditionalWorkoutSummaryData2Event", {
  enumerable: true,
  get: function get() {
    return _characteristics.AdditionalWorkoutSummaryData2Event;
  }
});
Object.defineProperty(exports, "ConnectionStateChangedEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.ConnectionStateChangedEvent;
  }
});
Object.defineProperty(exports, "HeartRateBeltInformationEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.HeartRateBeltInformationEvent;
  }
});
Object.defineProperty(exports, "PowerCurveEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.PowerCurveEvent;
  }
});
Object.defineProperty(exports, "RowingAdditionalSplitIntervalDataEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.RowingAdditionalSplitIntervalDataEvent;
  }
});
Object.defineProperty(exports, "RowingAdditionalStatus1Event", {
  enumerable: true,
  get: function get() {
    return _characteristics.RowingAdditionalStatus1Event;
  }
});
Object.defineProperty(exports, "RowingAdditionalStatus2Event", {
  enumerable: true,
  get: function get() {
    return _characteristics.RowingAdditionalStatus2Event;
  }
});
Object.defineProperty(exports, "RowingAdditionalStrokeDataEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.RowingAdditionalStrokeDataEvent;
  }
});
Object.defineProperty(exports, "RowingGeneralStatusEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.RowingGeneralStatusEvent;
  }
});
Object.defineProperty(exports, "RowingSplitIntervalDataEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.RowingSplitIntervalDataEvent;
  }
});
Object.defineProperty(exports, "RowingStrokeDataEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.RowingStrokeDataEvent;
  }
});
Object.defineProperty(exports, "WorkoutSummaryDataEvent", {
  enumerable: true,
  get: function get() {
    return _characteristics.WorkoutSummaryDataEvent;
  }
});
exports["default"] = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _createFakePM = _interopRequireDefault(require("./src/createFakePM5"));

var _bleDevice = _interopRequireDefault(require("./src/models/bleDevice"));

var _pm = _interopRequireDefault(require("./src/pm5"));

var _faker = _interopRequireWildcard(require("./src/pm5/faker"));

var _characteristics = require("./src/pm5/characteristics");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _createFakePM["default"];
exports["default"] = _default;