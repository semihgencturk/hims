import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

import GetAppointmentDropdown from "./getAppointmentDropdown";

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

const GetAppointmentDateTime = styled.input`
    border: none;
    border-radius: 10px;
`;

const GetAppointmentNote = styled.textarea`
    border: none;
    border-radius: 10px;
`;

const GetAppointment = () => {

    const [hospitals, setHospitals] = useState([]);
    const [hospitalClinics, setHospitalClinics] = useState([]);
    const [clinicDoctors, setClinicDoctors] = useState([]);
    const [doctorAvailabilities, setDoctorAvailabilities] = useState([]);

    const [appointmentHospital, setAppointmentHospital] = useState("");
    const [appointmentClinic, setAppointmentClinic] = useState("");
    const [appointmentDoctor, setAppointmentDoctor] = useState("");
    const [appointmentDateTime, setAppointmentDateTime] = useState();
    const [appointmentNote, setAppointmentNote] = useState("");

    const [showHospital, setShowHospital] = useState(false);
    const [showClinic, setShowClinic] = useState(false);
    const [showDoctor, setShowDoctor] = useState(false);

    const [hospitalIdBody, setHospitalIdBody] = useState();
    const [clinicIdBody, setClinicIdBody] = useState();
    const [doctorIdBody, setDoctorIdBody] = useState();

    let patient_id = 1;
    let hospital_id;
    let clinic_id;
    let doctor_id;

    const getHospitals = async () => {
        try {
            const response = await fetch("http://localhost:5001/hospitals");
            const jsonData = await response.json();

            setHospitals(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getHospitalClinics = async () => {
        for (const hospital of hospitals) {
            if (hospital.hospital_name == appointmentHospital) {
                hospital_id = hospital.hospital_id;
                setHospitalIdBody(hospital_id);
                setShowHospital(true);
                break;
            }
        }

        try {
            const response = await fetch(`http://localhost:5001/hospital_clinics/${hospital_id}`);
            const jsonData = await response.json();

            setHospitalClinics(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getClinicDoctors = async () => {

        for (const hospital of hospitals) {
            if (hospital.hospital_name == appointmentHospital) {
                hospital_id = hospital.hospital_id;
                break;
            }
        }

        for (const hospitalClinic of hospitalClinics) {
            if (hospitalClinic.clinic_name == appointmentClinic) {
                clinic_id = hospitalClinic.clinic_id;
                setClinicIdBody(clinic_id);
                setShowClinic(true);
                break;
            }
        }

        try {
            const response = await fetch(`http://localhost:5001/hospital_clinic_doctors/${hospital_id}/${clinic_id}`);
            const jsonData = await response.json();

            setClinicDoctors(jsonData);
            
        } catch (err) {
            console.error(err.message);
        }
    };

    const getDoctorDatesTimes = async () => {
        for (const clinicDoctor of clinicDoctors) {
            if (clinicDoctor.last_name === appointmentDoctor) {
                doctor_id = clinicDoctor.doctor_id;
                setDoctorIdBody(doctor_id);
                setShowDoctor(true);
                break;
            }
        }

        try {
            const response = await fetch(`http://localhost:5001/doctor_availability/${doctor_id}`);
            const jsonData = await response.json();

            setDoctorAvailabilities(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getHospitals();
    }, []);

    useEffect(() => {
        if (appointmentHospital !== "") {
            getHospitalClinics();
        }
    }, [appointmentHospital]);

    useEffect(() => {
        if (appointmentClinic !== "") {
            getClinicDoctors();
        }
    }, [appointmentClinic]);

    useEffect(() => {
        if (doctorAvailabilities !== "") {
            getDoctorDatesTimes();
        }
    }, [appointmentDoctor]);
    
    const getNewAppointment = async () => {
        
        try {

            if(showHospital === false ||
               showClinic === false || 
               showDoctor === false ||
               appointmentDateTime === ""){
                    alert("Please Provide All Neccessary Informations");
            }else{
                console.log(patient_id,hospitalIdBody,clinicIdBody,doctorIdBody,appointmentDateTime,appointmentNote)
                const body = {
                    patient_id: patient_id,
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

                if(!response.ok) {
                    throw new Error('Failed to create appointment');
                }

                window.location = "/";
            }
            
            
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <GetAppointmentContainer>
                <GetAppointmentForm>

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Hospital</GetAppointmentFormLineHeader>
                        <GetAppointmentDropdown
                            name="Select The Health Center"
                            options={hospitals}
                            type="hospitals"
                            setState={setAppointmentHospital} />
                    </GetAppointmentFormLineSection>

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Clinic</GetAppointmentFormLineHeader>
                        {showHospital ? 
                            <GetAppointmentDropdown
                                name="Select The Clinic"
                                options={hospitalClinics}
                                type="hospitalClinics"
                                setState={setAppointmentClinic}/>
                        : null}
                    </GetAppointmentFormLineSection>

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Doctor</GetAppointmentFormLineHeader>
                        {showClinic ? 
                            <GetAppointmentDropdown
                                name="Select The Doctor"
                                options={clinicDoctors}
                                type="clinicDoctors"
                                setState={setAppointmentDoctor}/>
                        : null}
                    </GetAppointmentFormLineSection>

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Date</GetAppointmentFormLineHeader>
                        {showDoctor ? 
                            <GetAppointmentDropdown
                                name="Select The Date"
                                options={doctorAvailabilities}
                                type="doctorAvailabilityDateTime"
                                setState={setAppointmentDateTime}/>    
                        : null}
                    </GetAppointmentFormLineSection>

                    <GetAppointmentFormLineSection>
                        <GetAppointmentFormLineHeader>Note</GetAppointmentFormLineHeader>
                        {appointmentDateTime ? 
                            <GetAppointmentNote
                                class="form-control"
                                id="appointmentNote"
                                rows="2"
                                onChange={e => setAppointmentNote(e.target.value)}></GetAppointmentNote>
                        : null}
                    </GetAppointmentFormLineSection>

                    <button
                        type="button"
                        onClick={getNewAppointment}
                        class="btn btn-outline-success">
                        Get Appointment
                    </button>

                </GetAppointmentForm>
            </GetAppointmentContainer>
        </Fragment>
    )
};

export default GetAppointment;