import { action, computed, observable } from 'mobx'
import { EventEmitter } from 'fbemitter'

export const EVENTS = {
  onStateChange: 'connectionStateChangedEvent',
  onRowingGeneralStatus: 'rowingGeneralStatusEvent',
  onRowingAdditionalStatus: 'rowingAdditionalStatus1Event',
  onRowingAdditionalStatus2: 'rowingAdditionalStatus2Event',
  onRowingStrokeData: 'rowingStrokeDataEvent',
  onRowingAdditionalStrokeData: 'rowingAdditionalStrokeDataEvent',
  onRowingSplitIntervalData: 'rowingSplitIntervalDataEvent',
  onRowingAdditionalSplitIntervalData: 'rowingAdditionalSplitIntervalDataEvent',
  onWorkoutSummaryData: 'workoutSummaryDataEvent',
  onAdditionalWorkoutSummaryData: 'additionalWorkoutSummaryDataEvent',
  onAdditionalWorkoutSummaryData2: 'additionalWorkoutSummaryData2Event',
  onHeartRateBeltInformation: 'heartRateBeltInformationEvent',
  onPowerCurve: 'powerCurveEvent',
}

const _emitter = new EventEmitter()

export const NAME = '[pm5] Characteristic'
export default class Characteristic {
  _currModel = null
  _prevModel = null

  @observable
  _paused

  @observable
  model

  name = null
  pm = null

  constructor({ model = {}, name, pm, recalculate }) {
    this.name = name
    this.pm = pm
    this.recalculate = recalculate
    this.unsubscribe = pm.on(name, this._update)

    this._setModel(model)
  }

  clear = () => {
    this._currModel = null
    this._prevModel = null
    this._setModel()
  }

  onUpdate = fn => {
    const subs = _emitter.addListener(this.name, fn)
    return () => subs.remove()
  }

  @action(`${NAME}#pause`)
  pause = () => {
    this._paused = true
  }

  @action(`${NAME}#pause`)
  resume = () => {
    this._paused = false
  }

  unsubscribe = () => console.warn('unsubscribe not implemented yet!')

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {}
  }

  @action(`${NAME}#_update`)
  _update = model => {
    if (this.isPaused) return

    this._prevModel = this._currModel
    this._currModel = model

    if (!this._currModel || !this._prevModel) return

    if (this.recalculate) {
      this.model = Object.keys(model).reduce((result, key) => {
        if (this.recalculate[key]) {
          result[key] = recalculateCurrent(
            this.model[key],
            this._currModel[key],
            this._prevModel[key],
          )
        } else {
          result[key] = model[key]
        }
        return result
      }, {})
    } else {
      this.model = model
    }

    _emitter.emit(this.name, this._prevModel, this._currModel)

    return this.model
  }

  @computed
  get isPaused() {
    return this._paused === true
  }
}

function recalculateCurrent(curr = 0, next = 0, prev = 0) {
  return curr + (next - prev)
}
