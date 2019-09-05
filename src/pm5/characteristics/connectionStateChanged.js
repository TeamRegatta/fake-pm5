import { action, computed, observable } from 'mobx'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] ConnectionStateChanged'
export default class ConnectionStateChangedEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onStateChange, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      prev: null,
      value: 0,
    }
  }

  @computed
  get isInactive() {
    return this.model.value === 0
  }

  @computed
  get isDeviceReady() {
    return this.model.value === 1
  }

  @computed
  get isScanning() {
    return this.model.value === 2
  }

  @computed
  get isConnecting() {
    return this.model.value === 3
  }

  @computed
  get isConnected() {
    return this.model.value === 4
  }

  @computed
  get areServicesFound() {
    return this.model.value === 5
  }

  @computed
  get isReadyForCommunication() {
    return this.model.value === 6
  }

  @action(`${NAME}#_update`)
  _update = (prev, value) => {
    this.model = {
      prev,
      value,
    }
  }
}
