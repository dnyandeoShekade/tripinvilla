import { useEffect } from 'react';

export default function useGuestBootstrapData({
  API_BASE,
  token,
  activeMenu,
  activePropCategory,
  setLiveDestinations,
  setLiveExperiences,
  setFeaturedProperties,
  setHomepageContent,
  setAllProperties,
  fetchProperties,
  fetchProfileAndEnquiries,
}) {
  // Initial load
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const destRes = await fetch(`${API_BASE}/masters/destinations?status=Active`);
        if (destRes.ok) {
          const d = await destRes.json();
          setLiveDestinations(d);
        }
        const expRes = await fetch(`${API_BASE}/master/experiences/active`);
        if (expRes.ok) {
          const e = await expRes.json();
          setLiveExperiences(e);
        }
        const featRes = await fetch(`${API_BASE}/properties?limit=6&status=Active`);
        if (featRes.ok) {
          const f = await featRes.json();
          setFeaturedProperties(f.properties || []);
        }
        const contentRes = await fetch(`${API_BASE}/content/homepage`);
        if (contentRes.ok) {
          const contentData = await contentRes.json();
          if (contentData && contentData.data) {
            setHomepageContent(contentData.data);
          }
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      }
    };

    const fetchAll = async () => {
      try {
        const res = await fetch(`${API_BASE}/properties`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.properties) {
            setAllProperties(data.properties);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchHomepageData();
    fetchAll();

    fetchProperties({ type: 'Villa', search: '' });
    if (token) {
      fetchProfileAndEnquiries(token);
    }
  }, [token]);

  useEffect(() => {
    if (token && activeMenu === 'Enquiries') {
      fetchProfileAndEnquiries(token);
    }
  }, [activeMenu, token]);

  // Refetch homepage CMS content when user returns to Home (picks up admin edits)
  useEffect(() => {
    if (activeMenu !== 'Home') return;

    const refreshHomepageContent = async () => {
      try {
        const [contentRes, featRes, destRes, expRes] = await Promise.all([
          fetch(`${API_BASE}/content/homepage`),
          fetch(`${API_BASE}/properties?limit=6&status=Active`),
          fetch(`${API_BASE}/masters/destinations?status=Active`),
          fetch(`${API_BASE}/master/experiences/active`),
        ]);

        if (contentRes.ok) {
          const contentData = await contentRes.json();
          if (contentData?.data) {
            setHomepageContent(contentData.data);
          }
        }
        if (featRes.ok) {
          const f = await featRes.json();
          setFeaturedProperties(f.properties || []);
        }
        if (destRes.ok) {
          setLiveDestinations(await destRes.json());
        }
        if (expRes.ok) {
          setLiveExperiences(await expRes.json());
        }
      } catch (err) {
        console.error('Error refreshing homepage content:', err);
      }
    };

    refreshHomepageContent();
  }, [activeMenu, API_BASE, setHomepageContent, setFeaturedProperties, setLiveDestinations, setLiveExperiences]);
}
