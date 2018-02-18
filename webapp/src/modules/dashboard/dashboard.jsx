import React, { Component } from 'react';
import FaIcon from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/fontawesome-free-solid';
import './dashboard.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { withRouter, BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import googleMapStyling from '../components/googleMapStyling.json';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandMode : false,
            dashMapExpanded : false,
            plExplorerExpanded : false
        };
    }
    expand = (component) => {
        let expandMode = false;
        let dashMapExpanded = false;
        let plExplorerExpanded = false;

        if (this.state.expandMode && this.state[component + 'Expanded']) {
            expandMode = false;
            dashMapExpanded = false;
            plExplorerExpanded = false;
        } else {
            expandMode = true;
            dashMapExpanded = (component === 'dashMap') ? true : false;
            plExplorerExpanded = (component === 'plExplorer') ? true : false;
        }
        console.log(dashMapExpanded);
        console.log(plExplorerExpanded);
        this.setState({
            expandMode : expandMode,
            dashMapExpanded : dashMapExpanded,
            plExplorerExpanded : plExplorerExpanded
        });
        
    }
    render() {
        return (
        <div className="dashboard">
            <DashMapContainer expanded={this.state.dashMapExpanded} expand={() => {this.expand('dashMap')}}/>
            <PlaceExplorerContainer expanded={this.state.plExplorerExpanded} expand={() => {this.expand('plExplorer')}}/>
        </div>
        );
  }
}
const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    defaultOptions={{
       // these following 7 options turn certain controls off see link below
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        styles : googleMapStyling
      }}
    >
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
))

class DashMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mapClasses : (this.props.expanded ? 'dash_map mapExpanded' : 'dash_map')
        }
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            mapClasses : (newProps.expanded ? 'dash_map mapExpanded' : 'dash_map')
        });
    }
    render() {
        return(
            <div className={this.state.mapClasses} onClick={this.props.expand}>
                <Map 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkYJ0NYjfU4Df0-Xo4udYz9-8tC542R6Y&callback=initMap"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `115%` }} />}
                />
            </div>
        );
    }
}



class DashMapContainer extends Component {
    render() {
        return (
            <DashMap expanded={this.props.expanded} expand={this.props.expand} />
        );
    }
}

class PlaceExplorer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            plClasses : (this.props.expanded ? 'dash_placeExplorer plExpanded' : 'dash_placeExplorer')
        }
        
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            plClasses : (newProps.expanded ? 'dash_placeExplorer plExpanded' : 'dash_placeExplorer')
        });
    }
    render() {
        return(
            <div ref={explorer => this.plExplorer = explorer} className={this.state.plClasses}>
            <div className="dash_header" onClick={this.props.expand}>
                <FaIcon className="dash_headerIcon" icon={faPlus} />
                <input className="dash_search" type="text"/>
                <FaIcon className="dash_headerIcon" icon={faBars} />
            </div>
            <div className="dash_navBar">
                <ol className="dash_navList">
                    <Link to="/">Top</Link>
                    <Link to="/">Food</Link>
                    <Link to="/">Attractions</Link>
                    <Link to="/">Hotels</Link>
                </ol>
            </div>
            <div className="dash_contentBox">
                <div className="dash_place">
                    <img className="dash_placeImage" src="" alt=""/>
                </div>
                <div className="dash_place">
                    <img className="dash_placeImage" src="" alt=""/>
                </div>
                <div className="dash_place">
                    <img className="dash_placeImage" src="" alt=""/>
                </div>
                <div className="dash_place">
                    <img className="dash_placeImage" src="" alt=""/>   
                </div>
            </div>
        </div>
        );
    }
}

class PlaceExplorerContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return(
            <PlaceExplorer expanded={this.props.expanded} expand={this.props.expand}/>
        );
    }
}

export default withRouter(Dashboard);
