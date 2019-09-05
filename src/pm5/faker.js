import isEqual from 'lodash.isequal'

import BleDevice from '@model/bleDevice'

import { EVENTS } from './characteristics'
import PM5 from './index'

let _device

const FAKE_DEVICE_MODEL = {
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
  mtu: 23,
}

const randomInt = (max = 9999, min = 1) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const createFakeSubscriber = (name, creator) => {
  let interval = null
  const subscribers = []
  const data = {}

  function sub(context, fn) {
    subscribers.push(fn)
    if (subscribers.length === 1) _start()
  }

  function unsub(fn) {
    const index = subscribers.indexOf(fn)
    if (index < 0) return
    subscribers.splice(index, 1)
    if (!subscribers.length) _end()
  }

  function change() {
    subscribers.forEach(fn => {
      const prev = data[name]
      const next = creator(prev)

      if (!isEqual(next, prev)) {
        data[name] = next

        if (name === EVENTS.onStateChange) {
          return fn(prev, next)
        }

        fn(next)
      }
    })
  }

  function _start() {
    interval = setInterval(change, 1000)
  }

  function _end() {
    clearInterval(interval)
    interval = null
  }

  return {
    sub,
    unsub,
    change,
  }
}

export default class PerformanceMonitor {
  connected = null

  constructor({ fakeDevice }) {
    this.fakeDevice = fakeDevice

    this.logEvent = createFakeSubscriber('logEvent', () => ({}))

    this[EVENTS.onStateChange] = createFakeSubscriber(
      EVENTS.onStateChange,
      (prevState => {
        let nextState = 3

        return () => {
          if (this.connected && prevState !== nextState && nextState < 6) {
            nextState += 1
          }

          return nextState
        }
      })(),
    )
    this[EVENTS.onRowingGeneralStatus] = createFakeSubscriber(
      EVENTS.onRowingGeneralStatus,
      (prevState => {
        const nextState = {
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
          dragFactor: 0,
        }

        return () => {
          nextState.distance += randomInt(4, 3)
          return { ...nextState }
        }
      })(),
    )
    this[EVENTS.onRowingAdditionalStatus] = createFakeSubscriber(
      EVENTS.onRowingAdditionalStatus,
      (prevState => {
        const nextState = {
          elapsedTime: 0, // mili seconds
          speed: 0, // m/s (checked the value but it can not be right, is the doc wrong? )
          strokeRate: 0,
          heartRate: 0, // bpm
          currentPace: 0, // 500m pace
          averagePace: 0, // 500m pace
          restDistance: 0,
          restTime: 0, // ms
          averagePower: null, // null when not multi plexed
        }

        return () => {
          nextState.elapsedTime += 1000
          nextState.currentPace = randomInt(210000, 180000)
          nextState.averagePace = randomInt(150000, 130000)
          nextState.strokeRate = randomInt(23, 20)
          nextState.heartRate = randomInt(80, 70)
          return { ...nextState }
        }
      })(),
    )
    this[EVENTS.onRowingAdditionalStatus2] = createFakeSubscriber(
      EVENTS.onRowingAdditionalStatus2,
      (prevState => {
        const nextState = {
          elapsedTime: 0, // mili seconds
          intervalCount: 0,
          averagePower: 0, // null when multiplexed
          totalCalories: 0,
          splitAveragePace: 0, // ms
          splitAveragePower: 0,
          splitAverageCalories: 0,
          lastSplitTime: 0,
          lastSplitDistance: 0,
        }

        return () => {
          nextState.averagePower = randomInt(180, 220)
          nextState.elapsedTime += 1000
          nextState.totalCalories += randomInt(1, 5)
          return { ...nextState }
        }
      })(),
    )
    this[EVENTS.onRowingStrokeData] = createFakeSubscriber(
      EVENTS.onRowingStrokeData,
      (prevState => {
        const nextState = {
          elapsedTime: 0, // mili seconds
          distance: 0, // meters
          driveLength: 0, // meters
          driveTime: 0,
          strokeRecoveryTime: 0,
          strokeDistance: 0,
          peakDriveForce: 0,
          averageDriveForce: 0,
          workPerStroke: 0, // null for multi plexed
          strokeCount: 0,
        }

        return () => {
          nextState.elapsedTime += 1000
          return { ...nextState }
        }
      })(),
    )
    this[EVENTS.onRowingAdditionalStrokeData] = createFakeSubscriber(
      EVENTS.onRowingAdditionalStrokeData,
      (prevState => {
        const nextState = {
          elapsedTime: 0, // mili seconds
          strokePower: 0, // watts
          strokeCalories: 0, // cal/hr
          strokeCount: 0,
          projectedWorkTime: 0, // ms
          projectedWorkDistance: 0, // meter
          workPerStroke: 0,
        }

        return () => {
          nextState.projectedWorkDistance = randomInt(4300, 4000)
          nextState.strokePower = randomInt(700, 680)
          nextState.strokeCalories = randomInt(10, 220)
          return { ...nextState }
        }
      })(),
    )
    this[EVENTS.onRowingSplitIntervalData] = createFakeSubscriber(
      EVENTS.onRowingSplitIntervalData,
      () => ({}),
    )
    this[EVENTS.onRowingAdditionalSplitIntervalData] = createFakeSubscriber(
      EVENTS.onRowingAdditionalSplitIntervalData,
      () => ({}),
    )
    this[EVENTS.onWorkoutSummaryData] = createFakeSubscriber(
      EVENTS.onWorkoutSummaryData,
      () => ({}),
    )
    this[EVENTS.onAdditionalWorkoutSummaryData] = createFakeSubscriber(
      EVENTS.onAdditionalWorkoutSummaryData,
      (prevState => {
        const nextState = {
          averageCalories: 300, // cal/hr
        }
        return () => {
          nextState.averageCalories = randomInt(100, 700)
          return { ...nextState }
        }
      })(),
    )
    this[EVENTS.onAdditionalWorkoutSummaryData2] = createFakeSubscriber(
      EVENTS.onAdditionalWorkoutSummaryData2,
      () => ({}),
    )
    this[EVENTS.onHeartRateBeltInformation] = createFakeSubscriber(
      EVENTS.onHeartRateBeltInformation,
      () => ({}),
    )
    this[EVENTS.onPowerCurve] = createFakeSubscriber(
      EVENTS.onPowerCurve,
      () => ({}),
    )

    this.csafeBuffer = {
      clear: () => ({
        addRawCommand: () => ({
          send: () => null,
        }),
      }),
    }
  }

  startScan(found) {
    const device = {
      address: this.fakeDevice.id,
      firmwareRevision: null,
      hardwareRevision: null,
      manufacturer: 'Concept2',
      name: this.fakeDevice.name,
      quality: 10,
      serial: this.fakeDevice.name.split(' ').pop(),
    }

    const isFound = found(device)
    if (isFound) this.connected = device
  }

  disconnect = () => {
    this.connected = null
  }
}

export function createFakePerformanceMonitor(opts) {
  return new PerformanceMonitor(opts)
}

export function createFakeBleDevice({ onConnectionChange }) {
  if (!_device) {
    _device = new BleDevice(FAKE_DEVICE_MODEL, {
      onConnectionChange,
      createMonitor: () => {
        const monitor = createFakePerformanceMonitor({
          fakeDevice: FAKE_DEVICE_MODEL,
        })

        return new PM5({ monitor })
      },
      monitorName: 'PM5 Faker',
    })
  }
  return _device
}
