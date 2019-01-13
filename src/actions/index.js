export const refreshList = restaurants => ({
  type: 'REFRESH_LIST',
  restaurants
})

export const selectRestaurant = (name, lat, lng) => ({
  type: 'SELECT_RESTAURANT',
  name,
  lat,
  lng
})

export const orderByDistance = () => ({
  type: 'ORDER_BY_DISTANCE'
})

export const orderByPrice = () => ({
  type: 'ORDER_BY_PRICE'
})
