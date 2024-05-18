import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MedicineDetails = () => {
  const [medicine, setMedicine] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/medicines/${id}`);
      setMedicine(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Medicine Details</h2>
      <p><strong>Code:</strong> {medicine.medicine_code}</p>
      <p><strong>Name:</strong> {medicine.medicine_name}</p>
    </div>
  );
};

export default MedicineDetails;
