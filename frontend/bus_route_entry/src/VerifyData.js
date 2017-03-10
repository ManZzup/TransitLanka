import React, { Component } from 'react';
import $ from '../../libs/foundation/jquery.js';

class VerifyData extends Component{
  constructor(props){
    super(props);

    this.state = {
      routes : [],
      records : [],
      selectedRoute : ""
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
        url: window.API_BASE + "query",
        dataType: "json",
        type: "POST",
        data: request,

        success: function(data){
          console.log(data);
          this.setState({
            routes: data.InterimRoutes,
            selectedRoute: data.InterimRoutes[0].key
          });
        }.bind(this),
        error:function(data){
          console.log("failed!");
        }
    });
  }

  onSelectRoute(e){
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
        url: window.API_BASE + "query",
        dataType: "json",
        type: "POST",
        data: request,

        success: function(data){
          console.log(data);
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
      <div className="container">
        <div className="row">
          <div className="small-12">
              <form>
                  <div className="input-group small-12 large-12 columns">
                    <span className="input-group-label">Route No</span>
                    <select className="input-group-field" value={this.state.selectedRoute} onChange={this.onSelectRoute}>
                      {this.state.routes.map((r,i) => {
                        return(
                            <option key={i} value={r.key}>{r.name}</option>
                        );
                      })}
                    </select>
                    <div className="input-group-button">
                      <input type="button" className="button" value="View" onClick={this.onClickView}  />
                    </div>
                  </div>
              </form>

              <RecordsTable records={this.state.records} />
          </div>
        </div>
      </div>
    );
  }
}

class RecordsTable extends Component{
  render(){
    return(
      <div className="row">
        <table>
          <thead>
            <tr>
              <th>Record</th>
            </tr>
          </thead>
          <tbody>

            {this.props.records.map((r,i) => {
              return(
                <tr key={i}>
                  <td>{r.recordData}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
      </div>

    );
  }
}

export default VerifyData;
