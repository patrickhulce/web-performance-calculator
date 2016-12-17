import {combineReducers} from 'redux'

export function setRtt(payload) {
  return {type: 'SET_RTT', payload}
}

export function setPayload(payload) {
  return {type: 'SET_PAYLOAD', payload}
}

export function setParse(payload) {
  return {type: 'SET_PARSE', payload}
}

export function setThroughput(payload) {
  return {type: 'SET_THROUGHPUT', payload}
}

function rtt(state = 50, action) {
  if (action.type === 'SET_RTT') {
    return action.payload
  }

  return state
}

function payload(state = 150, action) {
  if (action.type === 'SET_PAYLOAD') {
    return action.payload
  }

  return state
}

function parse(state = 500, action) {
  if (action.type === 'SET_PARSE') {
    return action.payload
  }

  return state
}

function throughput(state = 4000, action) {
  if (action.type === 'SET_THROUGHPUT') {
    return action.payload
  }

  return state
}

export default combineReducers({rtt, payload, parse, throughput})
