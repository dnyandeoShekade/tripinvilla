import React from 'react';
import { X, MapPin, Bed, Bath, Users, IndianRupee, Clock, CheckCircle2, Home, Phone, Mail, Hash } from 'lucide-react';

export default function PropertyViewModal({ property, onClose, inline = false }) {
  const [dynamicRooms, setDynamicRooms] = React.useState([]);
  const [allExperiences, setAllExperiences] = React.useState([]);
  const [showRooms, setShowRooms] = React.useState(false);

  React.useEffect(() => {
    if (property && property._id) {
      const fetchRooms = async () => {
        try {
          const token = localStorage.getItem("admin_token") || localStorage.getItem("owner_token");
          const res = await fetch(`${import.meta.env.VITE_API_BASE}/property-requests/property/${property._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            setDynamicRooms(Array.isArray(data) ? data : []);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchRooms();

      const fetchExperiences = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE}/master/experiences/active`);
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) setAllExperiences(data);
          }
        } catch (e) {
          console.error(e);
        }
      };
      fetchExperiences();
    }
  }, [property]);

  if (!property) return null;

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

  // FIX 1: No hardcoded fallback — show nothing if property has no rules
  const rules       = property.rules && property.rules.trim() !== '' ? property.rules : '';

  const checkIn     = property.checkIn || '3:00 PM';
  const checkOut    = property.checkOut || '12:00 PM';
  const bedRooms    = property.bedRooms || property.bedrooms || 1;
  const bathRooms   = property.bathRooms || property.bathrooms || 1;
  const capacity    = property.capacity || property.guests || 2;
  const price       = property.price || property.price_per_night || property.bestRoomRate || 0;
  const originalPrice = property.originalPrice || 0;
  const taxAmount   = property.taxAmount || 0;

  const getOwnerName = () => {
    if (property.ownerName && property.ownerName.trim() !== '') return property.ownerName;
    if (property.owner && typeof property.owner === 'object' && property.owner.name) return property.owner.name;
    return 'Unknown';
  };
  const getOwnerPhone = () => {
    if (property.ownerContact && property.ownerContact.trim() !== '') return property.ownerContact;
    if (property.owner && typeof property.owner === 'object' && property.owner.phone) return property.owner.phone;
    return '';
  };
  const getOwnerEmail = () => {
    if (property.owner && typeof property.owner === 'object' && property.owner.email) return property.owner.email;
    return '';
  };

  const ownerName  = getOwnerName();
  const ownerPhone = getOwnerPhone();
  const ownerEmail = getOwnerEmail();
  const location   = property.location || property.full_address || city;
  const propertyNo = property.propertyNo || property._id?.toString().slice(-6).toUpperCase() || '';

  // FIX 2: Use ONLY dynamicRooms fetched by property._id — never merge with embedded property.rooms
  const rooms = dynamicRooms;

  const experiences = Array.isArray(property.experiences) ? property.experiences : [];

  const parseCoordinate = (val, isLat) => {
    if (val === null || val === undefined) return null;
    let num = Number(val);
    if (isNaN(num)) return null;
    const limit = isLat ? 90 : 180;
    if (Math.abs(num) > limit) {
      let temp = num;
      while (Math.abs(temp) > limit) { temp = temp / 10; }
      num = temp;
    }
    return num;
  };

  const lat = parseCoordinate(property.latitude, true);
  const lng = parseCoordinate(property.longitude, false);
  const hasValidCoords = lat !== null && lng !== null && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180 && (lat !== 0 || lng !== 0);
  const latitude  = hasValidCoords ? lat : null;
  const longitude = hasValidCoords ? lng : null;

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
          {ownerName !== 'Unknown' && (
            <div style={{ padding: '14px 16px', background: '#F3F4F6', borderRadius: '12px' }}>
              <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Owner Details</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{ownerName}</div>
              {ownerPhone && <div style={{ fontSize: '12px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={11} />{ownerPhone}</div>}
              {ownerEmail && <div style={{ fontSize: '12px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={11} />{ownerEmail}</div>}
            </div>
          )}

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
              {experiences.map((exp, i) => {
                let expName = exp.experienceName || exp.name;
                if (!expName && typeof exp === 'string') {
                  const matched = allExperiences.find(x => x._id === exp || x.id === exp);
                  expName = matched ? matched.experienceName : exp;
                } else if (!expName) {
                  expName = exp;
                }
                if (expName && typeof expName === 'string' && /^[0-9a-fA-F]{24}$/.test(expName)) {
                  const matched = allExperiences.find(x => String(x._id) === expName || String(x.id) === expName);
                  if (matched) { expName = matched.experienceName; } else { return null; }
                }
                if (!expName) return null;
                return (
                  <span key={i} style={{ padding: '4px 12px', background: '#EFF6FF', color: '#2563EB', borderRadius: '20px', fontSize: '12px', fontWeight: 500 }}>
                    {expName}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Room Types */}
        {rooms.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <button
              onClick={() => setShowRooms(!showRooms)}
              style={{ width: '100%', padding: '12px', background: '#58A429', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '15px' }}
            >
              <Bed size={18} /> {showRooms ? 'Hide Room Details' : `View Room Details (${rooms.length} Room${rooms.length !== 1 ? 's' : ''})`}
            </button>

            {showRooms && (
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {rooms.map((room, idx) => {
                  const getValid = (arr, fallback) => arr.find(v => v && String(v).trim() !== '' && String(v) !== '·') || fallback;
                  const fallbackImg = images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80';
                  const roomImg       = getValid([room.imageUrl, room.room_image_url, room.img, Array.isArray(room.room_images) ? room.room_images[0] : null, Array.isArray(room.images) ? room.images[0] : null], fallbackImg);
                  const roomTitle     = getValid([room.roomName, room.room_type, room.roomType, room.title], 'Standard Room');
                  const roomBedType   = getValid([room.bedType, room.bed_type, room.beds], 'King Size');
                  const roomGuests    = getValid([room.maxGuests, room.capacity, room.guests], 2);
                  const roomCount     = getValid([room.count, room.rooms], 1);
                  const roomCheckIn   = getValid([room.checkIn, room.checkin_time], checkIn);
                  const roomCheckOut  = getValid([room.checkOut, room.checkout_time], checkOut);
                  const roomPrice     = Number(getValid([room.pricePerNight, room.price_per_room, room.price], price || 0));
                  const roomAmenities = Array.isArray(room.amenities) && room.amenities.length > 0
                    ? room.amenities
                    : (Array.isArray(room.amenities_types) && room.amenities_types.length > 0
                        ? room.amenities_types
                        : (Array.isArray(room.features) && room.features.length > 0 ? room.features : amenities));

                  // FIX 3: Only show rule sections that actually have points
                  const validRules = Array.isArray(room.rules)
                    ? room.rules.filter(rule => Array.isArray(rule.points) && rule.points.length > 0)
                    : [];

                  return (
                    <div key={idx} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '16px' }}>
                      <div style={{ display: 'flex', gap: '16px', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {roomImg && (
                          <img
                            src={roomImg}
                            alt={roomTitle}
                            onError={e => { e.target.style.display = 'none'; }}
                            style={{ width: 140, height: 100, objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                          />
                        )}
                        <div style={{ flex: 1, minWidth: '250px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                            <div>
                              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: '0 0 4px 0' }}>{roomTitle}</h4>
                              <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '4px' }}>
                                {roomBedType} bed · {roomGuests} guests · {roomCount} room{(roomCount > 1 || typeof roomCount === 'string') ? 's' : ''}
                              </div>
                              <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px', display: 'flex', gap: '12px' }}>
                                <span><Clock size={12} style={{ display: 'inline', marginRight: 4, transform: 'translateY(2px)' }} /> Check In: {roomCheckIn}</span>
                                <span><Clock size={12} style={{ display: 'inline', marginRight: 4, transform: 'translateY(2px)' }} /> Check Out: {roomCheckOut}</span>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '18px', fontWeight: 700, color: '#10B981' }}>
                                ₹{Number(roomPrice).toLocaleString()}
                              </div>
                              <div style={{ fontSize: '12px', color: '#6B7280' }}>per night</div>
                            </div>
                          </div>

                          {roomAmenities.length > 0 && (
                            <div style={{ marginTop: '12px' }}>
                              <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Room Amenities</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {roomAmenities.map((am, i) => (
                                  <span key={i} style={{ padding: '4px 10px', background: '#E0E7FF', color: '#4338CA', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
                                    {am}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* FIX 3: Only render Room Rules section when validRules has content */}
                          {validRules.length > 0 && (
                            <div style={{ marginTop: '12px' }}>
                              <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Room Rules</div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {validRules.map((rule, ri) => (
                                  <div key={ri} style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', color: '#78350F' }}>
                                    <strong style={{ color: '#B45309' }}>{rule.title || 'Rule'}:</strong> {rule.points.join(', ')}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* House Rules — FIX 1: only shown if property actually has rules in DB */}
        {rules && (
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: '0 0 8px 0' }}>House Rules</h3>
            <div style={{ background: '#FEF2F2', padding: '14px 16px', borderRadius: '10px', color: '#991B1B', fontSize: '13px', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {rules}
            </div>
          </div>
        )}

        {/* Map */}
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