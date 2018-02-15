import React, { Component } from 'react';
import axios from 'axios';
import { HeadNav } from '../components/nav';
import { COUNTRY_API, numberWithCommas } from '../components/helper';
import noImage from '../assets/no-image.jpg';

class CountryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingCountry: false,
            country: undefined
        }
    }


    getCountry = (url, country) => {
        console.log(`Getting Tracking Data... ${url}`);
        this.setState( {fetchingCountry: true} );

        axios.get(`${url}/${country}`)
            .then( ({data}) => {
                this.setState({country: data[0], fetchingCountry: false});
            })
            .catch( error => {
                if (error.response) {
                    console.log(`Error Response: ${error.response}`);
                } else if (error.request) {
                console.log(`Error Request: ${error.request}`);
                } else {
                console.log(`General Error: ${error.message}`);
                }
                console.log("Error has occured in loading data...");
                console.log(error);
                this.setState({fetchingCountry: false})

            })
    }

    componentDidMount() {
        const {match: {params: {country}}} = this.props;
        this.getCountry( COUNTRY_API, country);
    }

    render() {
        console.log("Display Country View...");
        const {country, fetchingCountry} = this.state;
        const countryName = this.props.match.params.country;
        console.log(country)
        return (
            <div>
                <h1>{countryName}</h1>
                <div className="row margin-top-medium">
                    <div className="medium-3 large-2 columns">
                        <HeadNav />
                    </div>

                    <div className="medium-9 large-10 columns margin-top-medium">
                        {
                            fetchingCountry ?
                                <p class="text-center">
                                    <span className="loading-indicator xlarge"></span>
                                </p>
                            :
                                country ?
                                    <div>
                                        <p><span style={ {fontWeight: 800, marginRight: 10} }>Capital:</span>{country.capital === "" ? <em>None</em> : country.captial}</p>
                                        <p><span style={ {fontWeight: 800, marginRight: 10} }>Currencies:</span></p>
                                        <ul style={ {listStyle: 'none'} }>
                                            {
                                                country.currencies.map( (currency, index) => (
                                                    <li key={index}>{`${currency.name} (${currency.symbol})`} </li>
                                                ))
                                            }
                                        </ul>
                                        <p><span style={ {fontWeight: 800, marginRight: 10} }>Languages:</span></p>
                                        <ul style={ {listStyle: 'none'} }>
                                            {
                                                country.languages.map( (language, index) => (
                                                    <li key={index}>{language.name} </li>
                                                ))
                                            }
                                        </ul>
                                        <p><span style={ {fontWeight: 800, marginRight: 10} }>Population:</span>{country.population === "" ? <em>Unknown</em> : numberWithCommas(country.population)}</p>
                                        <p><span style={ {fontWeight: 800, marginRight: 10} }>Flag:</span></p>
                                        <p className="padding-horiz-large" style={ {textAlign: 'center'} }>
                                            <img src={country.flag === "" ? noImage : country.flag} alt={`${country.name}'s Flag`} title={`${country.name}'s Flag`} />
                                        </p>
                                    </div>
                                :
                                    <h4><em>We aren't able to load details about {countryName}...</em></h4>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CountryView;