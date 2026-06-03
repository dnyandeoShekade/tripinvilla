import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Sparkles, Calendar } from 'lucide-react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, parse } from 'date-fns';
import { heroBgImg } from '../../assets';

export default function HeroSection(props) {
  const {
    activeMenu,
    homepageContent,

    // Search form state
    activeSearchTab,
    setActiveSearchTab,
    where,
    setWhere,
    dates,
    setDates,
    guests,
    setGuests,
    price,
    setPrice,
    stayType,
    setStayType,
    foodPref,
    setFoodPref,
    verifiedOnly,
    setVerifiedOnly,
    featuredOnly,
    setFeaturedOnly,

    // Actions
    handleClearAll,
    handleSearch,
    handleAISearch,
    aiSearchLoading,
  } = props;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  // Close picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const parseDate = (dateStr) => {
    if (!dateStr) return new Date();
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    return isNaN(parsed) ? new Date() : parsed;
  };

  const getSelectionRange = () => {
    const parts = (dates || '').split(' to ');
    return {
      startDate: parts[0] ? parseDate(parts[0]) : new Date(),
      endDate: parts[1] ? parseDate(parts[1]) : new Date(),
      key: 'selection',
    };
  };

  const handleSelect = (ranges) => {
    const start = format(ranges.selection.startDate, 'yyyy-MM-dd');
    const end = format(ranges.selection.endDate, 'yyyy-MM-dd');
    setDates(`${start} to ${end}`);
  };

  return (
    <>
      {/* ══ HERO SECTION (Height: 712px, Width: 100%) ══ */}
      {(activeMenu !== 'Detail' && activeMenu !== 'Profile' && activeMenu !== 'Wishlist' && activeMenu !== 'Enquiries' && activeMenu !== 'Reviews' && activeMenu !== 'About Us' && activeMenu !== 'Contact' && activeMenu !== 'Terms' && activeMenu !== 'Privacy' && activeMenu !== 'Recommend By Us' && activeMenu !== 'List Your Place') && (
        <div className="hero-wrapper">
          
          {/* Background Image: Loads your exact high-resolution custom hero image */}
          <img 
            src={homepageContent?.banner?.image || heroBgImg}
            className="hero-background"
            alt="Luxury Villa Background" 
          />

          {/* Overlay holding the header, titles and layout layers */}
          <div className="hero-overlay">
            
            {/* ══ MAIN HERO HEADLINE (Conditional based on properties tab) ══ */}
            <div className="hero-headline-container">
              {activeMenu === 'Properties' ? (
                <h1 className="hero-headline">
                  {where ? 'Best Properties In ' : 'Best Properties '}
                  <span className="highlight-sharp-blue-box" style={{ borderRadius: 0, padding: '0 16px' }}>
                    {where ? (where.charAt(0).toUpperCase() + where.slice(1) + (where.toLowerCase() === 'india' ? '' : ', India')) : 'For You'}
                  </span>
                </h1>
              ) : (
                <h1 className="hero-headline">{homepageContent?.banner?.title ? ( <>{homepageContent.banner.title.split(" ").slice(0, -2).join(" ")} <span className="hero-headline-span">{homepageContent.banner.title.split(" ").slice(-2).join(" ")}</span></> ) : ( <>Find Your <span className="hero-headline-span">Perfect Stay</span></> )}</h1>
              )}
            </div>

          </div>

          {/* ══ FLOATING SEARCH CARD ══ */}
          <div className="search-card-wrapper">
            {/* Top category bar */}
            <div className="tabs-row">
              {['Villas', 'Homestays', 'Hotels', 'Resorts', 'More+'].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeSearchTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveSearchTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid inputs layout */}
            <div className="search-fields-grid">
              
              {/* Field 1: Where */}
              <div className="field-group">
                <span className="field-label">Where</span>
                <div className="field-control-wrap">
                  <input 
                    type="text" 
                    className="field-input" 
                    placeholder="Where are you going?" 
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                  />
                </div>
              </div>

              {/* Field 2: When */}
              <div className="field-group" style={{ position: 'relative' }} ref={datePickerRef}>
                <span className="field-label">When</span>
                <div 
                  className="field-control-wrap" 
                  style={{ display: 'flex', gap: '8px', cursor: 'pointer', padding: '10px 14px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', alignItems: 'center', height: '44px', boxSizing: 'border-box' }}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <span style={{ flex: 1, fontSize: '14px', color: dates ? '#111827' : '#9CA3AF' }}>
                    {dates ? `${dates.split(' to ')[0] || ''} - ${dates.split(' to ')[1] || ''}` : 'mm/dd/yyyy - mm/dd/yyyy'}
                  </span>
                  <Calendar size={16} color="#6B7280" />
                </div>

                {showDatePicker && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, padding: '16px', border: '1px solid #E5E7EB' }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827', marginBottom: '12px', paddingLeft: '8px' }}>Select dates</div>
                    <DateRange
                      ranges={[getSelectionRange()]}
                      onChange={handleSelect}
                      months={1}
                      direction="horizontal"
                      showDateDisplay={false}
                      minDate={new Date()}
                      rangeColors={['#2563EB']}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                      <button type="button" onClick={() => { setDates(''); setShowDatePicker(false); }} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#374151' }}>Cancel</button>
                      <button type="button" onClick={() => setShowDatePicker(false)} style={{ padding: '8px 16px', background: '#2563EB', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Filter</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Field 3: Who */}
              <div className="field-group">
                <span className="field-label">Who</span>
                <div className="field-control-wrap">
                  <select 
                    className="field-select" 
                    value={guests} 
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="Any Guests">Any Guests</option>
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4+ Guests">4+ Guests</option>
                  </select>
                  <ChevronDown size={14} className="field-select-arrow" />
                </div>
              </div>

              {/* Field 4: Price per Night */}
              <div className="field-group">
                <span className="field-label">Price per Night</span>
                <div className="field-control-wrap">
                  <select 
                    className="field-select" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                  >
                    <option value="Any">Any</option>
                    <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                    <option value="₹20,000+">₹20,000+</option>
                  </select>
                  <ChevronDown size={14} className="field-select-arrow" />
                </div>
              </div>

              {/* Field 5: Room/Stay Type */}
              <div className="field-group">
                <span className="field-label">Room/Stay Type</span>
                <div className="field-control-wrap">
                  <select 
                    className="field-select" 
                    value={stayType} 
                    onChange={(e) => setStayType(e.target.value)}
                  >
                    <option value="Any">Any</option>
                    <option value="1 Deluxe Room">1 Deluxe Room</option>
                    <option value="2 Deluxe Rooms">2 Deluxe Rooms</option>
                    <option value="Entire Villa">Entire Villa</option>
                  </select>
                  <ChevronDown size={14} className="field-select-arrow" />
                </div>
              </div>

              {/* Field 6: Food Preference */}
              <div className="field-group">
                <span className="field-label">Food Preference</span>
                <div className="field-control-wrap">
                  <select 
                    className="field-select" 
                    value={foodPref} 
                    onChange={(e) => setFoodPref(e.target.value)}
                  >
                    <option value="Any">Any</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Buffet Available">Buffet Available</option>
                  </select>
                  <ChevronDown size={14} className="field-select-arrow" />
                </div>
              </div>

            </div>

            {/* Action and Checkbox controls row */}
            <div className="action-buttons-row">
              
              {/* Filter checkboxes */}
              <div className="checkbox-row">
                <label className="custom-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox" 
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                  />
                  <span>Verified only</span>
                </label>
                <label className="custom-checkbox-label">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox" 
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                  />
                  <span>Featured only</span>
                </label>
              </div>

              {/* Execution Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button className="btn-outline">Close</button>
                <button className="btn-outline" onClick={handleClearAll}>Clear all</button>
                
                <button className="btn-search" onClick={handleSearch}>
                  <Search size={16} />
                  <span>Search</span>
                </button>

                <button className="btn-search-ai" onClick={handleAISearch} disabled={aiSearchLoading} style={{ opacity: aiSearchLoading ? 0.7 : 1 }}>
                  <Sparkles size={16} color="var(--primary-blue)" />
                  <span>{aiSearchLoading ? 'Searching...' : 'Search with AI'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </>
  );
}
