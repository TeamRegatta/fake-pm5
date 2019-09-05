import 'core-js/stable'
import 'regenerator-runtime/runtime'

import createFakePM5 from './src/createFakePM5'
import BleDevice from './src/models/bleDevice'
import PM5 from './src/pm5'
import FakePerformanceMonitor, { createFakePerformanceMonitor } from './src/pm5/faker'
import {
  EVENTS,
  AdditionalWorkoutSummaryDataEvent,
  AdditionalWorkoutSummaryData2Event,
  ConnectionStateChangedEvent,
  HeartRateBeltInformationEvent,
  PowerCurveEvent,
  RowingAdditionalSplitIntervalDataEvent,
  RowingAdditionalStatus1Event,
  RowingAdditionalStatus2Event,
  RowingAdditionalStrokeDataEvent,
  RowingGeneralStatusEvent,
  RowingSplitIntervalDataEvent,
  RowingStrokeDataEvent,
  WorkoutSummaryDataEvent
} from './src/pm5/characteristics'

export default createFakePM5
export {
  EVENTS,
  PM5,
  BleDevice,
  FakePerformanceMonitor,
  AdditionalWorkoutSummaryDataEvent,
  AdditionalWorkoutSummaryData2Event,
  ConnectionStateChangedEvent,
  HeartRateBeltInformationEvent,
  PowerCurveEvent,
  RowingAdditionalSplitIntervalDataEvent,
  RowingAdditionalStatus1Event,
  RowingAdditionalStatus2Event,
  RowingAdditionalStrokeDataEvent,
  RowingGeneralStatusEvent,
  RowingSplitIntervalDataEvent,
  RowingStrokeDataEvent,
  WorkoutSummaryDataEvent
}
