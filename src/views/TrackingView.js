import React, { Component } from 'react';
import axios from 'axios';
import Country from '../components/country';
import { HeadNav } from '../components/nav';
import { TRACKING_API } from '../components/helper';

class TrackingView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchingTracking: true,
            tracking: []
        }
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
                this.setState({fetchingTracking: false})

            })
    }

    removeTracking = (url, id) => {
        console.log(`Delete Tracking Data... ${url}`);

        axios.delete(`${url}/${id}`)
            .then( response => {
                console.log(`... Removal of Tracking for ${id} Successful`);
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
            })
    }

    componentDidMount() {
        this.getTracking( TRACKING_API );
    }

    render() {
        console.log("Display Region View...");
        const {tracking, fetchingTracking} = this.state;

        return (
            <div>
                <h1>Country Tracking</h1>
                <div className="row margin-top-medium">
                    <div className="medium-3 large-2 columns">
                        <HeadNav />
                    </div>

                    <div className="medium-9 large-10 columns text-center">
                        {
                            fetchingTracking ?
                                <span className="loading-indicator xlarge"></span>
                            :
                                tracking.length > 0 ?
                                    tracking.map( country => (
                                        <Country
                                            country={country}
                                            noEdit={false}
                                            buttonHandler={this.removeTracking}
                                            key={country.name}
                                        />
                                    ))
                                :
                                    <h4><em>We currently aren't tracking any countries...</em></h4>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TrackingView;