const createFakePM5 = require('../dist/index.js').default

function onConnectionChange(state) {
  console.log(`[${state.device.model.localName}] connected:`, state.connected)
  console.log('\n')
}

async function createMonitor() {
  const monitor = createFakePM5({ onConnectionChange })
  await monitor.connect()
  monitor.tick(data => {
    console.log(`[${monitor.device.model.localName}]`)
    console.log('kilojoules:', data.rowingAdditionalStatus1Event.kilojoules || 0)
    console.log('calories:', data.rowingAdditionalStatus1Event.calories || 0)
    console.log('distance:', data.rowingGeneralStatusEvent.model.distance || 0)
    console.log('\n')
  })
}

createMonitor()
createMonitor()
createMonitor()
