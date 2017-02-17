import React, { Component } from 'react';
import './App.css';
import '../../libs/foundation/foundation.min.css';
import '../../libs/foundation/jquery.js';
//import '../../libs/foundation/foundation.min.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      disabled : "true",
      routeTextDisabled : "",
      routeText: "",
      locationsCount: 1
    };

    this.onRouteNoSet = this.onRouteNoSet.bind(this);
    this.updateRouteText = this.updateRouteText.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
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
  }

  render() {
    var locations = [];
    for(var i=0;i<this.state.locationsCount;i++){
      locations.push(i+1);
    }
    return (
      <div>
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

                  <div className="small-12 columns">
                      {locations.map((d) => {
                          return(
                            <div key={d} className="row">
                              <InputGroup label="Road No." disabled={this.state.disabled} />
                              <InputGroup label="Location" disabled={this.state.disabled} />

                            {d == locations.length ? (
                              <div className="small-12 large-4 columns">
                                <input type="button" className="button" value="+" onClick={this.onClickAdd} />
                              </div>
                            ) : d == (locations.length-1) ? (
                              <div className="small-12 large-4 columns">
                                <input type="button" className="button" value="-" onClick={this.onClickRemove} />
                              </div>
                            ): (
                              <div className="small-12 large-4 end">

                              </div>
                            )}

                            </div>
                          );
                      })}
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

  render(){
    return(
      <div className="small-12 large-4 columns">
        <div className="input-group">
          <span className="input-group-label">{this.props.label}</span>
          <input className="input-group-field" type="text" disabled={this.props.disabled} />
        </div>
      </div>
    );
  }
}

export default App;
