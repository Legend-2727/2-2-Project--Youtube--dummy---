import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleChangePic = () => {
    // Perform any action you want with the selected image
    // For example, you can upload the image to a server or process it in some way
    // Your custom logic for changepic function goes here
    console.log('Image changed:', selectedImage);
  };

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
      </div>
      <div>
        <button onClick={handleChangePic}>Change Picture</button>
      </div>
    </div>
  );
}

export default ImageUpload;
