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
    patient_id BIGINT NOT NULL REFERENCES patient (patient_id),
    second_language VARCHAR(255) NOT NULL,
    PRIMARY KEY (patient_id, second_language)
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
    app_type VARCHAR(63) NOT NULL,
    app_status VARCHAR(63) NOT NULL,
    note TEXT
);

CREATE TABLE patient_doctor_appointment (
    patient_id BIGINT NOT NULL REFERENCES  patient(patient_id),
    doctor_id INT NOT NULL REFERENCES doctor(doctor_id),
    appointment_id BIGINT NOT NULL REFERENCES appointment(appointment_id),
    PRIMARY KEY (patient_id, doctor_id, appointment_id)
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

/* =========================================== INSERTIONS MOCK DATA =========================================== */

/* Firstly Run This */

INSERT INTO patient (
    first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, cell_phone, landline_phone, email, country, city, district, street, block, blood_group
) VALUES
('Fabian', 'Ernst', 'A98765432', 'German', '1979-05-30', 'Male', 'German', '+905551234567', '+902123456789', 'fabian@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Akatlar', 'G', 'O+'),
('Ricardo', 'Quaresma', 'B87654321', 'Portuguese', '1983-09-26', 'Male', 'Portuguese', '+905552345678', '+902123567890', 'ricardo@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Etiler', 'H', 'A-'),
('Roberto', 'Hilbert', 'C76543210', 'German', '1984-10-16', 'Male', 'German', '+905553456789', '+902123678901', 'roberto@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Levent', 'I', 'B+'),
('Deivson', 'Bobo', 'D65432109', 'Brazilian', '1985-01-09', 'Male', 'Portuguese', '+905554567890', '+902123789012', 'bobo@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Ulus', 'J', 'AB+'),
('Filip', 'Hološko', 'E54321098', 'Slovak', '1984-01-17', 'Male', 'Slovak', '+905555678901', '+902123890123', 'filip@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Gayrettepe', 'K', 'O-');

INSERT INTO doctor (
    first_name, last_name, passport_no, nationality, date_of_birth, gender, native_language, cell_phone, landline_phone, emergency_phone, email, country, city, district, street, blood_group
) VALUES
('Slaven', 'Bilić', 'D12345678', 'Croatian', '1968-09-11', 'Male', 'Croatian', '+905551234567', '+902123456789', '+905551234568', 'slaven@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Akatlar', 'O+'),
('Dušan', 'Alimpijević', 'E23456789', 'Serbian', '1986-03-09', 'Male', 'Serbian', '+905552345678', '+902123567890', '+905552345679', 'dusan@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Etiler', 'A-'),
('Şenol', 'Güneş', 'F34567890', 'Turkish', '1952-06-01', 'Male', 'Turkish', '+905553456789', '+902123678901', '+905553456780', 'senol@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Levent', 'B+'),
('Sergen', 'Yalçın', 'G45678901', 'Turkish', '1972-10-05', 'Male', 'Turkish', '+905554567890', '+902123789012', '+905554567891', 'sergen@example.com', 'Turkey', 'Istanbul', 'Beşiktaş', 'Ulus', 'AB+');

INSERT INTO hospital (hospital_name, country, city, district, street, block) VALUES
('Inonu Hospital', 'Turkey', 'Istanbul', 'Beşiktaş', 'Inonu Street', 'A1'),
('Akatlar Hospital', 'Turkey', 'Istanbul', 'Beşiktaş', 'Akatlar Street', 'B1'),
('Fulya Hospital', 'Turkey', 'Istanbul', 'Beşiktaş', 'Fulya Street', 'C1'),
('Nevzat Demir Hospital', 'Turkey', 'Istanbul', 'Beşiktaş', 'Nevzat Demir Street', 'D1');

INSERT INTO test (test_code, test_name, description, reference_low, reference_high, reference_unit) VALUES
('CBC001', 'Complete Blood Count', 'Measures various components of the blood including red cells, white cells, and platelets.', 4.5, 11.0, '10^3/uL'),
('LFT002', 'Liver Function Test', 'Measures the levels of enzymes and proteins in the blood to assess liver health.', 0.1, 1.2, 'mg/dL'),
('BMP003', 'Basic Metabolic Panel', 'Measures glucose, calcium, and electrolytes in the blood.', 70, 100, 'mg/dL'),
('TFT004', 'Thyroid Function Test', 'Measures thyroid hormone levels to assess thyroid health.', 0.4, 4.0, 'mIU/L'),
('LIP005', 'Lipid Panel', 'Measures cholesterol and triglyceride levels in the blood.', 150, 200, 'mg/dL');

INSERT INTO diagnosis (diagnosis_code, diagnosis_name, description) VALUES
('DX001', 'Hypertension', 'A condition in which the force of the blood against the artery walls is too high.'),
('DX002', 'Diabetes Mellitus', 'A group of diseases that result in too much sugar in the blood (high blood glucose).'),
('DX003', 'Hyperlipidemia', 'An abnormally high concentration of fats or lipids in the blood.'),
('DX004', 'Thyroid Disorder', 'A condition affecting the thyroid gland which can cause overproduction or underproduction of thyroid hormones.'),
('DX005', 'Anemia', 'A condition in which there is a deficiency of red cells or of hemoglobin in the blood.');

INSERT INTO medicine (medicine_code, medicine_name) VALUES
('MED001', 'Aspirin'),
('MED002', 'Metformin'),
('MED003', 'Atorvastatin'),
('MED004', 'Levothyroxine'),
('MED005', 'Ibuprofen');

INSERT INTO prescription (note) VALUES
('Dont watch TV too closely'),
('Avoid driving or operating heavy machinery'),
('Get a good slepp'),
('Do some exercise'),
('Avoid alcohol');


/* Change The Foreign Keys ID's According to Generated Above */

INSERT INTO patient_second_language (patient_id, second_language) VALUES
(14, 'English'),
(14, 'Turkish'),
(15, 'Turkish'),
(15, 'Spanish'),
(16, 'Turkish'),
(16, 'French'),
(17, 'English'),
(17, 'Spanish'),
(18, 'Turkish'),
(18, 'English');

INSERT INTO doctor_availability (doctor_id, availability_datetime) VALUES
(5, '2024-06-02 09:00:00'),
(5, '2024-06-02 10:00:00'),
(6, '2024-06-02 11:00:00'),
(6, '2024-06-02 12:00:00'),
(7, '2024-06-03 09:00:00'),
(7, '2024-06-03 10:00:00'),
(8, '2024-06-03 11:00:00'),
(8, '2024-06-03 12:00:00');

INSERT INTO diploma (diploma_title, graduation_date, institution, doctor_id) VALUES
('Medical Doctor', '1975-06-15', 'Istanbul University', 5),
('Psychology', '1980-06-15', 'Ankara University', 5),
('Medical Doctor', '1997-06-15', 'Istanbul University', 6),
('Medical Doctor', '1980-06-15', 'Istanbul University', 7),
('Medical Doctor', '1972-06-15', 'Istanbul University', 8);

INSERT INTO expertise (expertise_field, given_date, institution, doctor_id) VALUES
('Pediatrics', '1980-06-15', 'Istanbul University', 6),
('Dermatology', '1985-06-15', 'Istanbul University', 7),
('Neurology', '1978-06-15', 'Istanbul University', 8);

INSERT INTO clinic (clinic_no, clinic_name, country, city, district, street, block, hospital_id) VALUES
(1, 'Internal Medicine Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Inonu Street', 'A1', 6),
(2, 'Cardiology Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Inonu Street', 'A1', 6),
(3, 'Orthopedics Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Akatlar Street', 'B1', 7),
(4, 'Pediatrics Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Akatlar Street', 'B1', 7),
(5, 'Dermatology Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Fulya Street', 'C1', 8),
(6, 'Neurology Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Fulya Street', 'C1', 8),
(7, 'Gastroenterology Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Nevzat Demir Street', 'D1', 9),
(8, 'Endocrinology Clinic', 'Turkey', 'Istanbul', 'Beşiktaş', 'Nevzat Demir Street', 'D1', 9);

INSERT INTO patient_test (patient_id, test_code, doctor_id, execution_time, result_value, result_unit) VALUES
(17, 'TFT004', 5, '2024-07-02 09:30:00', '2.5', 'mIU/L'),
(18, 'LIP005', 6, '2024-07-02 10:30:00', '180', 'mg/dL');

INSERT INTO patient_diagnosis (patient_id, diagnosis_code, doctor_id, diagnosis_time, description) VALUES
(17, 'DX004', 5, '2024-07-02 10:00:00', 'Patient diagnosed with thyroid disorder.'),
(18, 'DX005', 6, '2024-07-02 11:00:00', 'Patient diagnosed with anemia.');

INSERT INTO prescription_medicine (prescription_id, medicine_code, box_count, period_value, period_unit, frequency_value, frequency_unit, note) VALUES
(4, 'MED001', 1, 10, 'days', 2, 'times a day', 'Take with food'),
(4, 'MED005', 1, 10, 'days', 3, 'times a day', 'Avoid alcohol'),
(5, 'MED002', 2, 30, 'days', 1, 'time a day', 'Avoid driving or operating heavy machinery'),
(6, 'MED003', 1, 15, 'days', 1, 'time a day', 'Take on an empty stomach'),
(6, 'MED004', 1, 15, 'days', 1, 'time a day', 'Take with a full glass of water'),
(7, 'MED004', 1, 60, 'days', 1, 'time a day', 'Take with a full glass of water'),
(8, 'MED005', 2, 7, 'days', 3, 'times a day', 'Avoid alcohol');

INSERT INTO patient_prescription (patient_id, prescription_id, doctor_id, note) VALUES
(16, 6, 5, 'Check blood sugar levels regularly'),
(17, 7, 6, 'Regular blood tests required'),
(18, 8, 7, 'Monitor liver function');
