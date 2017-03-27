import React from 'react';

const AlertBox = (props) => (
    <div>
      {props.type === "SUCCESS" &&
          <div className="success callout" data-closable>
            {props.msg}
          </div>
      }
      {props.type === "FAIL" &&
          <div className="alert callout" data-closable>
            {props.msg}
          </div>
      }
    </div>
);

export default AlertBox;
