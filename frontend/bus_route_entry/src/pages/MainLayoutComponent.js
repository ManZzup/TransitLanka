import React from 'react';
import Helmet from "react-helmet";
import NavigationBar from '../components/NavigationBar';
import NavigationBarItem from '../components/NavigationBarItem';
import AlertBox from '../components/AlertBox';

const MainLayout = (props) => (
      <div>
        <div className="application">
            <Helmet title="TransitLanka"  />
        </div>

        <NavigationBar title="TransitLanka">
            <NavigationBarItem class="active" text="Bus route data entry" link="/" />
            <NavigationBarItem text="Data verification" link="/verify" />
        </NavigationBar>

        {props.hasPopup &&
           <AlertBox type={props.popupType}
                     msg={props.popupMsg} />
         }

        {props.children}

      </div>
);

export default MainLayout;
