import { action, observable } from 'mobx'

import Characteristic, { EVENTS } from './model'

export const NAME = '[service:pm5] HeartRateBeltInformation'
export default class HeartRateBeltInformationEvent extends Characteristic {
  @observable
  model

  constructor(data) {
    super({ name: EVENTS.onHeartRateBeltInformation, ...data })
  }

  @action(`${NAME}#_setModel`)
  _setModel = model => {
    this.model = model || {
      manufacturerId: 0,
      deviceType: 0,
      beltId: 0,
    }
  }
}
