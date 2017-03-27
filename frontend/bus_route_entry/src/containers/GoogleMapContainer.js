import React, { Component } from 'react';
import { connect } from 'react-redux';

class GoogleMapContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      map: "",
      markers : []
    };
  }
  componentDidMount(){
    var map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 7.8124379, lng: 80.2248202},
          zoom: 8
        });
    this.setState({
      map : map
    });

  }
  render(){
    if(this.state.map !== ""){
      for(var i=0;i<this.state.markers.length;i++){
        this.state.markers[i].setMap(null);
      }
      for(i=0;i<this.props.roadPlaces.length;i++){
        var marker = new window.google.maps.Marker({
            map: this.state.map,
            anchorPoint: new window.google.maps.Point(0, -29)
          });
        marker.setPosition(this.props.roadPlaces[i].geometry.location);
        marker.setVisible(true);
        this.state.markers.push(marker);
      }
    }
    return(
      <div id="map" style={{height: '400px'}}>
      </div>
    );
  }
}

function mapStateToProps(state) {
   return {
     roadPlaces : state.routeEntry.roadPlaces
   };
}

export default connect(mapStateToProps)(GoogleMapContainer);
