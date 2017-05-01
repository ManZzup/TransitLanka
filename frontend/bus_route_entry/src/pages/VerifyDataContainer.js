import React, { Component } from 'react';
import $ from '../../../libs/foundation/jquery.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VerifyDataComponent from './VerifyDataComponent';
import * as ApiActions from '../actions/API';

class VerifyDataContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      routes : [],
      records : [],
      selectedRoute : "-1"
    };

    this.onSelectRoute = this.onSelectRoute.bind(this);
    this.onClickView = this.onClickView.bind(this);
  }

  componentDidMount(){
    var request = `{
      InterimRoutes {
        key, name
      }
    }`;

    $.ajax({
        url: ApiActions.API_BASE + "query",
        dataType: "json",
        type: "POST",
        data: request,

        success: function(data){
          console.log(data);
          this.setState({
            routes: data.InterimRoutes
          });
        }.bind(this),
        error:function(data){
          console.log("failed!");
        }
    });
  }

  onSelectRoute(e){
    console.log(e.target.value);
    this.setState({
      selectedRoute : e.target.value
    });
  }

  onClickView(e){
    console.log(this.state.selectedRoute);
    var request = `{
      InterimRecords (route : "` + this.state.selectedRoute + `") {
        recordData
      }
    }`;
    $.ajax({
        url: ApiActions.API_BASE + "query",
        dataType: "json",
        type: "POST",
        data: request,

        success: function(data){
          this.setState({
            records: data.InterimRecords
          });
        }.bind(this),
        error:function(data){
          console.log("failed!");
        }
    });
  }

  render(){
    return(
      <VerifyDataComponent state={this.state}
                  onSelectRoute={this.onSelectRoute}
                  onClickView={this.onClickView}
                  onSubmit={this.props.api.apiSubmitAction} />
    );
  }
}

function mapStateToProps(state) {
   return {
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(ApiActions, dispatch)
  };
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(VerifyDataContainer);
