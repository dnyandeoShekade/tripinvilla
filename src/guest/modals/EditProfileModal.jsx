import './styles/EditProfileModal.css';

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

  if (!isEditProfileModalOpen) return null;

  return (
    <div className="edit-profile-modal-overlay" onClick={() => setIsEditProfileModalOpen(false)}>
      <div className="edit-profile-card" onClick={(e) => e.stopPropagation()}>
        <button className="edit-profile-close-btn" onClick={() => setIsEditProfileModalOpen(false)}>&times;</button>
        
        <h2 className="edit-profile-title">Edit Profile Details</h2>
        
        {editProfileError && (
          <div className="edit-profile-error">
            {editProfileError}
          </div>
        )}

        <form onSubmit={handleEditProfileSubmit} className="edit-profile-form">
          <div className="edit-profile-grid-2col">
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">Country of Citizenship</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.citizenship} 
                onChange={e => setEditProfileForm({ ...editProfileForm, citizenship: e.target.value })}
              />
            </div>
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">Country of Residence</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.residence} 
                onChange={e => setEditProfileForm({ ...editProfileForm, residence: e.target.value })}
              />
            </div>
          </div>

          <div className="edit-profile-grid-2col">
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">Phone Number</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.phone} 
                onChange={e => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
              />
            </div>
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">City</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.city} 
                onChange={e => setEditProfileForm({ ...editProfileForm, city: e.target.value })}
              />
            </div>
          </div>

          <div className="edit-profile-grid-2col">
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">State</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.state} 
                onChange={e => setEditProfileForm({ ...editProfileForm, state: e.target.value })}
              />
            </div>
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">Pin Code</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.pincode} 
                onChange={e => setEditProfileForm({ ...editProfileForm, pincode: e.target.value })}
              />
            </div>
          </div>

          <div className="edit-profile-field-group">
            <label className="edit-profile-label">Home Address</label>
            <input 
              type="text" 
              className="edit-profile-input"
              value={editProfileForm.address} 
              onChange={e => setEditProfileForm({ ...editProfileForm, address: e.target.value })}
            />
          </div>

          <div className="edit-profile-divider"></div>
          <h4 className="edit-profile-sub-title">Emergency Contact Details</h4>

          <div className="edit-profile-grid-2col">
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">Contact Person</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.emergencyName} 
                onChange={e => setEditProfileForm({ ...editProfileForm, emergencyName: e.target.value })}
              />
            </div>
            <div className="edit-profile-field-group">
              <label className="edit-profile-label">Phone Number</label>
              <input 
                type="text" 
                className="edit-profile-input"
                value={editProfileForm.emergencyPhone} 
                onChange={e => setEditProfileForm({ ...editProfileForm, emergencyPhone: e.target.value })}
              />
            </div>
          </div>

          <div className="edit-profile-field-group" style={{ marginBottom: '20px' }}>
            <label className="edit-profile-label">Email Address</label>
            <input 
              type="email" 
              className="edit-profile-input"
              value={editProfileForm.emergencyEmail} 
              onChange={e => setEditProfileForm({ ...editProfileForm, emergencyEmail: e.target.value })}
            />
          </div>

          <div className="edit-profile-field-group" style={{ marginBottom: '24px' }}>
            <label className="edit-profile-label">Profile Image</label>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginTop: '8px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: '#F3F4F6',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {avatarFile ? (
                  <img src={URL.createObjectURL(avatarFile)} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>No image</span>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setAvatarFile(e.target.files[0]);
                    }
                  }}
                  style={{ display: 'block', fontSize: '13px', color: '#4B5563' }}
                />
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#9CA3AF' }}>Supports JPG, PNG (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="edit-profile-actions">
            <button 
              type="button" 
              onClick={() => setIsEditProfileModalOpen(false)}
              className="edit-profile-btn-cancel"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="edit-profile-btn-submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
