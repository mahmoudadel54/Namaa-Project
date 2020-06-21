import React from "react";
import DrawControl from "react-mapbox-gl-draw";
import ReactMapboxGl, { Layer, Popup, Feature } from "react-mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl, { map } from "mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { render } from "@testing-library/react";
import { colors } from "@material-ui/core";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibWVubmFheW1hbiIsImEiOiJja2I1anpjNXIwdGpmMnJvOXJiZWNzMm90In0.doC5cK7Oe_4O5kHls6lhWg",
});

function Maps(props) {
  const [state, setState] = useState([]);

  useEffect(() => {
    const fetchData = async (res) => {
      await axios
        .get("http://localhost:200/footpath/", {})
        .then((res) => {
          console.log(res.data);
          setState(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();

    console.log(state);
  }, []);
  useEffect(() => {});

  const onDrawCreate = (features) => {
    console.log(features);
  };
  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  return (
    <div>
      <h2></h2>
      <Map
        //onClick={this._onClickMap}
        center={[31.639448, 30.101757]}
        zoom={[15]}
        style="mapbox://styles/mapbox/satellite-streets-v11" // eslint-disable-line
        containerStyle={{
          height: "600px",
          width: "50vw",
        }}
      >
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />

        <Layer
          type="line"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "blue",
            "line-width": 5,
          }} // eslint-disable-next-line
        >
          {state.map((p) => (
            <Feature
              onClick={() => props.setStateToFeature(p)}
              {...p}
              coordinates={p.geometry.coordinates}
            />
          ))}
        </Layer>
      </Map>
    </div>
  );
}
export default Maps;
