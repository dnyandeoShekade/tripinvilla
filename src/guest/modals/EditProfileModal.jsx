import { useState, useRef } from 'react';
import './styles/EditProfileModal.css';
import ImageCropper from '../../components/ImageCropper';

export default function EditProfileModal(props) {
  const {
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    editProfileForm,
    setEditProfileForm,
    editProfileError,
    handleEditProfileSubmit,
    avatarFile,
    setAvatarFile,
  } = props;

  const [cropFile, setCropFile]       = useState(null);
  const [showPreview, setShowPreview] = useState(false); // full-size lightbox
  const fileInputRef                  = useRef(null);

  if (!isEditProfileModalOpen) return null;

  // Build preview URL — cropped file takes priority, then existing saved avatar
  const getAvatarUrl = (av) => {
    if (!av) return null;
    if (av.startsWith('http') || av.startsWith('data:') || av.startsWith('blob:')) return av;
    const base = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE
      ? import.meta.env.VITE_API_BASE
      : 'http://localhost:8000/api'
    ).replace('/api', '');
    return `${base}/uploads/${av}`;
  };

  const previewUrl = avatarFile
    ? URL.createObjectURL(avatarFile)
    : getAvatarUrl(editProfileForm?.avatar || editProfileForm?.avatarUrl);

  const initials = (editProfileForm?.name || editProfileForm?.firstName || 'U')
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <>
      {/* ── Hidden file input (outside form so z-index issues don't bite) ── */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setCropFile(e.target.files[0]);
          }
          e.target.value = null;
        }}
      />

      <div className="edit-profile-modal-overlay" onClick={() => setIsEditProfileModalOpen(false)}>
        <div className="edit-profile-card" onClick={(e) => e.stopPropagation()}>

          {/* ── Sticky Header ── */}
          <div className="edit-profile-header">
            <h2 className="edit-profile-title">Edit Profile Details</h2>
            <button className="edit-profile-close-btn" onClick={() => setIsEditProfileModalOpen(false)}>&times;</button>
          </div>

          {/* ── Scrollable Body ── */}
          <div className="edit-profile-body">
            <form onSubmit={handleEditProfileSubmit} className="edit-profile-form" id="edit-profile-form">

              {editProfileError && (
                <div className="edit-profile-error">{editProfileError}</div>
              )}

              <div className="edit-profile-grid-2col">
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">Country of Citizenship</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.citizenship}
                    onChange={e => setEditProfileForm({ ...editProfileForm, citizenship: e.target.value })}
                  />
                </div>
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">Country of Residence</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.residence}
                    onChange={e => setEditProfileForm({ ...editProfileForm, residence: e.target.value })}
                  />
                </div>
              </div>

              <div className="edit-profile-grid-2col">
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">Phone Number</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.phone}
                    onChange={e => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                  />
                </div>
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">City</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.city}
                    onChange={e => setEditProfileForm({ ...editProfileForm, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="edit-profile-grid-2col">
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">State</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.state}
                    onChange={e => setEditProfileForm({ ...editProfileForm, state: e.target.value })}
                  />
                </div>
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">Pin Code</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.pincode}
                    onChange={e => setEditProfileForm({ ...editProfileForm, pincode: e.target.value })}
                  />
                </div>
              </div>

              <div className="edit-profile-field-group">
                <label className="edit-profile-label">Home Address</label>
                <input type="text" className="edit-profile-input"
                  value={editProfileForm.address}
                  onChange={e => setEditProfileForm({ ...editProfileForm, address: e.target.value })}
                />
              </div>

              <div className="edit-profile-divider" />
              <h4 className="edit-profile-sub-title">Emergency Contact Details</h4>

              <div className="edit-profile-grid-2col">
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">Contact Person</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.emergencyName}
                    onChange={e => setEditProfileForm({ ...editProfileForm, emergencyName: e.target.value })}
                  />
                </div>
                <div className="edit-profile-field-group">
                  <label className="edit-profile-label">Phone Number</label>
                  <input type="text" className="edit-profile-input"
                    value={editProfileForm.emergencyPhone}
                    onChange={e => setEditProfileForm({ ...editProfileForm, emergencyPhone: e.target.value })}
                  />
                </div>
              </div>

              <div className="edit-profile-field-group">
                <label className="edit-profile-label">Email Address</label>
                <input type="email" className="edit-profile-input"
                  value={editProfileForm.emergencyEmail}
                  onChange={e => setEditProfileForm({ ...editProfileForm, emergencyEmail: e.target.value })}
                />
              </div>

              <div className="edit-profile-divider" />

              {/* ── Profile Image Section ── */}
              <div className="edit-profile-field-group">
                <label className="edit-profile-label">Profile Image</label>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>

                  {/* Clickable avatar circle — click to open file picker, click again when image set to preview */}
                  <div
                    className="edit-profile-avatar-preview"
                    title={previewUrl ? 'Click to preview full image' : 'Click to choose a photo'}
                    style={{ cursor: 'pointer', position: 'relative' }}
                    onClick={() => {
                      if (previewUrl) {
                        setShowPreview(true);
                      } else {
                        openFilePicker();
                      }
                    }}
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Profile Preview" />
                        {/* overlay hint */}
                        <div style={{
                          position: 'absolute', inset: 0, borderRadius: '50%',
                          background: 'rgba(0,0,0,0.28)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          opacity: 0, transition: 'opacity 0.2s',
                        }}
                          className="avatar-hover-overlay"
                        >
                          <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, textAlign: 'center', lineHeight: 1.3 }}>
                            View<br/>Photo
                          </span>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <span style={{ fontSize: 22 }}>📷</span>
                        <span className="edit-profile-avatar-placeholder">{initials}</span>
                      </div>
                    )}
                  </div>

                  {/* Upload controls */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <button
                      type="button"
                      onClick={openFilePicker}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 18px',
                        background: '#F3F4F6',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: '13px',
                        color: '#374151',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                        marginBottom: '6px',
                      }}
                    >
                      📷 {avatarFile ? 'Change Photo' : 'Choose Photo'}
                    </button>
                    <p style={{ margin: 0, fontSize: '11px', color: '#9CA3AF' }}>
                      Supports JPG, PNG (Max 5MB) — Cropper opens after selecting.
                    </p>
                    {avatarFile && (
                      <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#58A429', fontWeight: 600 }}>
                        ✓ {avatarFile.name} selected &nbsp;
                        <span
                          style={{ color: '#EF4444', cursor: 'pointer', fontWeight: 500 }}
                          onClick={() => setAvatarFile(null)}
                        >Remove</span>
                      </p>
                    )}
                    {previewUrl && (
                      <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#6B7280' }}>
                        👆 Click the circle to preview full-size
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </form>
          </div>

          {/* ── Sticky Footer ── */}
          <div className="edit-profile-footer">
            <div className="edit-profile-actions">
              <button type="button" onClick={() => setIsEditProfileModalOpen(false)} className="edit-profile-btn-cancel">
                Cancel
              </button>
              <button type="submit" form="edit-profile-form" className="edit-profile-btn-submit">
                Save Changes
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Image Cropper ── */}
      {cropFile && (
        <ImageCropper
          file={cropFile}
          onApply={(croppedFile) => {
            setAvatarFile(croppedFile);
            setCropFile(null);
          }}
          onCancel={() => setCropFile(null)}
          shape="circle"
        />
      )}

      {/* ── Full-size preview lightbox ── */}
      {showPreview && previewUrl && (
        <div
          onClick={() => setShowPreview(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200000,
            background: 'rgba(0,0,0,0.82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div style={{ position: 'relative', maxWidth: 480, width: '100%' }} onClick={e => e.stopPropagation()}>
            <img
              src={previewUrl}
              alt="Full profile preview"
              style={{ width: '100%', borderRadius: 16, boxShadow: '0 24px 60px rgba(0,0,0,0.4)', display: 'block' }}
            />
            <button
              onClick={() => setShowPreview(false)}
              style={{
                position: 'absolute', top: -14, right: -14,
                width: 32, height: 32, borderRadius: '50%',
                background: '#fff', border: 'none', cursor: 'pointer',
                fontSize: 18, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                color: '#374151',
              }}
            >&times;</button>
            <button
              type="button"
              onClick={() => { setShowPreview(false); openFilePicker(); }}
              style={{
                marginTop: 16, width: '100%',
                padding: '10px', border: 'none', borderRadius: 10,
                background: '#58A429', color: '#fff', fontWeight: 700,
                fontSize: 14, cursor: 'pointer',
              }}
            >
              📷 Change Photo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
