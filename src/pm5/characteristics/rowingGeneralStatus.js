import { action, computed, observable } from 'mobx'

import {
  checkIntervalType,
  checkRowingState,
  checkStrokeState,
  checkWorkoutState,
  checkWorkoutType,
  formatTime,
  checkWorkoutDurationType,
} from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] RowingGeneralStatus'
export default class RowingGeneralStatusEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onRowingGeneralStatus, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      elapsedTime: 0, // mili seconds
      distance: 0, // meters
      workoutType: 0,
      intervalType: 0,
      workoutState: 0,
      rowingState: 0,
      strokeState: 0,
      totalWorkDistance: 0,
      workoutDuration: 0, // depends on the workoutDurationType, when time it is in mili seconds
      workoutDurationType: 0,
      dragFactor: 0,
    }
  }

  intervalType(type) {
    return checkIntervalType(type, this.model.intervalType)
  }

  workoutType(type) {
    return checkWorkoutType(type, this.model.workoutType)
  }

  workoutState(type) {
    return checkWorkoutState(type, this.model.workoutState)
  }

  rowingState(type) {
    return checkRowingState(type, this.model.rowingState)
  }

  strokeState(type) {
    return checkStrokeState(type, this.model.strokeState)
  }

  workoutDurationType(type) {
    return checkWorkoutDurationType(type, this.model.workoutDurationType)
  }

  @computed
  get elapsedTime() {
    return formatTime(this.model.elapsedTime)
  }
}
