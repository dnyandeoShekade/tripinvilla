import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Star, Phone } from 'lucide-react';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create a custom divIcon for properties showing the price
const createPriceIcon = (price) => {
  return L.divIcon({
    className: 'custom-price-marker',
    html: `<div style="background-color: white; border: 1px solid #E5E7EB; border-radius: 20px; padding: 4px 8px; font-weight: bold; font-size: 13px; font-family: 'Outfit', sans-serif; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap; transition: all 0.2s;">
             ₹${price.toLocaleString('en-IN')}
           </div>`,
    iconSize: null,
    iconAnchor: [30, 15],
  });
};

const parseCoordinate = (val, isLat) => {
  if (val === null || val === undefined) return null;
  let num = Number(val);
  if (isNaN(num)) return null;
  const limit = isLat ? 90 : 180;
  if (Math.abs(num) > limit) {
    let temp = num;
    while (Math.abs(temp) > limit) {
      temp = temp / 10;
    }
    num = temp;
  }
  return num;
};

const getValidCoords = (property) => {
  const lat = parseCoordinate(property.latitude, true);
  const lng = parseCoordinate(property.longitude, false);
  if (lat !== null && lng !== null && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && (lat !== 0 || lng !== 0)) {
    return [lat, lng];
  }
  return null;
};

const ChangeMapView = ({ center, zoom, bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 1) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    } else if (center && center[0] && center[1]) {
      map.setView(center, zoom || map.getZoom());
    }
  }, [center, zoom, bounds, map]);
  return null;
};

export default function MapResultsView({ properties, onPropertyClick }) {
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India
  const [zoom, setZoom] = useState(5);
  const [validBounds, setValidBounds] = useState([]);

  useEffect(() => {
    // Determine the center based on the first valid property
    const validCoordsList = properties
      .map(p => getValidCoords(p))
      .filter(c => c !== null);
      
    setValidBounds(validCoordsList);

    if (validCoordsList.length > 0) {
      setMapCenter(validCoordsList[0]);
      setZoom(12);
    }
  }, [properties]);

  return (
    <div style={{ height: '100%', width: '100%', minHeight: '600px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', position: 'relative', zIndex: 1 }}>
      <MapContainer center={mapCenter} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView center={mapCenter} zoom={zoom} bounds={validBounds} />

        {properties.map((property) => {
          const coords = getValidCoords(property);
          if (!coords) return null;
          
          const priceNum = Number(String(property.price || property.bestRoomRate || 0).replace(/[^\d]/g, ''));

          return (
            <Marker 
              key={property._id} 
              position={coords}
              icon={createPriceIcon(priceNum)}
            >
              <Popup className="custom-map-popup">
                <div style={{ width: '220px', fontFamily: '"Outfit", sans-serif' }}>
                  <img 
                    src={property.img || property.image} 
                    alt={property.title || property.propertyName} 
                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                  />
                  <div style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0, color: '#111827', lineHeight: 1.2 }}>
                        {property.title || property.propertyName}
                      </h3>
                      <span style={{ display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', gap: '2px' }}>
                        <Star size={10} fill="#0C6DC4" color="#0C6DC4" />
                        {property.rating || '4.8'}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>{property.location}</p>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0 0 12px 0' }}>
                      ₹{priceNum.toLocaleString('en-IN')}<span style={{ fontSize: '11px', fontWeight: '400', color: '#6B7280' }}>/night</span>
                    </p>
                    
                    <button 
                      onClick={() => onPropertyClick(property)}
                      style={{ width: '100%', padding: '8px', background: '#0C6DC4', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
