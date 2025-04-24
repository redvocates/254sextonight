// utils/uploadImage.js
import axios from 'axios';

export const Upload = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Ensure you replace 'ml_default' with your preset name

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dgxazepsg/image/upload', formData);
    console.log(response.data.secure_url);
    return response.data.secure_url; // Returns the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Image upload failed');
  }
};
 