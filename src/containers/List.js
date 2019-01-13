import { connect } from 'react-redux'
import RestaurantList from '../components/RestaurantList'
import { selectRestaurant, orderByDistance, orderByPrice } from '../actions'

const mapStateToProps = state => ({
  restaurants: state.restaurants
})

const mapDispatchToProps = dispatch => ({
  selectRestaurant: (name, lat, lng) => dispatch(selectRestaurant(name, lat, lng)),
  orderByDistance: () => dispatch(orderByDistance()),
  orderByPrice: () => dispatch(orderByPrice())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantList)