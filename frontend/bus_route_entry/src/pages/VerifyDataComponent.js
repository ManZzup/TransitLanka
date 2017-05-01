import React from 'react';

const VerifyDataComponent = (props) => (
  <div className="container">
    <div className="row">
      <div className="small-12">
          <form>
              <div className="input-group small-12 large-12 columns">
                <span className="input-group-label">Route No</span>
                <select className="input-group-field" onChange={props.onSelectRoute} defaultValue="-1">
                  <option value="-1">Select Route</option>
                  {props.state.routes.map((r,i) => {
                    return(
                        <option key={i} value={r.key}>{r.name}</option>
                    );
                  })}
                </select>
                <div className="input-group-button">
                  <input type="button" className="button" value="View" onClick={props.onClickView}  />
                </div>
              </div>
          </form>

          <RecordsTable records={props.state.records} />

          { (props.state.selectedRoute !== "-1") &&
          <div className="input-group-button">
            <input type="button" className="button success" value="Accept" onClick={ () => {props.onSubmit(props.state.selectedRoute,"verify")} }  />
            <input type="button" className="button alert" value="Reject" onClick={ () => {props.onSubmit(props.state.selectedRoute,"reject")}}  />
          </div>
          }
      </div>
    </div>
  </div>
);

const RecordsTable = (props) => (
  <div className="row">
    <table>
      <thead>
        <tr>
          <th>Stop</th>
          <th>Road</th>
          <th>Place Name</th>
          <th>Lattitude</th>
          <th>Longitude</th>
          <th>Place Id</th>
        </tr>
      </thead>
      <tbody>

        {props.records.map((r,i) => {
          var data = JSON.parse(r.recordData)
          return(
            <tr key={i}>
              <td>{data[1]}</td>
              <td>{data[0]}</td>
              <td>{data[2]}</td>
              <td>{data[3]}</td>
              <td>{data[4]}</td>
              <td>{data[5]}</td>
            </tr>
          );
        })}

      </tbody>
    </table>
  </div>

);

export default VerifyDataComponent;
