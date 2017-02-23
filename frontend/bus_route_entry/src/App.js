import React, { Component } from 'react';
import './App.css';
import $ from '../../libs/foundation/jquery.js';



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
    this.onSaveClick = this.onSaveClick.bind(this);
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

  onSaveClick(event){
      var request = {};
      request["route"] = this.state.routeText;
      var locations = [];

      for(var i=0;i<this.state.places.length;i++){
        // var l = "'" + this.state.routes[i] + "'," + (i+1) + ",'" + this.state.places[i].formatted_address +
        //             "'," + this.state.places[i].geometry.location.lat() + "," + this.state.places[i].geometry.location.lng() +
        //             ",'" + this.state.places[i].place_id + "'";
        var l = "'" + this.state.routes[i] + "'," + (i+1) + ",'" + this.state.places[i].vicinity +
                    "'," + this.state.places[i].geometry.location.lat() + "," + this.state.places[i].geometry.location.lng() +
                    ",'" + this.state.places[i].place_id + "'";
        locations.push(l);
      }
      request['records'] = locations;

      $.ajax({
          //url: "http://localhost:8080/api/interim/submit",
          url: "https://transitlanka-158812.appspot.com/api/interim/submit",
          dataType: "json",
          type: "POST",
          data: JSON.stringify(request),

          success: function(data){
            console.log("added!");
            //this.setState(this.getInitialState());
          }.bind(this),
          error:function(data){
            console.log("failed!");
          }
      });
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

    return (
      <div>

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

                      <div className="small-12 large-4 columns end">
                        <input type="button" className="button" value="Save" onClick={this.onSaveClick} />
                      </div>

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
        searchTxt: autocomplete.getPlace().vicinity
      });

      var places = this.props.state.places;

      places.push(autocomplete.getPlace());
      this.props.updateParentState({
        places: places
      });

      console.log(autocomplete.getPlace());

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
      for(i=0;i<this.props.places.length;i++){
        var marker = new window.google.maps.Marker({
            map: this.state.map,
            anchorPoint: new window.google.maps.Point(0, -29)
          });
        marker.setPosition(this.props.places[i].geometry.location);
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
