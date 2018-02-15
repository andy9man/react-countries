import React from 'react';
import { numberWithCommas, TRACKING_API } from '../components/helper';
import noImage from '../assets/no-image.jpg';


const Country = props => {
    const {id, name, flag, currencies, capital, languages, population, tracked} = props.country;
    const {noEdit, buttonHandler, history} = props;
    return (
        <div className="card margin-vert-medium">
            <div className="row">
                <div className="columns small-12 medium-3 large-3">
                    <img
                        src={flag === "" ? noImage : flag}
                        alt={`${name}'s Flag`}
                        title={name}
                        onClick={ () => history.push(`/countries/${name}`)}
                    />
                </div>
                <div className="columns small-12 medium-7 large-7">
                    <h4 className="text-center">{name}</h4>
                    <p><span style={ {fontWeight: 800, marginRight: 10} }>Capital:</span>{capital}</p>
                    <p><span style={ {fontWeight: 800, marginRight: 10} }>Population:</span>{numberWithCommas(population)}</p>
                </div>

                <div style={ {height: 115, display: 'flex', justifyContent: 'center', alignItems: 'center'} } className="columns small-12 medium-2 large-2">
                    {
                        noEdit ?

                            <button
                                className="button btn-cta expand"
                                disabled={tracked}
                                onClick={ () => {
                                    buttonHandler(TRACKING_API, {name, flag, currencies, capital, languages, population, tracked: true});
                                }}
                            >{tracked ? "Tracked" : "Track"}</button>
                        :
                            <button
                                className="button btn-cta alert expand"
                                onClick={ () => {
                                    buttonHandler(TRACKING_API, id);
                                }}>
                                Tracked
                            </button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Country;