import { action, computed, observable } from 'mobx'

import { checkWorkoutType, formatTime, calculateWatts } from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] WorkoutSummaryData'
export default class WorkoutSummaryDataEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onWorkoutSummaryData, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      logEntryDate: 0,
      logEntryTime: 0,
      elapsedTime: 0,
      distance: 0,
      averageStrokeRate: 0,
      endingHeartrate: 0,
      averageHeartrate: 0,
      minHeartrate: 0,
      maxHeartrate: 0,
      dragFactorAverage: 0,
      recoveryHeartRate: 0,
      workoutType: 0,
      averagePace: 0, // null when multiplexed
    }
  }

  workoutType(type) {
    return checkWorkoutType(type, this.model.workoutType)
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
