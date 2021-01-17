import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import MapboxGL from '@react-native-mapbox-gl/maps';
import { View } from 'react-native';
const { Camera, ShapeSource, SymbolLayer } = MapboxGL;

// const startIcon = require("../assets/start.png");
// const finishIcon = require("../assets/finish.png");
const markerIcon = require("../assets/marker.png"); 


const customStyles = {
  icon: {
    // iconImage: ["get", "icon"],
    iconImage: markerIcon,
    iconAllowOverlap: true,
    iconSize: 1,
  },
}

const cameraPadding = 16;

function generateGeoJSON(startPoint = [0, 0], finishPoint = [0, 0]) {
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: Math.random().toString("16"),
        properties: {
          icon: "start"
        },
        geometry: {
          type: 'Point',
          coordinates: startPoint,
        },
      },
      {
        type: 'Feature',
        id: Math.random().toString("16"),
        properties: {
          icon: "finish"
        },
        geometry: {
          type: 'Point',
          coordinates: finishPoint,
        },
      },
    ]
  }
}

const MapView = ({ startPoint, finishPoint }) => {

  const features = generateGeoJSON(startPoint, finishPoint);


  useEffect(() => {
    //TODO: Add ENV for token
    MapboxGL.setAccessToken("pk.eyJ1IjoidGVvZG9yc3RhbmlzaGV2IiwiYSI6ImNqeXZuOWNjNDBtb28zZG55cjMybDVsbGIifQ.UhFRQf-iDDcXC23V5qokCQ");
    MapboxGL.setTelemetryEnabled(true);
  }, []);

  // const [images, setImages] = useState({
  //   start: startIcon,
  //   finish: finishIcon
  // })

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        zoomEnabled={false}
        pitchEnabled={false}
        scrollEnabled={false}
        rotateEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <Camera
          maxZoomLevel={19}
          bounds={{
            ne: startPoint,
            sw: finishPoint,
            paddingLeft: cameraPadding,
            paddingRight: cameraPadding,
            paddingTop: cameraPadding,
            paddingBottom: cameraPadding
          }}
          animationDuration={1}
        />

        {/* <MapboxGL.Images
          nativeAssetImages={['pin']}
          images={images}
        /> */}

        <ShapeSource
          id="symbolLocationSource"
          shape={features}>
          <SymbolLayer
            id="symbolLocationSymbols"
            minZoomLevel={1}
            style={customStyles.icon}
          />
        </ShapeSource>

      </MapboxGL.MapView>

    </View>
  );
}


MapView.propTypes = {
  startPoint: PropTypes.arrayOf(PropTypes.number).isRequired,
  finishPoint: PropTypes.arrayOf(PropTypes.number).isRequired,

}

export default MapView;