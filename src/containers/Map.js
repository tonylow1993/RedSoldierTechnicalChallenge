import { connect } from 'react-redux'
import RestaurantMap from '../components/RestaurantMap'
import { refreshList } from '../actions'

const mapStateToProps = state => ({
  marker: state.marker
})

const mapDispatchToProps = dispatch => ({
  refreshList: restaurants => dispatch(refreshList(restaurants))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantMap)