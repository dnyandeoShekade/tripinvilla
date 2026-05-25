import { Edit2, Heart, Inbox, MapPin, MessageSquare, Star, User } from 'lucide-react';
import {
  areaIcon,
  bedIcon,
  enquiriesHeroImg,
  filterIcon,
  guestIcon,
  profileHeroImg,
  reviewsHeroImg,
  roomIcon,
  wishlistHeroImg,
} from '../../assets';

export default function AccountPages(props) {
  const {
    activeMenu,
    token,
    user,
    setActiveMenu,
    openLoginModal,
    openEditProfileModal,

    // Wishlist
    isWishlistFilterOpen,
    setIsWishlistFilterOpen,
    wishlistSearchQuery,
    setWishlistSearchQuery,
    wishlistSortOption,
    setWishlistSortOption,

    mapDbProperties,
    API_BASE,
    fetchProfileAndEnquiries,
    setAuthMode,
    setAuthModalOpen,
    setSelectedProperty,
    setContactStep,
    setContactModalOpen,

    // Enquiries
    isEnquiryFilterOpen,
    setIsEnquiryFilterOpen,
    enquirySearchQuery,
    setEnquirySearchQuery,
    enquiryStatusFilter,
    setEnquiryStatusFilter,
    liveEnquiries,

    // Reviews
    isReviewsFilterOpen,
    setIsReviewsFilterOpen,
    reviewsRatingFilter,
    setReviewsRatingFilter,
    userReviews,
  } = props;

  return (
    <>
      {/* ══ CONDITIONAL ROUTING ══ */}

      {/* VIEW A: MY PROFILE (MY ACCOUNT) PAGE VIEW */}
      {activeMenu === 'Profile' && (
        <div className="account-dashboard-wrapper fade-in">
          
          {/* Custom scenic high-resolution profile banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${profileHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>My Profile</h1>
          </div>

          <div className="dashboard-content-box">
            <h2 className="dashboard-section-main">My Account</h2>
            <p className="dashboard-section-sub">Manage your bookings, wishlist, and personal details here.</p>

            {/* Sub-navigation Capsule Row */}
            <div className="dashboard-capsule-nav">
              <button className="capsule-btn active" onClick={() => setActiveMenu('Profile')}>
                <User size={15} />
                <span>My Account</span>
              </button>
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Wishlist'); }}>
                <Heart size={15} />
                <span>Wishlist</span>
              </button>
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Enquiries'); }}>
                <Inbox size={15} />
                <span>My Enquiries</span>
              </button>
              <button className="capsule-btn" onClick={() => setActiveMenu('Reviews')}>
                <MessageSquare size={15} />
                <span>My Reviews</span>
              </button>
            </div>

            {/* Profile Grid Card details */}
            <div className="profile-detail-card">
              
              {/* Header Avatar and Name row */}
              <div className="profile-card-avatar-row">
                <div className="profile-avatar-large">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Rohan Sharma" />
                </div>
                <div className="profile-avatar-info">
                  <h3 className="profile-user-fullname">{user?.name || 'User'}</h3>
                </div>
              </div>

              {/* Personal Info Grid Block */}
              <div className="profile-grid-block">
                <div className="block-header">
                  <h4>Personal Information</h4>
                  <button className="btn-edit-details" onClick={openEditProfileModal}>
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="block-fields-grid">
                  <div className="field-cell">
                    <span className="field-cell-lbl">First Name</span>
                    <span className="field-cell-val">{user?.name?.split(' ')[0] || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Last Name</span>
                    <span className="field-cell-val">{user?.name?.split(' ').slice(1).join(' ') || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Country of Citizenship</span>
                    <span className="field-cell-val">{user?.citizenship || 'India'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Email Address</span>
                    <span className="field-cell-val">{user?.email || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Phone Number</span>
                    <span className="field-cell-val">{user?.phone || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Country of Residence</span>
                    <span className="field-cell-val">{user?.residence || 'India'}</span>
                  </div>
                </div>
              </div>

              {/* Address Grid Block */}
              <div className="profile-grid-block">
                <div className="block-header">
                  <h4>Address</h4>
                  <button className="btn-edit-details" onClick={openEditProfileModal}>
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="block-fields-grid">
                  <div className="field-cell full-width">
                    <span className="field-cell-lbl">Home Address</span>
                    <span className="field-cell-val">{user?.address || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Pin Code</span>
                    <span className="field-cell-val">{user?.pincode || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">State</span>
                    <span className="field-cell-val">{user?.state || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">City</span>
                    <span className="field-cell-val">{user?.city || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Other Details Grid Block */}
              <div className="profile-grid-block" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className="block-header">
                  <h4>Other Details</h4>
                  <button className="btn-edit-details" onClick={openEditProfileModal}>
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="block-fields-grid">
                  <div className="field-cell">
                    <span className="field-cell-lbl">Emergency Contact Person</span>
                    <span className="field-cell-val">{user?.emergencyName || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Phone Number</span>
                    <span className="field-cell-val">{user?.emergencyPhone || 'N/A'}</span>
                  </div>
                  <div className="field-cell">
                    <span className="field-cell-lbl">Email Address</span>
                    <span className="field-cell-val">{user?.emergencyEmail || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Access Grid Block for Owners/Admins */}
              {user && (user.role === 'owner' || user.role === 'admin' || user.role === 'super_admin') && (
                <div className="profile-grid-block" style={{ borderTop: '1px solid #E5E7EB', paddingTop: 20, marginTop: 20 }}>
                  <div className="block-header">
                    <h4>Dashboard Access</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                    {(user.role === 'owner') && (
                      <button
                        className="btn-login"
                        onClick={() => window.location.href = '/owner/dashboard'}
                        style={{ background: '#58A429', color: '#FFF', fontWeight: 600, border: 'none', borderRadius: '8px', padding: '10px 24px', cursor: 'pointer' }}
                      >
                        Go to Owner Dashboard
                      </button>
                    )}
                    {(user.role === 'admin' || user.role === 'super_admin') && (
                      <button
                        className="btn-login"
                        onClick={() => window.location.href = '/admin/dashboard'}
                        style={{ background: '#2563EB', color: '#FFF', fontWeight: 600, border: 'none', borderRadius: '8px', padding: '10px 24px', cursor: 'pointer' }}
                      >
                        Go to Admin Dashboard
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* VIEW B: MY WISHLIST PAGE VIEW */}
      {activeMenu === 'Wishlist' && (
        <div className="account-dashboard-wrapper fade-in">
          
          {/* Custom scenic high-resolution wishlist banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${wishlistHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>My Wishlist</h1>
          </div>

          <div className="dashboard-content-box">
            <div className="wishlist-title-header-row">
              <h2 className="dashboard-section-main">Wishlist</h2>
              <button className="btn-wishlist-filter" onClick={() => setIsWishlistFilterOpen(!isWishlistFilterOpen)}>
                <img src={filterIcon} alt="Filter" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span>Filters</span>
              </button>
            </div>
            <p className="dashboard-section-sub">Keep track of destinations and villas you love. Access them anytime and make your travel planning simple.</p>

            {isWishlistFilterOpen && (
              <div className="filter-panel-box" style={{ display: 'flex', gap: '16px', margin: '16px 0', padding: '16px', background: '#FAFAFA', borderRadius: '10px', border: '1px solid #E5E7EB', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>Search Stays</label>
                  <input 
                    type="text" 
                    placeholder="Search by villa name or location..." 
                    value={wishlistSearchQuery}
                    onChange={e => setWishlistSearchQuery(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>Sort By</label>
                  <select 
                    value={wishlistSortOption}
                    onChange={e => setWishlistSortOption(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#fff' }}
                  >
                    <option value="All">Default (Saved Date)</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Guest Rating</option>
                  </select>
                </div>
              </div>
            )}

            {/* Sub-navigation Capsule Row */}
            <div className="dashboard-capsule-nav">
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Profile'); }}>
                <User size={15} />
                <span>My Account</span>
              </button>
              <button className="capsule-btn active" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Wishlist'); }}>
                <Heart size={15} />
                <span>Wishlist</span>
              </button>
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Enquiries'); }}>
                <Inbox size={15} />
                <span>My Enquiries</span>
              </button>
              <button className="capsule-btn" onClick={() => setActiveMenu('Reviews')}>
                <MessageSquare size={15} />
                <span>My Reviews</span>
              </button>
            </div>

            {/* Saved villas wishlist grid layout */}
            <div className="villas-grid" style={{ marginTop: '40px' }}>
              {(() => {
                const wishlistProps = user && user.wishlist ? mapDbProperties(user.wishlist, []) : [];
                const filtered = wishlistProps.filter(villa => {
                  const matchesSearch = !wishlistSearchQuery || 
                    (villa.title && villa.title.toLowerCase().includes(wishlistSearchQuery.toLowerCase())) ||
                    (villa.location && villa.location.toLowerCase().includes(wishlistSearchQuery.toLowerCase()));
                  return matchesSearch;
                });
                if (wishlistSortOption === 'price-low-high') {
                  filtered.sort((a, b) => a.price - b.price);
                } else if (wishlistSortOption === 'price-high-low') {
                  filtered.sort((a, b) => b.price - a.price);
                } else if (wishlistSortOption === 'rating') {
                  filtered.sort((a, b) => b.rating - a.rating);
                }
                if (filtered.length === 0) {
                  return <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#6B7280' }}>Your wishlist is empty or no stays match your criteria.</p>;
                }
                return filtered.map((villa, idx) => {
                  const isWishlisted = user && user.wishlist && user.wishlist.some(w => w._id === villa._id || w === villa._id);
                  return (
                    <div key={idx} className="recommend-property-card">
                      <div className="recommend-card-img-wrap">
                        <img src={villa.img} alt={villa.title} />
                        <button 
                          className={`recommend-heart-circle ${isWishlisted ? 'liked' : ''}`}
                          onClick={async (e) => {
                            e.stopPropagation();
                            if (!token) {
                              setAuthMode('login');
                              setAuthModalOpen(true);
                              return;
                            }
                            try {
                              const res = await fetch(`${API_BASE}/users/wishlist/${villa._id}`, {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  Authorization: `Bearer ${token}`
                                }
                              });
                              if (res.ok) {
                                fetchProfileAndEnquiries(token);
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <Heart size={16} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : '#FFFFFF'} />
                        </button>
                      </div>
                      
                      <div className="recommend-card-info-col">
                        <h3 className="recommend-card-name-text">{villa.title}</h3>
                        
                        <div className="recommend-card-location-row">
                          <span>{villa.location}</span>
                          <MapPin size={13} color="#9CA3AF" />
                        </div>

                        <div className="recommend-specs-2x2-grid">
                          <div className="recommend-spec-pill">
                            <img src={areaIcon} alt="Area" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                            <span>Area Size: {(villa.bedRooms || 2) * 150} sq. ft.</span>
                          </div>
                          <div className="recommend-spec-pill">
                            <img src={bedIcon} alt="Beds" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                            <span>Beds: {villa.bedRooms || 2} Beds</span>
                          </div>
                          <div className="recommend-spec-pill">
                            <img src={roomIcon} alt="Rooms" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                            <span>Rooms: {villa.bedRooms || 1} Room</span>
                          </div>
                          <div className="recommend-spec-pill">
                            <img src={guestIcon} alt="Guests" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                            <span>Guests: {villa.capacity || 3} Person</span>
                          </div>
                        </div>

                        <div className="recommend-price-tag-row">
                          <span className="price-label">Starting from</span>
                          <span className="price-green-bold">
                            {String(villa.price).startsWith('₹') ? villa.price : '₹' + villa.price}/night
                          </span>
                        </div>

                        <div className="recommend-actions-row">
                          <button className="recommend-details-btn-blue" onClick={() => { setSelectedProperty(villa); setActiveMenu('Detail'); }}>View Details</button>
                          <button className="recommend-contact-btn-green" onClick={() => { setSelectedProperty(villa); setContactStep(1); setContactModalOpen(true); }}>Contact Owner</button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

          </div>
        </div>
      )}

      {/* VIEW B-2: MY ENQUIRIES PAGE VIEW */}
      {activeMenu === 'Enquiries' && (
        <div className="account-dashboard-wrapper fade-in">
          
          {/* Custom scenic high-resolution enquiries banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${enquiriesHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>My Enquiries</h1>
          </div>

          <div className="dashboard-content-box">
            <div className="wishlist-title-header-row">
              <h2 className="dashboard-section-main">My Enquiries</h2>
              <button className="btn-wishlist-filter" onClick={() => setIsEnquiryFilterOpen(!isEnquiryFilterOpen)}>
                <img src={filterIcon} alt="Filter" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span>Filters</span>
              </button>
            </div>
            <p className="dashboard-section-sub">Manage your enquiries details from here</p>

            {isEnquiryFilterOpen && (
              <div className="filter-panel-box" style={{ display: 'flex', gap: '16px', margin: '16px 0', padding: '16px', background: '#FAFAFA', borderRadius: '10px', border: '1px solid #E5E7EB', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>Search Enquiries</label>
                  <input 
                    type="text" 
                    placeholder="Search by villa name or message..." 
                    value={enquirySearchQuery}
                    onChange={e => setEnquirySearchQuery(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>Status Filter</label>
                  <select 
                    value={enquiryStatusFilter}
                    onChange={e => setEnquiryStatusFilter(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#fff' }}
                  >
                    <option value="All">All Enquiries</option>
                    <option value="Open">Open</option>
                    <option value="Replied">Replied</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            )}

            {/* Sub-navigation Capsule Row */}
            <div className="dashboard-capsule-nav">
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Profile'); }}>
                <User size={15} />
                <span>My Account</span>
              </button>
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Wishlist'); }}>
                <Heart size={15} />
                <span>Wishlist</span>
              </button>
              <button className="capsule-btn active" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Enquiries'); }}>
                <Inbox size={15} />
                <span>My Enquiries</span>
              </button>
              <button className="capsule-btn" onClick={() => setActiveMenu('Reviews')}>
                <MessageSquare size={15} />
                <span>My Reviews</span>
              </button>
            </div>

            {/* Enquiries horizontal list container */}
            <div className="dashboard-list-items-stack">
              {(() => {
                const filtered = (liveEnquiries || []).filter(e => {
                  const matchesStatus = enquiryStatusFilter === 'All' || e.status === enquiryStatusFilter;
                  const matchesSearch = !enquirySearchQuery ||
                    (e.propertyName && e.propertyName.toLowerCase().includes(enquirySearchQuery.toLowerCase())) ||
                    (e.message && e.message.toLowerCase().includes(enquirySearchQuery.toLowerCase())) ||
                    (e.query && e.query.toLowerCase().includes(enquirySearchQuery.toLowerCase()));
                  return matchesStatus && matchesSearch;
                });
                if (filtered.length === 0) {
                  return <p style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>No enquiries match your criteria.</p>;
                }
                return filtered.map((e, index) => {
                  const enq = {
                    title: e.propertyName || 'Property Enquiry',
                    location: e.phone ? `Phone: ${e.phone}` : 'Tripinvilla Inquiry Desk',
                    enquiryText: e.message || e.query,
                    status: e.status || 'Open',
                    reply: e.reply,
                    img: (e.property_id && e.property_id.images && e.property_id.images[0]) || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80'
                  };
                  return (
                    <div key={index} className="dashboard-list-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="list-card-img-wrap">
                          <img src={enq.img} alt={enq.title} />
                        </div>
                        <div className="list-card-details" style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="list-card-title">{enq.title}</h3>
                            <span style={{ 
                              padding: '4px 10px', 
                              borderRadius: '20px', 
                              fontSize: '12px', 
                              fontWeight: 600,
                              backgroundColor: enq.status === 'Replied' ? '#D1FAE5' : enq.status === 'Closed' ? '#F3F4F6' : '#FEF3C7',
                              color: enq.status === 'Replied' ? '#065F46' : enq.status === 'Closed' ? '#374151' : '#92400E'
                            }}>
                              {enq.status}
                            </span>
                          </div>
                          <div className="list-card-location">
                            <MapPin size={13} color="#9CA3AF" />
                            <span>{enq.location}</span>
                          </div>
                          <p className="list-card-question">
                            "{enq.enquiryText}"
                          </p>
                        </div>
                      </div>
                      {enq.reply && (
                        <div style={{ marginLeft: '140px', padding: '12px 16px', background: '#F9FAFB', borderRadius: '8px', borderLeft: '3px solid #58A429' }}>
                          <strong style={{ fontSize: '12px', color: '#374151', display: 'block', marginBottom: '4px' }}>Host Reply:</strong>
                          <p style={{ margin: 0, fontSize: '13px', color: '#4B5563', fontStyle: 'italic' }}>"{enq.reply}"</p>
                        </div>
                      )}
                    </div>
                  );
                });
              })()}
            </div>

          </div>
        </div>
      )}

      {/* VIEW B-3: MY REVIEWS PAGE VIEW */}
      {activeMenu === 'Reviews' && (
        <div className="account-dashboard-wrapper fade-in">
          
          {/* Custom scenic high-resolution reviews banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${reviewsHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>My Reviews</h1>
          </div>

          <div className="dashboard-content-box">
            <div className="wishlist-title-header-row">
              <h2 className="dashboard-section-main">My Reviews</h2>
              <button className="btn-wishlist-filter" onClick={() => setIsReviewsFilterOpen(!isReviewsFilterOpen)}>
                <img src={filterIcon} alt="Filter" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span>Filters</span>
              </button>
            </div>
            <p className="dashboard-section-sub">Manage your review details from here</p>

            {isReviewsFilterOpen && (
              <div className="filter-panel-box" style={{ display: 'flex', gap: '16px', margin: '16px 0', padding: '16px', background: '#FAFAFA', borderRadius: '10px', border: '1px solid #E5E7EB', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>Filter by Rating</label>
                  <select 
                    value={reviewsRatingFilter}
                    onChange={e => setReviewsRatingFilter(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', outline: 'none', background: '#fff', width: '200px' }}
                  >
                    <option value="All">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>
            )}

            {/* Sub-navigation Capsule Row */}
            <div className="dashboard-capsule-nav">
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Profile'); }}>
                <User size={15} />
                <span>My Account</span>
              </button>
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Wishlist'); }}>
                <Heart size={15} />
                <span>Wishlist</span>
              </button>
              <button className="capsule-btn" onClick={() => { if (!token) { openLoginModal(); return; } setActiveMenu('Enquiries'); }}>
                <Inbox size={15} />
                <span>My Enquiries</span>
              </button>
              <button className="capsule-btn active" onClick={() => setActiveMenu('Reviews')}>
                <MessageSquare size={15} />
                <span>My Reviews</span>
              </button>
            </div>

            {/* Reviews horizontal list container */}
            <div className="dashboard-list-items-stack">
              {(() => {
                const filtered = (userReviews || []).filter(r => {
                  return reviewsRatingFilter === 'All' || r.rating.toString() === reviewsRatingFilter;
                });
                if (!userReviews || userReviews.length === 0) {
                  return <p style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>You haven't posted any reviews yet.</p>;
                }
                if (filtered.length === 0) {
                  return <p style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>No reviews found matching this criteria.</p>;
                }
                return filtered.map((r, index) => {
                  return (
                    <div key={index} className="dashboard-list-card" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
                      <div className="list-card-img-wrap">
                        <img src={r.img} alt={r.title} />
                      </div>
                      <div className="list-card-details" style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <h3 className="list-card-title">{r.title}</h3>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[1, 2, 3, 4, 5].map(num => (
                              <Star key={num} size={14} fill={num <= r.rating ? '#F59E0B' : 'none'} color={num <= r.rating ? '#F59E0B' : '#D1D5DB'} />
                            ))}
                          </div>
                        </div>
                        <div className="list-card-location">
                          <MapPin size={13} color="#9CA3AF" />
                          <span>{r.location}</span>
                        </div>
                        <p className="list-card-question" style={{ marginTop: '8px', color: '#4B5563', fontStyle: 'italic' }}>
                          "{r.reviewText}"
                        </p>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

          </div>
        </div>
      )}

    </>
  );
}
