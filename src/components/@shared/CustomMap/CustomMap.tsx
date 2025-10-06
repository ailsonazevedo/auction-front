"use client";

import { LatLngExpression, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 19,
};
const UpdateMapCenter = ({ posix, zoom }: MapProps) => {
  const map = useMap();

  useEffect(() => {
    const defaultPos: LatLngTuple = [-5.08917, -42.80194];
    // Verifica se posix é [0, 0] ou nulo e substitui pelo valor padrão
    const position: LatLngTuple =
      Array.isArray(posix) && (posix[0] !== 0 || posix[1] !== 0)
        ? posix
        : defaultPos;

    map.setView(position, zoom ?? defaults.zoom);
  }, [posix, zoom, map]);

  return null;
};
const CustomMap = ({ posix, zoom = defaults.zoom }: MapProps) => {
  return (
    <MapContainer
      center={posix}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      zoom={zoom}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker draggable={false} position={posix}>
        <Popup>HEi</Popup>
      </Marker>
      <UpdateMapCenter posix={posix} zoom={zoom} />
    </MapContainer>
  );
};

export default CustomMap;
