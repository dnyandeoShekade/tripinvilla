import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Home, 
  DollarSign, 
  MessageSquare, 
  ArrowUpRight, 
  ChevronRight,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import ReadMore from '../../admin/components/ReadMore';
import { useNavigate } from 'react-router-dom';
import { dashboardService, bookingService } from '../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [dashboardDateFrom, setDashboardDateFrom] = useState(() => localStorage.getItem('dashboard_date_from') || '');
  const [dashboardDateTo, setDashboardDateTo] = useState(() => localStorage.getItem('dashboard_date_to') || '');

  useEffect(() => {
    const handleDateChange = (e) => {
      setDashboardDateFrom(e.detail.dateFrom);
      setDashboardDateTo(e.detail.dateTo);
    };
    window.addEventListener('dashboard_date_changed', handleDateChange);
    return () => {
      window.removeEventListener('dashboard_date_changed', handleDateChange);
    };
  }, []);

  const fetchData = async () => {
    try {
      const params = {};
      if (dashboardDateFrom) params.dateFrom = dashboardDateFrom;
      if (dashboardDateTo) params.dateTo = dashboardDateTo;

      const statsRes = await dashboardService.getStats(params);
      setStatsData(statsRes.data);
      
      const queryParams = [];
      if (dashboardDateFrom) queryParams.push(`dateFrom=${dashboardDateFrom}`);
      if (dashboardDateTo) queryParams.push(`dateTo=${dashboardDateTo}`);
      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

      const enquiriesRes = await fetch(`${import.meta.env.VITE_API_BASE}/owner-dashboard/enquiries${queryString}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const enquiriesData = await enquiriesRes.json();
      if (Array.isArray(enquiriesData)) {
        setRecentEnquiries(enquiriesData.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dashboardDateFrom, dashboardDateTo]);

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: '#6B7280', fontSize: '15px', fontFamily: '"Outfit", sans-serif' }}>
        Loading dashboard...
      </div>
    );
  }

  const ownerUser = JSON.parse(localStorage.getItem('owner_user')) || {};
  const ownerName = ownerUser.name || 'Owner';
  const ownerEmail = ownerUser.email || 'owner@tripinvilla.com';
  const ownerInitial = ownerName.charAt(0).toUpperCase();

  return (
    <div className="fade-in">
      <div style={{ height: '16px' }} />
      {/* Breadcrumb */}
      <div className="props-breadcrumb" style={{ fontSize: '13px', color: '#6B7280', fontFamily: '"Outfit", sans-serif' }}>
        Dashboard &gt; <span style={{ color: '#111827', fontWeight: 600 }}>Dashboard Analytics</span>
      </div>

      {/* Unified Figma Dashboard Card - Green Background Div */}
      <div className="dash-section" style={{ 
        borderRadius: '18px', 
        border: '1px solid #EFF6E6',
        padding: '36px',
        boxSizing: 'border-box',
        marginTop: 0
      }}>
        
        {/* Card Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: '"Outfit", sans-serif' }}>Dashboard Analytics</h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Manage Listings Button */}
            <button 
              onClick={() => navigate('/owner/properties')}
              style={{ 
                background: '#58A429', 
                color: '#ffffff', 
                borderRadius: '8px', 
                padding: '10px 20px', 
                fontWeight: 600, 
                fontSize: '13px', 
                border: 'none', 
                cursor: 'pointer',
                fontFamily: '"Outfit", sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(88, 164, 41, 0.2)'
              }}
            >
              Manage Listings <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Stats Section (Replaces old Hero and old Stats) */}
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '16px', 
          padding: '24px', 
          border: '1px solid #EFF6E6', 
          boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
          marginBottom: '32px'
        }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'nowrap', 
            gap: '20px', 
            overflowX: 'auto',
            paddingBottom: '8px' // slight padding for scrollbar if visible
          }}>
            {[
              { label: 'Total Enquiries (Today)', value: statsData?.totalEnquiries || 0, trend: '+04.6%', up: true },
              { label: 'Active Properties', value: statsData?.activeProperties || 0, trend: '-16.6%', up: false },
              { label: 'Response Rate', value: '95%', trend: '+16.6%', up: true },
            ].map((card, i) => (
              <div key={i} style={{ 
                background: '#ffffff', 
                borderRadius: '12px', 
                padding: '24px', 
                border: '1px solid #EFF6E6', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '6px',
                flex: '1 0 auto',
                minWidth: '280px'
              }}>
                <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500, fontFamily: '"Outfit", sans-serif', whiteSpace: 'nowrap' }}>{card.label}</span>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#111827', fontFamily: '"Outfit", sans-serif' }}>{card.value}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', background: card.up ? '#E8F5EE' : '#FEE2E2', color: card.up ? '#58A429' : '#EF4444', padding: '3px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 600 }}>
                    {card.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {card.trend}
                  </span>
                  <span style={{ color: '#9CA3AF', fontSize: '11px', fontFamily: '"Outfit", sans-serif' }}>Compared to yesterday</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid: Recent Bookings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          
          {/* Recent Bookings sub-card */}
          <div style={{ border: '1px solid #EFF6E6', borderRadius: '12px', padding: '24px', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827', margin: 0, fontFamily: '"Outfit", sans-serif' }}>Recent Enquiries</h3>
              <button 
                onClick={() => navigate('/owner/enquiries')} 
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#58A429', fontSize: '13px', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer', fontFamily: '"Outfit", sans-serif' }}
              >
                View All <ChevronRight size={14} />
              </button>
            </div>

            <div style={{ overflowX: 'auto', width: '100%' }}>
              <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <th style={{ color: '#9CA3AF', fontWeight: 500, fontSize: '12px', padding: '12px 14px' }}>Enquiry ID</th>
                    <th style={{ color: '#9CA3AF', fontWeight: 500, fontSize: '12px', padding: '12px 14px' }}>Property</th>
                    <th style={{ color: '#9CA3AF', fontWeight: 500, fontSize: '12px', padding: '12px 14px' }}>Guest Name</th>
                    <th style={{ color: '#9CA3AF', fontWeight: 500, fontSize: '12px', padding: '12px 14px' }}>Date &amp; Time</th>
                    <th style={{ color: '#9CA3AF', fontWeight: 500, fontSize: '12px', padding: '12px 14px' }}>Email / Phone</th>
                    <th style={{ color: '#9CA3AF', fontWeight: 500, fontSize: '12px', padding: '12px 14px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEnquiries.length > 0 ? (
                    recentEnquiries.map((e, i) => {
                      const dateStr = new Date(e.createdAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                      return (
                        <tr key={e._id || i} style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ fontWeight: 600, color: '#58A429', padding: '14px', fontSize: '13px' }}>
                            ENQ-{String(i + 1).padStart(3, '0')}
                          </td>
                          <td style={{ fontWeight: 500, color: '#111827', padding: '14px', fontSize: '13px' }}>
                            <ReadMore maxWords={2}>{e.property?.name || 'Unnamed Property'}</ReadMore>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 500, color: '#374151', fontSize: '13px' }}><ReadMore maxWords={2}>{e.name || 'Guest'}</ReadMore></span>
                            </div>
                          </td>
                          <td style={{ color: '#6B7280', padding: '14px', fontSize: '13px' }}>
                            {dateStr}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontSize: '12.5px', color: '#374151', fontWeight: 500 }}>{e.email}</span>
                              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{e.phone}</span>
                            </div>
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span className={`status-pill ${e.replied ? 'active' : 'pending'}`}>
                              {e.replied ? 'Replied' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF', fontSize: '13px' }}>
                        No recent enquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
