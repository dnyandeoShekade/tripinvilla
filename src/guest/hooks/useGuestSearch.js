import { useEffect, useState } from 'react';

export default function useGuestSearch({ API_BASE, setActiveMenu }) {
  const [activeSearchTab, setActiveSearchTab] = useState('Villas');
  const [activePropCategory, setActivePropCategory] = useState('Apartments');

  // Input states
  const [where, setWhere] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('Any Guests');
  const [price, setPrice] = useState('Any');
  const [stayType, setStayType] = useState('Any');
  const [foodPref, setFoodPref] = useState('Any');

  // Checkbox states
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Search Results Filter States
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [, setFilterPriceSlider] = useState(50000);
  const [sidebarSearchText, setSidebarSearchText] = useState('');
  const [filterSelectedTypes, setFilterSelectedTypes] = useState([]);
  const [filterSelectedAmenities, setFilterSelectedAmenities] = useState([]);
  const [filterMinRating, setFilterMinRating] = useState(0);
  const [searchSortBy, setSearchSortBy] = useState('popularity');
  const [filterInstantBook, setFilterInstantBook] = useState(false);
  const [filterCancellationPolicy, setFilterCancellationPolicy] = useState(false);
  const [filterHomestays, setFilterHomestays] = useState(false);

  // Pagination State
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);

  // Auto-reset page to 1 when filters change
  useEffect(() => {
    setSearchCurrentPage(1);
  }, [
    sidebarSearchText,
    filterSelectedTypes,
    filterSelectedAmenities,
    filterMinPrice,
    filterMaxPrice,
    filterMinRating,
    filterInstantBook,
    filterCancellationPolicy,
    filterHomestays,
    searchSortBy,
  ]);

  const [liveProperties, setLiveProperties] = useState([]);
  const [aiSearchLoading, setAiSearchLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);
  const [aiTags, setAiTags] = useState([]);

  const fetchProperties = async (searchParams = {}) => {
    try {
      const query = new URLSearchParams();
      const hasOwn = (key) => Object.prototype.hasOwnProperty.call(searchParams, key);

      // 1. Where / Search Text
      // Sent as 'city' → backend searches city + state + location fields (broad match)
      // Also sent as 'keyword' for name/description matching
      const searchVal = hasOwn('search') ? searchParams.search : where;
      const hasSearchText = searchVal && searchVal.trim() !== '';
      if (hasSearchText) {
        query.append('city', searchVal.trim());
      }

      // 2. Type / Category
      // We rely on frontend filters (`filterSelectedTypes`) for property type filtering
      // so we don't pass `type` to the backend query anymore. This allows the sidebar 
      // filters to work correctly across all property types.

      // 3. Guests / Who
      const guestsVal = hasOwn('guests') ? searchParams.guests : guests;
      if (guestsVal && guestsVal !== 'Any Guests') {
        const match = String(guestsVal).match(/\d+/);
        if (match) query.append('guests', match[0]);
      }

      // 4. Price per Night Range
      const priceVal = hasOwn('price') ? searchParams.price : price;
      if (priceVal && priceVal !== 'Any') {
        const cleanPrice = priceVal.replace(/[₹,\s]/g, '');
        if (cleanPrice.includes('-')) {
          const [minP, maxP] = cleanPrice.split('-').map((v) => parseInt(v, 10));
          if (!isNaN(minP)) query.append('minPrice', minP);
          if (!isNaN(maxP)) query.append('maxPrice', maxP);
        } else if (cleanPrice.includes('+')) {
          const minP = parseInt(cleanPrice, 10);
          if (!isNaN(minP)) query.append('minPrice', minP);
        }
      }

      // 5. Dates
      const datesVal = hasOwn('dates') ? searchParams.dates : dates;
      if (datesVal && datesVal !== 'Select dates' && datesVal.trim() !== '') {
        // Flatpickr 'Y-m-d to Y-m-d'
        if (datesVal.includes(' to ')) {
          const [start, end] = datesVal.split(' to ');
          if (start) query.append('checkIn', start);
          if (end) query.append('checkOut', end);
        }
      }

      // 6. Room Type
      if (stayType && stayType !== 'Any') {
        const roomMap = {
          '1 Deluxe Room': 'private-room',
          '2 Deluxe Rooms': 'private-room',
          'Entire Villa': 'entire-place',
        };
        if (roomMap[stayType]) query.append('roomType', roomMap[stayType]);
      }

      // 7. Food Preference
      if (foodPref && foodPref !== 'Any') {
        const foodMap = {
          'Pure Veg': 'veg',
          'Non-Veg': 'non-veg',
          'Buffet Available': 'both',
        };
        if (foodMap[foodPref]) query.append('foodPreference', foodMap[foodPref]);
      }

      // 8. Checkboxes
      if (verifiedOnly) query.append('verifiedOnly', 'true');
      if (featuredOnly) query.append('featuredOnly', 'true');

      // Pagination & Limits
      if (searchParams.limit) query.append('limit', searchParams.limit);
      if (searchParams.status) query.append('status', searchParams.status);

      const res = await fetch(`${API_BASE}/search?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.properties) {
          setLiveProperties(data.properties);
        }
      }
    } catch (e) {
      console.error('Error fetching properties:', e);
    }
  };

  const handleAISearch = async () => {
    if (!where || !where.trim()) {
      alert('Please type what you are looking for in the search box first, then click Search with AI.');
      return;
    }
    setAiSearchLoading(true);
    setAiSummary(null);
    setAiTags([]);
    try {
      const res = await fetch(`${API_BASE}/search/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: where }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.properties) {
          setLiveProperties(data.properties);
          if (setActiveMenu) setActiveMenu('Search');

          setAiSummary(data.aiSummary || null);

          const tags = [];
          const f = data.extractedFilters || {};
          if (f.city) tags.push(`📍 ${f.city}`);
          if (f.type) tags.push(`🏠 ${f.type}`);
          if (f.guests) tags.push(`👥 ${f.guests} guests`);
          if (f.checkIn) tags.push(`📅 ${f.checkIn} → ${f.checkOut || '?'}`);
          if (f.maxPrice) tags.push(`💰 Under ₹${f.maxPrice}/night`);
          if (f.foodPreference) tags.push(`🍽️ ${f.foodPreference}`);
          setAiTags(tags);

          if (f.city) setWhere(f.city);
          if (f.type) setActivePropCategory(f.type + 's');
        }
      } else {
        fetchProperties({ search: where });
        if (setActiveMenu) setActiveMenu('Search');
      }
    } catch (e) {
      console.error('AI Search error:', e);
      fetchProperties({ search: where });
      if (setActiveMenu) setActiveMenu('Search');
    } finally {
      setAiSearchLoading(false);
    }
  };

  const handleSearch = () => {
    if (setActiveMenu) setActiveMenu('Search');
    if (where && where.trim()) {
      setFilterSelectedTypes([]);
      fetchProperties({ search: where, price, guests });
    } else if (activeSearchTab && activeSearchTab !== 'More+') {
      setActivePropCategory(activeSearchTab);
      const typeMap = {
        Apartments: 'Apartment',
        Homestays: 'Homestay',
        Resorts: 'Resort',
        Villas: 'Villa',
        Hotels: 'Hotel',
        Cottages: 'Cottage',
        Motels: 'Motel',
        Bungalows: 'Bungalow',
      };
      setFilterSelectedTypes([typeMap[activeSearchTab] || activeSearchTab]);
      fetchProperties({ price, guests });
    } else {
      fetchProperties({ price, guests });
    }

    setTimeout(() => {
      window.scrollTo({ top: 750, behavior: 'smooth' });
    }, 100);
  };

  const handleClearAll = () => {
    setWhere('');
    setDates('');
    setGuests('Any Guests');
    setPrice('Any');
    setStayType('Any');
    setFoodPref('Any');
    setVerifiedOnly(false);
    setFeaturedOnly(false);
    setAiSummary(null);
    setAiTags([]);
    fetchProperties({});
  };

  return {
    // tabs
    activeSearchTab,
    setActiveSearchTab,
    activePropCategory,
    setActivePropCategory,

    // inputs
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

    // results
    liveProperties,
    setLiveProperties,

    // AI
    aiSearchLoading,
    aiSummary,
    aiTags,

    // filters
    filterMinPrice,
    setFilterMinPrice,
    filterMaxPrice,
    setFilterMaxPrice,
    setFilterPriceSlider,
    sidebarSearchText,
    setSidebarSearchText,
    filterSelectedTypes,
    setFilterSelectedTypes,
    filterSelectedAmenities,
    setFilterSelectedAmenities,
    filterMinRating,
    setFilterMinRating,
    searchSortBy,
    setSearchSortBy,
    filterInstantBook,
    setFilterInstantBook,
    filterCancellationPolicy,
    setFilterCancellationPolicy,
    filterHomestays,
    setFilterHomestays,

    // pagination
    searchCurrentPage,
    setSearchCurrentPage,

    // actions
    fetchProperties,
    handleAISearch,
    handleSearch,
    handleClearAll,
  };
}

