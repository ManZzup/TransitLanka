import React from 'react';

const ResultsComponent = (props) => (
  <div id="results">
    <ul className="accordion" data-accordion>
    {props.results.map( (r,i) => (
        <li key={i} className="accordion-item" data-accordion-item>
          <a href="#" className="accordion-title">{r}</a>
          <div className="accordion-content" data-tab-content>
            I would start in the open state, due to using the `is-active` state class.
          </div>
        </li>
    ) )}
    </ul>
  </div>
);

export default ResultsComponent;
