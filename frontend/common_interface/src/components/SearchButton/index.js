import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const SearchButton = (props) => (
  <div className="row">
  <CSSTransitionGroup
      transitionName={ (props.homeButton) ? "home_tran_btn_left_slide" : "tran_btn_left_slide"}
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={300}>
    {!props.loadButton &&
      <input type="button" className="button warning" value="Do MAGIC!" onClick={props.onSearch} />
    }
    </CSSTransitionGroup>

    <CSSTransitionGroup
        transitionName={ (props.homeButton) ? "home_tran_btn_left_slide" : "tran_btn_left_slide"}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={300}>
          {props.loadButton &&
            <span href="#" onClick={() => {return false}} className="button warning">
              <img src="/assets/gear.gif" width="40px" alt="" />
            </span>
          }
    </CSSTransitionGroup>
  </div>
);

export default SearchButton;
