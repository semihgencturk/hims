import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import Navbar from './pages/components/navbar';

import PatientsList from './components/patient/PatientsList';
import AddPatient from './components/patient/AddPatient';
import EditPatient from './components/patient/EditPatient';
import PatientDetails from './components/patient/PatientDetails';

import HospitalsList from './components/hospital/HospitalsList';
import AddHospital from './components/hospital/AddHospital';
import EditHospital from './components/hospital/EditHospital';
import HospitalDetails from './components/hospital/HospitalDetails';

import DoctorList from './components/doctor/DoctorList';
import AddDoctor from './components/doctor/AddDoctor';
import EditDoctor from './components/doctor/EditDoctor';
import DoctorDetails from './components/doctor/DoctorDetails';

import MedicineList from './components/medicine/MedicineList';
import AddMedicine from './components/medicine/AddMedicine';
import EditMedicine from './components/medicine/EditMedicine';
import MedicineDetails from './components/medicine/MedicineDetails';

import DiplomaList from './components/diploma/DiplomaList';
import AddDiploma from './components/diploma/AddDiploma';
import EditDiploma from './components/diploma/EditDiploma';
import DiplomaDetails from './components/diploma/DiplomaDetails';

import ExpertiseList from './components/expertise/ExpertiseList';
import AddExpertise from './components/expertise/AddExpertise';
import EditExpertise from './components/expertise/EditExpertise';
import ExpertiseDetails from './components/expertise/ExpertiseDetails';

import AppointmentList from './components/appointment/AppointmentList';
import AddAppointment from './components/appointment/AddAppointment';
import EditAppointment from './components/appointment/EditAppointment';
import AppointmentDetails from './components/appointment/AppointmentDetails';

import VisitList from './components/visit/VisitList';
import AddVisit from './components/visit/AddVisit';
import EditVisit from './components/visit/EditVisit';
import VisitDetails from './components/visit/VisitDetails';

import ClinicList from './components/clinic/ClinicList';
import AddClinic from './components/clinic/AddClinic';
import EditClinic from './components/clinic/EditClinic';
import ClinicDetails from './components/clinic/ClinicDetails';

import PrescriptionList from './components/prescription/PrescriptionList';
import AddPrescription from './components/prescription/AddPrescription';
import EditPrescription from './components/prescription/EditPrescription';
import PrescriptionDetails from './components/prescription/PrescriptionDetails';

import DiagnosisList from './components/diagnosis/DiagnosisList';
import AddDiagnosis from './components/diagnosis/AddDiagnosis';
import EditDiagnosis from './components/diagnosis/EditDiagnosis';
import DiagnosisDetails from './components/diagnosis/DiagnosisDetails';

import TestList from './components/test/TestList';
import AddTest from './components/test/AddTest';
import EditTest from './components/test/EditTest';
import TestDetails from './components/test/TestDetails';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #FEFAF6;
  padding: 20px;
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #FEFAF6;
  }

  h2 {
    margin-bottom: 20px;
    color: #0033A0;
    text-align: center;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  th {
    background-color: #FFC72C;
    color: #0033A0;
    padding: 10px;
    border: 1px solid #dee2e6;
  }

  td {
    padding: 10px;
    border: 1px solid #dee2e6;
    text-align: center;
  }

  button {
    margin: 5px;
    padding: 5px 10px;
    background-color: #EFEFEF;
    color: #0033A0;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #FF9047;
      color: #001F54;
    }
  }

  a {
    margin: 5px;
    padding: 5px 10px;
    background-color: #EFEFEF;
    color: #0033A0;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #FF9047;
      color: #001F54;
    }
  }

  .add-button {
    display: inline-block;
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #1E0342;
    color: #0033A0;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background-color: #FFC72C;
      color: #001F54;
    }
  }
`;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <AppContainer>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/patients" element={<PatientsList />} />
            <Route path="/patients/add" element={<AddPatient />} />
            <Route path="/edit/:id" element={<EditPatient />} />
            <Route path="/patients/:id" element={<PatientDetails />} />
            <Route path="/hospitals" element={<HospitalsList />} />
            <Route path="/hospitals/add" element={<AddHospital />} />
            <Route path="/hospitals/edit/:id" element={<EditHospital />} />
            <Route path="/hospitals/:id" element={<HospitalDetails />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/add" element={<AddDoctor />} />
            <Route path="/doctors/edit/:id" element={<EditDoctor />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/medicines" element={<MedicineList />} />
            <Route path="/medicines/add" element={<AddMedicine />} />
            <Route path="/medicines/edit/:id" element={<EditMedicine />} />
            <Route path="/medicines/:id" element={<MedicineDetails />} />
            <Route path="/diplomas" element={<DiplomaList />} />
            <Route path="/diplomas/add" element={<AddDiploma />} />
            <Route path="/diplomas/edit/:id" element={<EditDiploma />} />
            <Route path="/diplomas/:id" element={<DiplomaDetails />} />
            <Route path="/expertises" element={<ExpertiseList />} />
            <Route path="/expertises/add" element={<AddExpertise />} />
            <Route path="/expertises/edit/:id" element={<EditExpertise />} />
            <Route path="/expertises/:id" element={<ExpertiseDetails />} />
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/add" element={<AddAppointment />} />
            <Route path="/appointments/edit/:id" element={<EditAppointment />} />
            <Route path="/appointments/:id" element={<AppointmentDetails />} />
            <Route path="/visits" element={<VisitList />} />
            <Route path="/visits/add" element={<AddVisit />} />
            <Route path="/visits/edit/:id" element={<EditVisit />} />
            <Route path="/visits/:id" element={<VisitDetails />} />
            <Route path="/clinics" element={<ClinicList />} />
            <Route path="/clinics/add" element={<AddClinic />} />
            <Route path="/clinics/edit/:id" element={<EditClinic />} />
            <Route path="/clinics/:id" element={<ClinicDetails />} />
            <Route path="/prescriptions" element={<PrescriptionList />} />
            <Route path="/prescriptions/add" element={<AddPrescription />} />
            <Route path="/prescriptions/edit/:id" element={<EditPrescription />} />
            <Route path="/prescriptions/:id" element={<PrescriptionDetails />} />
            <Route path="/diagnoses" element={<DiagnosisList />} />
            <Route path="/diagnoses/add" element={<AddDiagnosis />} />
            <Route path="/diagnoses/edit/:code" element={<EditDiagnosis />} />
            <Route path="/diagnoses/:code" element={<DiagnosisDetails />} />
            <Route path="/tests" element={<TestList />} />
            <Route path="/tests/add" element={<AddTest />} />
            <Route path="/tests/edit/:code" element={<EditTest />} />
            <Route path="/tests/:code" element={<TestDetails />} />
          </Routes>
        </AppContainer>
      </div>
    </Router>
  );
}

export default App;
