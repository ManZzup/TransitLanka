import React from 'react';

const SearchButton = (props) => (
  <div className="row">
    {!props.loadButton &&
      <input type="button" className="button warning" value="Do MAGIC!" onClick={props.onSearch} />
    }
    {props.loadButton &&
      <span href="#" onClick={() => {return false}} className="button warning">
        <img src="/assets/gear.gif" width="40px" alt="" />
      </span>
    }
  </div>
);

export default SearchButton;
