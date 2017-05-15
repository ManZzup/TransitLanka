import React from 'react';

const TrainCheck = (props) => {
return(
    <div className="row">
      <div className="small-8 columns" style={{paddingLeft:'0px',textAlign:'left'}}>
          I want to check trains too?
      </div>
      <div className="small-4 columns end" style={{paddingRight:'0px',textAlign:'right'}}>
      <div className="switch large">
        <input className="switch-input" id="yes-no" type="checkbox"
                onChange={() => {props.onChange(!props.enableTrains)}}
                checked={props.enableTrains} />
        <label className="switch-paddle" htmlFor="yes-no">
          <span className="show-for-sr">Do you like me?</span>
          <span className="switch-active" aria-hidden="true">Yes</span>
          <span className="switch-inactive" aria-hidden="true">No</span>
        </label>
      </div>
      </div>
    </div>
);
}

export default TrainCheck;
