import React from 'react';

const RecordEntry = (props) => (
  <div className="small-12 large-5 columns">
    <div className="input-group">
      <span className="input-group-label">{props.label}</span>
      <input className="input-group-field" type="text"
             disabled={props.disabled}
             onChange={(e) => props.addRoute(props.id,e.target.value)} />
    </div>
  </div>
);

export default RecordEntry;
