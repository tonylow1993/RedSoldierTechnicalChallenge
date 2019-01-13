const marker = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_RESTAURANT':
      return {
          name: action.name,
          lat: action.lat,
          lng: action.lng
        }
    default:
      return state
  }
}

export default marker