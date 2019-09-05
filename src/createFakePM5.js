import BleDevice from './models/bleDevice'
import PM5 from './pm5'
import FakePerformanceMonitor, { createFakePerformanceMonitor } from './pm5/faker'
import {
  RowingAdditionalStatus1Event,
  RowingGeneralStatusEvent
} from './pm5/characteristics'

const DEFAULT_CHARACTERISTICS_MAP = {
  RowingAdditionalStatus1Event,
  RowingGeneralStatusEvent
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function createFakeDeviceModel() {
  const id = randomIntFromInterval(1000, 9999)
  const name = `PM5 00000${id}`

  return {
    id: `00000000-${id}-0000-0000-000000000000`,
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
    mtu: 23,
  }
}

export function createFakeBleDevice({ onConnectionChange }) {
  const model = createFakeDeviceModel()
  const device = new BleDevice(model, {
    onConnectionChange,
    createMonitor: () => {
      const monitor = createFakePerformanceMonitor({ fakeDevice: model })
      return new PM5({ monitor })
    },
    monitorName: 'PM5 Faker',
  })

  return device
}

export default function createFakePM5(opts = {}) {
  const {
    onConnectionChange,
    charsMap = DEFAULT_CHARACTERISTICS_MAP,
  } = opts

  const device = createFakeBleDevice({ onConnectionChange })
  const characteristics = Object.values(charsMap)

  function connect() {
    return device.connect()
  }

  function disconnect() {
    return device.disconnect()
  }

  function pause() {
    device.pause()
  }

  function start() {
    device.resume()
  }

  function stop() {
    device.pause()
    device.reset()
  }

  function tick(fn) {
    return device.subscribeToCharacteristics(characteristics, fn)
  }

  return {
    device,
    connect,
    disconnect,
    pause,
    start,
    stop,
    tick
  }
}
