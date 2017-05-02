import React from 'react';

const TrainingButton = (props) => (
  <div className="row">
    {!props.loadButton &&
      <input type="button" className="button warning" value="New Training Set" onClick={props.onSearch} />
    }
    {props.loadButton &&
      <span href="javascript:void(0)" onClick={() => {return false}} className="button warning">
        <img src="/assets/gear.gif" width="40px" alt="" />
      </span>
    }
  </div>
);

export default TrainingButton;
