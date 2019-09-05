import { action, computed, observable } from 'mobx'

import {
  formatTime,
  calculateWatts,
  calculateKilojoules,
  calculateCalories,
} from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] RowingAdditionalStatus1'
export default class RowingAdditionalStatus1Event extends Characteristic {
  @observable
  _kilojoules

  @observable
  _calories

  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onRowingAdditionalStatus, ...data })
    this._kilojoules = 0
    this._calories = 0
    this.onUpdate(this._handleUpdate)
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this._kilojoules = 0
    this._calories = 0

    this.model = model || {
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
  }

  @action(`${NAME}#_handleUpdate`)
  _handleUpdate = (prevModel, currModel) => {
    const mili = currModel.elapsedTime - prevModel.elapsedTime
    const kilojoules = calculateKilojoules(this.averageWatts, mili)
    const calories = calculateCalories(kilojoules, currModel.elapsedTime)

    if (calories && calories > 0) {
      this._calories = calories
    }

    if (kilojoules && kilojoules > 0) {
      this._kilojoules += kilojoules
    }
  }

  @computed
  get kilojoules() {
    return Math.ceil(this._kilojoules)
  }

  @computed
  get elapsedTime() {
    return formatTime(this.model.elapsedTime)
  }

  @computed
  get currentPace() {
    return formatTime(this.model.currentPace)
  }

  @computed
  get averagePace() {
    return formatTime(this.model.averagePace)
  }

  @computed
  get watts() {
    return calculateWatts(this.model.currentPace)
  }

  @computed
  get averageWatts() {
    return calculateWatts(this.model.averagePace)
  }

  @computed
  get calories() {
    return Math.ceil(this._calories)
  }
}
