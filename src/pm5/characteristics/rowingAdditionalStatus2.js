import { action, computed, observable } from 'mobx'

import { formatTime } from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] RowingAdditionalStatus2'
export default class RowingAdditionalStatus2Event extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onRowingAdditionalStatus2, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
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
  }

  @computed
  get elapsedTime() {
    return formatTime(this.model.elapsedTime)
  }
}
