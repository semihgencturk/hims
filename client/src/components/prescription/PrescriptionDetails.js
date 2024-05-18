import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const PrescriptionDetails = () => {
  const [prescription, setPrescription] = useState({});
  const [medicines, setMedicines] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchPrescription();
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/prescriptions/${id}`);
      setPrescription(response.data.prescription);
      setMedicines(response.data.medicines);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Prescription Details</h2>
      <p><strong>ID:</strong> {prescription.prescription_id}</p>
      <p><strong>Note:</strong> {prescription.note}</p>
      <p><strong>Date:</strong> {new Date(prescription.prescription_date).toLocaleString()}</p>
      
      <h3>Medicines</h3>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine.medicine_code}>
            <p><strong>Medicine Name:</strong> {medicine.medicine_name}</p>
            <p><strong>Box Count:</strong> {medicine.box_count}</p>
            <p><strong>Period:</strong> {medicine.period_value} {medicine.period_unit}</p>
            <p><strong>Frequency:</strong> {medicine.frequency_value} {medicine.frequency_unit}</p>
            <p><strong>Note:</strong> {medicine.note}</p>
          </li>
        ))}
      </ul>
      <Link to={`/prescriptions/edit/${id}`}><button>Edit</button></Link>
    </div>
  );
};

export default PrescriptionDetails;
