import * as dataActions from '../actions/data'

const initialStates = {
  cache: {},
  version: 0,
  data: [],
  lastItem: {},
  lastMin: [],
  serverFound: 0,
  serverAvailable: 0,
  averageLatency: 0,
  maxLatency: 0
}

const reducer = (state = initialStates, action) => {
  const { type } = action

  switch (type) {
    case dataActions.UPDATE: {
      const {
        data,
        query
      } = action.payload

      state.cache[query] = data
      state.version = query
      state.data = data
      state.lastItem = data[data.length - 1]
      state.lastMin = []
      state.serverFound = []
      state.serverAvailable = []
      state.averageLatency = 0
      state.maxLatency = 0

      for (let i = 0, l = data.length; i < l; i++) {
        const item = data[i]

        if (item.updatedAt === state.lastItem.updatedAt) {
          state.lastMin.push(item)
        }
        if (state.serverFound.indexOf(item.domain) < 0) {
          state.serverFound.push(item.domain)
        }
        if (item.alive) {
          state.averageLatency += data[i].latency

          if (state.serverAvailable.indexOf(item.domain) < 0) state.serverAvailable.push(item.domain)
          if (item.latency > state.maxLatency) state.maxLatency = item.latency
        }
      }

      state.averageLatency = (state.averageLatency / data.length).toFixed(3)

      return state
    }
    default:
      return state
  }
}

export default reducer
