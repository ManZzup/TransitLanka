import React, { Component } from 'react';
import './App.css';
import $ from '../../libs/foundation/jquery.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';
import RecordEntry from './components/RecordEntry';
import PlacesAutomcompleteContainer from './containers/PlacesAutocompleteContainer';
import GoogleMapContainer from './containers/GoogleMapContainer';


//import "./places_api.js";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      disabled : "true",
      locationsCount: 1
    };

    this.onRouteNoSet = this.onRouteNoSet.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.updateState = this.updateState.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onRouteNoSet(event){
    this.props.actions.disableRouteText();
    this.props.actions.enableRecordEntries();
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
    this.props.actions.removeRecordEntry();
  }

  onSaveClick(event){
      var request = {};
      request["route"] = this.props.routeName;
      var locations = [];

      for(var i=0;i<this.state.places.length;i++){
        var l = "'" + this.props.roadRoutes[i] + "'," + (i+1) + ",'" + this.props.roadPlaces[i].vicinity +
                    "'," + this.props.roadPlaces[i].geometry.location.lat() + "," + this.props.roadPlaces[i].geometry.location.lng() +
                    ",'" + this.props.roadPlaces[i].place_id + "'";
        locations.push(l);
      }
      request['records'] = locations;

      $.ajax({
          url: window.API_BASE + "interim/submit",
          // url: "https://transitlanka-158812.appspot.com/api/interim/submit",
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
      this.props.roadRoutes.push(0);
      locations.push(i+1);
    }
    return (
      <div>

        <div className="container row">

                <form>

                  <div className="input-group small-12 large-12 columns">
                    <span className="input-group-label">Route No</span>
                    <input className="input-group-field" type="text"
                              disabled={this.props.routeTextDisabled}
                              value={this.props.routeName}
                              onChange={ (e) => this.props.actions.setRouteName(e.target.value)} />
                    <div className="input-group-button">
                      <input type="button" className="button" value="Set" onClick={this.onRouteNoSet} />
                    </div>
                  </div>

                  <div className="small-12 large-8 columns">
                      {locations.map((d) => {
                          return(
                            <div key={d} className="row">
                              <RecordEntry label="Road No."
                                           disabled={this.props.recordEntriesDisabled}
                                           id={d}
                                           addRoute={this.props.actions.addRoute}
                                             />
                              <PlacesAutomcompleteContainer
                                          label="Location"
                                          disabled={this.props.recordEntriesDisabled}
                                          id={d}
                                          state={this.state}
                                          updateParentState={this.updateState}
                               />

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
                      <GoogleMapContainer />
                  </div>


                </form>


        </div>



      </div>
    );
  }
}

function mapStateToProps(state) {
   return {
     routeName: state.routeName,
     routeTextDisabled: state.routeTextDisabled,
     recordEntriesDisabled : state.recordEntriesDisabled,
     roadRoutes : state.roadRoutes,
     roadPlaces : state.roadPlaces
   };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
