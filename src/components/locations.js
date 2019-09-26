import React from "react";
import "./locations.scss";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

export function Locations() {
	function Map() {
		return (
			<GoogleMap
				defaultZoom={10}
				defaultCenter={{ lat: 33.448376, lng: -112.074036 }}
			/>
		);
	}
	const WrappedMap = withScriptjs(withGoogleMap(Map));
	return (
		<div className="map">
			<WrappedMap
				googleMapUrl={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
				loadingElement={<div style={{ height: "50%" }} />}
				containerElement={<div style={{ height: "50%" }} />}
				mapElement={<div style={{ height: "50%" }} />}
			/>
		</div>
	);
}
