const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// routes
/* =========================================== PATIENTS =========================================== */

// Get all patients
app.get("/patients", async (req, res) => {
    try {
        const allPatients = await pool.query("SELECT * FROM patient");
        res.json(allPatients.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single patient by ID
app.get("/patients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await pool.query("SELECT * FROM patient WHERE patient_id = $1", [id]);
        res.json(patient.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new patient
app.post("/patients", async (req, res) => {
    try {
        const { first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, 
                cell_phone, landline_phone, email, country, city, district, street, block, blood_group } = req.body;

        const newPatient = await pool.query(
            "INSERT INTO patient (first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, cell_phone, landline_phone, email, country, city, district, street, block, blood_group) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *",
            [first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, 
            cell_phone, landline_phone, email, country, city, district, street, block, blood_group]
        );
        res.json(newPatient.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a patient
app.put("/patients/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, 
                cell_phone, landline_phone, email, country, city, district, street, block, blood_group } = req.body;
        
        await pool.query(
            "UPDATE patient SET first_name = $1, last_name = $2, passport_no = $3, nationality = $4, date_of_birth = $5, gender = $6, native_language = $7,  cell_phone = $8, landline_phone = $9, email = $10, country = $11, city = $12, district = $13, street = $14, block = $15, blood_group = $16 WHERE patient_id = $17", 
            [first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, cell_phone, landline_phone, email, country, city, district, street, block, blood_group, id]
        );
        res.json("Patient was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a patient
app.delete("/patients/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Delete related records in patient_test, patient_diagnosis, and patient_prescription tables first
        await pool.query("DELETE FROM patient_test WHERE patient_id = $1", [id]);
        await pool.query("DELETE FROM patient_diagnosis WHERE patient_id = $1", [id]);
        await pool.query("DELETE FROM patient_prescription WHERE patient_id = $1", [id]);

        // Now delete the patient
        await pool.query("DELETE FROM patient WHERE patient_id = $1", [id]);

        res.json("Patient was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

app.get('/patients/:id/second_languages', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'SELECT second_language FROM patient_second_language WHERE patient_id = $1',
        [id]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });  

// Add a second language for a patient
app.post("/patients/:id/second-languages", async (req, res) => {
    try {
        const { id } = req.params;
        const { second_language } = req.body;
        const newLanguage = await pool.query(
            "INSERT INTO patient_second_language (patient_id, second_language) VALUES($1, $2) RETURNING *",
            [id, second_language]
        );
        res.json(newLanguage.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a second language for a patient
app.delete("/patients/:id/second-languages/:language", async (req, res) => {
    try {
        const { id, language } = req.params;
        await pool.query("DELETE FROM patient_second_language WHERE patient_id = $1 AND second_language = $2", [id, language]);
        res.json("Second language was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/* =========================================== HOSPITALS =========================================== */

// Get all hospitals
app.get("/hospitals", async (req, res) => {
    try {
        const allHospitals = await pool.query("SELECT * FROM hospital");
        res.json(allHospitals.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single hospital by ID
app.get("/hospitals/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const hospital = await pool.query("SELECT * FROM hospital WHERE hospital_id = $1", [id]);
        res.json(hospital.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all clinics of a hospital
app.get("/hospitals/:id/clinics", async (req, res) => {
    try {
        const { id } = req.params;
        const hospitalClinics = await pool.query("SELECT * FROM clinic WHERE hospital_id = $1", [id]);
        res.json(hospitalClinics.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new hospital
app.post("/hospitals", async (req, res) => {
    try {
        const { hospital_name, country, city, district, street, block } = req.body;
        const newHospital = await pool.query(
            "INSERT INTO hospital (hospital_name, country, city, district, street, block) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [hospital_name, country, city, district, street, block]
        );
        res.json(newHospital.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a hospital
app.put("/hospitals/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { hospital_name, country, city, district, street, block } = req.body;
        await pool.query(
            "UPDATE hospital SET hospital_name = $1, country = $2, city = $3, district = $4, street = $5, block = $6 WHERE hospital_id = $7",
            [hospital_name, country, city, district, street, block, id]
        );
        res.json("Hospital was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a hospital
app.delete("/hospitals/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM hospital WHERE hospital_id = $1", [id]);
        res.json("Hospital was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/* =========================================== CLINICS =========================================== */

// Get all clinics
app.get("/clinics", async (req, res) => {
    try {
        const allClinics = await pool.query("SELECT * FROM clinic");
        res.json(allClinics.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single clinic by ID
app.get("/clinics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const clinic = await pool.query("SELECT * FROM clinic WHERE clinic_id = $1", [id]);
        res.json(clinic.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new clinic
app.post("/clinics", async (req, res) => {
    try {
        const { clinic_no, clinic_name, country, city, district, street, block, hospital_id } = req.body;
        const newClinic = await pool.query(
            "INSERT INTO clinic (clinic_no, clinic_name, country, city, district, street, block, hospital_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [clinic_no, clinic_name, country, city, district, street, block, hospital_id]
        );
        res.json(newClinic.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a clinic
app.put("/clinics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { clinic_no, clinic_name, country, city, district, street, block, hospital_id } = req.body;
        await pool.query(
            "UPDATE clinic SET clinic_no = $1, clinic_name = $2, country = $3, city = $4, district = $5, street = $6, block = $7, hospital_id = $8 WHERE clinic_id = $9",
            [clinic_no, clinic_name, country, city, district, street, block, hospital_id, id]
        );
        res.json("Clinic was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a clinic
app.delete("/clinics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM clinic WHERE clinic_id = $1", [id]);
        res.json("Clinic was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/* =========================================== DOCTORS =========================================== */

// Get all doctors
app.get("/doctors", async (req, res) => {
    try {
        const allDoctors = await pool.query("SELECT * FROM doctor");
        res.json(allDoctors.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single doctor by ID
app.get("/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await pool.query("SELECT * FROM doctor WHERE doctor_id = $1", [id]);
        res.json(doctor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new doctor
app.post("/doctors", async (req, res) => {
    try {
        const { first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, 
                cell_phone, landline_phone, emergency_phone, email, country, city, 
                district, street, blood_group } = req.body;
        const newDoctor = await pool.query(
            "INSERT INTO doctor (first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, cell_phone, landline_phone, emergency_phone, email, country, city, district, street, blood_group) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *",
            [first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, 
            cell_phone, landline_phone, emergency_phone, email, country, city, district, street, blood_group]
        );
        res.json(newDoctor.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a doctor
app.put("/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, 
                second_language, cell_phone, landline_phone, emergency_phone, email, country, city, 
                district, street, blood_group } = req.body;
        await pool.query(
            "UPDATE doctor SET first_name = $1, last_name = $2, passport_no = $3, nationality = $4, date_of_birth = $5, gender = $6, native_language = $7, second_language = $8, cell_phone = $9, landline_phone = $10, emergency_phone = $11, email = $12, country = $13, city = $14,  district = $15, street = $16, blood_group = $17 WHERE doctor_id = $18",
            [first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, 
            second_language, cell_phone, landline_phone, emergency_phone, email, country, city, district, street, blood_group, id]
        );
        res.json("Doctor was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a doctor
app.delete("/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM doctor WHERE doctor_id = $1", [id]);
        res.json("Doctor was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// Doctor Availability routes

// Get availabilities for a doctor
app.get("/doctors/availabilities/:doctor_id", async (req, res) => {
    try {
        const { doctor_id } = req.params;
        const availabilities = await pool.query("SELECT * FROM doctor_availability WHERE doctor_id = $1", [doctor_id]);
        res.json(availabilities.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single availability by doctor_id and availability_datetime
app.get("/doctors/availabilities/:doctor_id/:availability_datetime", async (req, res) => {
    try {
        const { doctor_id, availability_datetime } = req.params;
        const availability = await pool.query("SELECT * FROM doctor_availability WHERE doctor_id = $1 AND availability_datetime = $2", [doctor_id, availability_datetime]);
        res.json(availability.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new availability
app.post("/doctors/availabilities", async (req, res) => {
    try {
        const { doctor_id, availability_datetime } = req.body;
        const newAvailability = await pool.query(
            "INSERT INTO doctor_availability (doctor_id, availability_datetime) VALUES($1, $2) RETURNING *",
            [doctor_id, availability_datetime]
        );
        res.json(newAvailability.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update an availability
app.put("/doctors/availabilities/:doctor_id/:availability_datetime", async (req, res) => {
    try {
        const { doctor_id, availability_datetime } = req.params;
        const { new_doctor_id, new_availability_datetime } = req.body;
        await pool.query(
            "UPDATE doctor_availability SET doctor_id = $1, availability_datetime = $2 WHERE doctor_id = $3 AND availability_datetime = $4",
            [new_doctor_id, new_availability_datetime, doctor_id, availability_datetime]
        );
        res.json("Availability was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete an availability
app.delete("/doctors/availabilities/:doctor_id/:availability_datetime", async (req, res) => {
    try {
        const { doctor_id, availability_datetime } = req.params;
        const parsedDateTime = decodeURIComponent(availability_datetime);
        await pool.query(
            "DELETE FROM doctor_availability WHERE doctor_id = $1 AND availability_datetime = $2",
            [doctor_id, parsedDateTime]
        );
        res.json("Availability was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

/* =========================================== DIPLOMAS =========================================== */

// Get all diplomas
app.get("/diplomas", async (req, res) => {
    try {
        const allDiplomas = await pool.query("SELECT * FROM diploma");
        res.json(allDiplomas.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single diploma by ID
app.get("/diplomas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const diploma = await pool.query("SELECT * FROM diploma WHERE diploma_id = $1", [id]);
        res.json(diploma.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new diploma
app.post("/diplomas", async (req, res) => {
    try {
        const { diploma_title, graduation_date, institution, doctor_id } = req.body;
        const newDiploma = await pool.query(
            "INSERT INTO diploma (diploma_title, graduation_date, institution, doctor_id) VALUES($1, $2, $3, $4) RETURNING *",
            [diploma_title, graduation_date, institution, doctor_id]
        );
        res.json(newDiploma.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a diploma
app.put("/diplomas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { diploma_title, graduation_date, institution, doctor_id } = req.body;
        await pool.query(
            "UPDATE diploma SET diploma_title = $1, graduation_date = $2, institution = $3, doctor_id = $4 WHERE diploma_id = $5",
            [diploma_title, graduation_date, institution, doctor_id, id]
        );
        res.json("Diploma was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a diploma
app.delete("/diplomas/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM diploma WHERE diploma_id = $1", [id]);
        res.json("Diploma was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/* =========================================== EXPERTISES =========================================== */

// Get all expertise
app.get("/expertises", async (req, res) => {
    try {
        const allExpertises = await pool.query("SELECT * FROM expertise");
        res.json(allExpertises.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single expertise by ID
app.get("/expertises/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const expertise = await pool.query("SELECT * FROM expertise WHERE expertise_id = $1", [id]);
        res.json(expertise.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new expertise
app.post("/expertises", async (req, res) => {
    try {
        const { expertise_field, given_date, institution, doctor_id } = req.body;
        const newExpertise = await pool.query(
            "INSERT INTO expertise (expertise_field, given_date, institution, doctor_id) VALUES($1, $2, $3, $4) RETURNING *",
            [expertise_field, given_date, institution, doctor_id]
        );
        res.json(newExpertise.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update an expertise
app.put("/expertises/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { expertise_field, given_date, institution, doctor_id } = req.body;
        await pool.query(
            "UPDATE expertise SET expertise_field = $1, given_date = $2, institution = $3, doctor_id = $4 WHERE expertise_id = $5",
            [expertise_field, given_date, institution, doctor_id, id]
        );
        res.json("Expertise was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

/* =========================================== APPOINTMENTS =========================================== */

// Get doctors by clinic ID
app.get('/clinics/:id/doctors', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM doctor WHERE doctor_id IN (SELECT doctor_id FROM clinic_doctor WHERE clinic_id = $1)', [id]);
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
// Add an appointment
app.post('/appointments', async (req, res) => {
    const { app_datetime, app_type, app_status, note, patient_id, hospital_id, clinic_id, doctor_id } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO appointment (app_datetime, app_type, app_status, note) VALUES ($1, $2, $3, $4) RETURNING *',
        [app_datetime, app_type, app_status, note]
      );
      const appointment_id = result.rows[0].appointment_id;
      await pool.query(
        'INSERT INTO patient_doctor_appointment (patient_id, doctor_id, appointment_id) VALUES ($1, $2, $3)',
        [patient_id, doctor_id, appointment_id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  

/* =========================================== VISITS =========================================== */

// Get all visits
app.get("/visits", async (req, res) => {
    try {
        const allVisits = await pool.query("SELECT * FROM visit");
        res.json(allVisits.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single visit by ID
app.get("/visits/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const visit = await pool.query("SELECT * FROM visit WHERE visit_id = $1", [id]);
        res.json(visit.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new visit
app.post("/visits", async (req, res) => {
    try {
        const { visit_no, visit_datetime, reason, procedure, note, appointment_id } = req.body;
        const newVisit = await pool.query(
            "INSERT INTO visit (visit_no, visit_datetime, reason, procedure, note, appointment_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [visit_no, visit_datetime, reason, procedure, note, appointment_id]
        );
        res.json(newVisit.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a visit
app.put("/visits/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { visit_no, visit_datetime, reason, procedure, note, appointment_id } = req.body;
        await pool.query(
            "UPDATE visit SET visit_no = $1, visit_datetime = $2, reason = $3, procedure = $4, note = $5, appointment_id = $6 WHERE visit_id = $7",
            [visit_no, visit_datetime, reason, procedure, note, appointment_id, id]
        );
        res.json("Visit was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a visit
app.delete("/visits/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM visit WHERE visit_id = $1", [id]);
        res.json("Visit was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete an expertise
app.delete("/expertises/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM expertise WHERE expertise_id = $1", [id]);
        res.json("Expertise was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/* =========================================== TESTS =========================================== */

// Get all tests
app.get("/tests", async (req, res) => {
    try {
        const allTests = await pool.query("SELECT * FROM test");
        res.json(allTests.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single test by code
app.get("/tests/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const test = await pool.query("SELECT * FROM test WHERE test_code = $1", [code]);
        res.json(test.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new test
app.post("/tests", async (req, res) => {
    try {
        const { test_code, test_name, description, reference_low, reference_high, reference_unit } = req.body;
        const newTest = await pool.query(
            "INSERT INTO test (test_code, test_name, description, reference_low, reference_high, reference_unit) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [test_code, test_name, description, reference_low, reference_high, reference_unit]
        );
        res.json(newTest.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a test
app.put("/tests/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const { test_name, description, reference_low, reference_high, reference_unit } = req.body;
        await pool.query(
            "UPDATE test SET test_name = $1, description = $2, reference_low = $3, reference_high = $4, reference_unit = $5 WHERE test_code = $6",
            [test_name, description, reference_low, reference_high, reference_unit, code]
        );
        res.json("Test was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a test
app.delete("/tests/:code", async (req, res) => {
    try {
        const { code } = req.params;
        await pool.query("DELETE FROM test WHERE test_code = $1", [code]);
        res.json("Test was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// Get all tests for a patient
app.get("/patients/:patientId/tests", async (req, res) => {
    try {
      const { patientId } = req.params;
      const patientTests = await pool.query("SELECT * FROM patient_test WHERE patient_id = $1", [patientId]);
      res.json(patientTests.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
// Add a test for a patient
app.post("/patients/tests", async (req, res) => {
    try {
        const { patient_id, test_code, doctor_id, result_value, result_unit } = req.body;
        const newTest = await pool.query(
            "INSERT INTO patient_test (patient_id, test_code, doctor_id, result_value, result_unit) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [patient_id, test_code, doctor_id, result_value, result_unit]
        );
        res.json(newTest.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
  
// Delete a test for a patient
app.delete("/patients/tests", async (req, res) => {
    try {
      const { patient_id, test_code, doctor_id } = req.body;
      await pool.query(
        "DELETE FROM patient_test WHERE patient_id = $1 AND test_code = $2 AND doctor_id = $3",
        [patient_id, test_code, doctor_id]
      );
      res.json("Test was deleted!");
    } catch (err) {
      console.error(err.message);
    }
  });

/* =========================================== DIAGNOSES =========================================== */

// Get all diagnoses
app.get("/diagnoses", async (req, res) => {
    try {
        const allDiagnoses = await pool.query("SELECT * FROM diagnosis");
        res.json(allDiagnoses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single diagnosis by code
app.get("/diagnoses/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const diagnosis = await pool.query("SELECT * FROM diagnosis WHERE diagnosis_code = $1", [code]);
        res.json(diagnosis.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new diagnosis
app.post("/diagnoses", async (req, res) => {
    try {
        const { diagnosis_code, diagnosis_name, description } = req.body;
        const newDiagnosis = await pool.query(
            "INSERT INTO diagnosis (diagnosis_code, diagnosis_name, description) VALUES($1, $2, $3) RETURNING *",
            [diagnosis_code, diagnosis_name, description]
        );
        res.json(newDiagnosis.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a diagnosis
app.put("/diagnoses/:code", async (req, res) => {
    try {
        const { code } = req.params;
        const { diagnosis_name, description } = req.body;
        await pool.query(
            "UPDATE diagnosis SET diagnosis_name = $1, description = $2 WHERE diagnosis_code = $3",
            [diagnosis_name, description, code]
        );
        res.json("Diagnosis was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a diagnosis
app.delete("/diagnoses/:code", async (req, res) => {
    try {
        const { code } = req.params;
        await pool.query("DELETE FROM diagnosis WHERE diagnosis_code = $1", [code]);
        res.json("Diagnosis was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});


// Get all diagnoses for a patient
app.get("/patients/:patientId/diagnoses", async (req, res) => {
    try {
        const { patientId } = req.params;
        const patientDiagnoses = await pool.query("SELECT * FROM patient_diagnosis WHERE patient_id = $1", [patientId]);
        res.json(patientDiagnoses.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add a diagnosis for a patient
app.post("/patients/diagnoses", async (req, res) => {
    try {
        const { patient_id, diagnosis_code, doctor_id, description } = req.body;
        const newDiagnosis = await pool.query(
            "INSERT INTO patient_diagnosis (patient_id, diagnosis_code, doctor_id, description) VALUES($1, $2, $3, $4) RETURNING *",
            [patient_id, diagnosis_code, doctor_id, description]
        );
        res.json(newDiagnosis.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a diagnosis for a patient
app.delete("/patients/diagnoses", async (req, res) => {
    try {
        const { patient_id, diagnosis_code, doctor_id } = req.body;
        await pool.query(
            "DELETE FROM patient_diagnosis WHERE patient_id = $1 AND diagnosis_code = $2 AND doctor_id = $3",
            [patient_id, diagnosis_code, doctor_id]
        );
        res.json("Diagnosis was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});
  
/* =========================================== MEDICINES =========================================== */

// Get all medicines
app.get("/medicines", async (req, res) => {
    try {
        const allMedicines = await pool.query("SELECT * FROM medicine");
        res.json(allMedicines.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a single medicine by ID
app.get("/medicines/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const medicine = await pool.query("SELECT * FROM medicine WHERE medicine_code = $1", [id]);
        res.json(medicine.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Add a new medicine
app.post("/medicines", async (req, res) => {
    try {
        const { medicine_code, medicine_name } = req.body;
        const newMedicine = await pool.query(
            "INSERT INTO medicine (medicine_code, medicine_name) VALUES($1, $2) RETURNING *",
            [medicine_code, medicine_name]
        );
        res.json(newMedicine.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update a medicine
app.put("/medicines/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { medicine_name } = req.body;
        await pool.query(
            "UPDATE medicine SET medicine_name = $1 WHERE medicine_code = $2",
            [medicine_name, id]
        );
        res.json("Medicine was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a medicine
app.delete("/medicines/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM medicine WHERE medicine_code = $1", [id]);
        res.json("Medicine was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

/* =========================================== PRESCRIPTIONS =========================================== */

// Get all prescriptions for a patient
app.get("/patients/:patientId/prescriptions", async (req, res) => {
    try {
        const { patientId } = req.params;
        const patientPrescriptions = await pool.query("SELECT * FROM patient_prescription WHERE patient_id = $1", [patientId]);
        res.json(patientPrescriptions.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add a prescription for a patient
app.post("/patients/prescriptions", async (req, res) => {
    try {
        const { patient_id, doctor_id, note } = req.body;
        const newPrescription = await pool.query(
            "INSERT INTO patient_prescription (patient_id, doctor_id, note) VALUES($1, $2, $3) RETURNING *",
            [patient_id, doctor_id, note]
        );
        res.json(newPrescription.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a prescription for a patient
app.delete("/patients/prescriptions/:prescription_id", async (req, res) => {
    try {
        const { prescription_id } = req.params;
        await pool.query(
            "DELETE FROM patient_prescription WHERE prescription_id = $1",
            [prescription_id]
        );
        res.json("Prescription was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new prescription
app.post("/prescriptions", async (req, res) => {
    try {
        const { note, patient_id, doctor_id } = req.body;
        const newPrescription = await pool.query(
            "INSERT INTO prescription (note) VALUES($1) RETURNING *",
            [note]
        );
        const prescription_id = newPrescription.rows[0].prescription_id;
        await pool.query(
            "INSERT INTO patient_prescription (patient_id, prescription_id, doctor_id, note) VALUES($1, $2, $3, $4)",
            [patient_id, prescription_id, doctor_id, note]
        );
        res.json(newPrescription.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get all prescriptions
app.get("/prescriptions", async (req, res) => {
    try {
        const allPrescriptions = await pool.query("SELECT * FROM prescription");
        res.json(allPrescriptions.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a specific prescription with its medicines
app.get("/prescriptions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await pool.query(
            "SELECT * FROM prescription WHERE prescription_id = $1",
            [id]
        );
        const medicines = await pool.query(
            "SELECT pm.*, m.medicine_name FROM prescription_medicine pm JOIN medicine m ON pm.medicine_code = m.medicine_code WHERE pm.prescription_id = $1",
            [id]
        );
        res.json({ prescription: prescription.rows[0], medicines: medicines.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Update a prescription
app.put('/prescriptions/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        await pool.query(
            "UPDATE prescription SET note = $1 WHERE prescription_id = $2",
            [note, id]
        );
        res.json("Prescription note was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


// Delete a prescription
app.delete("/prescriptions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM patient_prescription WHERE prescription_id = $1", [id]);
        await pool.query("DELETE FROM prescription_medicine WHERE prescription_id = $1", [id]);
        await pool.query("DELETE FROM prescription WHERE prescription_id = $1", [id]);
        res.json("Prescription was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// Add a medicine to a prescription
app.post("/prescriptions/:id/medicines", async (req, res) => {
    try {
        const { id } = req.params;
        const { medicine_code, box_count, period_value, period_unit, frequency_value, frequency_unit, note } = req.body;
        const newMedicine = await pool.query(
            "INSERT INTO prescription_medicine (prescription_id, medicine_code, box_count, period_value, period_unit, frequency_value, frequency_unit, note) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [id, medicine_code, box_count, period_value, period_unit, frequency_value, frequency_unit, note]
        );
        res.json(newMedicine.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get all medicines for a prescription
app.get("/prescriptions/:id/medicines", async (req, res) => {
    try {
        const { id } = req.params;
        const medicines = await pool.query(
            "SELECT * FROM prescription_medicine WHERE prescription_id = $1",
            [id]
        );
        res.json(medicines.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a medicine from a prescription
app.delete("/prescriptions/:id/medicines/:medicine_code", async (req, res) => {
    try {
        const { id, medicine_code } = req.params;
        await pool.query(
            "DELETE FROM prescription_medicine WHERE prescription_id = $1 AND medicine_code = $2",
            [id, medicine_code]
        );
        res.json("Medicine was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});