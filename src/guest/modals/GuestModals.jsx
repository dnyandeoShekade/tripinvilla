import { ChevronLeft, ChevronRight, Eye, EyeOff, Star, X } from 'lucide-react';
import { loginLeftImg } from '../../assets';

export default function GuestModals(props) {
  const {
    // Gallery
    isGalleryOpen,
    activeDetailProp,
    currentImageIndex,
    setCurrentImageIndex,
    setIsGalleryOpen,

    // Auth modal
    authModalOpen,
    setAuthModalOpen,
    authMode,
    setAuthMode,
    showPassword,
    setShowPassword,
    token,
    authLoading,
    handleOAuthLogin,
    handleSignupSubmit,
    handleLoginSubmit,
    signupFirstName,
    setSignupFirstName,
    signupLastName,
    setSignupLastName,
    signupEmail,
    setSignupEmail,
    signupPassword,
    setSignupPassword,
    signupPhone,
    setSignupPhone,
    signupResidence,
    setSignupResidence,
    signupAddress,
    setSignupAddress,
    signupPincode,
    setSignupPincode,
    signupState,
    setSignupState,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,

    // Contact verification modal
    contactModalOpen,
    setContactModalOpen,
    contactStep,
    contactOTP,
    setContactOTP,
    otpLoading,
    otpError,
    otpChannel,
    resendTimer,
    enquiryFirstName,
    setEnquiryFirstName,
    enquiryLastName,
    setEnquiryLastName,
    enquiryEmail,
    setEnquiryEmail,
    enquiryPhone,
    setEnquiryPhone,
    handleSendOTP,
    handleVerifyOTP,

    // Review modal
    reviewModalOpen,
    setReviewModalOpen,
    reviewRating,
    setReviewRating,
    reviewText,
    setReviewText,
    reviewName,
    setReviewName,
    handleReviewFormSubmit,

    // Edit profile modal
    isEditProfileModalOpen,
    setIsEditProfileModalOpen,
    editProfileForm,
    setEditProfileForm,
    editProfileError,
    handleEditProfileSubmit,
  } = props;

  return (
    <>
      {/* ══ FULL SCREEN IMAGE GALLERY MODAL ══ */}
      {isGalleryOpen && activeDetailProp && (
        <div 
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 99999, 
            background: 'rgba(0,0,0,0.92)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }} 
          onClick={() => setIsGalleryOpen(false)}
        >
          <div 
            style={{ 
              position: 'relative', 
              width: '90vw', 
              height: '90vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }} 
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              style={{ 
                position: 'absolute', top: '-50px', right: '0', 
                color: '#fff', background: 'transparent', border: 'none', 
                cursor: 'pointer', padding: '8px', lineHeight: 1
              }} 
              onClick={() => setIsGalleryOpen(false)}
            >
              <X size={32} />
            </button>
            
            {/* Prev arrow */}
            <button 
              style={{ 
                position: 'absolute', left: '-60px', 
                color: '#fff', background: 'rgba(255,255,255,0.15)', 
                border: 'none', cursor: 'pointer', 
                padding: '14px 16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }} 
              onClick={() => setCurrentImageIndex(prev => {
                const imgs = activeDetailProp.images && activeDetailProp.images.length > 0 ? activeDetailProp.images : [activeDetailProp.img];
                return prev === 0 ? imgs.length - 1 : prev - 1;
              })}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Main image */}
            <img 
              src={(activeDetailProp.images && activeDetailProp.images.length > 0 ? activeDetailProp.images : [activeDetailProp.img])[currentImageIndex]} 
              alt={`Gallery view ${currentImageIndex + 1}`}
              style={{ 
                maxHeight: '100%', maxWidth: '100%', 
                objectFit: 'contain', borderRadius: '10px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                userSelect: 'none'
              }} 
            />

            {/* Next arrow */}
            <button 
              style={{ 
                position: 'absolute', right: '-60px', 
                color: '#fff', background: 'rgba(255,255,255,0.15)', 
                border: 'none', cursor: 'pointer', 
                padding: '14px 16px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }} 
              onClick={() => setCurrentImageIndex(prev => {
                const imgs = activeDetailProp.images && activeDetailProp.images.length > 0 ? activeDetailProp.images : [activeDetailProp.img];
                return prev === imgs.length - 1 ? 0 : prev + 1;
              })}
            >
              <ChevronRight size={28} />
            </button>

            {/* Image counter */}
            <div style={{ 
              position: 'absolute', bottom: '-44px', left: '50%', transform: 'translateX(-50%)',
              color: '#fff', fontSize: '16px', fontWeight: '500',
              background: 'rgba(255,255,255,0.1)', padding: '4px 16px', borderRadius: '20px'
            }}>
              {currentImageIndex + 1} / {(activeDetailProp.images && activeDetailProp.images.length > 0 ? activeDetailProp.images : [activeDetailProp.img]).length}
            </div>
          </div>
        </div>
      )}

      {/* ══ INTERACTIVE AUTHENTICATION MODAL (Figma-Accurate Sign Up / Log In Views) ══ */}
      {authModalOpen && (
        <div className="auth-modal-overlay" onClick={() => setAuthModalOpen(false)}>
          <div 
            className={`auth-modal-card ${authMode === 'login' ? 'login-split-card' : ''}`} 
            style={authMode === 'login' ? { position: 'relative' } : { position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="auth-close-btn" style={{ position: 'absolute', top: '24px', right: '28px', background: 'none', border: 'none', fontSize: '30px', color: '#9CA3AF', cursor: 'pointer', zIndex: 100 }} onClick={() => setAuthModalOpen(false)}>&times;</button>
            
            {authMode === 'signup' ? (
              <div className="auth-signup-content fade-in" style={{ width: '100%', boxSizing: 'border-box' }}>
                
                <h2 className="auth-modal-title" style={{ textAlign: 'center', fontFamily: "'Lato', sans-serif", fontSize: '32px', fontWeight: '500', color: '#111827', lineHeight: '1.35', marginBottom: '32px' }}>
                  Sign Up To <br />Find Your <span style={{ backgroundColor: '#0066ff', color: '#FFFFFF', padding: '2px 14px', borderRadius: '0px', display: 'inline-block', fontWeight: '700' }}>Perfect Stay</span>
                </h2>
                
                <form onSubmit={handleSignupSubmit} className="auth-signup-form" autoComplete="off">
                  <div className="auth-form-grid-3x3">
                    <div className="auth-form-group">
                      <label className="auth-input-label">First Name*</label>
                      <input type="text" className="auth-input-field" placeholder="Your first name" value={signupFirstName} onChange={(e) => setSignupFirstName(e.target.value)} required autoComplete="off" />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Last Name*</label>
                      <input type="text" className="auth-input-field" placeholder="Your surname" value={signupLastName} onChange={(e) => setSignupLastName(e.target.value)} required autoComplete="off" />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Choose Password*</label>
                      <div style={{ position: 'relative' }}>
                        <input type={showPassword ? "text" : "password"} className="auth-input-field" placeholder="Minimum 8 characters" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required autoComplete="off" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="auth-form-group">
                      <label className="auth-input-label">Email Address*</label>
                      <input type="email" className="auth-input-field" placeholder="name@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required autoComplete="off" />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Phone Number*</label>
                      <input type="tel" className="auth-input-field" placeholder="Enter your phone number" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} required autoComplete="off" />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Country of Residence*</label>
                      <input type="text" className="auth-input-field" placeholder="Select your country" value={signupResidence} onChange={(e) => setSignupResidence(e.target.value)} required autoComplete="off" />
                    </div>
                    
                    <div className="auth-form-group">
                      <label className="auth-input-label">Address*</label>
                      <input type="text" className="auth-input-field" placeholder="Apartment, street, city" value={signupAddress} onChange={(e) => setSignupAddress(e.target.value)} required autoComplete="off" />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Pin Code*</label>
                      <input type="text" className="auth-input-field" placeholder="Enter postal code" value={signupPincode} onChange={(e) => setSignupPincode(e.target.value)} required autoComplete="off" />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">State*</label>
                      <input type="text" className="auth-input-field" placeholder="Select your state" value={signupState} onChange={(e) => setSignupState(e.target.value)} required autoComplete="off" />
                    </div>
                  </div>
 
                  <button type="submit" className="auth-submit-btn-green" style={{ width: '100%', borderRadius: '15px', fontSize: '16px', fontWeight: '600', backgroundColor: '#58A429', color: '#FFFFFF', border: 'none', cursor: 'pointer', marginTop: '8px', height: '48px', transition: 'background-color 0.2s' }}>{authLoading ? 'Registering...' : 'Continue'}</button>
                </form>
 
                {/* Dotted separator line */}
                <div style={{ width: '100%', borderTop: '1px dotted #D1D5DB', margin: '24px 0 12px 0' }}></div>

                {/* Dashed divider */}
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '12px 0 24px 0' }}>
                  <div style={{ flex: 1, borderTop: '1px dotted #D1D5DB' }}></div>
                  <span style={{ padding: '0 16px', fontSize: '13px', color: '#9CA3AF' }}>Or Sign Up with</span>
                  <div style={{ flex: 1, borderTop: '1px dotted #D1D5DB' }}></div>
                </div>
 
                {/* Official Brand square social items */}
                <div className="auth-social-row" style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginBottom: '24px' }}>
                  <button style={{ background: '#f4f6f8', border: 'none', borderRadius: '10px', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} onClick={() => handleOAuthLogin('google')}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button style={{ background: '#f4f6f8', border: 'none', borderRadius: '10px', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} onClick={() => handleOAuthLogin('facebook')}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                </div>

                <div className="auth-footer-links" style={{ textAlign: 'center' }}>
                  <p className="auth-switch-text" style={{ fontSize: '14px', color: '#4B5563', margin: '6px 0' }}>
                    Already have an account? <span className="auth-link-green" style={{ color: '#58A429', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' }} onClick={() => setAuthMode('login')}>Log In</span>
                  </p>
                  <p className="auth-switch-text" style={{ fontSize: '14px', color: '#4B5563', margin: '6px 0' }}>
                    <span className="auth-link-owner" style={{ color: '#58A429', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { window.location.href = token ? `/owner/login?token=${token}` : '/owner/login'; setAuthModalOpen(false); }}>Log In as a Property Owner</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="auth-login-split-container fade-in" style={{ display: 'flex', width: '100%', height: '100%', flex: 1 }}>
                {/* Left side scenic Sunset pool image with clean CSS Glassmorphism Box */}
                <div className="auth-login-left-image" style={{ width: '550px', flexShrink: 0, height: '100%', display: 'block', overflow: 'hidden', position: 'relative' }}>
                  <img src={loginLeftImg} alt="Sign In / Sign Up" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: '0', transform: 'scale(1.15)' }} />
                </div>

                {/* Right side Log In form fields */}
                <div className="auth-login-right-content" style={{ flex: 1, padding: '50px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', position: 'relative' }}>
                  
                  <h2 className="auth-modal-title login-title-align" style={{ fontFamily: "'Lato', sans-serif", fontSize: '24px', fontWeight: '400', color: '#374151', lineHeight: '1.4', marginBottom: '24px' }}>
                    Log In Your Account To <br />Find Your <span style={{ backgroundColor: '#0066FF', color: '#FFFFFF', padding: '2px 10px', borderRadius: '4px', marginLeft: '6px', fontWeight: '700', display: 'inline-block' }}>Perfect Stay</span>
                  </h2>
                  
                  <form onSubmit={handleLoginSubmit} className="auth-login-form" autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="auth-form-group full-width">
                      <label className="auth-input-label">Email Address*</label>
                      <input type="text" className="auth-input-field" placeholder="jhondoe@gmail.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required autoComplete="off" />
                    </div>

                    <div className="auth-form-group full-width">
                      <label className="auth-input-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Password*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input type={showPassword ? "text" : "password"} className="auth-input-field" placeholder="••••••••" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required autoComplete="off" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" className="auth-submit-btn-green" style={{ width: '100%', borderRadius: '8px', fontSize: '15px', fontWeight: '600', backgroundColor: '#58A429', color: '#FFFFFF', border: 'none', cursor: 'pointer', height: '46px', transition: 'background-color 0.2s', marginTop: '12px' }}>
                      {authLoading ? 'Logging In...' : 'Continue'}
                    </button>
                  </form>

                  {/* Dotted separator line */}
                  <div style={{ width: '100%', borderTop: '1px dotted #D1D5DB', margin: '24px 0 8px 0' }}></div>

                  {/* Dashed divider */}
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '20px 0' }}>
                    <div style={{ flex: 1, borderTop: '1px dotted #D1D5DB' }}></div>
                    <span style={{ padding: '0 16px', fontSize: '13px', color: '#9CA3AF' }}>Or Sign In with</span>
                    <div style={{ flex: 1, borderTop: '1px dotted #D1D5DB' }}></div>
                  </div>

                  <div className="auth-social-row" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '8px' }}>
                    <button style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} onClick={() => handleOAuthLogin('google')}>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </button>
                    <button style={{ background: '#F3F4F6', border: 'none', borderRadius: '8px', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.2s' }} onClick={() => handleOAuthLogin('facebook')}>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                  </div>

                  <div className="auth-footer-links">
                    <p className="auth-switch-text">
                      Don't have an account? <span className="auth-link-green" style={{ color: '#58A429', fontWeight: '600', cursor: 'pointer', textDecoration: 'none' }} onClick={() => setAuthMode('signup')}>Sign Up</span>
                    </p>
                    <p className="auth-switch-text">
                      <span className="auth-link-owner" style={{ color: '#58A429', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { window.location.href = token ? `/owner/login?token=${token}` : '/owner/login'; setAuthModalOpen(false); }}>Log in as a Property Owner</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ══ INTERACTIVE CONTACT DETAIL VERIFICATION MODAL (Figma-Accurate View Contact & Request OTP) ══ */}
      {contactModalOpen && (
        <div className="auth-modal-overlay" onClick={() => setContactModalOpen(false)}>
          <div className="auth-modal-card contact-modal-card-size" onClick={(e) => e.stopPropagation()}>
            <button className="auth-close-btn" onClick={() => setContactModalOpen(false)}>&times;</button>
            
            {contactStep === 1 ? (
              <div className="contact-form-content fade-in">
                <h2 className="auth-modal-title">
                  View Contact <span className="highlight-sharp-blue-box">Number</span>
                </h2>
                
                {otpError && (
                  <div style={{ color: '#EF4444', backgroundColor: '#FEF2F2', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '500', marginBottom: '16px', border: '1px solid #FEE2E2', textAlign: 'center' }}>
                    {otpError}
                  </div>
                )}
                
                <form onSubmit={handleSendOTP} className="contact-info-form">
                  <div className="contact-form-grid-2x2">
                    <div className="auth-form-group">
                      <label className="auth-input-label">First Name*</label>
                      <input type="text" className="auth-input-field" placeholder="Add First Name" value={enquiryFirstName} onChange={(e) => setEnquiryFirstName(e.target.value)} required />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Last Name*</label>
                      <input type="text" className="auth-input-field" placeholder="Add Last Name" value={enquiryLastName} onChange={(e) => setEnquiryLastName(e.target.value)} required />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Email Address*</label>
                      <input type="email" className="auth-input-field" placeholder="Add Email Address" value={enquiryEmail} onChange={(e) => setEnquiryEmail(e.target.value)} required />
                    </div>
                    <div className="auth-form-group">
                      <label className="auth-input-label">Phone Number*</label>
                      <input type="tel" className="auth-input-field" placeholder="Add Phone Number" value={enquiryPhone} onChange={(e) => setEnquiryPhone(e.target.value)} required />
                    </div>
                  </div>

                  <button type="submit" className="auth-submit-btn-green mt-36" disabled={otpLoading}>
                    {otpLoading ? 'Requesting Code...' : 'Verify & View Contact Number'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="contact-otp-content fade-in">
                <h2 className="auth-modal-title">
                  Request Contact <span className="highlight-sharp-blue-box">Number</span>
                </h2>
                
                <p className="otp-sub-banner-text">
                  {otpChannel === 'sms' 
                    ? <>We've sent a 6-digit code to your phone <strong>{enquiryPhone}</strong> via SMS.</>
                    : <>We've sent a 6-digit code to your email <strong>{enquiryEmail}</strong>.</>
                  }
                </p>

                {otpError && (
                  <div style={{ color: '#EF4444', backgroundColor: '#FEF2F2', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '500', marginBottom: '16px', border: '1px solid #FEE2E2', textAlign: 'center' }}>
                    {otpError}
                  </div>
                )}
                
                <form onSubmit={handleVerifyOTP} className="contact-otp-form">
                  
                  <div className="otp-digit-inputs-row">
                    {contactOTP.map((val, idx) => (
                      <input 
                        key={idx}
                        type="text"
                        maxLength="1"
                        className="otp-digit-box"
                        placeholder="-"
                        value={val}
                        id={`otp-box-${idx}`}
                        onChange={(e) => {
                          const value = e.target.value;
                          const newOTP = [...contactOTP];
                          newOTP[idx] = value;
                          setContactOTP(newOTP);
                          
                          // Auto focus next box
                          if (value && idx < 5) {
                            const nextBox = document.getElementById(`otp-box-${idx + 1}`);
                            if (nextBox) nextBox.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <p className="otp-resend-prompt">
                    Didn't receive OTP?{' '}
                    {resendTimer > 0 ? (
                      <span style={{ color: '#9CA3AF', cursor: 'not-allowed' }}>Resend OTP</span>
                    ) : (
                      <span className="otp-resend-link" onClick={() => handleSendOTP(null)}>Resend OTP</span>
                    )}
                  </p>
                  
                  {resendTimer > 0 && (
                    <p className="otp-timer-subtext">
                      Resend available in {resendTimer}s
                    </p>
                  )}

                  <button type="submit" className="auth-submit-btn-green mt-36" disabled={otpLoading}>
                    {otpLoading ? 'Verifying...' : 'Verify & Proceed'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══ INTERACTIVE EXPERIENCE REVIEW SUBMISSION MODAL (Figma-Accurate Share Your Experience) ══ */}
      {reviewModalOpen && (
        <div className="auth-modal-overlay" onClick={() => setReviewModalOpen(false)}>
          <div className="auth-modal-card review-modal-card-size" onClick={(e) => e.stopPropagation()}>
            <button className="auth-close-btn" onClick={() => setReviewModalOpen(false)}>&times;</button>
            
            <div className="review-modal-content fade-in">
              <h2 className="auth-modal-title">
                Share Your <span className="highlight-sharp-blue-box">Experience</span>
              </h2>
              
              {/* Interactive Star Row */}
              <div className="review-star-selector-row">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button 
                    key={num}
                    type="button"
                    className="review-star-select-btn"
                    onClick={() => setReviewRating(num)}
                  >
                    <Star 
                      size={32} 
                      fill={num <= reviewRating ? "var(--accent-orange)" : "none"} 
                      color={num <= reviewRating ? "var(--accent-orange)" : "#D1D5DB"} 
                      strokeWidth={2}
                    />
                  </button>
                ))}
              </div>

              <form onSubmit={handleReviewFormSubmit} className="review-submit-form">
                
                <div className="auth-form-group full-width" style={{ marginBottom: '16px' }}>
                  <label className="auth-input-label">Your Name*</label>
                  <input 
                    type="text"
                    className="auth-input-field" 
                    placeholder="John Doe"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-form-group full-width">
                  <label className="auth-input-label">Your Review*</label>
                  <textarea 
                    className="auth-input-field auth-textarea-field" 
                    placeholder="The travel route was smooth and the journey was comfortable."
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="auth-submit-btn-green mt-36">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ══ INTERACTIVE EDIT PROFILE MODAL ══ */}
      {isEditProfileModalOpen && (
        <div className="auth-modal-overlay" onClick={() => setIsEditProfileModalOpen(false)} style={{ zIndex: 9999 }}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', width: '90%', padding: '32px', borderRadius: '16px', position: 'relative' }}>
            <button className="auth-close-btn" style={{ position: 'absolute', top: '20px', right: '24px', background: 'none', border: 'none', fontSize: '28px', color: '#9CA3AF', cursor: 'pointer' }} onClick={() => setIsEditProfileModalOpen(false)}>&times;</button>
            
            <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827', marginBottom: '20px', fontFamily: '"Outfit", sans-serif' }}>Edit Profile Details</h2>
            
            {editProfileError && (
              <div style={{ color: '#EF4444', backgroundColor: '#FEE2E2', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>
                {editProfileError}
              </div>
            )}

            <form onSubmit={handleEditProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Country of Citizenship</label>
                  <input 
                    type="text" 
                    value={editProfileForm.citizenship} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, citizenship: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Country of Residence</label>
                  <input 
                    type="text" 
                    value={editProfileForm.residence} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, residence: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Phone Number</label>
                  <input 
                    type="text" 
                    value={editProfileForm.phone} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, phone: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>City</label>
                  <input 
                    type="text" 
                    value={editProfileForm.city} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, city: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>State</label>
                  <input 
                    type="text" 
                    value={editProfileForm.state} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, state: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Pin Code</label>
                  <input 
                    type="text" 
                    value={editProfileForm.pincode} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, pincode: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Home Address</label>
                <input 
                  type="text" 
                  value={editProfileForm.address} 
                  onChange={e => setEditProfileForm({ ...editProfileForm, address: e.target.value })}
                  style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div style={{ borderTop: '1px solid #E5E7EB', margin: '8px 0' }}></div>
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#111827', margin: '0 0 10px 0' }}>Emergency Contact Details</h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Contact Person</label>
                  <input 
                    type="text" 
                    value={editProfileForm.emergencyName} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, emergencyName: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Phone Number</label>
                  <input 
                    type="text" 
                    value={editProfileForm.emergencyPhone} 
                    onChange={e => setEditProfileForm({ ...editProfileForm, emergencyPhone: e.target.value })}
                    style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#4B5563' }}>Email Address</label>
                <input 
                  type="email" 
                  value={editProfileForm.emergencyEmail} 
                  onChange={e => setEditProfileForm({ ...editProfileForm, emergencyEmail: e.target.value })}
                  style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13.5px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsEditProfileModalOpen(false)}
                  style={{ padding: '10px 20px', border: '1px solid #D1D5DB', borderRadius: '8px', background: '#ffffff', color: '#374151', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  style={{ padding: '10px 24px', border: 'none', borderRadius: '8px', background: '#58A429', color: '#ffffff', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}
