import React, { Component } from 'react';
import './App.css';
import '../../libs/foundation/foundation.min.css';
require('../../libs/foundation/jquery.js');
import $ from '../../libs/foundation/jquery.js';
// import '../../libs/foundation/foundation.min.js';
import Helmet from "react-helmet";
//import Autocomplete from 'react-google-autocomplete';



//import "./places_api.js";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      disabled : "true",
      routeTextDisabled : "",
      routeText: "",
      locationsCount: 1,
      routes: [],
      places: []
    };

    this.onRouteNoSet = this.onRouteNoSet.bind(this);
    this.updateRouteText = this.updateRouteText.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateRouteText(event){
    this.setState({
      routeText: event.target.value
    })
  }
  onRouteNoSet(event){
    if(this.state.routeText !== ""){
      this.setState({
        disabled: "",
        routeTextDisabled: "true"
      });
    }
  }

  onClickAdd(event){
    this.setState({
      locationsCount: this.state.locationsCount + 1
    });
  }
  onClickRemove(event){
    this.setState({
      locationsCount: this.state.locationsCount - 1
    });
    var places = this.state.places;
    if(places.length === this.state.locationsCount){
      places.pop();
      this.setState({
        places: places
      });
    }
  }

  updateState(data){
    this.setState(data);
  }


  render() {
    var locations = [];
    for(var i=0;i<this.state.locationsCount;i++){
      this.state.routes.push(0);
      locations.push(i+1);
    }
    var places = [{'lat':7.8124379,'lng':80.2248202}];
    return (
      <div>
        <div className="application">
            <Helmet title="Transit Lank"

            />
        </div>

        <NavigationBar title="TransitLanka">
            <NavigationBarItem class="active" text="Bus route data entry" />
        </NavigationBar>

        <div className="container row">

                <form>

                  <div className="input-group small-12 large-12 columns">
                    <span className="input-group-label">Route No</span>
                    <input className="input-group-field" type="text" disabled={this.state.routeTextDisabled}
                              value={this.state.routeText} onChange={this.updateRouteText} />
                    <div className="input-group-button">
                      <input type="button" className="button" value="Set" onClick={this.onRouteNoSet} />
                    </div>
                  </div>

                  <div className="small-12 large-8 columns">
                      {locations.map((d) => {
                          return(
                            <div key={d} className="row">
                              <InputGroup label="Road No." disabled={this.state.disabled} state={this.state} id={d} />
                              <InputGroupLocation label="Location" disabled={this.state.disabled} id={d}
                                                  state={this.state} updateParentState={this.updateState} />

                            {d === locations.length ? (
                              <div>
                                {d > 1 ? (
                                  <div className="small-12 large-1 columns">
                                    <input type="button" className="button" value="- " onClick={this.onClickRemove} />
                                  </div>
                                ) : ( <div></div> )}
                                <div className="small-12 large-1 columns end">
                                  <input type="button" className="button" value="+" onClick={this.onClickAdd} />
                                </div>
                              </div>
                            ) : d === (locations.length-1) ? (
                                <div></div>
                            ): (
                              <div className="small-12 large-4 end">

                              </div>
                            )}

                            </div>
                          );
                      })}
                  </div>

                  <div className="large-4 columns">
                      <GoogleMap places={this.state.places} />
                  </div>


                </form>


        </div>



      </div>
    );
  }
}

class NavigationBar extends Component{
  render(){
    return(
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">{this.props.title}</li>
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}

class NavigationBarItem extends Component{
  render() {
    return (
      <li className={this.props.class}><a href="#">{this.props.text}</a></li>
    );
  }
}

class InputGroup extends Component{
  constructor(props){
    super(props);

    this.onChangeRoute = this.onChangeRoute.bind(this)
  }

  onChangeRoute(event){
      this.props.state.routes[this.props.id - 1] = event.target.value;
  }

  render(){
    return(
      <div className="small-12 large-5 columns">
        <div className="input-group">
          <span className="input-group-label">{this.props.label}</span>
          <input className="input-group-field" type="text" disabled={this.props.disabled} onChange={this.onChangeRoute} />
        </div>
      </div>
    );
  }
}

class InputGroupLocation extends Component{
  constructor(props){
    super(props);

    this.state = {
      place: "",
      searchTxt: ""
    };

    this.onSearchInputChange = this.onSearchInputChange.bind(this)

  }
  componentDidMount(){
    var input = document.getElementById('auto_input_' + this.props.id);
    var options = {
      componentRestrictions: {country: "lk"}
    };
    var autocomplete = new window.google.maps.places.Autocomplete(input,options);
    autocomplete.addListener('place_changed', function() {
      //console.log(autocomplete.getPlace());
      this.setState({
        searchTxt: autocomplete.getPlace().formatted_address
      });

      var places = this.props.state.places;
      // if(places.length >= this.props.id){
      //   places[this.props.id-1] = autocomplete.getPlace().geometry.location;
      // }else{
      places.push(autocomplete.getPlace().geometry.location);
      this.props.updateParentState({
        places: places
      });

      // }
      console.log(this.props.state.places);
    }.bind(this));
  }

  onSearchInputChange(event){
    var route = this.props.state.routes[this.props.id - 1];
    var txt = event.target.value;
    txt = txt.replace(route+",","");
    txt = route+"," + txt;
    this.setState({
      searchTxt: txt
    });
    window.google.maps.event.trigger( document.getElementById('auto_input_' + this.props.id), 'focus', {} );
  }

  render(){
    var auto_input_id = 'auto_input_' + this.props.id;
    return(
      <div className="small-12 large-5 columns">
        <div className="input-group">
          <span className="input-group-label">{this.props.label}</span>
          <input className="input-group-field" id={auto_input_id} type="text" disabled={this.props.disabled}
                  onChange={this.onSearchInputChange} value={this.state.searchTxt} />
        </div>
      </div>
    );
  }
}

class GoogleMap extends Component{
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
    //console.log("rerender");
    if(this.state.map !== ""){
      for(var i=0;i<this.state.markers.length;i++){
        this.state.markers[i].setMap(null);
      }
      for(var i=0;i<this.props.places.length;i++){
        var marker = new window.google.maps.Marker({
            map: this.state.map,
            anchorPoint: new window.google.maps.Point(0, -29)
          });
        marker.setPosition(this.props.places[i]);
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

export default App;
