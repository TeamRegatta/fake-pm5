import Characteristic, { EVENTS } from './model'

export default class PowerCurveEvent extends Characteristic {
  constructor(data) {
    super({ name: EVENTS.onPowerCurve, ...data })
  }
}
