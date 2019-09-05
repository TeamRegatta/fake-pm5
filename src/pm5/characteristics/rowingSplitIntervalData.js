import { action, observable } from 'mobx'

import { checkIntervalType } from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] RowingSplitIntervalData'
export default class RowingSplitIntervalDataEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onRowingSplitIntervalData, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      elapsedTime: 0, // mili seconds
      distance: 0, // meters
      intervalTime: 0,
      intervalDistance: 0,
      intervalRestTime: 0,
      intervalRestDistance: 0, // meter
      intervalType: 0,
      intervalNumber: 0,
    }
  }

  intervalType(type) {
    return checkIntervalType(type, this.model.intervalType)
  }
}
