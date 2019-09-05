import { action, computed, observable } from 'mobx'

import { formatTime } from 'lib/ergometer'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] RowingStrokeData'
export default class RowingStrokeDataEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({
      name: EVENTS.onRowingStrokeData,
      recalculate: { elapsedTime: true },
      ...data,
    })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      elapsedTime: 0, // mili seconds
      distance: 0, // meters
      driveLength: 0, // meters
      driveTime: 0,
      strokeRecoveryTime: 0,
      strokeDistance: 0,
      peakDriveForce: 0,
      averageDriveForce: 0,
      workPerStroke: 0, // null for multi plexed
      strokeCount: 0,
    }
  }

  @computed
  get elapsedTime() {
    return formatTime(this.model.elapsedTime)
  }
}
