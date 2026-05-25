import { CheckCircle, ChevronDown, ChevronRight, CreditCard, Heart, MapPin, Percent, Play } from 'lucide-react';
import {
  aboutHeroImg,
  areaIcon,
  bedIcon,
  contactAddressIcon,
  contactBgShapeImg,
  contactCallIcon,
  contactEmailIcon,
  contactHeroImg,
  filterIcon,
  guestIcon,
  listPlaceHeroImg,
  missionIcon,
  privacyHeroImg,
  recommendHeroImg,
  rect32Img,
  rect33Img,
  rect35Img,
  roomIcon,
  stepIcon1,
  stepIcon2,
  stepIcon3,
  stepIcon4,
  termsHeroImg,
  visionIcon,
} from '../../assets';

export default function StaticPages(props) {
  const {
    activeMenu,
    token,
    user,
    setActiveMenu,
    setSelectedProperty,

    // Auth
    setAuthMode,
    setAuthModalOpen,

    // Contact state
    contactName,
    setContactName,
    contactPhone,
    setContactPhone,
    contactEmail,
    setContactEmail,
    contactMessage,
    setContactMessage,
    contactAgreed,
    setContactAgreed,

    // Terms / Privacy assets
    // (imported)

    // Recommend state
    isRecommendFilterOpen,
    setIsRecommendFilterOpen,
    recommendSearchQuery,
    setRecommendSearchQuery,
    recWishlist,
    setRecWishlist,

    // List your place state
    activeFaq,
    setActiveFaq,

    // Shared content
    homepageContent,
    renderTitle,
  } = props;

  return (
    <>
      {/* VIEW B-4: ABOUT US FULL PAGE VIEW */}
      {activeMenu === 'About Us' && (
        <div className="about-page-layout fade-in">
          
          {/* Custom scenic high-resolution About Us banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${aboutHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>About Us</h1>
          </div>

          <div className="about-main-wrapper">
            
            {/* Split layout: brand statements vs alpine photo card */}
            <div className="about-split-grid">
              
              {/* Left Column texts */}
              <div className="about-left-col">
                <h2 className="about-main-hdr">
                  Redefining the Way You <span className="highlight-sharp-blue-box" style={{ borderRadius: 0, padding: '4px 10px' }}>Experience Stays</span>
                </h2>
                
                <p className="about-desc-p">
                  We bring together handpicked hotels and private villas that combine comfort, quality, and reliability. Every property on our platform is carefully verified to ensure high standards of hospitality, transparent pricing, and a seamless booking experience—so you can focus on enjoying your journey, not planning it.
                </p>

                <div className="about-bullets-row">
                  <div className="about-bullet-item">
                    <CheckCircle size={16} color="var(--primary-blue)" fill="rgba(37,99,235,0.1)" />
                    <span>Curated & Verified Stays</span>
                  </div>
                  <div className="about-bullet-item">
                    <CheckCircle size={16} color="var(--primary-blue)" fill="rgba(37,99,235,0.1)" />
                    <span>Seamless Booking Experience</span>
                  </div>
                </div>

                {/* Our Mission */}
                <div className="about-mission-block">
                  <div className="green-square-icon-wrap">
                    <img src={missionIcon} alt="Our Mission Icon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="mission-texts">
                    <h5>Our Mission</h5>
                    <p>Our mission is to connect travelers with high-quality stays through a user-friendly platform.</p>
                  </div>
                </div>

                {/* Our Vision */}
                <div className="about-mission-block">
                  <div className="green-square-icon-wrap">
                    <img src={visionIcon} alt="Our Vision Icon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="mission-texts">
                    <h5>Our Vision</h5>
                    <p>To become a trusted travel platform that redefines how people discover and experience hotels and villas—making every stay comfortable, reliable, and memorable.</p>
                  </div>
                </div>

              </div>

              {/* Center Decorative Column */}
              <div className="about-vertical-line"></div>

              {/* Right Column photo */}
              <div className="about-right-col">
                <div className="about-master-image-box">
                  <img src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80" alt="Sunny alpine mountain chalet" />
                </div>
                
                {/* 40+ blue overlapping card */}
                <div className="about-blue-badge-card">
                  <span className="about-badge-title">40+</span>
                  <div className="about-badge-divider"></div>
                  <span className="about-badge-sub">Years of Experience That Drive Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Why Choose Our Services (Reused Component directly!) */}
          <div className="services-section" style={{ background: '#EBFDF2', padding: '60px 0', margin: '80px 0 0 0' }}>
            <div className="services-inner-container">
                
                <div className="section-title-wrap">
                  <h2 className="section-main-headline">
                    {renderTitle(homepageContent?.section5?.title, <span>Why Choose Our <span className="highlight-sharp-blue-box">Services</span></span>, "Services")}
                  </h2>
                  <p className="section-sub-headline" style={{ color: '#4B5563' }}>
                    {homepageContent?.section5?.subText || 'Choose the next destination for you'}
                  </p>
                </div>

                <div className="services-grid-asym">
                  <div className="services-col">
                    <div className="service-text-card white-bg">
                      <p className="service-card-desc">
                        {homepageContent?.section5?.row1?.subText || 'Every property is carefully verified to ensure quality, safety, and comfort you can rely on.'}
                      </p>
                      <h3 className="service-card-accent-title">{homepageContent?.section5?.row1?.title || 'Verified & Trusted Stays'}</h3>
                      <p className="service-card-subtext">{homepageContent?.section5?.row1?.subText || 'Get genuine and good stays'}</p>
                    </div>
                    <div className="service-image-card">
                      <img src={rect35Img} alt="{homepageContent?.section5?.features?.[0]?.title || 'Secure Payments'}" />
                      <div className="service-overlay-badge-bottom">
                        <div className="service-icon-circle-overlay"><CreditCard size={18} color="#FFFFFF" /></div>
                        <span>{homepageContent?.section5?.features?.[0]?.title || 'Secure Payments'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="services-col-center">
                    <div className="service-tall-card">
                      <img src={homepageContent?.section5?.image3 || rect32Img} alt="Traveler center image" />
                    </div>
                  </div>

                  <div className="services-col">
                    <div className="service-image-card">
                      <img src={homepageContent?.section5?.features?.[1]?.image || rect33Img} alt="Best Price" />
                      <div className="service-overlay-badge-bottom">
                        <div className="service-icon-circle-overlay"><Percent size={18} color="#FFFFFF" /></div>
                        <span>{homepageContent?.section5?.features?.[1]?.title || 'Best Price Guarantee'}</span>
                      </div>
                    </div>
                    <div className="service-text-card transparent-bg">
                      <div className="service-card-top-group">
                        <h3 className="service-card-accent-title">{homepageContent?.section5?.row2?.title || '24/7 Support, Always There'}</h3>
                        <p className="service-card-bold-sub">{homepageContent?.section5?.row2?.subText || 'All type of support'}</p>
                      </div>
                      <p className="service-card-desc-light">
                        From booking to checkout, our support team is available anytime to help you.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          <div className="about-main-wrapper" style={{ marginTop: 0 }}>
            {/* Our Testimonials Section */}
            <div className="our-testimonials-section" style={{ margin: '80px 0 20px 0' }}>
              <div className="section-title-wrap">
                <h2 className="section-main-headline">
                  {homepageContent?.section6?.title || <span>Our <span className="highlight-sharp-blue-box">Testimonials</span></span>}
                </h2>
                <p className="section-sub-headline">
                  {homepageContent?.section6?.subText || 'Check what our customers says about us'}
                </p>
              </div>

              {/* Renders the horizontal reviewers stack */}
              <div className="testimonials-horizontal-cards-row">
                
                {/* Review Card 1 */}
                <div className="testimonial-card-item">
                  <div className="testimonial-author-avatar-top">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Jessy Roy" />
                  </div>
                  <p className="testimonial-card-quote">
                    "Working with this team has been a seamless experience from start to finish. Their strategic approach, technical expertise, and commitment to deadlines helped us achieve measurable business growth. They didn't just deliver a solution—they delivered confidence and long-term value."
                  </p>
                  <div className="testimonial-footer-info">
                    <h5 className="author-name-signature">Jessy Roy</h5>
                    <span className="author-role-text">Director of Operations, Enterprise Client</span>
                  </div>
                </div>

                {/* Review Card 2: Full video cover style with overlay */}
                <div className="testimonial-card-item image-cover-mode">
                  <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80" alt="David Campbell" />
                  
                  <div className="image-cover-tint-overlay">
                    {/* Circle avatar badge */}
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #FFFFFF' }}>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="David thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div className="play-btn-circle-large">
                      <Play size={20} fill="#FFFFFF" color="#FFFFFF" style={{ marginLeft: '3px' }} />
                    </div>

                    <div>
                      <h5 className="cover-mode-signature-title">David Campbell</h5>
                      <span className="cover-mode-signature-role">Head of Digital Transformation</span>
                    </div>
                  </div>
                </div>

                {/* Review Card 3 */}
                <div className="testimonial-card-item">
                  <div className="testimonial-author-avatar-top">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Jeremy Renner" />
                  </div>
                  <p className="testimonial-card-quote">
                    "From initial consultation to final delivery, the team demonstrated exceptional professionalism. Their attention to detail, responsiveness, and quality of work significantly improved our operational efficiency."
                  </p>
                  <div className="testimonial-footer-info">
                    <h5 className="author-name-signature">Jeremy Renner</h5>
                    <span className="author-role-text">Project Manager, Corporate Solutions Firm</span>
                  </div>
                </div>

                {/* Review Card 4 */}
                <div className="testimonial-card-item">
                  <div className="testimonial-author-avatar-top">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Winona Ryder" />
                  </div>
                  <p className="testimonial-card-quote">
                    "Working with this team has been a seamless experience from start to finish. Their strategic approach, technical expertise, and commitment to deadlines helped us achieve measurable business growth. They didn't just deliver a solution—they delivered confidence and long-term value."
                  </p>
                  <div className="testimonial-footer-info">
                    <h5 className="author-name-signature">Winona Ryder</h5>
                    <span className="author-role-text">CEO, Growing Tech Company</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW B-5: CONTACT US FULL PAGE VIEW */}
      {activeMenu === 'Contact' && (
        <div className="contact-page-wrapper fade-in">
          
          {/* Custom scenic high-resolution Contact Us banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${contactHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>Contact Us</h1>
          </div>

          {/* Main Card Grid container holding left photo and right interactive form */}
          <div className="contact-main-row">
            
            {/* Left Column Image of front desk receptionists */}
            <div className="contact-image-panel">
              <img src={contactBgShapeImg} alt="Professional hotel frontdesk receptionists" />
            </div>

            {/* Right Column Form */}
            <div className="contact-form-panel">
              <h2 className="contact-form-title">Contact Us</h2>
              <p className="contact-form-sub">Fill out the form below & our team of expert will reach out to you as soon as possible.</p>

              <div className="contact-form-grid">
                
                {/* Row 1: Name and Phone */}
                <div className="contact-input-row">
                  <div className="contact-field-group">
                    <label className="contact-field-label">Name</label>
                    <input 
                      type="text" 
                      className="contact-text-input" 
                      placeholder="Enter your name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="contact-field-group">
                    <label className="contact-field-label">Phone Number</label>
                    <input 
                      type="text" 
                      className="contact-text-input" 
                      placeholder="Enter your phone number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="contact-field-group">
                  <label className="contact-field-label">Email Address</label>
                  <input 
                    type="email" 
                    className="contact-text-input" 
                    placeholder="Enter your email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>

                {/* Row 3: Message */}
                <div className="contact-field-group">
                  <label className="contact-field-label">Message</label>
                  <textarea 
                    className="contact-textarea" 
                    placeholder="Enter your message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                  />
                </div>

                {/* Row 4: Custom Circular Radio Agreement check */}
                <div className="contact-agreement-row" onClick={() => setContactAgreed(!contactAgreed)}>
                  <div className={`contact-radio-indicator ${contactAgreed ? 'checked' : ''}`}>
                    {contactAgreed && <div className="contact-radio-dot" />}
                  </div>
                  <span className="contact-agreement-text">Agreed to the terms & conditions</span>
                </div>

                {/* Row 5: Action submit button */}
                <button 
                  className="btn-send-message-green"
                  onClick={() => {
                    if (!contactAgreed) {
                      alert('Please agree to the terms & conditions first!');
                      return;
                    }
                    alert(`Thank you ${contactName || 'Valued Guest'}! Your message has been sent to our corporate desks successfully!`);
                    setContactName('');
                    setContactPhone('');
                    setContactEmail('');
                    setContactMessage('');
                    setContactAgreed(false);
                  }}
                >
                  <span>Send us a message</span>
                  <ChevronRight size={18} />
                </button>

              </div>
            </div>

          </div>

          {/* Contact Details Grid Box underneath */}
          <div className="contact-details-wrapper">
            
            {/* Left description column */}
            <div className="details-left-side">
              <h2 className="details-main-title">Contact Details</h2>
              <p className="details-sub-title">You can call us or contact us directly</p>
            </div>

            {/* Right details stack column */}
            <div className="details-cards-stack">
              
              {/* Card 1: Address */}
              <div className="details-pill-card">
                <div className="details-icon-avatar">
                  <img src={contactAddressIcon} alt="Address" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="details-texts-col">
                  <span className="details-card-lbl">Address</span>
                  <span className="details-card-val">Esc. 135 Cuesta Adan Grijalva, Elda Nav 11777</span>
                </div>
              </div>

              {/* Card 2: Email Us */}
              <div className="details-pill-card">
                <div className="details-icon-avatar">
                  <img src={contactEmailIcon} alt="Email" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="details-texts-col">
                  <span className="details-card-lbl">Email Us</span>
                  <span className="details-card-val">contact@econwise.com</span>
                </div>
              </div>

              {/* Card 3: Call Us */}
              <div className="details-pill-card">
                <div className="details-icon-avatar">
                  <img src={contactCallIcon} alt="Call" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div className="details-texts-col">
                  <span className="details-card-lbl">Call Us</span>
                  <span className="details-card-val">+91 98765 43210</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* VIEW B-6: TERMS & CONDITIONS FULL PAGE VIEW */}
      {activeMenu === 'Terms' && (
        <div className="terms-page-wrapper fade-in">
          
          {/* Custom scenic high-resolution Terms & Conditions banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${termsHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>Terms & Conditions</h1>
          </div>

          {/* Centered Document container holding terms detail rows */}
          <div className="terms-document-box">
            
            <h2 className="terms-document-title">Terms and Condition</h2>

            <div className="terms-document-content">
              
              <h3 className="terms-section-header">OVERVIEW</h3>
              <p className="terms-text-p">
                The website is operated by TripinVilla. Throughout the site, the terms "we", "us" and "our" refer to TripinVilla. TripinVilla offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
              </p>
              <p className="terms-text-p">
                By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including additional terms and conditions and policies referenced here and/or available via hyperlink. These Terms of Service apply to all users of the site, including without limitation browsers, vendors, customers, merchants, and/or contributors of content.
              </p>
              <p className="terms-text-p">
                Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms are considered an offer, acceptance is expressly limited to these Terms.
              </p>
              <p className="terms-text-p" style={{ marginBottom: '40px' }}>
                Any new features or tools added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms at any time on this page. We reserve the right to update, change, modify, or replace any part of these Terms by posting updates and/or changes on our website. It is your responsibility to check this page periodically for changes. Continued use of or access to the website following any changes constitutes acceptance of those changes.
              </p>

              <h3 className="terms-section-header">1 – ONLINE STORE TERMS</h3>
              <p className="terms-text-p">
                By agreeing to these Terms of Service, you represent that you are at least the age of majority and in good health in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
              </p>
              <p className="terms-text-p">
                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).
              </p>
              <p className="terms-text-p">
                You must not transmit any worms or viruses or any code of a destructive nature in the site.
              </p>
              <p className="terms-text-p" style={{ marginBottom: '40px' }}>
                A breach or violation of any of the Terms will result in an immediate termination of your Services and you may be liable for legal consequences.
              </p>

              <h3 className="terms-section-header">2 – GENERAL CONDITIONS</h3>
              <p className="terms-text-p">
                We reserve the right to refuse service to anyone for any reason at any time.
              </p>
              <p className="terms-text-p" style={{ marginBottom: '40px' }}>
                You understand that your content (not including credit card information), may be transferred encrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.
              </p>

              <h3 className="terms-section-header">3 – ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION</h3>
              <p className="terms-text-p">
                TripinVilla is not responsible if information made available on this website is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information. Any reliance on the material on this site is at your own risk.
              </p>
              <p className="terms-text-p" style={{ marginBottom: '40px' }}>
                This website may contain certain historical information. Historical information is not necessarily current and is provided for your reference only. TripinVilla reserves the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site and review updated content regularly to stay informed of any modifications.
              </p>

              <h3 className="terms-section-header">4 – MODIFICATIONS TO SERVICE AND PRICES</h3>
              <p className="terms-text-p">
                Prices for our services and products are subject to change without notice. TripinVilla reserves the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
              </p>
              <p className="terms-text-p" style={{ marginBottom: '40px' }}>
                TripinVilla shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service. We continuously strive to improve our services and may introduce, remove, or modify features based on operational, technical, or business requirements.
              </p>

              <h3 className="terms-section-header">6 – BILLING AND ACCOUNT INFORMATION</h3>
              <p className="terms-text-p">
                TripinVilla reserves the right to refuse any order you place with us. We may limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed under the same customer account, credit card, and/or orders that use the same billing and/or shipping address.
              </p>
              <p className="terms-text-p">
                You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and payment details, so that we can complete your transactions and contact you as needed.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* VIEW B-6.5: PRIVACY POLICY FULL PAGE VIEW */}
      {activeMenu === 'Privacy' && (
        <div className="terms-page-wrapper fade-in">
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${privacyHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>Privacy Policy</h1>
          </div>

          <div className="terms-document-box">
            <h2 className="terms-document-title">Privacy Policy</h2>
            <div className="terms-document-content">
              <h3 className="terms-section-header">OVERVIEW</h3>
              <p className="terms-text-p">
                This Privacy Policy describes how TripinVilla collects, uses, discloses, and protects your personal information when you visit or make a purchase from our website. By using our website and services, you agree to the collection and use of information in accordance with this policy.
              </p>
              <p className="terms-text-p">
                TripinVilla is committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. We comply with applicable data protection laws and take reasonable measures to protect your data from unauthorized access, misuse, or disclosure.
              </p>

              <h3 className="terms-section-header">1 – INFORMATION WE COLLECT</h3>
              <p className="terms-text-p">
                When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some cookies installed on your device.
              </p>
              <p className="terms-text-p">
                Additionally, when you make a purchase or attempt to make a purchase through the website, we collect certain personal information from you, including your name, billing address, shipping address, payment information, email address, and phone number. We may also collect additional information if you contact customer support or interact with our services.
              </p>

              <h3 className="terms-section-header">2 – HOW WE USE YOUR INFORMATION</h3>
              <p className="terms-text-p">
                TripinVilla uses the collected information for various purposes, including processing transactions, providing customer support, improving our website, and communicating with you about orders, updates, or promotional offers.
              </p>
              <p className="terms-text-p">
                We may also use your information to screen orders for potential risk or fraud and to improve and optimize our website experience. Your information helps us better understand customer preferences and improve our service quality.
              </p>

              <h3 className="terms-section-header">3 – SHARING YOUR PERSONAL INFORMATION</h3>
              <p className="terms-text-p">
                TripinVilla does not sell, rent, or trade your personal information to third parties. However, we may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you.
              </p>
              <p className="terms-text-p">
                We may also disclose your information when required by law, legal process, or governmental request, or to protect our legal rights and prevent fraud or security issues.
              </p>

              <h3 className="terms-section-header">4 – DATA SECURITY</h3>
              <p className="terms-text-p">
                TripinVilla takes reasonable precautions and follows industry best practices to protect your personal information from loss, misuse, unauthorized access, disclosure, alteration, or destruction.
              </p>
              <p className="terms-text-p">
                All payment information is encrypted and processed through secure payment gateways. While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the Internet is 100% secure.
              </p>

              <h3 className="terms-section-header">5 – COOKIES AND TRACKING TECHNOLOGIES</h3>
              <p className="terms-text-p">
                TripinVilla uses cookies and similar tracking technologies to improve your browsing experience, analyze website traffic, and understand user behavior.
              </p>
              <p className="terms-text-p">
                You can choose to disable cookies through your browser settings. However, disabling cookies may affect certain features and functionality of our website.
              </p>

              <h3 className="terms-section-header">6 – THIRD-PARTY SERVICES</h3>
              <p className="terms-text-p">
                Our website may contain links to third-party websites or services. TripinVilla is not responsible for the privacy practices or content of third-party websites. We encourage users to review the privacy policies of any third-party websites they visit.
              </p>

              <h3 className="terms-section-header">7 – YOUR RIGHTS</h3>
              <p className="terms-text-p">
                You have the right to access, update, or delete your personal information. You may contact us if you wish to review or correct any personal information we hold about you.
              </p>
              <p className="terms-text-p">
                You may also opt out of receiving marketing communications from us at any time by following the unsubscribe instructions included in our emails.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW B-7: RECOMMENDED BY US FULL PAGE VIEW */}
      {activeMenu === 'Recommend By Us' && (
        <div className="recommend-page-wrapper fade-in">
          
          {/* Custom scenic high-resolution swimming pool resort twilight banner */}
          <div className="dashboard-hero-banner" style={{ backgroundImage: `url("${recommendHeroImg}")` }}>
            <h1 className="dashboard-hero-title" style={{ marginTop: '170px' }}>Recommended By Us</h1>
          </div>

          {/* Centered Recommendations page content wrapper */}
          <div className="recommend-main-container">
            
            {/* Header row with description and filter buttons */}
            <div className="recommend-header-row">
              <div className="recommend-header-left">
                <h2 className="recommend-header-title">Our Recommendations</h2>
                <p className="recommend-header-sub">Keep track of destinations and villas you love. Access them anytime and make your travel planning simple.</p>
              </div>
              <button className="recommend-filter-btn" onClick={() => setIsRecommendFilterOpen(!isRecommendFilterOpen)}>
                <img src={filterIcon} alt="Filter" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                <span>Filters</span>
              </button>
            </div>

            {isRecommendFilterOpen && (
              <div className="filter-panel-box" style={{ display: 'flex', gap: '16px', margin: '16px 0', padding: '16px', background: '#FAFAFA', borderRadius: '10px', border: '1px solid #E5E7EB', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>Search Recommendations</label>
                  <input 
                    type="text" 
                    placeholder="Search by name or location..." 
                    value={recommendSearchQuery}
                    onChange={e => setRecommendSearchQuery(e.target.value)}
                    style={{ padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
                  />
                </div>
              </div>
            )}

            {/* Recommendations Grid layout */}
            <div className="recommend-cards-grid">
              {[
                {
                  id: 0,
                  name: "Aparahotel Stare Miasto",
                  location: "Kasol, Himachal Pradesh, India",
                  area: "31 sq. ft.",
                  beds: "2 Beds",
                  rooms: "1 Room",
                  guests: "3 Person",
                  price: "140",
                  img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80"
                },
                {
                  id: 1,
                  name: "Elysian Alpine Retreat",
                  location: "Manali, Himachal Pradesh, India",
                  area: "31 sq. ft.",
                  beds: "2 Beds",
                  rooms: "1 Room",
                  guests: "3 Person",
                  price: "140",
                  img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80"
                },
                {
                  id: 2,
                  name: "Stellar Ridge Villa",
                  location: "Shimla, Himachal Pradesh, India",
                  area: "31 sq. ft.",
                  beds: "2 Beds",
                  rooms: "1 Room",
                  guests: "3 Person",
                  price: "140",
                  img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80"
                },
                {
                  id: 3,
                  name: "Grand Castle Heritage Homestay",
                  location: "Kasol, Himachal Pradesh, India",
                  area: "31 sq. ft.",
                  beds: "2 Beds",
                  rooms: "1 Room",
                  guests: "3 Person",
                  price: "140",
                  img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
                },
                {
                  id: 4,
                  name: "Infinity Blue Ocean Villa",
                  location: "Goa Beachsides, India",
                  area: "31 sq. ft.",
                  beds: "2 Beds",
                  rooms: "1 Room",
                  guests: "3 Person",
                  price: "140",
                  img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                },
                {
                  id: 5,
                  name: "Cloud-Nine Horizon Cottage",
                  location: "Munnar Hills, Kerala, India",
                  area: "31 sq. ft.",
                  beds: "2 Beds",
                  rooms: "1 Room",
                  guests: "3 Person",
                  price: "140",
                  img: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=600&q=80"
                }
              ].filter(item => 
                !recommendSearchQuery || 
                item.name.toLowerCase().includes(recommendSearchQuery.toLowerCase()) || 
                item.location.toLowerCase().includes(recommendSearchQuery.toLowerCase())
              ).map((item) => {
                const isLiked = recWishlist.includes(item.id);
                return (
                  <div key={item.id} className="recommend-property-card">
                    
                    {/* Top frame with custom image overlay */}
                    <div className="recommend-card-img-wrap">
                      <img src={item.img} alt={item.name} />
                      
                      {/* Heart wishlist circular toggle */}
                      <button 
                        className={`recommend-heart-circle ${isLiked ? 'liked' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isLiked) {
                            setRecWishlist(recWishlist.filter(id => id !== item.id));
                          } else {
                            setRecWishlist([...recWishlist, item.id]);
                          }
                        }}
                      >
                        <Heart size={16} fill={isLiked ? "#EF4444" : "none"} color={isLiked ? "#EF4444" : "#FFFFFF"} />
                      </button>
                    </div>

                    <div className="recommend-card-info-col">
                      <h4 className="recommend-card-name-text">{item.name}</h4>
                      
                      <div className="recommend-card-location-row">
                        <span>{item.location}</span>
                        <MapPin size={13} color="#9CA3AF" />
                      </div>

                      <div className="recommend-specs-2x2-grid">
                        <div className="recommend-spec-pill">
                          <img src={areaIcon} alt="Area" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                          <span>Area Size: {(item.bedRooms || 2) * 150} sq. ft.</span>
                        </div>
                        <div className="recommend-spec-pill">
                          <img src={bedIcon} alt="Beds" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                          <span>Beds: {item.bedRooms || 2} Beds</span>
                        </div>
                        <div className="recommend-spec-pill">
                          <img src={roomIcon} alt="Rooms" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                          <span>Rooms: {item.bedRooms || 1} Room</span>
                        </div>
                        <div className="recommend-spec-pill">
                          <img src={guestIcon} alt="Guests" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
                          <span>Guests: {item.capacity || 3} Person</span>
                        </div>
                      </div>

                      <div className="recommend-price-tag-row">
                        <span className="price-label">Starting from </span>
                        <span className="price-green-bold">
                          {String(item.price).startsWith('₹') ? item.price : '₹' + item.price}/night
                        </span>
                      </div>

                      <div className="recommend-actions-row">
                        <button className="recommend-details-btn-blue" onClick={() => {
                          setSelectedProperty({
                            title: item.name,
                            location: item.location,
                            price: String(item.price).startsWith('₹') ? item.price : `₹${item.price}`,
                            img: item.img,
                            images: [
                              item.img,
                              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
                              "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=600&q=80"
                            ],
                            area: item.area,
                            beds: item.beds,
                            rooms: item.rooms,
                            guests: item.guests,
                            amenities: item.amenities || [],
                            ownerContact: item.ownerContact || '',
                            description: item.description || ''
                          });
                          setActiveMenu('Detail');
                        }}>
                          View Details
                        </button>
                        
                        <button className="recommend-contact-btn-green" onClick={() => alert(`Connecting with the owner of "${item.name}"... Our corporate desk is transferring your request.`)}>
                          Contact Owner
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* VIEW B-8: LIST YOUR PLACE FULL PAGE VIEW */}
      {activeMenu === 'List Your Place' && (
        <div className="list-property-page-wrapper fade-in">
          
          {/* High-resolution hotel bedroom banner with centered button */}
          <div className="dashboard-hero-banner list-hero-custom" style={{ backgroundImage: `url("${listPlaceHeroImg}")` }}>
            <h1 className="dashboard-hero-title">List Your Property</h1>
            
            <button className="btn-hero-green" onClick={() => {
              if (!token || !user) {
                setAuthMode('login');
                setAuthModalOpen(true);
              } else {
                window.location.href = `/owner/register?token=${token}`;
              }
            }}>
              List Property
            </button>
          </div>

          {/* Centered Steps Container: "All You Have To Do" */}
          <div className="list-steps-container">
            
            <div className="list-section-title-wrap">
              <h2 className="list-section-headline">
                All You Have <span className="highlight-sharp-blue-box">To Do</span>
              </h2>
              <p className="list-section-subline">Do The Following Steps To List Your Property With Us</p>
            </div>

            <div className="list-four-steps-grid">
              
              <div className="list-step-card">
                <div className="list-step-icon-avatar">
                  <img src={stepIcon1} alt="Step 1" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <p className="list-step-card-text">
                  Sign In Or Sign Up As A Property Owner
                </p>
              </div>

              <div className="list-step-card">
                <div className="list-step-icon-avatar">
                  <img src={stepIcon2} alt="Step 2" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <p className="list-step-card-text">
                  Upload Your Property Details And Photos
                </p>
              </div>

              <div className="list-step-card">
                <div className="list-step-icon-avatar">
                  <img src={stepIcon3} alt="Step 3" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <p className="list-step-card-text">
                  Set Your Prices And Available Dates
                </p>
              </div>

              <div className="list-step-card">
                <div className="list-step-icon-avatar">
                  <img src={stepIcon4} alt="Step 4" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <p className="list-step-card-text">
                  See Your Property Go Live In Front Of Millions Of Travelers
                </p>
              </div>

            </div>

          </div>

          {/* Reused "Why Choose Our Services" Section Container */}
          <div className="services-section" style={{ marginBottom: 0 }}>
            <div className="services-inner-container">
              
              <div className="section-title-wrap">
                <h2 className="section-main-headline">
                  {homepageContent?.section5?.row1?.title || <span>Why Choose Our <span className="highlight-sharp-blue-box">Services</span></span>}
                </h2>
                <p className="section-sub-headline" style={{ color: '#4B5563' }}>
                  {homepageContent?.section5?.row1?.subText || 'Choose the next destination for you'}
                </p>
              </div>

              {/* Asymmetric custom grid row */}
              <div className="services-grid-asym">
                
                {/* Column 1 */}
                <div className="services-col">
                  
                  {/* White card top */}
                  <div className="service-text-card white-bg">
                    <p className="service-card-desc">
                      {homepageContent?.section5?.row1?.subText || 'Every property is carefully verified to ensure quality, safety, and comfort you can rely on.'}
                    </p>
                    <h3 className="service-card-accent-title">{homepageContent?.section5?.row1?.title || 'Verified & Trusted Stays'}</h3>
                    <p className="service-card-subtext">{homepageContent?.section5?.row1?.subText || 'Get genuine and good stays'}</p>
                  </div>

                  {/* {homepageContent?.section5?.features?.[0]?.title || 'Secure Payments'} bottom image */}
                  <div className="service-image-card">
                    <img 
                      src={rect35Img} 
                      alt="{homepageContent?.section5?.features?.[0]?.title || 'Secure Payments'}" 
                    />
                    <div className="service-overlay-badge-bottom">
                      <div className="service-icon-circle-overlay">
                        <CreditCard size={18} color="#FFFFFF" />
                      </div>
                      <span>{homepageContent?.section5?.features?.[0]?.title || 'Secure Payments'}</span>
                    </div>
                  </div>

                </div>

                {/* Column 2 (Full Height Traveler center image) */}
                <div className="services-col-center">
                  <div className="service-tall-card">
                    <img src={homepageContent?.section5?.image3 || rect32Img} alt="Traveler with suitcase" />
                  </div>
                </div>

                {/* Column 3 */}
                <div className="services-col">
                  
                  {/* Pool Resort top image */}
                  <div className="service-image-card">
                    <img src={homepageContent?.section5?.features?.[1]?.image || rect33Img} alt={homepageContent?.section5?.features?.[1]?.title || "Best Price Guarantee"} />
                    <div className="service-overlay-badge-bottom">
                      <div className="service-icon-circle-overlay">
                        <Percent size={18} color="#FFFFFF" />
                      </div>
                      <span>{homepageContent?.section5?.features?.[1]?.title || 'Best Price Guarantee'}</span>
                    </div>
                  </div>

                  {/* 24/7 Support text card bottom */}
                  <div className="service-text-card transparent-bg">
                    <div className="service-card-top-group">
                      <h3 className="service-card-accent-title">{homepageContent?.section5?.row2?.title || '24/7 Support, Always There'}</h3>
                      <p className="service-card-bold-sub">{homepageContent?.section5?.row2?.subText || 'All type of support'}</p>
                    </div>
                    <p className="service-card-desc-light">
                      From booking to checkout, our support team is available anytime to help you.
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Collapsible FAQ Accordion Section */}
          <div className="list-faq-container">
            
            <div className="list-section-title-wrap">
              <h2 className="list-section-headline">
                Frequently Asked <span className="highlight-sharp-blue-box">Questions</span>
              </h2>
              <p className="list-section-subline">You Can Ask Anything You Want</p>
            </div>

            <div className="faq-accordion-stack">
              {[
                {
                  q: "How can I enquire about a villa?",
                  a: "You can submit your enquiry through our online enquiry form available on each villa detail page. Simply provide your name, contact details, preferred dates, and requirements – our team will get back to you shortly."
                },
                {
                  q: "Is there any fee to submit an enquiry?",
                  a: "No, submitting an enquiry is completely free. You will only pay when you finalize and book a property."
                },
                {
                  q: "How soon will I receive a response?",
                  a: "Our travel experts typically respond within 2 to 4 hours during business days."
                },
                {
                  q: "Can I schedule a site visit before booking?",
                  a: "Yes, we can organize virtual or physical site visits for long-term villa rentals upon request."
                },
                {
                  q: "Are the villas available for short-term stays?",
                  a: "Absolutely! We support both short-term weekend getaways and long-term stays."
                },
                {
                  q: "What amenities are included in the villa?",
                  a: "Most of our villas include high-speed Wi-Fi, fully equipped kitchens, private pools, housekeepers, and gated security."
                }
              ].map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`faq-accordion-item ${isOpen ? 'expanded' : ''}`} onClick={() => setActiveFaq(isOpen ? null : idx)}>
                    
                    {/* Header Row */}
                    <div className="faq-header-trigger">
                      <div className="faq-question-col">
                        <div className="faq-badge-num">{idx + 1}</div>
                        <span className="faq-question-text">{faq.q}</span>
                      </div>
                      <ChevronDown size={18} className={`faq-arrow-indicator ${isOpen ? 'rotated' : ''}`} />
                    </div>

                    {/* Collapsible Content */}
                    <div className="faq-content-slider">
                      <p className="faq-answer-text">{faq.a}</p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

    </>
  );
}
