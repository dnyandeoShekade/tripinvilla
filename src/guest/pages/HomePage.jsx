import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, CreditCard, Heart, MapPin, Percent } from 'lucide-react';
import { rect32Img, rect33Img, rect35Img } from '../../assets';
import { popularOffersList } from '../../data/mockData';

export default function HomePage(props) {
  const {
    activeMenu,

    // Tabs
    activeDestTab,
    setActiveDestTab,

    // Derived lists
    displayDestinations,
    displayExperiences,
    currentBestVillas,
    currentCuratedVillas,

    // Content
    homepageContent,
    renderTitle,
    popularOffers,

    // Auth + user
    token,
    user,
    setAuthMode,
    setAuthModalOpen,
    API_BASE,
    fetchProfileAndEnquiries,

    // Navigation / selections
    setActiveMenu,
    setSelectedProperty,
    setActiveDestinationInfo,
    setContactStep,
    setContactModalOpen,
    toggleWishlist,

    // Category
    activePropCategory,
    setActivePropCategory,
    fetchProperties,
    setFilterSelectedTypes,
    setWhere,
  } = props;

  const typeMap = { Apartments: 'Apartment', Homestays: 'Homestay', Resorts: 'Resort', Motels: 'Motel', Cottages: 'Cottage', Bungalows: 'Bungalow', Villas: 'Villa' };
  const activeCategory = activePropCategory || 'Villas';
  // currentBestVillas is already strictly filtered by category and capped at 6 in GuestApp
  const homepageBestVillas = currentBestVillas;

  const handleViewAll = () => {
    if (setActivePropCategory) setActivePropCategory(activeCategory);
    if (setFilterSelectedTypes) setFilterSelectedTypes([typeMap[activeCategory] || activeCategory]);
    if (setWhere) setWhere('');
    if (fetchProperties) fetchProperties({ type: activeCategory, search: '' });
    setActiveMenu('Properties');
  };


  // Auto-scroll curated properties
  useEffect(() => {
    if (activeMenu !== 'Home') return;
    const interval = setInterval(() => {
      const track = document.querySelector('.curated-horizontal-grid');
      if (track) {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [activeMenu]);

  return (
    <>
      {/* VIEW E: HOME VIEW */}
      {activeMenu === 'Home' && (
        <>
          {/* ══ SECTION 1: DESTINATIONS CAROUSEL (Width 1281px, Height 465px) ══ */}
          <div className="relative w-[1440px] max-w-[calc(100%-158px)] h-[465px] bg-white border border-gray-200 rounded-[15px] mx-auto mt-[80px] mb-[40px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            
            {/* Toggle selectors inside Section 1 */}
            <div className="absolute top-[23px] -left-[22px]-[20px] w-[344px] h-[72px] bg-white border border-gray-200 rounded-[15px] p-1.5 flex items-center justify-between">
              <button 
                className={`flex-1 h-full font-['Lato',sans-serif] text-sm font-medium rounded-[11px] border-none bg-transparent text-[#8A99AD] cursor-pointer transition-all duration-200 flex items-center justify-center ${activeDestTab === 'Destinations' ? 'bg-[#0C6DC4] text-white font-bold' : ''}`}
                onClick={() => setActiveDestTab('Destinations')}
              >
                Destinations
              </button>
              <button 
                className={`flex-1 h-full font-['Lato',sans-serif] text-sm font-medium rounded-[11px] border-none bg-transparent text-[#8A99AD] cursor-pointer transition-all duration-200 flex items-center justify-center ${activeDestTab === 'Unique' ? 'bg-[#0C6DC4] text-white font-bold' : ''}`}
                onClick={() => setActiveDestTab('Unique')}
              >
                Unique Experiences
              </button>
            </div>

            {/* Carousel Grid with Arrow buttons */}
            <div className="absolute top-[120px] -left-[22px]-[20px] w-[calc(100%-40px)] h-[310px] flex items-center">
              <button 
                className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer z-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 -left-[22px]"
                onClick={() => {
                  const track = document.querySelector('.carousel-track');
                  if (track) {
                    const card = track.querySelector('.carousel-card-item');
                    const scrollAmount = card ? (track.clientWidth - card.clientWidth) : 240;
                    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-5 w-full overflow-x-auto scroll-smooth snap-x snap-mandatory py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[767px]:gap-4 max-[479px]:gap-3">
                {(activeDestTab === 'Destinations' ? displayDestinations : displayExperiences).map((dest, i) => (
                  <div 
                    key={i} 
                    className="group flex flex-col items-center text-center cursor-pointer transition-transform duration-200 overflow-hidden snap-start shrink-0 hover:-translate-y-1 xl:basis-[calc((100%-100px)/6)] lg:basis-[calc((100%-80px)/5)] md:basis-[calc((100%-60px)/4)] sm:basis-[calc((100%-32px)/3)] max-[479px]:basis-[calc((100%-12px)/2)]" 
                    onClick={() => setActiveDestinationInfo(dest)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="w-full aspect-square rounded-[20px] overflow-hidden mb-3">
                      <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <h3 className="font-['Lato',sans-serif] text-sm font-bold text-gray-900 mb-1 line-clamp-2 leading-[1.3] max-h-[2.6em] break-words">{dest.name}</h3>
                    <p className="font-['Lato',sans-serif] text-[13px] font-normal text-[#8A99AD] m-0 max-w-[140px] text-center leading-[1.4]">{dest.count}</p>
                  </div>
                ))}
              </div>

              <button 
                className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center cursor-pointer z-10 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 -right-[22px]"
                onClick={() => {
                  const track = document.querySelector('.carousel-track');
                  if (track) {
                    const card = track.querySelector('.carousel-card-item');
                    const scrollAmount = card ? (track.clientWidth - card.clientWidth) : 240;
                    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

          {/* ══ SECTION 2: BEST [CATEGORY] AROUND YOU ══ */}
          <div className="w-full max-w-[1360px] mx-auto mt-10 mb-20 px-4">
            
            {/* Keyword-highlighted headline block */}
            <div className="text-left mb-10" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 className="font-['Lato',sans-serif] text-[40px] font-normal leading-[56px] text-gray-900 mb-2 flex items-center gap-3">
                  {renderTitle(homepageContent?.section1?.title, <span>Best <span className="bg-[#0C6DC4] text-white font-bold px-5 pt-2 pb-3 inline-block leading-[1.1]">Villas</span> Around You</span>, 'Villas')}
                </h2>
                <p className="font-['Lato',sans-serif] text-lg font-normal leading-7 text-[#1C1C1C] m-0">
                  {homepageContent?.section1?.subText || 'Choose from homestays, villas, apartments, resorts and more—stays that fit your travel style.'}
                </p>
              </div>
              <button 
                onClick={handleViewAll}
                style={{
                  padding: '10px 24px',
                  backgroundColor: '#f3f4f6',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#374151',
                  cursor: 'pointer',
                  marginBottom: '10px',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
              >
                View All
              </button>
            </div>

            {/* 3-column Grid layout - show only 3 */}
            <div className="grid grid-cols-3 gap-[30px] justify-start">
              {homepageBestVillas.map((villa, idx) => {
                const isWishlisted = user && user.wishlist && user.wishlist.some(w => w._id === villa._id || w === villa._id);
                return (
                  <div key={idx} className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]">
                    <div className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]-img-wrap">
                      <img src={villa.img} alt={villa.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <button 
                        className={`absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-none flex items-center justify-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-110 z-[2] ${isWishlisted ? 'bg-[#0C6DC4] text-white font-bold' : ''}`}
                        onClick={(e) => toggleWishlist(villa._id, e)}
                      >
                        <Heart size={16} fill={isWishlisted ? '#EF4444' : 'none'} color={isWishlisted ? '#EF4444' : '#111827'} />
                      </button>
                    </div>
                    
                    <div className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]-content">
                      <h3 className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]-title">{villa.title}</h3>
                      
                      <div className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]-location">
                        <MapPin size={13} color="#9CA3AF" />
                        <span>{villa.location}</span>
                      </div>

                      <div className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]-rating-row">
                        {villa.reviewsCount > 0 ? (
                          <>
                            <div className="bg-[#58A429] text-white font-['Lato',sans-serif] text-sm font-bold px-2.5 py-1.5 rounded-md flex items-center justify-center">
                              <span>{villa.rating}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-['Lato',sans-serif] text-sm font-normal text-[#8A99AD] leading-none">{villa.ratingLabel}</span>
                              <span className="font-['Lato',sans-serif] text-[13px] font-normal text-[#8A99AD] leading-none">{villa.reviews}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>Not Rated Yet</span>
                            <span className="font-['Lato',sans-serif] text-[13px] font-normal text-[#8A99AD] leading-none">0 Genuine Reviews</span>
                          </div>
                        )}
                      </div>

                      <div className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]-price-row">
                        <span className="text-base leading-8 text-[#8A99AD] font-medium">Starting from</span>
                        <span className="text-[23px] leading-8 text-[#58A429] font-medium">{villa.price}/night</span>
                      </div>

                      <div className="group w-full h-[560px] bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 p-4 flex flex-col transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)]-actions">
                        <button className="w-full h-12 rounded-full font-['Lato',sans-serif] text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center bg-transparent border border-[#0C6DC4] text-[#0C6DC4] hover:bg-blue-600/5" onClick={() => { setSelectedProperty(villa); setActiveMenu('Detail'); }}>View Details</button>
                        <button className="w-full h-12 rounded-full font-['Lato',sans-serif] text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center bg-transparent border border-[#58A429] text-[#58A429] hover:bg-green-600/5" onClick={() => { setSelectedProperty(villa); setContactStep(1); setContactModalOpen(true); }}>Contact Owner</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ══ SECTION 3: CURATED PROPERTIES ══ */}
          <div className="w-[1440px] max-w-[calc(100%-158px)] mx-auto my-[80px]">
            
            {/* Title layout block */}
            <div className="text-left mb-10">
              <h2 className="font-['Lato',sans-serif] text-[40px] font-normal leading-[56px] text-gray-900 mb-2 flex items-center gap-3">
                {renderTitle(homepageContent?.section2?.title, <span><span className="bg-[#0C6DC4] text-white font-bold px-5 pt-2 pb-3 inline-block leading-[1.1]">Curated</span> Properties</span>, "Curated")}
              </h2>
              <p className="font-['Lato',sans-serif] text-lg font-normal leading-7 text-[#1C1C1C] m-0">
                {homepageContent?.section2?.subText || 'Carefully selected stays that meet our standards for comfort, quality, and location.'}
              </p>
            </div>

            {/* Horizontal Card pairs inside a scroll viewport */}
            <div className="relative w-full">
              <button 
                className="absolute top-1/2 -translate-y-1/2 w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer z-10 shadow-[0_4px_10px_rgba(0,0,0,0.06)] transition-all duration-200 text-gray-900 hover:bg-gray-50 hover:scale-105 hover:shadow-[0_6px_14px_rgba(0,0,0,0.1)] -left-[22px]"
                onClick={() => {
                  const track = document.querySelector('.curated-horizontal-grid');
                  if (track) {
                    track.scrollBy({ left: -400, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-[30px] overflow-x-auto scroll-smooth py-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {currentCuratedVillas.map((item, idx) => (
                  <div key={idx} className="group bg-white rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex p-4 transition-all duration-200 w-[calc(50%-15px)] h-[300px] shrink-0 snap-start hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] max-[900px]:w-full">
                    <div className="relative w-[42%] h-full rounded-[18px] overflow-hidden">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <button 
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white border-none flex items-center justify-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-110 z-[2]" 
                        onClick={(e) => toggleWishlist(item._id, e)}
                      >
                        <Heart 
                          size={16} 
                          fill={user && user.wishlist && user.wishlist.some(w => w._id === item._id || w === item._id) ? '#EF4444' : 'none'} 
                          color={user && user.wishlist && user.wishlist.some(w => w._id === item._id || w === item._id) ? '#EF4444' : '#111827'} 
                        />
                      </button>
                    </div>

                    <div className="w-[58%] pl-4 flex flex-col justify-between">
                      <h3 className="font-['Lato',sans-serif] text-xl font-bold text-gray-900 mb-0.5">{item.title}</h3>
                      
                      <div className="flex items-center gap-1.5 font-['Lato',sans-serif] text-sm text-[#8A99AD] mb-2">
                        <MapPin size={13} color="#9CA3AF" />
                        <span>{item.location}</span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        {item.reviewsCount > 0 ? (
                          <>
                            <div className="bg-[#58A429] text-white font-['Lato',sans-serif] text-sm font-bold px-2.5 py-1.5 rounded-md flex items-center justify-center">
                              <span>{item.rating}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="font-['Lato',sans-serif] text-sm font-normal text-[#8A99AD] leading-none">{item.ratingLabel}</span>
                              <span className="font-['Lato',sans-serif] text-[13px] font-normal text-[#8A99AD] leading-none">{item.reviews}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            <span style={{ fontSize: '12px', color: '#9CA3AF', fontStyle: 'italic' }}>Not Rated Yet</span>
                            <span className="font-['Lato',sans-serif] text-[13px] font-normal text-[#8A99AD] leading-none">0 Genuine Reviews</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1.5 font-['Lato',sans-serif] mt-0.5">
                        <span className="text-base leading-8 text-[#8A99AD] font-medium">Starting from</span>
                        <span className="font-['Lato',sans-serif] text-[20px] font-bold text-[#58A429]">{item.price}/night</span>
                      </div>

                      <div className="mt-2.5">
                        <button className="w-full h-10 rounded-full font-['Lato',sans-serif] text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center bg-transparent border border-[#0C6DC4] text-[#0C6DC4] hover:bg-blue-600/5" onClick={() => setActiveMenu('Detail')}>View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="absolute top-1/2 -translate-y-1/2 w-11 h-11 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer z-10 shadow-[0_4px_10px_rgba(0,0,0,0.06)] transition-all duration-200 text-gray-900 hover:bg-gray-50 hover:scale-105 hover:shadow-[0_6px_14px_rgba(0,0,0,0.1)] -right-[22px]"
                onClick={() => {
                  const track = document.querySelector('.curated-horizontal-grid');
                  if (track) {
                    track.scrollBy({ left: 400, behavior: 'smooth' });
                  }
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

          </div>

          {/* ══ SECTION 4: POPULAR OFFERS OF PROPERTY ══ */}
          <div className="w-[1440px] max-w-[calc(100%-158px)] mx-auto mt-[60px] mb-[120px]">
            
            {/* Title Layout */}
            <div className="text-left mb-10">
              <h2 className="font-['Lato',sans-serif] text-[40px] font-normal leading-[56px] text-gray-900 mb-2 flex items-center gap-3">
                <span className="bg-[#0C6DC4] text-white font-bold px-5 pt-2 pb-3 inline-block leading-[1.1]">Popular</span> Offers Of Property
              </h2>
              <p className="font-['Lato',sans-serif] text-lg font-normal leading-7 text-[#1C1C1C] m-0">
                {homepageContent?.section2?.subText || 'Carefully selected stays that meet our standards for comfort, quality, and location.'}
              </p>
            </div>

            {/* 2x2 Grid Layout */}
            <div className="grid grid-cols-2 gap-x-[54px] gap-y-6 justify-start">
              {(() => {
                const rawSource = popularOffers?.length > 0 ? popularOffers : popularOffersList;
                const source = rawSource.filter(offer => {
                  const isDyn = offer.property_id || offer.propertyName;
                  if (isDyn) {
                    if (!offer.property_id || typeof offer.property_id !== 'object') return false;
                    if (offer.property_id.status !== 'Active') return false;
                    const name = String(offer.property_id.name || '').trim().toLowerCase();
                    if (name.includes('abc') || name === 'test' || name === 'owner') return false;
                  } else {
                    const title = String(offer.title || '').trim().toLowerCase();
                    if (title.includes('abc') || title === 'test' || title === 'owner') return false;
                  }
                  return true;
                });
                const uniqueOffers = [];
                const seenIds = new Set();
                for (const o of source) {
                  const pId = typeof o.property_id === 'object' ? o.property_id?._id : o.property_id;
                  const key = String(pId || o.propertyName || o.title || '').trim().toLowerCase();
                  if (key && !seenIds.has(key)) {
                    seenIds.add(key);
                    uniqueOffers.push(o);
                  }
                }
                return uniqueOffers.slice(0, 4);
              })().map((offer, idx) => {
                const isDynamic = offer.property_id || offer.propertyName;
                const title = isDynamic ? `${offer.propertyName || offer.property_id?.name} - ${offer.room_type || offer.room || 'Deluxe Room'}` : offer.title;
                const subtitle = isDynamic ? `${offer.category} | ${offer.food_type || offer.foods} | ${offer.description || ''}` : offer.subtitle;
                const discount = isDynamic ? `${parseInt(offer.offer_percent || offer.offerPercent || 0)}% OFF` : (offer.discount ? offer.discount.replace(/Up to\s+/i, '') : '30% OFF');
                const img = isDynamic 
                  ? (offer.image || offer.property_id?.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80') 
                  : offer.img;

                return (
                  <div key={idx} className="group bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-gray-100 flex p-4 transition-all duration-200 w-full h-[250px] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                    <div className="relative w-[42%] h-full rounded-[16px] overflow-hidden">
                      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      {(idx % 2 === 0) && (
                        <span className="absolute top-0 left-0 w-[110px] h-[28px] bg-[#0C6DC4] text-white font-['Lato',sans-serif] text-[10.5px] font-bold rounded-tl-[16px] rounded-br-[10px] z-[2] flex items-center justify-center">Exclusive Offer</span>
                      )}
                    </div>

                    <div className="w-[58%] pl-4 flex flex-col justify-between">
                      <h3 className="font-['Lato',sans-serif] text-xl font-bold text-gray-900 mb-1 leading-[1.2]">{title}</h3>
                      <p className="font-['Lato',sans-serif] text-base text-[#4B5563] leading-[1.35] m-0">{subtitle}</p>
                      
                      <div className="flex items-baseline gap-1.5 font-['Lato',sans-serif]">
                        <span className="font-['Lato',sans-serif] text-lg font-medium leading-[26px] text-[#8A99AD]">Up to</span>
                        <span className="font-['Lato',sans-serif] text-[26px] font-medium leading-[26px] text-[#58A429]">{discount}</span>
                      </div>

                      <div className="mt-2">
                        <button 
                          className="w-full h-10 rounded-full font-['Lato',sans-serif] text-sm font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center bg-transparent border border-[#0C6DC4] text-[#0C6DC4] hover:bg-blue-600/5" 
                          onClick={() => {
                            if (isDynamic && offer.property_id) {
                              setSelectedProperty(offer.property_id);
                              setActiveMenu('Detail');
                            } else if (currentBestVillas && currentBestVillas.length > 0) {
                              setSelectedProperty(currentBestVillas[0]);
                              setActiveMenu('Detail');
                            }
                          }}
                        >
                          View Stays
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ══ SECTION 5: WHY CHOOSE OUR SERVICES ══ */}
          <div className="w-full bg-[#EBFADE] pt-[60px] pb-[100px] overflow-hidden" style={{ marginBottom: 0 }}>
            <div className="w-[1440px] max-w-[calc(100%-158px)] mx-auto">
              
              <div className="text-left mb-10">
                <h2 className="font-['Lato',sans-serif] text-[40px] font-normal leading-[56px] text-gray-900 mb-2 flex items-center gap-3">
                  {renderTitle(homepageContent?.section5?.title, <span>Why Choose Our <span className="bg-[#0C6DC4] text-white font-bold px-5 pt-2 pb-3 inline-block leading-[1.1]">Services</span></span>, "Services")}
                </h2>
                <p className="font-['Lato',sans-serif] text-lg font-normal leading-7 text-[#1C1C1C] m-0" style={{ color: '#4B5563' }}>
                  {homepageContent?.section5?.subText || 'Choose the next destination for you'}
                </p>
              </div>

              {/* Asymmetric custom grid row */}
              <div className="grid grid-cols-3 gap-6 mt-10 min-h-[696.27px] h-auto">
                
                {/* Column 1 */}
                <div className="flex flex-col gap-[24.6px] h-full">
                  
                  {/* White card top */}
                  <div className="rounded-[23.49px] p-6 flex flex-col justify-center h-[226.6px] min-h-[226.6px] shrink-0 overflow-hidden bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.02)] justify-start gap-4 h-auto min-h-0">
                    <p className="font-['Lato',sans-serif] text-base text-[#4B5563] leading-[1.5] m-0">
                      {homepageContent?.section5?.row1Desc || 'Every property is carefully verified to ensure quality, safety, and comfort you can rely on.'}
                    </p>
                    <div className="service-card-bottom-group">
                      <h3 className="font-['Lato',sans-serif] text-xl font-bold text-[#E65100] mb-1">{homepageContent?.section5?.row1?.title || 'Verified & Trusted Stays'}</h3>
                      <p className="font-['Lato',sans-serif] text-[15px] font-semibold text-gray-900 m-0">{homepageContent?.section5?.row1?.subText || 'Get genuine and good stays'}</p>
                    </div>
                  </div>

                  {/* {homepageContent?.section5?.features?.[0]?.title || 'Secure Payments'} bottom image */}
                  <div className="group relative h-[445.67px] min-h-[445.67px] shrink-0 rounded-[23.49px] overflow-hidden">
                    <img 
                      src={homepageContent?.section5?.features?.[0]?.image || rect35Img} 
                      alt={homepageContent?.section5?.features?.[0]?.title || "Secure Payments"} className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" 
                    />
                    <div className="absolute bottom-6 left-6 bg-gray-900/70 backdrop-blur-md px-[18px] py-2 rounded-full flex items-center gap-2.5 text-white font-['Lato',sans-serif] text-[15px] font-semibold">
                      <div className="w-7 h-7 rounded-full bg-[#0C6DC4] flex items-center justify-center">
                        <CreditCard size={18} color="#FFFFFF" />
                      </div>
                      <span>{homepageContent?.section5?.features?.[0]?.title || 'Secure Payments'}</span>
                    </div>
                  </div>

                </div>

                {/* Column 2 (Full Height Traveler center image) */}
                <div className="flex flex-col gap-[24.6px] h-full-center">
                  <div className="h-[696.27px] min-h-[696.27px] shrink-0 rounded-[23.49px] overflow-hidden">
                    <img 
                      src={homepageContent?.section5?.image3 || rect32Img} 
                      alt="Traveler with suitcase" className="w-full h-full object-cover object-top" 
                    />
                  </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-[24.6px] h-full">
                  
                  {/* Pool Resort top image */}
                  <div className="group relative h-[445.67px] min-h-[445.67px] shrink-0 rounded-[23.49px] overflow-hidden">
                    <img 
                      src={homepageContent?.section5?.features?.[1]?.image || rect33Img} 
                      alt={homepageContent?.section5?.features?.[1]?.title || 'Best Price Guarantee'} className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" 
                    />
                    <div className="absolute bottom-6 left-6 bg-gray-900/70 backdrop-blur-md px-[18px] py-2 rounded-full flex items-center gap-2.5 text-white font-['Lato',sans-serif] text-[15px] font-semibold">
                      <div className="w-7 h-7 rounded-full bg-[#0C6DC4] flex items-center justify-center">
                        <Percent size={18} color="#FFFFFF" />
                      </div>
                      <span>{homepageContent?.section5?.features?.[1]?.title || 'Best Price Guarantee'}</span>
                    </div>
                  </div>

                  {/* 24/7 Support text card bottom */}
                  <div className="rounded-[23.49px] p-6 flex flex-col justify-center h-[226.6px] min-h-[226.6px] shrink-0 overflow-hidden bg-transparent justify-start gap-3 pl-2 h-auto min-h-0">
                    <div className="service-card-top-group">
                      <h3 className="font-['Lato',sans-serif] text-xl font-bold text-[#E65100] mb-1">{homepageContent?.section5?.row2?.title || '24/7 Support, Always There'}</h3>
                      <p className="font-['Lato',sans-serif] text-base font-semibold text-gray-900 mb-3">{homepageContent?.section5?.row2?.subText || 'All type of support'}</p>
                    </div>
                    <p className="font-['Lato',sans-serif] text-base text-[#4B5563] leading-[1.5] m-0-light">
                      {homepageContent?.section5?.row2Desc || 'From booking to checkout, our support team is available anytime to help you.'}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </>
      )}

      {/* ══ SECTION 6: PREMIUM SITE FOOTER ══ */}
    </>
  );
}
