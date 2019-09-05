export const formatTime = (mili = 0) => {
  if (mili < 0) mili = 0

  const totalSecs = Math.floor(mili / 1000)
  const totalMins = Math.floor(totalSecs / 60)
  const totalHours = Math.floor(totalMins / 60)

  const secs = totalSecs % 60
  const mins = totalMins % 60
  const hours = totalHours

  return { mili, secs, mins, hours }
}

export const WORKOUT_TYPE = [
  'justRowNoSplits',
  'justRowSplits',
  'fixedDistanceNoAplits',
  'fixedDistanceSplits',
  'fixedTimeNoAplits',
  'fixedTimeAplits',
  'fixedTimeInterval',
  'fixedDistanceInterval',
  'variableInterval',
  'variableUndefinedRestInterval',
  'fixedCalorie',
  'fixedWattMinutes',
]

export const INTERVAL_TYPE = [
  'time',
  'dist',
  'rest',
  'timertUndefined',
  'distanceRestUndefined',
  'restUndefined',
  'cal',
  'calRestUndefined',
  'wattMinute',
  'wattMinuteRestUndefined',
  'none',
]

export const WORKOUT_STATE = [
  'waitToBegin',
  'workoutRow',
  'countDownPause',
  'intervalRest',
  'intervalWorktime',
  'intervalWorkDistance',
  'intervalRestEndToWorkTime',
  'intervalRestEndToWorkDistance',
  'intervalWorktimeTorest',
  'intervalWorkDistanceToEest',
  'workoutEnd',
  'terminate',
  'workoutLogged',
  'rearm',
]

export const ROWING_STATE = ['inactive', 'active']

export const STROKE_STATE = [
  'waitingForWheelToReachMinSpeedState',
  'waitingForWheelToAccelerateState',
  'drivingState',
  'dwellingAfterDriveState',
  'recoveryState',
]

const checkValueType = (list, type, value) => {
  if (!type) return value
  const index = list.indexOf(type)
  return index === value
}

export const checkIntervalType = (type, value) =>
  checkValueType(INTERVAL_TYPE, type, value)

export const checkWorkoutType = (type, value) =>
  checkValueType(WORKOUT_TYPE, type, value)

export const checkWorkoutState = (type, value) =>
  checkValueType(WORKOUT_STATE, type, value)

export const checkRowingState = (type, value) =>
  checkValueType(ROWING_STATE, type, value)

export const checkStrokeState = (type, value) =>
  checkValueType(STROKE_STATE, type, value)

export const checkWorkoutDurationType = (type, value) => {
  switch (type) {
    case 'timeDuration':
      return value === 0

    case 'caloriesDuration':
      return value === 64

    case 'distanceDuration':
      return value === 128

    case 'wattsDuration':
      return value === 192
  }
}

export const formatValue = (digit, pow = 0) => {
  digit = digit || 0
  let str = digit.toFixed(0)
  if (digit >= Math.pow(10, pow)) return str
  while (str.length < pow) {
    str = `0${str}`
  }
  return str
}

export const calculateWatts = mili => {
  if (!mili) return 0
  const calculatedWatts = 2.8 / Math.pow(mili / 500000, 3)
  return Math.ceil(calculatedWatts)
}

export const calculateKilojoules = (watts, mili) => {
  if (!watts || !mili) return 0
  return (watts * (mili / 1000)) / 1000
}

export const calculateCalories = (kj, mili) => {
  if (!kj || !mili) return 0
  const calories = (4 * kj + 0.35 * (mili / 1000)) / 4.184
  return calories
}
