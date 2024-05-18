CREATE DATABASE hims;

/* TABLES OF PATIENT ENTITY */

CREATE TABLE patient (
    patient_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(31) NOT NULL,
    last_name VARCHAR(31) NOT NULL,
    passport_no VARCHAR(63) UNIQUE NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    native_language VARCHAR(255) NOT NULL,
    second_language VARCHAR(255),
    cell_phone VARCHAR(15) UNIQUE NOT NULL,
    landline_phone VARCHAR(15),
    email VARCHAR(63) UNIQUE,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    block VARCHAR(255) NOT NULL,
    blood_group VARCHAR(3) NOT NULL,
    registration_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patient_second_language (
    patient_id BIGINT NOT NULL,
    second_language VARCHAR(255) NOT NULL,
    PRIMARY KEY (patient_id, second_language),
    FOREIGN KEY (patient_id) REFERENCES patient (patient_id)
);

/* TABLES OF DOCTOR ENTITY */

CREATE TABLE doctor (
    doctor_id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(31) NOT NULL,
    last_name VARCHAR(31) NOT NULL,
    passport_no VARCHAR(63) NOT NULL UNIQUE,
    nationality VARCHAR(63) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(31) NOT NULL,
    native_language VARCHAR(63) NOT NULL,
    second_language VARCHAR(63),
    cell_phone VARCHAR(15) NOT NULL UNIQUE,
    landline_phone VARCHAR(15),
    emergency_phone VARCHAR(15) NOT NULL,
    email VARCHAR(63) NOT NULL UNIQUE,
    country VARCHAR(63) NOT NULL,
    city VARCHAR(63) NOT NULL,
    district VARCHAR(63) NOT NULL,
    street VARCHAR(63) NOT NULL,
    blood_group VARCHAR(3) NOT NULL,
    registration_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctor_availability (
    doctor_id BIGINT NOT NULL REFERENCES doctor(doctor_id),
    availability_datetime TIMESTAMP NOT NULL,
    PRIMARY KEY (doctor_id, availability_datetime)
);

/* TABLES OF DIPLOMA ENTITY */

CREATE TABLE diploma (
    diploma_id BIGSERIAL PRIMARY KEY,
    diploma_title VARCHAR(255) NOT NULL,
    graduation_date DATE NOT NULL,
    institution VARCHAR(255) NOT NULL,
    doctor_id INT NOT NULL REFERENCES doctor(doctor_id)
);

/* TABLES OF EXPERTISE ENTITY */

CREATE TABLE expertise (
    expertise_id BIGSERIAL PRIMARY KEY,
    expertise_field VARCHAR(255) NOT NULL,
    given_date DATE NOT NULL,
    institution VARCHAR(255) NOT NULL,
    doctor_id INT NOT NULL REFERENCES doctor(doctor_id)
);

/* TABLES OF HOSPITAL ENTITY */

CREATE TABLE hospital (
    hospital_id SERIAL PRIMARY KEY,
    hospital_name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    block VARCHAR(255) NOT NULL
);

/* TABLES OF CLINIC ENTITY */

CREATE TABLE clinic (
    clinic_id BIGSERIAL PRIMARY KEY,
    clinic_no SMALLINT NOT NULL,
    clinic_name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    district VARCHAR(255) NOT NULL,
    street VARCHAR(255) NOT NULL,
    block VARCHAR(255) NOT NULL,
    hospital_id INT NOT NULL REFERENCES hospital(hospital_id)
);

/* TABLES OF APPOINTMENT ENTITY */

CREATE TABLE appointment (
    appointment_id BIGSERIAL PRIMARY KEY,
    app_datetime TIMESTAMP NOT NULL,
    app_type app_type_enum NOT NULL,
    app_status app_status_enum NOT NULL,
    note TEXT,
    patient_id BIGINT NOT NULL REFERENCES  patient(patient_id),
    hospital_id INT NOT NULL REFERENCES hospital(hospital_id)
);

/* TABLES OF VISIT ENTITY */

CREATE TABLE visit (
    visit_id BIGSERIAL PRIMARY KEY,
    visit_no SMALLINT NOT NULL,
    visit_datetime TIMESTAMP NOT NULL,
    reason VARCHAR(255) NOT NULL,
    procedure VARCHAR(255),
    note VARCHAR(255),
    appointment_id BIGINT NOT NULL REFERENCES appointment(appointment_id)
);

/* TABLES OF TEST ENTITY */

CREATE TABLE test (
    test_code VARCHAR(63) PRIMARY KEY,
    test_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    reference_low DECIMAL NOT NULL,
    reference_high DECIMAL NOT NULL,
    reference_unit VARCHAR(15) NOT NULL
);

CREATE TABLE patient_test (
    patient_id BIGINT NOT NULL REFERENCES patient(patient_id),
    test_code VARCHAR(63) NOT NULL REFERENCES test(test_code),
    doctor_id BIGINT NOT NULL REFERENCES doctor(doctor_id),
    PRIMARY KEY (patient_id, test_code, doctor_id),
    execution_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    result_value VARCHAR(255) NOT NULL,
    result_unit VARCHAR(255) NOT NULL
);

/* TABLES OF DIAGNOSIS ENTITY */

CREATE TABLE diagnosis (
    diagnosis_code VARCHAR(63) PRIMARY KEY,
    diagnosis_name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE patient_diagnosis (
    patient_id BIGINT NOT NULL REFERENCES patient(patient_id),
    diagnosis_code VARCHAR(63) NOT NULL REFERENCES diagnosis(diagnosis_code),
    doctor_id BIGINT NOT NULL REFERENCES doctor(doctor_id),
    PRIMARY KEY (patient_id, diagnosis_code, doctor_id),
    diagnosis_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT NOT NULL
);

/* TABLES OF MEDICINE ENTITY */

CREATE TABLE medicine (
    medicine_code VARCHAR(63) PRIMARY KEY,
    medicine_name VARCHAR(255) NOT NULL
);

/* TABLES OF PRESCRIPTION ENTITY */

CREATE TABLE prescription (
    prescription_id BIGSERIAL PRIMARY KEY,
    note TEXT,
    prescription_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prescription_medicine (
    prescription_id BIGINT NOT NULL REFERENCES prescription(prescription_id),
    medicine_code VARCHAR(63) NOT NULL REFERENCES medicine(medicine_code),
    PRIMARY KEY (prescription_id, medicine_code),
    box_count INT NOT NULL,
    period_value INT NOT NULL,
    period_unit VARCHAR(50) NOT NULL,
    frequency_value INT NOT NULL,
    frequency_unit VARCHAR(50) NOT NULL,
    note TEXT
);

CREATE TABLE patient_prescription (
    patient_id BIGINT NOT NULL REFERENCES patient(patient_id),
    prescription_id BIGINT REFERENCES prescription(prescription_id),
    doctor_id BIGINT NOT NULL REFERENCES doctor(doctor_id),
    PRIMARY KEY (patient_id, prescription_id, doctor_id),
    prescription_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    note TEXT
);