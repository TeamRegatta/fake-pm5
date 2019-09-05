import { action, observable } from 'mobx'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] RowingAdditionalStrokeData'
export default class RowingAdditionalStrokeDataEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({
      name: EVENTS.onRowingAdditionalStrokeData,
      ...data,
    })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      elapsedTime: 0, // mili seconds
      strokePower: 0, // watts
      strokeCalories: 0, // cal/hr
      strokeCount: 0,
      projectedWorkTime: 0, // ms
      projectedWorkDistance: 0, // meter
      workPerStroke: 0,
    }
  }
}
