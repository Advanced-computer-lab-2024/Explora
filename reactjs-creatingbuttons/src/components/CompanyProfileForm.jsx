import React, { useState } from 'react';
//import './CompanyProfileForm.css';

const CompanyProfileForm = ({ profileData, onSave }) => {
  const [companyInfo, setCompanyInfo] = useState(profileData || {
    name: '',
    website: '',
    hotline: '',
    profileDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(companyInfo);
  };

  return (
    <div className="profile-form-wrapper">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>{profileData ? 'Edit Company Profile' : 'Create Company Profile'}</h2>
        
        <div className="input-box">
          <label>Company Name</label>
          <input 
            type="text"
            name="name"
            value={companyInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-box">
          <label>Website</label>
          <input 
            type="url"
            name="website"
            value={companyInfo.website}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-box">
          <label>Hotline</label>
          <input 
            type="text"
            name="hotline"
            value={companyInfo.hotline}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="input-box">
          <label>Company Profile Description</label>
          <textarea
            name="profileDescription"
            value={companyInfo.profileDescription}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CompanyProfileForm;
