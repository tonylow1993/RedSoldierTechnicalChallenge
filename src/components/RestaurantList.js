import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default class RestaurantList extends React.Component {
  state = {
    value: 0
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render (){
    const { restaurants, selectRestaurant, orderByDistance, orderByPrice } = this.props;

    let listItems = [];

    if (restaurants !== undefined){
      listItems = restaurants.map( (restaurant) => 
        <ListItem onClick={() => {selectRestaurant(restaurant.name, restaurant.geometry.location.lat(), restaurant.geometry.location.lng())}} button>
          <ListItemText primary={restaurant.name} />
        </ListItem>
      );
    }

    return <div className='res-list'>
      <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Order by distance" onClick={()=>orderByDistance()}/>
            <Tab label="Order by price" onClick={()=>orderByPrice()}/>
          </Tabs>
      </AppBar>
      <List component="nav">
        {listItems}
      </List>
    </div>
  };
}