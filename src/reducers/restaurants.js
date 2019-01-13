const restaurants = (state = [], action) => {
  switch (action.type) {
    case 'REFRESH_LIST':
      return action.restaurants
    case 'ORDER_BY_DISTANCE':
      //order by distance asc
      return state.sort(function(a, b){return a.distance-b.distance});
    case 'ORDER_BY_PRICE':
      //order by price asc
      return state.sort(function(a, b){
        if(typeof a.price_level === "undefined" ) {
          return 1;
        } else if(typeof b.price_level === "undefined") {
          return -1;
        }
        return a.price_level-b.price_level
      });
    default:
      return state
  }
}

export default restaurants