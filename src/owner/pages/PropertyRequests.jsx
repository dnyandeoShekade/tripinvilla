import React, { useState, useEffect, useRef } from 'react';
import { Trash2, ShieldAlert, Plus, CheckCircle } from 'lucide-react';
import { propertyService, propertyRequestService } from '../services/api';
import ReadMore from '../../admin/components/ReadMore';

const API_BASE = `${import.meta.env.VITE_API_BASE}`;

const defaultRules = [{ title: 'Must Read Rules', text: '• Primary Guest should be atleast 18 years of age.\n• Passport, Aadhaar, Driving License and Govt. ID are accepted as ID proof(s)' }];

const emptyRoom = () => ({
  room_type: '',
  bed_type: 'King Size',
  original_price: '',
  price_per_room: '',
  tax_amount: '',
  checkin_time: '02:00 PM',
  checkout_time: '12:00 PM',
});

export default function PropertyRequests() {
  const [properties, setProperties] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [propertyId, setPropertyId] = useState('');
  const [formData, setFormData] = useState(emptyRoom());
  const [roomTypes, setRoomTypes] = useState([]);
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [viewingRequest, setViewingRequest] = useState(null);
  const [rulesSections, setRulesSections] = useState(defaultRules);
  const [currentOffer, setCurrentOffer] = useState('');
  const [offersList, setOffersList] = useState(['20% Off']);
  const [manualRoomType, setManualRoomType] = useState(false);
  const fallbackRoomTypes = ['Standard Room', 'Deluxe Room', 'Super Deluxe Room', 'Executive Suite', 'Presidential Suite', 'Family Suite', 'Dormitory', 'Tent', 'Cottage', 'Villa'];
  const [selectedRoomImage, setSelectedRoomImage] = useState(null);
  const [roomImagePreview, setRoomImagePreview] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [amenitiesLoading, setAmenitiesLoading] = useState(false);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [availableExperiences, setAvailableExperiences] = useState([]);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [newCustomExp, setNewCustomExp] = useState("");
  // Multi-room queue
  const [roomQueue, setRoomQueue] = useState([]);
  const imageInputRef = useRef(null);

  const fetchAmenities = async (propertyType) => {
    setAmenitiesLoading(true);
    try {
      const scope = propertyType || 'All';
      const res = await fetch(`${API_BASE}/admin/amenities/active?scope=${scope}`);
      const data = await res.json();
      if (Array.isArray(data)) setAvailableAmenities(data.map(a => a.amenitiesName));
    } catch {
      setAvailableAmenities(['WiFi', 'Parking', 'Pool', 'AC', 'Kitchen', 'Barbeque', 'Gym', 'Breakfast']);
    } finally {
      setAmenitiesLoading(false);
    }
  };

  
  const handleAddCustomExperience = async () => {
    if (!newCustomExp.trim()) return;
    try {
      const API_ENDPOINT = typeof API !== 'undefined' ? API : `${import.meta.env.VITE_API_BASE}`;
      const res = await fetch(`${API_ENDPOINT}/master/experiences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experienceName: newCustomExp.trim(), representingIcon: '', status: 'Active' })
      });
      const data = await res.json();
      setAvailableExperiences(prev => [...prev, data]);
      setSelectedExperiences(prev => [...prev, data._id || data.experienceName || data.name]);
      setNewCustomExp('');
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExperiences = async () => {
    setExperiencesLoading(true);
    try {
      const res = await fetch(`${API_BASE}/master/experiences/active`);
      const data = await res.json();
      if (Array.isArray(data)) setAvailableExperiences(data);
    } catch {
      setAvailableExperiences([]);
    } finally {
      setExperiencesLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const propsRes = await propertyService.getMine();
      setProperties(propsRes.data);
      if (propsRes.data.length > 0) {
        const first = propsRes.data[0];
        setPropertyId(first._id);
        fetchAmenities(first.type);
      } else {
        fetchAmenities('All');
      }
      const reqsRes = await propertyRequestService.getMine();
      setRequests(reqsRes.data);
    } catch {
      fetchAmenities('All');
    }
    fetchExperiences();
    
    try {
      const rtRes = await fetch(`${API_BASE}/master/room-types`);
      const rtData = await rtRes.json();
      if (Array.isArray(rtData)) setRoomTypes(rtData);
    } catch {
      // fallback handled in render
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handlePropertyChange = (e) => {
    const propId = e.target.value;
    const sel = properties.find(p => p._id === propId);
    setPropertyId(propId);
    if (sel) { setSelectedAmenities([]); fetchAmenities(sel.type); }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const toggleAmenity = (a) => setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  
  const toggleExperience = (id) => setSelectedExperiences(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleAddRuleSection = () => setRulesSections(prev => [...prev, { title: '', text: '' }]);
  const handleRemoveRuleSection = (idx) => setRulesSections(prev => prev.filter((_, i) => i !== idx));
  const handleRuleSectionChange = (idx, field, value) => setRulesSections(prev => prev.map((s, i) => i === idx ? { ...s, [field]: value } : s));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
    setSelectedRoomImage(file);
    setRoomImagePreview(URL.createObjectURL(file));
  };

  const resetRoomForm = () => {
    setFormData(emptyRoom());
    setRulesSections(defaultRules);
    setOffersList([]);
    setCurrentOffer('');
    setSelectedRoomImage(null);
    setRoomImagePreview('');
    setSelectedAmenities([]);
    setSelectedExperiences([]);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // Add current room config to queue (upload image immediately)
  const handleAddToQueue = async () => {
    if (!propertyId) { alert('Select a property first.'); return; }
    if (!formData.room_type.trim()) { alert('Room Type is required.'); return; }
    if (!formData.price_per_room) { alert('Price per room is required.'); return; }

    setLoading(true);
    try {
      let roomImageUrl = '';
      if (selectedRoomImage) {
        const fd = new FormData();
        fd.append('images', selectedRoomImage);
        const res = await propertyService.uploadImages(fd);
        if (res.data?.urls?.length > 0) roomImageUrl = res.data.urls[0];
      }

      const formattedRules = rulesSections.map(sec => ({
        title: sec.title,
        points: sec.text.split('\n').filter(p => p.trim()).map(p => p.replace(/^[•\-\*]\s*/, '').trim())
      }));

      const roomEntry = {
        property_id: propertyId,
        room_type: formData.room_type,
        bed_type: formData.bed_type,
        original_price: formData.original_price ? Number(formData.original_price) : undefined,
        price_per_room: Number(formData.price_per_room),
        tax_amount: formData.tax_amount ? Number(formData.tax_amount) : undefined,
        room_image_url: roomImageUrl,
        amenities_types: [...selectedAmenities],
        experiences: [...selectedExperiences],
        offers: [...offersList],
        rules: formattedRules,
        _preview_img: roomImagePreview,
        checkin_time: formData.checkin_time || '02:00 PM',
        checkout_time: formData.checkout_time || '12:00 PM',
      };

      if (editingRoomId) {
        const token = localStorage.getItem('owner_token');
        await fetch(`${API_BASE}/property-requests/${editingRoomId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(roomEntry)
        });
        alert('Room updated successfully!');
        setEditingRoomId(null);
        fetchData();
      } else {
        setRoomQueue(prev => [...prev, roomEntry]);
      }
      resetRoomForm();
    } catch (err) {
      alert('Error preparing room: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromQueue = (idx) => setRoomQueue(prev => prev.filter((_, i) => i !== idx));

  // Submit all queued rooms
  const handleSubmitAll = async (e) => {
    e.preventDefault();
    if (roomQueue.length === 0) { alert('Add at least one room to the queue first.'); return; }
    setLoading(true);
    try {
      for (const room of roomQueue) {
        const { _preview_img, ...payload } = room;
        await propertyRequestService.add(payload);
      }
      alert(`${roomQueue.length} room(s) submitted successfully for Admin approval!`);
      setRoomQueue([]);
      fetchData();
    } catch (err) {
      alert('Error submitting: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this request?')) return;
    try { await propertyRequestService.delete(id); fetchData(); }
    catch { alert('Error deleting'); }
  };

  const handleEditRoom = (r) => {
    setEditingRoomId(r.id || r._id);
    setPropertyId(r.property_id || r.property?._id);
    
    // Check if it's a fallback room type or custom
    if (!fallbackRoomTypes.includes(r.room_type) && !roomTypes.some(rt => rt.name === r.room_type)) {
      setManualRoomType(true);
    } else {
      setManualRoomType(false);
    }

    setFormData({
      room_type: r.room_type || '',
      bed_type: r.bed_type || '',
      original_price: r.original_price || '',
      price_per_room: r.price_per_room || '',
      tax_amount: r.tax_amount || r.taxAmount || '',
      checkin_time: r.checkin_time || '02:00 PM',
      checkout_time: r.checkout_time || '12:00 PM',
    });
    
    setRoomImagePreview(r.room_image_url || r.image || '');
    setSelectedAmenities(r.amenities_types || []);
    setSelectedExperiences(r.experiences || []);
    setOffersList(r.offers && r.offers.length > 0 ? r.offers : []);
    
    if (Array.isArray(r.rules) && r.rules.length > 0) {
      setRulesSections(r.rules.map(rule => ({
        title: rule.title || '',
        text: Array.isArray(rule.points) ? rule.points.join('\n') : (rule.points || rule.text || '')
      })));
    } else {
      setRulesSections(defaultRules);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProperty = properties.find(p => p._id === propertyId);
  const categoryValue = selectedProperty ? selectedProperty.type : 'N/A';

  return (
    <div className="fade-in">
      <div style={{ height: '16px' }} />
      <div className="props-breadcrumb" style={{ margin: '0 39px 12px' }}>
        Property Management &gt; <span>Property Requests</span>
      </div>

      {properties.length === 0 ? (
        <div style={{ margin: '20px 39px', padding: '32px', background: '#FFFBEB', border: '1px solid #F59E0B', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <ShieldAlert size={28} color="#D97706" />
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#92400E', margin: '0 0 4px 0' }}>No Properties Listed Yet</h4>
            <p style={{ fontSize: '13px', color: '#B45309', margin: 0 }}>Add at least one property under "My Properties" before configuring room pricing.</p>
          </div>
        </div>
      ) : (
        <>
          {/* ─── ROOM FORM ─── */}
          <div className="dash-section" style={{ marginBottom: 16, padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', fontFamily: '"Outfit", sans-serif', margin: 0 }}>
                Configure Room Pricing &amp; Rules
              </h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                {editingRoomId && (
                  <button type="button" onClick={() => { setEditingRoomId(null); resetRoomForm(); }} style={{ padding: '8px 16px', background: '#F3F4F6', color: '#374151', border: '1px solid #D1D5DB', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '12.5px' }}>Cancel Edit</button>
                )}
                <button
                  type="button"
                  onClick={handleAddToQueue}
                  disabled={loading}
                  style={{ cursor: 'pointer', padding: '8px 20px', fontSize: '12.5px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {loading ? 'Processing...' : (editingRoomId ? 'Update Room' : <><Plus size={14} /> Add Room</>)}
                </button>
                {roomQueue.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSubmitAll}
                    disabled={loading}
                    style={{ cursor: 'pointer', padding: '8px 20px', fontSize: '12.5px', background: '#58A429', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600 }}
                  >
                    {loading ? 'Submitting...' : `Submit All Rooms (${roomQueue.length})`}
                  </button>
                )}
              </div>
            </div>

            {/* Property selector */}
            <div className="form-grid-3" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Property Name*</label>
                <select className="form-select" value={propertyId} onChange={handlePropertyChange} required>
                  {properties.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Category (Auto-filled)*</label>
                <input type="text" className="form-input" value={categoryValue} disabled style={{ background: '#F3F4F6', color: '#4B5563', cursor: 'not-allowed' }} />
              </div>
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label" style={{ marginBottom: 0 }}>Room Type*</label>
                  <button type="button" onClick={() => { setManualRoomType(!manualRoomType); setFormData({ ...formData, room_type: '' }); }} style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>
                    {manualRoomType ? '← Use Dropdown' : 'Enter Manually'}
                  </button>
                </div>
                {manualRoomType ? (
                  <input type="text" className="form-input" name="room_type" value={formData.room_type} onChange={handleInputChange} placeholder="e.g. Penthouse Suite" required style={{ marginTop: '6px' }} />
                ) : (
                  <select className="form-select" name="room_type" value={formData.room_type} onChange={handleInputChange} required style={{ marginTop: '6px' }}>
                    <option value="">Select Room Type</option>
                    {roomTypes.length > 0 
                      ? roomTypes.map(rt => <option key={rt._id || rt.name} value={rt.name}>{rt.name}</option>)
                      : fallbackRoomTypes.map(t => <option key={t} value={t}>{t}</option>)
                    }
                  </select>
                )}
              </div>
            </div>

            {/* Image, Bed, Prices */}
            <div className="form-grid-3" style={{ marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Upload Room Image (Max 5MB)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input ref={imageInputRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleImageChange}
                    style={{ flex: 1, padding: '8px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', background: '#fff' }} />
                  {roomImagePreview && (
                    <img src={roomImagePreview} alt="preview" style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #E5E7EB', flexShrink: 0 }} />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Bed Type*</label>
                <select className="form-select" name="bed_type" value={formData.bed_type} onChange={handleInputChange} required>
                  <option value="King Size">King Size</option>
                  <option value="Queen Size">Queen Size</option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Original Price (₹)</label>
                <input type="number" className="form-input" name="original_price" value={formData.original_price} onChange={handleInputChange} placeholder="e.g. 118350" />
              </div>
              <div className="form-group">
                <label className="form-label">Price per Room (₹/night)*</label>
                <input type="number" className="form-input" name="price_per_room" value={formData.price_per_room} onChange={handleInputChange} placeholder="₹ Amount" required />
              </div>
              <div className="form-group">
                <label className="form-label">Tax Amount (₹)</label>
                <input type="number" className="form-input" name="tax_amount" value={formData.tax_amount} onChange={handleInputChange} placeholder="e.g. 212" />
              </div>
              <div className="form-group">
                <label className="form-label">Check-In Time</label>
                <input type="text" className="form-input" name="checkin_time" value={formData.checkin_time} onChange={handleInputChange} placeholder="e.g. 02:00 PM" />
              </div>
              <div className="form-group">
                <label className="form-label">Check-Out Time</label>
                <input type="text" className="form-input" name="checkout_time" value={formData.checkout_time} onChange={handleInputChange} placeholder="e.g. 12:00 PM" />
              </div>
            </div>

            {/* Offers */}
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Multiple Offers/Discounts</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <input type="text" className="form-input" value={currentOffer} onChange={e => setCurrentOffer(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (currentOffer.trim()) { setOffersList(p => [...p, currentOffer.trim()]); setCurrentOffer(''); } } }}
                  placeholder="e.g. 20% Off flat, Breakfast Included" style={{ flex: 1 }} />
                <button type="button" onClick={() => { if (currentOffer.trim()) { setOffersList(p => [...p, currentOffer.trim()]); setCurrentOffer(''); } }}
                  style={{ padding: '8px 16px', background: '#58A429', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>
                  Add Offer
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {offersList.map((off, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', color: '#065F46', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', border: '1px solid #A7F3D0' }}>
                    <span>{off}</span>
                    <button type="button" onClick={() => setOffersList(p => p.filter((_, i) => i !== idx))} style={{ background: 'none', border: 'none', color: '#059669', cursor: 'pointer', padding: 0 }}>&times;</button>
                  </div>
                ))}
                {offersList.length === 0 && <span style={{ fontSize: '13px', color: '#6B7280' }}>No offers added.</span>}
              </div>
            </div>

            {/* Amenities */}
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                Amenities Types
                {selectedProperty && <span style={{ marginLeft: 8, fontSize: 11, color: '#9CA3AF', fontWeight: 400 }}>Showing for: <strong style={{ color: '#58A429' }}>{selectedProperty.type}</strong></span>}
              </label>
              {amenitiesLoading ? <div style={{ color: '#9CA3AF', fontSize: 13 }}>Loading amenities...</div> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {availableAmenities.map(a => (
                    <button type="button" key={a} onClick={() => toggleAmenity(a)}
                      style={{ padding: '5px 13px', borderRadius: '20px', border: selectedAmenities.includes(a) ? '1px solid #58A429' : '1px solid #D1D5DB', background: selectedAmenities.includes(a) ? '#ECFDF5' : '#fff', color: selectedAmenities.includes(a) ? '#58A429' : '#374151', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>
                      {a}
                    </button>
                  ))}
                    </div>
                  )}
            </div>

            {/* Dynamic House Rules */}
            <div style={{ marginBottom: '20px', padding: '16px', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <label className="form-label" style={{ margin: 0, fontWeight: 700 }}>House Rules Sections</label>
                <button type="button" onClick={handleAddRuleSection} style={{ padding: '6px 12px', background: '#2563EB', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                  + Add Section
                </button>
              </div>
              
              {rulesSections.map((sec, idx) => (
                <div key={idx} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px', marginBottom: '10px', position: 'relative' }}>
                  <button type="button" onClick={() => handleRemoveRuleSection(idx)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                    &times;
                  </button>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label className="form-label">Section Title*</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={sec.title} 
                      onChange={e => handleRuleSectionChange(idx, 'title', e.target.value)} 
                      placeholder="e.g. Must Read Rules" 
                      required 
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Rules Text (one rule per line)*</label>
                    <textarea 
                      className="form-textarea" 
                      value={sec.text} 
                      onChange={e => handleRuleSectionChange(idx, 'text', e.target.value)} 
                      placeholder="e.g. • Primary Guest should be atleast 18 years of age." 
                      style={{ minHeight: '60px', padding: '8px 12px', width: '100%', border: '1px solid #D1D5DB', borderRadius: '8px' }}
                      required 
                    />
                  </div>
                </div>
              ))}
              {rulesSections.length === 0 && (
                <div style={{ fontSize: '13px', color: '#6B7280', fontStyle: 'italic', textAlign: 'center', padding: '10px 0' }}>No rule sections added.</div>
              )}
            </div>

          </div>

          {/* ─── ROOM QUEUE PREVIEW ─── */}
          {roomQueue.length > 0 && (
            <div className="dash-section" style={{ marginBottom: 16, padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Rooms Ready to Submit ({roomQueue.length})
                </h3>
                <button type="button" onClick={handleSubmitAll} disabled={loading}
                  style={{ cursor: 'pointer', padding: '8px 24px', fontSize: '13px', background: '#58A429', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600 }}>
                  {loading ? 'Submitting...' : `Submit All ${roomQueue.length} Room(s)`}
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {roomQueue.map((room, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '10px 16px', minWidth: '220px' }}>
                    {room._preview_img ? (
                      <img src={room._preview_img} alt={room.room_type} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                    ) : (
                      <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <CheckCircle size={22} color="#10B981" />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#065F46', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{room.room_type}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280' }}>{room.bed_type} · ₹{room.price_per_room}/night</div>
                    </div>
                    <button type="button" onClick={() => handleRemoveFromQueue(idx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', flexShrink: 0 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── SUBMITTED REQUESTS TABLE ─── */}
          <div className="dash-section" style={{ marginBottom: 24, padding: '24px' }}>
            <div className="chart-card" style={{ padding: 0, overflow: 'hidden', borderRadius: 12, border: 'none', boxShadow: 'none' }}>
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table" style={{ whiteSpace: 'nowrap' }}>
                  <thead>
                    <tr>
                      {['Property', 'Category', 'Room Type', 'Bed', 'Amenities', 'Price', 'Timings', 'Rules', 'Offers', 'Status', 'Actions'].map((h, i) => (
                        <th key={i} style={{ color: '#374151', fontWeight: 600, padding: '14px 16px', textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length > 0 ? requests.map((r, i) => {
                      const statusLabel = r.admin_status || 'pending';
                      const statusBg = statusLabel === 'approved' ? '#DCFCE7' : statusLabel === 'rejected' ? '#FEE2E2' : '#FEF3C7';
                      const statusColor = statusLabel === 'approved' ? '#58A429' : statusLabel === 'rejected' ? '#EF4444' : '#D97706';
                      return (
                        <tr key={i}>
                          <td style={{ color: '#111827', fontWeight: 500, padding: '14px 16px' }}><ReadMore maxWords={2}>{r.propertyName}</ReadMore></td>
                          <td style={{ color: '#6B7280', padding: '14px 16px' }}>{r.category}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {r.room_image_url && <img src={r.room_image_url} alt={r.room_type} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />}
                              <span style={{ color: '#6B7280' }}>{r.room_type}</span>
                            </div>
                          </td>
                          <td style={{ color: '#6B7280', padding: '14px 16px' }}>{r.bed_type}</td>
                          <td style={{ color: '#6B7280', padding: '14px 16px' }}>{r.amenities_types?.length > 0 ? r.amenities_types.join(', ') : 'None'}</td>
                          <td style={{ color: '#111827', fontWeight: 600, padding: '14px 16px' }}>₹{r.price_per_room}</td>
                          <td style={{ color: '#6B7280', padding: '14px 16px' }}>
                            <div>In: {r.checkin_time || '02:00 PM'}</div>
                            <div>Out: {r.checkout_time || '12:00 PM'}</div>
                          </td>
                          <td style={{ color: '#6B7280', padding: '14px 16px' }}>{Array.isArray(r.rules) ? `${r.rules.length} section(s)` : (r.rules?.length > 35 ? `${r.rules.substring(0, 35)}...` : r.rules)}</td>
                          <td style={{ color: '#111827', fontWeight: 600, padding: '14px 16px' }}>{r.offers?.length > 0 ? r.offers.join(', ') : 'None'}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: statusBg, color: statusColor }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} /> {statusLabel.toUpperCase()}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button type="button" onClick={() => setViewingRequest(r)} style={{ color: '#0C6DC4', background: '#EFF6FF', border: 'none', borderRadius: 6, padding: 6, cursor: 'pointer' }} title="View Details">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                              </button>
                              <button type="button" onClick={() => handleEditRoom(r)} style={{ color: '#2563EB', background: '#EFF6FF', border: 'none', borderRadius: 6, padding: 6, cursor: 'pointer' }} title="Edit Room">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                              </button>
                              <button type="button" onClick={() => handleDelete(r._id)} style={{ color: '#EF4444', background: '#FEE2E2', border: 'none', borderRadius: 6, padding: 6, cursor: 'pointer' }} title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr><td colSpan="12" style={{ textAlign: 'center', padding: '20px', color: '#6B7280' }}>No property requests submitted yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {viewingRequest && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }} onClick={() => setViewingRequest(null)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: '600px', maxHeight: '90vh', background: '#fff', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
            
            {/* Header */}
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F9FAFB' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#111827' }}>Room Request Details</h2>
                <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{viewingRequest.propertyName} · {viewingRequest.category}</div>
              </div>
              <button onClick={() => setViewingRequest(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '50%', display: 'flex' }}
                onMouseOver={e => e.currentTarget.style.background = '#E5E7EB'} onMouseOut={e => e.currentTarget.style.background = 'none'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Content */}
            <div style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Image & Title */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img src={viewingRequest.room_image_url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60'} alt={viewingRequest.room_type} style={{ width: '120px', height: '90px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #E5E7EB' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#111827' }}>{viewingRequest.room_type}</h3>
                  <div style={{ fontSize: '13px', color: '#4B5563' }}>Bed Type: <strong>{viewingRequest.bed_type}</strong></div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#58A429', marginTop: '6px' }}>₹{viewingRequest.price_per_room}/night</div>
                </div>
              </div>

              {/* Specs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500, marginBottom: 2 }}>Original Price</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#9CA3AF', textDecoration: viewingRequest.original_price ? 'line-through' : 'none' }}>
                    {viewingRequest.original_price ? `₹${Number(viewingRequest.original_price).toLocaleString()}` : '—'}
                  </div>
                </div>
                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500, marginBottom: 2 }}>Tax Amount</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>
                    {viewingRequest.tax_amount ? `₹${Number(viewingRequest.tax_amount).toLocaleString()}` : '—'}
                  </div>
                </div>
              </div>

              {/* Check-In / Check-Out */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500, marginBottom: 2 }}>Check-In Time</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{viewingRequest.checkin_time || '02:00 PM'}</div>
                </div>
                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '10px 14px' }}>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500, marginBottom: 2 }}>Check-Out Time</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{viewingRequest.checkout_time || '12:00 PM'}</div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#374151', margin: '0 0 6px 0' }}>Amenities</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {viewingRequest.amenities_types?.length > 0 ? viewingRequest.amenities_types.map((a, i) => (
                    <span key={i} style={{ padding: '3px 10px', background: '#ECFDF5', color: '#059669', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>{a}</span>
                  )) : <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>No amenities selected</span>}
                </div>
              </div>

              {/* Offers */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#374151', margin: '0 0 6px 0' }}>Offers & Discounts</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {viewingRequest.offers?.length > 0 ? viewingRequest.offers.map((o, i) => (
                    <span key={i} style={{ padding: '3px 10px', background: '#EFF6FF', color: '#2563EB', borderRadius: '12px', fontSize: '12px', fontWeight: 500 }}>{o}</span>
                  )) : <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>No offers added</span>}
                </div>
              </div>

              {/* Rules */}
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#374151', margin: '0 0 6px 0' }}>House Rules</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {Array.isArray(viewingRequest.rules) && viewingRequest.rules.length > 0 ? viewingRequest.rules.map((rule, i) => (
                    <div key={i} style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '10px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#B45309', marginBottom: '4px' }}>{rule.title}</div>
                      <div style={{ fontSize: '12px', color: '#78350F', whiteSpace: 'pre-wrap' }}>
                        {Array.isArray(rule.points) ? rule.points.map(p => `• ${p}`).join('\n') : rule.points}
                      </div>
                    </div>
                  )) : <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>No custom rules added</span>}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
