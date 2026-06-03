import React from 'react';
import { X, MapPin, Bed, Bath, Users, IndianRupee, Clock, CheckCircle2, Home, Phone, Mail, Hash } from 'lucide-react';

export default function PropertyViewModal({ property, onClose, inline = false }) {
  const [dynamicRooms, setDynamicRooms] = React.useState([]);

  React.useEffect(() => {
    if (property && property._id) {
      const fetchRooms = async () => {
        try {
          const token = localStorage.getItem("admin_token") || localStorage.getItem("owner_token");
          const res = await fetch(`${import.meta.env.VITE_API_BASE}/property-requests/admin-direct/rooms?propertyId=${property._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setDynamicRooms(data);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchRooms();
    }
  }, [property]);

  if (!property) return null;

  // Normalize field names — the API spreads pObj so all raw model fields are available
  const name        = property.name || property.propertyName || 'Property Details';
  const city        = property.city || property.location || '';
  const type        = property.type || property.category || '';
  const status      = property.status || 'Unknown';
  const images      = Array.isArray(property.images) && property.images.length > 0
                        ? property.images
                        : (property.image ? [property.image] : []);
  const description = property.description || property.aboutProperty || '';
  const amenities   = Array.isArray(property.amenities) && property.amenities.length > 0
                        ? property.amenities
                        : (Array.isArray(property.amenityTypes) ? property.amenityTypes : []);
  const rules       = property.rules || '';
  const checkIn     = property.checkIn || '3:00 PM';
  const checkOut    = property.checkOut || '12:00 PM';
  const bedRooms    = property.bedRooms || property.bedrooms || 1;
  const bathRooms   = property.bathRooms || property.bathrooms || 1;
  const capacity    = property.capacity || property.guests || 2;
  const price       = property.price || property.price_per_night || property.bestRoomRate || 0;
  const originalPrice = property.originalPrice || 0;
  const taxAmount   = property.taxAmount || 0;
  const ownerName   = property.ownerName || (property.owner?.name) || 'Unknown';
  const ownerPhone  = property.ownerContact || (property.owner?.phone) || '';
  const ownerEmail  = property.owner?.email || '';
  const location    = property.location || property.full_address || city;
  const propertyNo  = property.propertyNo || property._id?.toString().slice(-6).toUpperCase() || '';
  // Rooms — actual rooms array (stored on model as `rooms`) combined with dynamically fetched rooms
  const baseRooms       = Array.isArray(property.roomsList) ? property.roomsList
                      : (Array.isArray(property.rooms) && property.rooms.length > 0 && typeof property.rooms[0] === 'object'
                          ? property.rooms
                          : []);
  const allRooms = [...baseRooms, ...dynamicRooms];
  const rooms = Array.from(new Map(allRooms.map(r => [r._id || Math.random(), r])).values());
  const experiences = Array.isArray(property.experiences) ? property.experiences : [];
  const latitude    = property.latitude;
  const longitude   = property.longitude;

  const pill = (color, bg, text) => ({
    padding: '2px 10px', background: bg, color, fontSize: '11px',
    fontWeight: 600, borderRadius: '12px', display: 'inline-block'
  });

  const containerStyle = inline 
    ? { position: 'relative', width: '100%', background: '#fff', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginTop: '24px' }
    : { position: 'relative', width: '100%', maxWidth: '860px', maxHeight: '90vh', background: '#fff', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' };

  const content = (
    <div id={inline ? "property-detail-div" : ""} style={containerStyle}>

        {/* ── Header ── */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: '#F9FAFB', flexShrink: 0 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              {propertyNo && <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>#{propertyNo}</span>}
              <span style={pill(status === 'Active' ? '#059669' : '#DC2626', status === 'Active' ? '#ECFDF5' : '#FEF2F2', status)}>{status}</span>
              {type && <span style={pill('#58A429', '#ECFDF5', type)}>{type}</span>}
            </div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111827' }}>{name}</h2>
            {location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: '13px', color: '#6B7280' }}>
                <MapPin size={13} /> {location}
              </div>
            )}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex', flexShrink: 0 }}
            onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
            <X size={20} color="#4B5563" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ overflowY: 'auto', padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Images gallery */}
          {images.length > 0 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', flexShrink: 0, minHeight: '168px' }}>
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.startsWith('http') ? img : `${window.location.origin}${img}`}
                  alt={`img-${idx}`}
                  onError={e => { e.target.style.display = 'none'; }}
                  style={{ height: '160px', width: '240px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0, border: '1px solid #E5E7EB' }}
                />
              ))}
            </div>
          )}
          {images.length === 0 && (
            <div style={{ height: '120px', background: '#F3F4F6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '13px' }}>
              No images uploaded
            </div>
          )}

          {/* Key info cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>

            {/* Owner */}
            <div style={{ padding: '14px 16px', background: '#F3F4F6', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Owner Details</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{ownerName}</div>
              {ownerPhone && <div style={{ fontSize: '12px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={11} />{ownerPhone}</div>}
              {ownerEmail && <div style={{ fontSize: '12px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} />{ownerEmail}</div>}
            </div>

            {/* Pricing */}
            <div style={{ padding: '14px 16px', background: '#F3F4F6', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pricing</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#58A429', display: 'flex', alignItems: 'center' }}>
                <IndianRupee size={16} />{Number(price).toLocaleString()}
              </div>
              <div style={{ fontSize: '11px', color: '#6B7280' }}>per night / room</div>
              {originalPrice > 0 && <div style={{ fontSize: '11px', color: '#9CA3AF', textDecoration: 'line-through', marginTop: 2 }}>₹{Number(originalPrice).toLocaleString()}</div>}
              {taxAmount > 0 && <div style={{ fontSize: '11px', color: '#6B7280' }}>+₹{taxAmount} tax</div>}
            </div>

            {/* Timings */}
            <div style={{ padding: '14px 16px', background: '#F3F4F6', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Check-In / Out</div>
              <div style={{ fontSize: '13px', color: '#111827', display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={13} /> In: <strong>{checkIn}</strong></div>
              <div style={{ fontSize: '13px', color: '#111827', display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}><Clock size={13} /> Out: <strong>{checkOut}</strong></div>
            </div>

            {/* Capacity */}
            <div style={{ padding: '14px 16px', background: '#F3F4F6', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capacity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}><Bed size={13} /> Bedrooms</span>
                  <strong>{bedRooms}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}><Bath size={13} /> Bathrooms</span>
                  <strong>{bathRooms}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4 }}><Users size={13} /> Max Guests</span>
                  <strong>{capacity}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>About Property</h3>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.7, margin: 0 }}>{description}</p>
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>Amenities</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {amenities.map((am, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: '#ECFDF5', color: '#059669', borderRadius: '20px', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <CheckCircle2 size={12} /> {am}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Unique Experiences */}
          {experiences.length > 0 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>Unique Experiences</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {experiences.map((exp, i) => (
                  <span key={i} style={{ padding: '4px 12px', background: '#EFF6FF', color: '#2563EB', borderRadius: '20px', fontSize: '12px', fontWeight: 500 }}>
                    {exp.experienceName || exp.name || exp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Room Types (for Hotel/Resort type properties) */}
          {rooms.length > 0 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>Room Types</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {rooms.map((room, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '12px 16px' }}>
                    {(room.imageUrl || (Array.isArray(room.room_images) && room.room_images[0])) && (
                      <img
                        src={room.imageUrl || room.room_images[0]}
                        alt=""
                        onError={e => { e.target.style.display = 'none'; }}
                        style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#111827', fontSize: '14px' }}>{room.roomName || room.room_type || room.roomType}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280', marginTop: 2 }}>
                        {room.roomType || room.room_type} · {room.bedType || room.bed_type || ''} bed · {room.maxGuests || room.capacity || 2} guests · {room.count || 1} room{(room.count || 1) > 1 ? 's' : ''}
                      </div>
                      {(room.amenities?.length > 0 || room.amenities_types?.length > 0) && (
                        <div style={{ fontSize: '11px', color: '#6B7280', marginTop: 2 }}>
                          Amenities: {(room.amenities || room.amenities_types).join(', ')}
                        </div>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, color: '#58A429', fontSize: '15px', flexShrink: 0 }}>
                      ₹{Number(room.pricePerNight || room.price_per_room || 0).toLocaleString()}/night
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* House Rules */}
          {rules && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>House Rules</h3>
              <div style={{ background: '#FEF2F2', padding: '14px 16px', borderRadius: '10px', color: '#991B1B', fontSize: '13px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {rules}
              </div>
            </div>
          )}

          {/* Map preview if lat/lng available */}
          {latitude && longitude && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>Location Map</h3>
              <div style={{ height: '180px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
                <iframe
                  title="Property Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
                />
              </div>
            </div>
          )}
        </div>
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      {content}
    </div>
  );
}
