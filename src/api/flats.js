import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api"; // Change this to match backend URL


export const getFlats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/flats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flats:', error);
    return [];
  }
};

// export const getFlats = async () => {
//   const response = await axios.get(`/api/flats`);
//   return response.data.map(flat => ({
//     ...flat,
//     images: flat.images?.map(img => img.imageUrl) || [], // Ensure images array
//   }));
// };


export const getFlatDetails = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/flats/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching flat details:', error);
      return null;
    }
  };
  
export const addFlat = async (flatData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/flats`,
       flatData,
       {
          headers: {
            'Content-Type': 'application/json', // Explicitly set the content type
          },
       }
      );
    return response.data;
  } catch (error) {
    console.error('Error fetching flats:', error);
    return [];
  }
};

export const updateFlat = async (id, flatData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/flats/${id}`, 
      flatData    );
    return response.data;
  } catch (error) {
    console.error('Error updating flat:', error);
    return null;
  }
};



export const deleteFlat = async (id) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/flats/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching flats:', error);
    return [];
  }
};

export const uploadFlatImage = async (flatId, formData) => {
  try {
    await axios.post(`${API_BASE_URL}/flats/${flatId}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error uploading flat image:", error);
    throw error;
  }
};

export const getFlatImages = async (flatId) => {
  const response = await axios.get(`${API_BASE_URL}/${flatId}/images`);
  return response.data;
};