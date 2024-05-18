import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

import GetAppointmentDropdown from "./modals/getAppointmentDropdown";

const GetAppointmentContainer = styled.div`
    width: 30%;
    height: fit-content;
    background: rgb(213,219,219);
    background: linear-gradient(0deg, rgba(213,219,219,1) 0%, rgba(133,193,233,1) 100%);
    border-radius: 15px;
    box-shadow: 10px 10px #FAD7A0;
    padding: 15px 1% 15px 1%;
`;

const GetAppointmentForm = styled.form`
   display: flex;
   flex-direction: column;
`;

const GetAppointmentFormLineSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    border-radius: 15px;
    margin-bottom: 10px;
`;

const GetAppointmentFormLineHeader = styled.h3`
    width: 25%;
    font-size: 18px;
    margin-bottom: 0px;
    color: #198753;
`;

const GetAppointmentNote = styled.textarea`
    border: none;
    border-radius: 10px;
`;

const GetAppointment = () => {
    const [patients, setPatients] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [hospitalClinics, setHospitalClinics] = useState([]);
    const [clinicDoctors, setClinicDoctors] = useState([]);
    const [doctorAvailabilities, setDoctorAvailabilities] = useState([]);

    const [appointmentPatient, setAppointmentPatient] = useState("");
    const [appointmentHospital, setAppointmentHospital] = useState("");
    const [appointmentClinic, setAppointmentClinic] = useState("");
    const [appointmentDoctor, setAppointmentDoctor] = useState("");
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const [appointmentNote, setAppointmentNote] = useState("");

    const [showClinic, setShowClinic] = useState(false);
    const [showDoctor, setShowDoctor] = useState(false);
    const [showAvailability, setShowAvailability] = useState(false);

    const [patientIdBody, setPatientIdBody] = useState();
    const [hospitalIdBody, setHospitalIdBody] = useState();
    const [clinicIdBody, setClinicIdBody] = useState();
    const [doctorIdBody, setDoctorIdBody] = useState();

    useEffect(() => {
        fetchPatients();
        fetchHospitals();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await fetch("http://localhost:5001/patients");
            const jsonData = await response.json();
            setPatients(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchHospitals = async () => {
        try {
            const response = await fetch("http://localhost:5001/hospitals");
            const jsonData = await response.json();
            setHospitals(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchHospitalClinics = async (hospitalId) => {
        try {
            const response = await fetch(`http://localhost:5001/hospitals/${hospitalId}/clinics`);
            const jsonData = await response.json();
            setHospitalClinics(jsonData);
            setShowClinic(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchClinicDoctors = async (clinicId) => {
        try {
            const response = await fetch(`http://localhost:5001/clinics/${clinicId}/doctors`);
            const jsonData = await response.json();
            setClinicDoctors(jsonData);
            setShowDoctor(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const fetchDoctorAvailabilities = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:5001/doctors/${doctorId}/availabilities`);
            const jsonData = await response.json();
            setDoctorAvailabilities(jsonData);
            setShowAvailability(true);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "patient_id") {
            const patient = patients.find(p => p.patient_id.toString() === value);
            setPatientIdBody(patient.patient_id);
        } else if (name === "hospital_id") {
            setHospitalIdBody(value);
            setShowClinic(false);
            setShowDoctor(false);
            setShowAvailability(false);
            fetchHospitalClinics(value);
        } else if (name === "clinic_id") {
            setClinicIdBody(value);
            setShowDoctor(false);
            setShowAvailability(false);
            fetchClinicDoctors(value);
        } else if (name === "doctor_id") {
            setDoctorIdBody(value);
            setShowAvailability(false);
            fetchDoctorAvailabilities(value);
        } else if (name === "appointmentDateTime") {
            setAppointmentDateTime(value);
        } else if (name === "note") {
            setAppointmentNote(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!patientIdBody || !hospitalIdBody || !clinicIdBody || !doctorIdBody || !appointmentDateTime) {
                alert("Please Provide All Necessary Information");
                return;
            }

            const body = {
                patient_id: patientIdBody,
                hospital_id: hospitalIdBody,
                clinic_id: clinicIdBody,
                doctor_id: doctorIdBody,
                appointment_date_time: appointmentDateTime,
                note: appointmentNote
            };

            const response = await fetch("http://localhost:5001/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <GetAppointmentContainer>
                <GetAppointmentForm onSubmit={handleSubmit}>

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Patient</GetAppointmentFormLineHeader>
                        <select name="patient_id" onChange={handleChange} required>
                            <option value="">Select Patient</option>
                            {patients.map(patient => (
                                <option key={patient.patient_id} value={patient.patient_id}>
                                    {patient.first_name} {patient.last_name}
                                </option>
                            ))}
                        </select>
                    </GetAppointmentFormLineSection>

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Hospital</GetAppointmentFormLineHeader>
                        <select name="hospital_id" onChange={handleChange} required>
                            <option value="">Select Hospital</option>
                            {hospitals.map(hospital => (
                                <option key={hospital.hospital_id} value={hospital.hospital_id}>
                                    {hospital.hospital_name}
                                </option>
                            ))}
                        </select>
                    </GetAppointmentFormLineSection>

                    {showClinic && (
                        <GetAppointmentFormLineSection>
                            <GetAppointmentFormLineHeader>Clinic</GetAppointmentFormLineHeader>
                            <select name="clinic_id" onChange={handleChange} required>
                                <option value="">Select Clinic</option>
                                {hospitalClinics.map(clinic => (
                                    <option key={clinic.clinic_id} value={clinic.clinic_id}>
                                        {clinic.clinic_name}
                                    </option>
                                ))}
                            </select>
                        </GetAppointmentFormLineSection>
                    )}

                    {showDoctor && (
                        <GetAppointmentFormLineSection>
                            <GetAppointmentFormLineHeader>Doctor</GetAppointmentFormLineHeader>
                            <select name="doctor_id" onChange={handleChange} required>
                                <option value="">Select Doctor</option>
                                {clinicDoctors.map(doctor => (
                                    <option key={doctor.doctor_id} value={doctor.doctor_id}>
                                        {doctor.first_name} {doctor.last_name}
                                    </option>
                                ))}
                            </select>
                        </GetAppointmentFormLineSection>
                    )}

                    {showAvailability && (
                        <GetAppointmentFormLineSection>
                            <GetAppointmentFormLineHeader>Date</GetAppointmentFormLineHeader>
                            <select name="appointmentDateTime" onChange={handleChange} required>
                                <option value="">Select Date</option>
                                {doctorAvailabilities.map(availability => (
                                    <option key={availability.availability_datetime} value={availability.availability_datetime}>
                                        {new Date(availability.availability_datetime).toLocaleString()}
                                    </option>
                                ))}
                            </select>
                        </GetAppointmentFormLineSection>
                    )}

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Note</GetAppointmentFormLineHeader>
                        {appointmentDateTime && (
                            <GetAppointmentNote
                                name="note"
                                rows="2"
                                onChange={handleChange}
                            />
                        )}
                    </GetAppointmentFormLineSection>

                    <button type="submit" className="btn btn-outline-success">
                        Get Appointment
                    </button>
                </GetAppointmentForm>
            </GetAppointmentContainer>
        </Fragment>
    );
};

export default GetAppointment;
