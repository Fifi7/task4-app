import React, { useState } from 'react';
import '../css/MemberList.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const MemberForm = ({ onAddMember}) => {
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl);
  };

  const handleImageClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: new Date().getTime(),
      name,
      jobTitle,
      image,
    };

    onAddMember(newMember);
    setName('');
    setJobTitle('');
    setImage('');
  };

  return (
    <form className="member-form" onSubmit={handleSubmit}>
       <div className="list-arrow">
        <Link to="/member-list" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
        </Link>
      </div>
      <div className="image-input">
        <label className="add-image" htmlFor="image-upload" onClick={handleImageClick}>
          {image? (
            <img src={image} alt="Preview" className="preview-image" />
          ) : (
            <span>+</span>
          )}
        </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="circular-input"
          />
      </div>
      <input
        type="text"
        placeholder="Full Names"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input-field"
      />
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        required
        className="input-field"
      />
      <button type="submit" className="button">Add Member</button>
    </form>
  );
};

export default MemberForm;
































































