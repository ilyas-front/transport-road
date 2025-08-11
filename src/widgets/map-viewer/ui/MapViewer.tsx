import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useMapInteraction } from '@/features/hooks/useMapInteraction';
import { TravelTime } from '@/shared/ui';
import { MAP_CONFIG } from '@/shared/config';
import { StopMarkers } from './parts';
import 'leaflet/dist/leaflet.css';
export const MapViewer: React.FC = () => {
    const { handlers } = useMapInteraction();
    return (<div className="relative h-full w-full app">
      <MapContainer center={MAP_CONFIG.CENTER} zoom={MAP_CONFIG.ZOOM} minZoom={MAP_CONFIG.MIN_ZOOM} maxZoom={MAP_CONFIG.MAX_ZOOM} style={{ height: '100%', width: '100%', zIndex: 1 }} zoomControl={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <StopMarkers handlers={handlers}/>
      </MapContainer>
      <TravelTime />
    </div>);
};
