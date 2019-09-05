import { action, observable, computed } from 'mobx'

const NAME = '[model] BleDevice'
export default class BleDevice {
  _createMonitor
  _monitorName

  monitor

  @observable
  log

  @observable
  model

  @observable
  state

  constructor(model = {}, monitorOpts) {
    const { createMonitor, monitorName, onConnectionChange } = monitorOpts

    this._createMonitor = createMonitor
    this._monitorName = monitorName
    this._onConnectionChange = connected =>
      onConnectionChange && onConnectionChange({ device: this, connected })

    this.log = []
    this.model = model
    this.monitor = null
    this.state = BleDevice.getInitialState()
  }

  getStatus = async () => {
    if (!this.monitor) return

    try {
      const data = await this.monitor.csafeGetStatus()
      this._setSucceedLog('getStatus', data)
      return data
    } catch (err) {
      this._setErrorLog('getStatus', err)
    }
  }

  go = async status => {
    if (!this.monitor) return

    try {
      let data

      switch (status) {
        case 'idle':
          data = await this.monitor.csafeGoIdle()
          break

        case 'haveId':
          data = await this.monitor.csafeGoHaveId()
          break

        case 'inUse':
          data = await this.monitor.csafeGoInUse()
          break

        case 'finished':
          data = await this.monitor.csafeGoFinished()
          break

        case 'ready':
          data = await this.monitor.csafeGoReady()
          break

        default:
          throw new Error('Invalid status')
      }
      this._setSucceedLog(status, data)
      return data
    } catch (err) {
      this._setErrorLog(status, err)
    }
  }

  pause = () => {
    if (!this.monitor) return
    this.monitor.pauseAllSubscriptions()
  }

  reset = async () => {
    if (!this.monitor) return

    try {
      const data = await this.monitor.csafeReset()
      this._setSucceedLog('reset', data)
      return data
    } catch (err) {
      this._setErrorLog('reset', err)
    } finally {
      this.monitor.resetAllSubscriptions()
    }
  }

  resume = () => {
    if (!this.monitor) return
    this.monitor.resumeAllSubscriptions()
  }

  _setErrorLog = (task, error) =>
    this._setLog({
      task,
      status: 'error',
      data: error.message,
    })

  _setSucceedLog = (task, data) =>
    this._setLog({
      task,
      status: 'succeed',
      data: JSON.stringify(data, undefined, 2),
    })

  @action(`${NAME}#_setLog`)
  _setLog(log) {
    console.warn(`${log.status.toUpperCase()}: ${log.data}`)
    this.log.unshift(log)
  }

  subscribeToCharacteristics(list, fn) {
    if (!this.monitor) throw new Error('No PM created')
    if (!list || !list.length) throw new Error('Characteristics are required')
    return this.monitor.subscribeTo(...list)(fn, 200)
  }

  @action(`${NAME}#connect`)
  connect = async () => {
    this.setState({ pairing: true })

    try {
      if (this.monitor) await this.disconnect()

      const monitor = this._createMonitor()
      await monitor.connect(this)
      this.monitor = monitor

      if (this.model && this.model.onDisconnected) {
        const sub = this.model.onDisconnected(() => {
          sub.remove()
          if (this.monitor) {
            this.monitor.disconnect()
            this.monitor = null
          }
          this.setState({ ...BleDevice.getInitialState(), outOfRange: true })
          this._onConnectionChange(false)
        })
      }
      this.setState({ connected: true, error: null, pairing: false })
      this._onConnectionChange(true)

      return this.model
    } catch (error) {
      this.setState({ error: error.message, pairing: false })
      throw error
    }
  }

  @action(`${NAME}#disconnect`)
  disconnect = async () => {
    try {
      await this.monitor.disconnect()
      return this.model
    } catch (err) {
      console.warn(err.message)
    }
  }

  @action(`${NAME}#setState`)
  setState = (newState = {}) => Object.assign(this.state, newState)

  @action(`${NAME}#update`)
  update = newModel => {
    this.model = newModel
  }

  _handleDisconnect = () => {}

  get monitorName() {
    return this._monitorName
  }

  @computed
  get id() {
    return this.model.id
  }

  @computed
  get isConnected() {
    return this.state.connected === true
  }

  @computed
  get isError() {
    return !!this.state.error
  }

  @computed
  get isOutOfRange() {
    return this.state.outOfRange === true
  }

  @computed
  get isPairing() {
    return this.state.pairing === true
  }

  @computed
  get name() {
    return this.model.name
  }

  static getInitialState() {
    return {
      connected: false,
      error: null,
      outOfRange: false,
      pairing: false,
    }
  }
}
