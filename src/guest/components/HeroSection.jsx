import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Sparkles, Calendar as CalendarIcon } from 'lucide-react';
import { DateRange, Calendar } from 'react-date-range';
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
        <div className="relative w-full h-[712px] m-0 rounded-none overflow-visible shadow-[0_20px_40px_rgba(0,0,0,0.08)] max-[900px]:h-auto max-[900px]:min-h-[480px] max-[900px]:pb-6 max-[640px]:min-h-[380px]">
          
          {/* Background Image: Loads your exact high-resolution custom hero image */}
          <img 
            src={homepageContent?.banner?.image || heroBgImg}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="Luxury Villa Background" 
          />

          {/* Overlay holding the header, titles and layout layers */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col z-[2] bg-gradient-to-b from-black/45 via-black/20 to-black/60">
            
            {/* ══ MAIN HERO HEADLINE (Conditional based on properties tab) ══ */}
            <div className="absolute top-[150px] left-1/2 -translate-x-1/2 flex justify-center items-center z-[5] max-[900px]:top-[110px] max-[900px]:w-[calc(100%-32px)] max-[640px]:top-[80px]">
              {activeMenu === 'Properties' ? (
                <h1 className="font-['Lato',sans-serif] text-[74px] font-medium text-white leading-none tracking-normal text-center flex items-center gap-4 m-0 whitespace-nowrap max-[1200px]:text-[58px] max-[900px]:text-[44px] max-[900px]:whitespace-normal max-[900px]:flex-wrap max-[900px]:justify-center max-[640px]:text-[32px] max-[640px]:gap-2">
                  {where ? 'Best Properties In ' : 'Best Properties '}
                  <span className="font-['Lato',sans-serif] text-[74px] font-bold text-white bg-[#0C6DC4] w-[439px] h-[105px] rounded-none shadow-[0_8px_30px_rgba(37,99,235,0.4)] inline-flex items-center justify-center leading-none max-[1200px]:text-[58px] max-[1200px]:w-[360px] max-[1200px]:h-[90px] max-[900px]:text-[44px] max-[900px]:w-auto max-[900px]:h-auto max-[900px]:px-5 max-[900px]:py-2.5 max-[640px]:text-[32px] max-[640px]:py-1.5 max-[640px]:px-3.5" style={{ borderRadius: 0, padding: '0 16px' }}>
                    {where ? (where.charAt(0).toUpperCase() + where.slice(1) + (where.toLowerCase() === 'india' ? '' : ', India')) : 'For You'}
                  </span>
                </h1>
              ) : (
                <h1 className="font-['Lato',sans-serif] text-[74px] font-medium text-white leading-none tracking-normal text-center flex items-center gap-4 m-0 whitespace-nowrap max-[1200px]:text-[58px] max-[900px]:text-[44px] max-[900px]:whitespace-normal max-[900px]:flex-wrap max-[900px]:justify-center max-[640px]:text-[32px] max-[640px]:gap-2">{homepageContent?.banner?.title ? ( <>{homepageContent.banner.title.split(" ").slice(0, -2).join(" ")} <span className="font-['Lato',sans-serif] text-[74px] font-bold text-white bg-[#0C6DC4] w-[439px] h-[105px] rounded-none shadow-[0_8px_30px_rgba(37,99,235,0.4)] inline-flex items-center justify-center leading-none max-[1200px]:text-[58px] max-[1200px]:w-[360px] max-[1200px]:h-[90px] max-[900px]:text-[44px] max-[900px]:w-auto max-[900px]:h-auto max-[900px]:px-5 max-[900px]:py-2.5 max-[640px]:text-[32px] max-[640px]:py-1.5 max-[640px]:px-3.5">{homepageContent.banner.title.split(" ").slice(-2).join(" ")}</span></> ) : ( <>Find Your <span className="font-['Lato',sans-serif] text-[74px] font-bold text-white bg-[#0C6DC4] w-[439px] h-[105px] rounded-none shadow-[0_8px_30px_rgba(37,99,235,0.4)] inline-flex items-center justify-center leading-none max-[1200px]:text-[58px] max-[1200px]:w-[360px] max-[1200px]:h-[90px] max-[900px]:text-[44px] max-[900px]:w-auto max-[900px]:h-auto max-[900px]:px-5 max-[900px]:py-2.5 max-[640px]:text-[32px] max-[640px]:py-1.5 max-[640px]:px-3.5">Perfect Stay</span></> )}</h1>
              )}
            </div>

          </div>

          {/* ══ FLOATING SEARCH CARD ══ */}
          <div className="absolute top-[290px] left-1/2 -translate-x-1/2 w-[1281px] max-w-[calc(100%-158px)] h-auto bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-8 py-6 z-10 box-border max-[1200px]:max-w-[calc(100%-48px)] max-[1200px]:flex max-[1200px]:flex-col max-[1200px]:p-6 max-[900px]:static max-[900px]:transform-none max-[900px]:max-w-[calc(100%-32px)] max-[900px]:mt-6 max-[900px]:mx-auto max-[900px]:mb-0">
            {/* Top category bar */}
            <div className="absolute top-[29px] left-1/2 -translate-x-1/2 w-[445px] h-[32px] flex justify-center items-center gap-5 m-0 p-0 box-border max-[1200px]:static max-[1200px]:transform-none max-[1200px]:w-full max-[1200px]:mb-6 max-[1200px]:flex-wrap max-[1200px]:gap-3 max-[900px]:mb-2">
              {['Villas', 'Homestays', 'Hotels', 'Resorts', 'More+'].map((tab) => (
                <button
                  key={tab}
                  className={`h-[32px] px-4 rounded-full font-['Lato',sans-serif] text-[15px] font-normal border-none bg-transparent text-black leading-none tracking-normal cursor-pointer flex items-center justify-center transition-all duration-200 ease-in-out whitespace-nowrap hover:opacity-80 ${activeSearchTab === tab ? 'bg-[#0C6DC4] text-white font-semibold shadow-[0_4px_12px_rgba(37,99,235,0.25)]' : ''}`}
                  onClick={() => setActiveSearchTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Grid inputs layout */}
            <div className="mt-[60px] grid grid-cols-6 gap-4 mb-5 max-[1200px]:grid-cols-3 max-[1200px]:mt-0 max-[900px]:grid-cols-2 max-[900px]:mt-4 max-[640px]:grid-cols-1">
              
              {/* Field 1: Where */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Lato',sans-serif] text-xs font-medium text-gray-900">Where</span>
                <div className="relative flex items-center">
                  <input 
                    type="text" 
                    className="w-full h-[48px] bg-white border border-gray-200 rounded-xl px-4 font-['Lato',sans-serif] text-[13.5px] text-gray-900 outline-none cursor-pointer placeholder-gray-400 focus:border-[#0C6DC4] focus:ring-[3px] focus:ring-blue-600/10 transition-all duration-200" 
                    placeholder="Where are you going?" 
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                  />
                </div>
              </div>

              {/* Field 2: When */}
              <div className="flex flex-col gap-1.5" style={{ position: 'relative' }} ref={datePickerRef}>
                <span className="font-['Lato',sans-serif] text-xs font-medium text-gray-900">When</span>
                <div 
                  className="relative flex items-center" 
                  style={{ display: 'flex', gap: '8px', cursor: 'pointer', padding: '10px 14px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px', alignItems: 'center', height: '44px', boxSizing: 'border-box' }}
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <span style={{ flex: 1, fontSize: '14px', color: dates ? '#111827' : '#9CA3AF' }}>
                    {dates ? `${dates.split(' to ')[0] || ''} - ${dates.split(' to ')[1] || ''}` : 'mm/dd/yyyy - mm/dd/yyyy'}
                  </span>
                  <CalendarIcon size={16} color="#6B7280" />
                </div>

                {showDatePicker && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '8px', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 50, padding: '16px', border: '1px solid #E5E7EB', width: 'max-content' }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827', marginBottom: '8px', paddingLeft: '8px' }}>From</div>
                        <Calendar
                          date={getSelectionRange().startDate}
                          onChange={(date) => {
                            const start = format(date, 'yyyy-MM-dd');
                            const { endDate } = getSelectionRange();
                            setDates(`${start} to ${format(endDate, 'yyyy-MM-dd')}`);
                          }}
                          minDate={new Date()}
                          color="#2563EB"
                        />
                      </div>
                      
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827', marginBottom: '8px', paddingLeft: '8px' }}>To</div>
                        <Calendar
                          date={getSelectionRange().endDate}
                          onChange={(date) => {
                            const { startDate } = getSelectionRange();
                            const end = format(date, 'yyyy-MM-dd');
                            // Ensure endDate is not before startDate
                            if (date < startDate) {
                                setDates(`${format(date, 'yyyy-MM-dd')} to ${format(date, 'yyyy-MM-dd')}`);
                            } else {
                                setDates(`${format(startDate, 'yyyy-MM-dd')} to ${end}`);
                            }
                          }}
                          minDate={getSelectionRange().startDate}
                          color="#2563EB"
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                      <button type="button" onClick={() => { setDates(''); setShowDatePicker(false); }} style={{ padding: '8px 16px', background: '#fff', border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#374151' }}>Cancel</button>
                      <button type="button" onClick={() => setShowDatePicker(false)} style={{ padding: '8px 16px', background: '#2563EB', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff' }}>Filter</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Field 3: Who */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Lato',sans-serif] text-xs font-medium text-gray-900">Who</span>
                <div className="relative flex items-center">
                  <select 
                    className="w-full h-[48px] bg-white border border-gray-200 rounded-xl px-4 font-['Lato',sans-serif] text-[13.5px] text-gray-900 outline-none cursor-pointer placeholder-gray-400 focus:border-[#0C6DC4] focus:ring-[3px] focus:ring-blue-600/10 transition-all duration-200 appearance-none pr-9" 
                    value={guests} 
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="Any Guests">Any Guests</option>
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4+ Guests">4+ Guests</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 pointer-events-none text-gray-500" />
                </div>
              </div>

              {/* Field 4: Price per Night */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Lato',sans-serif] text-xs font-medium text-gray-900">Price per Night</span>
                <div className="relative flex items-center">
                  <select 
                    className="w-full h-[48px] bg-white border border-gray-200 rounded-xl px-4 font-['Lato',sans-serif] text-[13.5px] text-gray-900 outline-none cursor-pointer placeholder-gray-400 focus:border-[#0C6DC4] focus:ring-[3px] focus:ring-blue-600/10 transition-all duration-200 appearance-none pr-9" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                  >
                    <option value="Any">Any</option>
                    <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
                    <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                    <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
                    <option value="₹20,000+">₹20,000+</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 pointer-events-none text-gray-500" />
                </div>
              </div>

              {/* Field 5: Room/Stay Type */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Lato',sans-serif] text-xs font-medium text-gray-900">Room/Stay Type</span>
                <div className="relative flex items-center">
                  <select 
                    className="w-full h-[48px] bg-white border border-gray-200 rounded-xl px-4 font-['Lato',sans-serif] text-[13.5px] text-gray-900 outline-none cursor-pointer placeholder-gray-400 focus:border-[#0C6DC4] focus:ring-[3px] focus:ring-blue-600/10 transition-all duration-200 appearance-none pr-9" 
                    value={stayType} 
                    onChange={(e) => setStayType(e.target.value)}
                  >
                    <option value="Any">Any</option>
                    <option value="1 Deluxe Room">1 Deluxe Room</option>
                    <option value="2 Deluxe Rooms">2 Deluxe Rooms</option>
                    <option value="Entire Villa">Entire Villa</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 pointer-events-none text-gray-500" />
                </div>
              </div>

              {/* Field 6: Food Preference */}
              <div className="flex flex-col gap-1.5">
                <span className="font-['Lato',sans-serif] text-xs font-medium text-gray-900">Food Preference</span>
                <div className="relative flex items-center">
                  <select 
                    className="w-full h-[48px] bg-white border border-gray-200 rounded-xl px-4 font-['Lato',sans-serif] text-[13.5px] text-gray-900 outline-none cursor-pointer placeholder-gray-400 focus:border-[#0C6DC4] focus:ring-[3px] focus:ring-blue-600/10 transition-all duration-200 appearance-none pr-9" 
                    value={foodPref} 
                    onChange={(e) => setFoodPref(e.target.value)}
                  >
                    <option value="Any">Any</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Buffet Available">Buffet Available</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 pointer-events-none text-gray-500" />
                </div>
              </div>

            </div>

            {/* Action and Checkbox controls row */}
            <div className="flex justify-between items-center mt-2.5 max-[640px]:flex-col max-[640px]:gap-2.5 max-[640px]:items-stretch">
              
              {/* Filter checkboxes */}
              <div className="flex items-center gap-6 max-[640px]:flex-wrap max-[640px]:gap-3">
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-[18px] h-[18px] rounded border border-gray-300 accent-[#58A429]" 
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                  />
                  <span>Verified only</span>
                </label>
                <label className="flex items-center gap-2 text-[13px] font-medium text-gray-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-[18px] h-[18px] rounded border border-gray-300 accent-[#58A429]" 
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
                
                <button className="bg-[#58A429] text-white font-semibold text-sm border-none rounded-xl px-7 cursor-pointer flex items-center gap-2 transition-all duration-200 h-[48px] hover:bg-[#4C8E23] hover:-translate-y-[1px] max-[640px]:w-full max-[640px]:justify-center" onClick={handleSearch}>
                  <Search size={16} />
                  <span>Search</span>
                </button>

                <button className="bg-white text-gray-800 border border-gray-300 font-semibold text-sm rounded-xl px-6 cursor-pointer flex items-center gap-2 transition-all duration-200 h-[48px] hover:bg-gray-50 hover:border-gray-400 max-[640px]:w-full max-[640px]:justify-center" onClick={handleAISearch} disabled={aiSearchLoading} style={{ opacity: aiSearchLoading ? 0.7 : 1 }}>
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
