import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
	GoogleMap,
	withScriptjs,
	withGoogleMap,
	Marker,
	InfoWindow
} from "react-google-maps";
import * as shelterData from "./data.json";
import "./locations.scss";

function Map() {
	const [selectedShelter, setSelectedShelter] = useState(null);
	return (
		<GoogleMap
			defaultZoom={11}
			defaultCenter={{ lat: 33.448376, lng: -112.074036 }}
		>
			{shelterData.features.map((shelter) => (
				<Marker
					key={shelter.properties.SHELTER_ID}
					position={{
						lat: shelter.geometry.coordinates[0],
						lng: shelter.geometry.coordinates[1]
					}}
					onClick={() => {
						setSelectedShelter(shelter);
					}}
				/>
			))}

			{selectedShelter && (
				<InfoWindow
					position={{
						lat: selectedShelter.geometry.coordinates[0],
						lng: selectedShelter.geometry.coordinates[1]
					}}
					onCloseClick={() => {
						setSelectedShelter(null);
					}}
				>
					<div>
						<h2 className="shelterName">{selectedShelter.properties.NAME}</h2>
						<p className="shelterinfo">{selectedShelter.properties.ADDRESS}</p>
						<a
							href={`https://${selectedShelter.properties.EMAIL}`}
							target="_blank"
						>
							<p className="shelterinfo">{selectedShelter.properties.EMAIL}</p>
						</a>
						<p className="shelterinfo">{selectedShelter.properties.PHONE}</p>
						<p className="shelterinfo">{selectedShelter.properties.NOTES}</p>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Locations() {
	return (
		<div style={{ width: "100vw", height: "100vh" }}>
			<WrappedMap
				googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
				loadingElement={<div style={{ height: "100%" }} />}
				containerElement={<div style={{ height: "100%" }} />}
				mapElement={<div style={{ height: "100%" }} />}
			/>
		</div>
	);
}
