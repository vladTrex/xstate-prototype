import React, { useState, useEffect } from 'react';
import MapGL, { Marker } from '@urbica/react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoidmxhZHRyZXgiLCJhIjoiY2w3bmQ3YW92MG1xYTN1bmI4Mm0xMDI2ZyJ9._R3DiXLbXFOTN1OtDcxHNw';

const style = {
    padding: '10px',
    color: '#fff',
    cursor: 'pointer',
    background: '#1978c8',
    borderRadius: '6px'
};

const onMarkerClick = (event) => {
    alert('You clicked on marker');
    event.stopPropagation();
};

const Map = ({ train = {} }) => {
    const { location: { lat, long } = {} } = train;

    const [viewport, setViewport] = useState({
        latitude: lat,
        longitude: long,
        zoom: 11
    });

    useEffect(() => {
        setViewport({
            latitude: lat,
            longitude: long,
            zoom: 11
        });
        // eslint-disable-next-line
    }, [train?.name]);

    return (
        <MapGL
            style={{ width: '100%', height: '500px' }}
            mapStyle='mapbox://styles/mapbox/light-v9'
            accessToken={MAPBOX_ACCESS_TOKEN}
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            zoom={viewport.zoom}
            onViewportChange={setViewport}
        >
            <Marker
                longitude={viewport.longitude}
                latitude={viewport.latitude + .018}
                onClick={onMarkerClick}
            >
                <div style={style}>{train?.name} - {train?.serialNumber} ✨</div>
            </Marker>
        </MapGL>
    );
};

export default Map;