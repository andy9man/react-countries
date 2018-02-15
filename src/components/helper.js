import React from 'react';
import {Link, Route} from 'react-router-dom';

export const TRACKING_API = "http://5a8471e93015220012486c05.mockapi.io/api/v1/countries";
export const REGION_API = "https://restcountries.eu/rest/v2/regionalbloc";
export const COUNTRY_API = "https://restcountries.eu/rest/v2/name";

export const CustomNav = ( {label, to, activeOnlyWhenExact, generalClassName} ) => {
    return (
      <Route path={to} exact={activeOnlyWhenExact} children={ ({match}) => {
        return (
        <li className={`${generalClassName}${match ? ' active' : ''}`}>
          <Link to={to} style={ {fontWeight: 'normal'} }>{label}</Link>
        </li>
        )}
      } />
    );
};

export const numberWithCommas = (x) => {
  if(x === undefined) { return x; }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}