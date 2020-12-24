export const UPDATE = 'data/UPDATE'

export const update = (query, data) => {
  return {
    type: UPDATE,
    payload: {
      query,
      data
    }
  }
}
