import React, { Component } from 'react';
// import {
//   Switch,
//   Route
// } from 'react-router-dom';
import axios from 'axios';
import { RegionNav, HeadNav } from '../components/nav';
import Country from '../components/country';
import { REGION_API, TRACKING_API } from '../components/helper';

class RegionView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            tracking: [],
            fetchingCountry: false,
            fetchingTracking: false,
        }
    }

    getCountries = (url) => {
        console.log(`Getting Region Data... ${url}`);
        this.setState( {fetchingCountry: true} );
        axios.get(url)
            .then( ({data}) => {
                this.setState({countries: data, fetchingCountry: false});
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
                this.setState( {fetchingCountry: false} );
            })
    }

    getTracking = (url) => {
        console.log(`Getting Tracking Data... ${url}`);
        this.setState( {fetchingTracking: true} );

        axios.get(url)
            .then( ({data}) => {
                this.setState({tracking: data, fetchingTracking: false});
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
                this.setState( {fetchingTracking: false} );

            })
    }

    addTracking = (url, country) => {
        console.log(`Adding Tracking Data... ${url}`);
        this.setState( {fetchingTracking: true} );

        axios.post(url, country)
            .then( ({data}) => {
                console.log(`... Tracking for ${country.name} Successful`);
                this.setState({fetchingTracking: false});
                this.getTracking(url);
            })
            .catch( error => {
                if (error.response) {
                    console.log(`Error Response: ${error.response}`);
                } else if (error.request) {
                console.log(`Error Request: ${error.request}`);
                } else {
                console.log(`General Error: ${error.message}`);
                }
                console.log("Error has occured in adding tracking...");
                console.log(error);
                this.setState( {fetchingTracking: false} );

            })

    }

    componentDidMount() {
        const {match: {params: {region}}} = this.props;

        if( region ) {
            this.getCountries(`${REGION_API}/${region}`);
            this.getTracking(TRACKING_API);
        }
    }

    componentWillReceiveProps( newProps ) {
        const {match: {params: {region}}} = this.props;
        const newRegion = newProps.match.params.region;
        console.log(`CURRENT:  ${region}  NEW:  ${newRegion}`);
        if( (newRegion !== region) && newRegion ) {
            this.getCountries(`${REGION_API}/${newRegion}`);
            //this.getTracking(TRACKING_API);
        }
        this.getTracking(TRACKING_API);
    }

    render() {
        console.log("Display Region View...");
        const {match: {params: {region}}} = this.props;
        const {countries, tracking, fetchingCountry, fetchingTracking} = this.state;
        return (
            <div>
                <h1>World Regions</h1>
                <div className="row margin-top-medium">
                    <div className="medium-3 large-2 columns">
                        <HeadNav />
                        <RegionNav />
                    </div>

                    <div className="medium-9 large-10 columns text-center">
                        {
                            region ?
                                fetchingCountry || fetchingTracking ?
                                     <span className="loading-indicator xlarge"></span>
                                :
                                    countries.length > 0 ?
                                        countries.map( country => {
                                            const tracked = (tracking.filter( e => e.name === country.name ).length > 0);
                                            //console.log(`${country.name}  Tracked: ${tracked}`)
                                            return (
                                            <Country
                                                key={country.name}
                                                noEdit={true}
                                                buttonHandler={this.addTracking}
                                                history={this.props.history}
                                                country={ {...country, tracked: tracked} } />
                                        )})
                                    :
                                        <div data-notification="" className="notification-box alert">
                                            There was an issue loading countries...
                                            {/* <a href="#" class="close">&#xD7;</a> */}
                                        </div>
                            :
                                <span>&nbsp;</span>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default RegionView;