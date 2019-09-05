import { action, observable } from 'mobx'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] RowingAdditionalSplitIntervalData'
export default class RowingAdditionalSplitIntervalDataEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onRowingAdditionalSplitIntervalData, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      elapsedTime: 0, // mili seconds
      intervalAverageStrokeRate: 0,
      intervalWorkHeartrate: 0,
      intervalRestHeartrate: 0,
      intervalAveragePace: 0,
      intervalTotalCalories: 0,
      intervalAverageCalories: 0,
      intervalSpeed: 0,
      intervalPower: 0,
      splitAverageDragFactor: 0,
      intervalNumber: 0,
    }
  }
}
