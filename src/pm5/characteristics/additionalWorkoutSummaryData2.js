import { action, computed, observable } from 'mobx'

import { formatTime, calculateWatts } from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] AdditionalWorkoutSummaryData2'
export default class AdditionalWorkoutSummaryData2Event extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onAdditionalWorkoutSummaryData2, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      logEntryDate: 0,
      logEntryTime: 0,
      averagePace: 0,
      gameIdentifier: 0,
      gameScore: 0,
      ergMachineType: 0,
    }
  }

  @computed
  get averagePace() {
    return formatTime(this.model.averagePace)
  }

  @computed
  get averageWatts() {
    return calculateWatts(this.model.averagePace)
  }
}
