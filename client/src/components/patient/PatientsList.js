import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PatientTestsModal from './modals/PatientTestsModal';
import PatientDiagnosesModal from './modals/PatientDiagnosesModal';
import PatientPrescriptionsModal from './modals/PatientPrescriptionsModal';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [testModalIsOpen, setTestModalIsOpen] = useState(false);
  const [diagnosisModalIsOpen, setDiagnosisModalIsOpen] = useState(false);
  const [prescriptionModalIsOpen, setPrescriptionModalIsOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5001/patients');
      setPatients(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/patients/${id}`);
      fetchPatients();
    } catch (err) {
      console.error(err.message);
    }
  };

  const openTestModal = (patientId) => {
    setSelectedPatientId(patientId);
    setTestModalIsOpen(true);
  };

  const closeTestModal = () => {
    setTestModalIsOpen(false);
    setSelectedPatientId(null);
  };

  const openDiagnosisModal = (patientId) => {
    setSelectedPatientId(patientId);
    setDiagnosisModalIsOpen(true);
  };

  const closeDiagnosisModal = () => {
    setDiagnosisModalIsOpen(false);
    setSelectedPatientId(null);
  };

  const openPrescriptionModal = (patientId) => {
    setSelectedPatientId(patientId);
    setPrescriptionModalIsOpen(true);
  };

  const closePrescriptionModal = () => {
    setPrescriptionModalIsOpen(false);
    setSelectedPatientId(null);
  };

  return (
    <div>
      <h2>Patients List</h2>
      <Link to="/patients/add"><button>Add New Patient</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patient_id}>
              <td>{patient.patient_id}</td>
              <td>{patient.first_name}</td>
              <td>{patient.last_name}</td>
              <td>
                <Link to={`/patients/${patient.patient_id}`}>View</Link>
                <Link to={`/edit/${patient.patient_id}`}>Edit</Link>
                <button onClick={() => handleDelete(patient.patient_id)}>Delete</button>
                <button onClick={() => openTestModal(patient.patient_id)}>Manage Tests</button>
                <button onClick={() => openDiagnosisModal(patient.patient_id)}>Manage Diagnoses</button>
                <button onClick={() => openPrescriptionModal(patient.patient_id)}>Manage Prescriptions</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPatientId && (
        <PatientTestsModal
          isOpen={testModalIsOpen}
          onRequestClose={closeTestModal}
          patientId={selectedPatientId}
        />
      )}
      {selectedPatientId && (
        <PatientDiagnosesModal
          isOpen={diagnosisModalIsOpen}
          onRequestClose={closeDiagnosisModal}
          patientId={selectedPatientId}
        />
      )}
      {selectedPatientId && (
        <PatientPrescriptionsModal
          isOpen={prescriptionModalIsOpen}
          onRequestClose={closePrescriptionModal}
          patientId={selectedPatientId}
        />
      )}
    </div>
  );
};

export default PatientsList;
