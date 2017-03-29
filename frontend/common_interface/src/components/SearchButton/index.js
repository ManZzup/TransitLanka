import React from 'react';

const SearchButton = (props) => (
  <div className="row">
    {!props.showLoadButton &&
      <input type="button" className="button warning" value="Do MAGIC!" onClick={props.onSearch} />
    }
    {props.showLoadButton &&
      <span href="#" onClick="return false" className="button warning">
        <img src="/assets/gear.gif" width="40px" />
      </span>
    }
  </div>
);

export default SearchButton;
