import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5001/medicines');
      setMedicines(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/medicines/${id}`);
      alert('Deleted!');
      fetchMedicines();
    } catch (err) {
      console.error(err.message);
      alert('Error!');
    }
  };

  return (
    <div>
      <h2>Medicines List</h2>
      <Link to="/medicines/add"><button>Add New Medicine</button></Link>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.medicine_code}>
              <td>{medicine.medicine_code}</td>
              <td>{medicine.medicine_name}</td>
              <td>
                <Link to={`/medicines/${medicine.medicine_code}`}><button>View</button></Link>
                <Link to={`/medicines/edit/${medicine.medicine_code}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(medicine.medicine_code)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineList;
