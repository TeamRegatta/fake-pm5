import { observable } from 'mobx'
import throttle from 'lodash.throttle'

export const NAME = '[service] PM5'
export default class PM5 {
  _subscriptions

  @observable
  state

  constructor({ monitor }) {
    this._subscriptions = []

    this.monitor = monitor
    this.monitor.autoReConnect = false
    this.monitor.logLevel = 3

    this.unsubLog = this.on('logEvent', (...data) =>
      console.info('[pm:logEvent]', ...data),
    )
  }

  on = (event, callback) => {
    this.monitor[event].sub(this, callback)
    return () => this.monitor[event].unsub(callback)
  }

  subscribeTo = (...list) => {
    const characteristics = list.reduce((result, Characteristic) => {
      const sub = new Characteristic({ pm: this })
      result[sub.name] = sub
      return result
    }, {})
    const instances = Object.values(characteristics)

    this._subscriptions.push(...instances)

    return (...args) => {
      const callback = typeof args[0] === 'function' ? args[0] : () => ({})
      const timer = typeof args[0] === 'number' ? args[0] : args[1]
      const next = callback ? throttle(callback, timer) : callback
      const unsubscribeOnUpdate = instances.map(sub =>
        sub.onUpdate(() => next(characteristics)),
      )

      // call immediately
      next(characteristics)

      return () => {
        while (instances.length) {
          instances.pop().unsubscribe()
          unsubscribeOnUpdate.pop()()
        }
      }
    }
  }

  pauseAllSubscriptions = () =>
    this._subscriptions.forEach(char => char.pause())

  resetAllSubscriptions = () =>
    this._subscriptions.forEach(char => char.clear())

  resumeAllSubscriptions = () =>
    this._subscriptions.forEach(char => char.resume())

  unsubscribeAll = () => this._subscriptions.forEach(char => char.unsubscribe())

  async connect(device) {
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error('DEVICE_OUT_OF_RANGE')),
        5000,
      )

      try {
        this.monitor.startScan(d => {
          if (!d) reject(d)

          if (d.name === device.name) {
            clearTimeout(timeout)

            const {
              address,
              firmwareRevision,
              hardwareRevision,
              manufacturer,
              name,
              quality,
              serial,
            } = d

            resolve({
              address,
              firmwareRevision,
              hardwareRevision,
              manufacturer,
              name,
              quality,
              serial,
              serviceUUIDs: device.serviceUUIDs || [],
            })

            return true
          }
        })
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }

  disconnect() {
    this.unsubLog()
    this.unsubscribeAll()
    this.monitor.disconnect()
  }

  csafeGetStatus = () => this.sendCsafe({ command: 0x80 })

  csafeReset = () => this.sendCsafe({ command: 0x81 })

  csafeGoIdle = () => this.sendCsafe({ command: 0x82 })

  csafeGoHaveId = () => this.sendCsafe({ command: 0x83 })

  csafeGoInUse = () => this.sendCsafe({ command: 0x85 })

  csafeGoFinished = () => this.sendCsafe({ command: 0x86 })

  csafeGoReady = () => this.sendCsafe({ command: 0x87 })

  sendCsafe = async ({ command }) =>
    new Promise((resolve, reject) => {
      let _resolved = false

      const _t = setTimeout(() => {
        if (_finished()) return
        reject(new Error("Didn't get any response after 2 secs"))
      }, 2000)

      const _disposeT = () => clearTimeout(_t)

      const _finished = () => {
        if (_resolved) return true
        _resolved = true
        _disposeT()
        return false
      }

      this.monitor.csafeBuffer
        .clear()
        .addRawCommand({
          command,
          waitForResponse: true,
          onDataReceived: data => {
            if (_finished()) return
            resolve(data && data.getUint8 ? data.getUint8(0) : data)
          },
          onError: err => {
            if (_finished()) return
            reject(err)
          },
        })
        .send()
    })
}
