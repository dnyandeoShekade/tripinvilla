import React, { useState, useRef, useEffect } from 'react';
import { DateRange, Calendar as ReactCalendar } from 'react-date-range';
import { format } from 'date-fns';
import { Calendar, X } from 'lucide-react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DateRangeDropdown({ 
  startDate, 
  endDate, 
  onChange 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState([
    {
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      key: 'selection'
    }
  ]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setTempRange([{
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(),
      key: 'selection'
    }]);
  }, [startDate, endDate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const handleSelect = (ranges) => {
    setTempRange([ranges.selection]);
  };

  const handleApply = () => {
    const start = format(tempRange[0].startDate, 'yyyy-MM-dd');
    const end = format(tempRange[0].endDate, 'yyyy-MM-dd');
    onChange(start, end);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger Input */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="daterange-trigger"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 10px',
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: 8,
          cursor: 'pointer',
          minWidth: 170,
          maxWidth: 200,
          color: '#374151',
          fontSize: 12,
          fontFamily: '"Outfit", sans-serif',
          whiteSpace: 'nowrap',
          overflow: 'hidden'
        }}
      >
        <Calendar size={13} style={{ color: '#6B7280', flexShrink: 0 }} />
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {startDate ? format(new Date(startDate), 'dd MMM yy') : 'Start Date'} 
          {' - '}
          {endDate ? format(new Date(endDate), 'dd MMM yy') : 'End Date'}
        </span>
      </div>

      {/* Dropdown Modal */}
      {isOpen && (
        <div className="daterange-dropdown-popup" style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: 8,
          background: '#FFFFFF',
          border: '1px solid #E5E7EB',
          borderRadius: 12,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          zIndex: 9999,
          overflow: 'hidden',
          width: 'max-content'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid #E5E7EB'
          }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#111827' }}>Select dates</span>
            <X size={16} style={{ cursor: 'pointer', color: '#6B7280' }} onClick={() => setIsOpen(false)} />
          </div>

          <div style={{ padding: '16px' }}>
            <div className="daterange-calendars-wrapper" style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827', marginBottom: '8px', paddingLeft: '8px' }}>From</div>
                <ReactCalendar
                  date={tempRange[0].startDate}
                  onChange={(date) => {
                    const newRange = { ...tempRange[0], startDate: date };
                    if (newRange.endDate && newRange.endDate < date) {
                      newRange.endDate = date;
                    }
                    setTempRange([newRange]);
                  }}
                  color="#2563EB"
                  showMonthAndYearPickers={false}
                />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827', marginBottom: '8px', paddingLeft: '8px' }}>To</div>
                <ReactCalendar
                  date={tempRange[0].endDate}
                  onChange={(date) => {
                    const newRange = { ...tempRange[0], endDate: date };
                    if (date < newRange.startDate) {
                      newRange.startDate = date;
                      newRange.endDate = date;
                    }
                    setTempRange([newRange]);
                  }}
                  minDate={tempRange[0].startDate}
                  color="#2563EB"
                  showMonthAndYearPickers={false}
                />
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12,
            padding: '12px 16px',
            borderTop: '1px solid #E5E7EB',
            background: '#F9FAFB'
          }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                padding: '8px 16px',
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              style={{
                padding: '8px 16px',
                background: '#2563EB',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
