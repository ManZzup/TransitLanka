import React, { Component } from 'react';
import './App.css';
import $ from '../../libs/foundation/jquery.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './actions';
import * as ApiActions from './actions/API';
import RecordEntry from './components/RecordEntry';
import PlacesAutomcompleteContainer from './containers/PlacesAutocompleteContainer';
import GoogleMapContainer from './containers/GoogleMapContainer';


//import "./places_api.js";

class App extends Component {
  constructor(props){
    super(props);

    this.onRouteNoSet = this.onRouteNoSet.bind(this);
    this.onSaveClick = this.onSaveClick.bind(this);
  }

  onRouteNoSet(event){
    this.props.actions.disableRouteText();
    this.props.actions.enableRecordEntries();
  }

  onSaveClick(event){
      var request = {};
      request["route"] = this.props.routeName;
      var locations = [];

      for(var i=0;i<this.props.roadPlaces.length;i++){
        var r = [];
        r.push(this.props.roadRoutes[i]);
        r.push((i+1));
        r.push(this.props.roadPlaces[i].full_name);
        r.push(this.props.roadPlaces[i].geometry.location.lat());
        r.push(this.props.roadPlaces[i].geometry.location.lng());
        r.push(this.props.roadPlaces[i].place_id);
        // var l = "'" + this.props.roadRoutes[i] + "'," + (i+1) + ",'" + this.props.roadPlaces[i].vicinity +
        //             "'," + this.props.roadPlaces[i].geometry.location.lat() + "," + this.props.roadPlaces[i].geometry.location.lng() +
        //             ",'" + this.props.roadPlaces[i].place_id + "'";
        locations.push(r);
      }
      request['records'] = locations;

      this.props.api.apiSubmitRecord(JSON.stringify(request));
  }

  render() {
    var locations = [];
    for(var i=0;i<this.props.roadSlots;i++){
      //this.props.roadRoutes.push(0);
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
                                    <input type="button" className="button" value="- " onClick={this.props.actions.removeRecordEntry} />
                                  </div>
                                ) : ( <div></div> )}
                                <div className="small-12 large-1 columns end">
                                  <input type="button" className="button" value="+" onClick={this.props.actions.addRecordEntry} />
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
     routeName: state.routeEntry.routeName,
     routeTextDisabled: state.routeEntry.routeTextDisabled,
     recordEntriesDisabled : state.routeEntry.recordEntriesDisabled,
     roadRoutes : state.routeEntry.roadRoutes,
     roadPlaces : state.routeEntry.roadPlaces,
     roadSlots : state.routeEntry.roadSlots
   };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    api: bindActionCreators(ApiActions, dispatch)
  };
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
