import { action, observable } from 'mobx'

import { checkIntervalType } from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] AdditionalWorkoutSummaryData'
export default class AdditionalWorkoutSummaryDataEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onAdditionalWorkoutSummaryData, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      logEntryDate: 0,
      logEntryTime: 0,
      intervalType: 0, // null when multiplexed
      intervalSize: 0, // meters or seconds
      intervalCount: 0,
      totalCalories: 0,
      watts: 0,
      totalRestDistance: 0,
      intervalRestTime: 0,
      averageCalories: 0,
    }
  }

  intervalType(type) {
    return checkIntervalType(type, this.model.intervalType)
  }
}
