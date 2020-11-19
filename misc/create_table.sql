CREATE TABLE SYSTEM_USER(
    user_id int AUTO_INCREMENT,
    fname varchar(32) NOT NULL,
    lname varchar(32) NOT NULL,
    religion varchar(32) NOT NULL,
    address_ varchar(128) NOT NULL,
    province varchar(32) NOT NULL,
    postal_code char(5) NOT NULL,
    identification_number char(13) DEFAULT NULL,
    passport_number varchar(32) DEFAULT NULL,
    mobile_number char(10) NOT NULL,
    nationality varchar(32) NOT NULL,
    sex varchar(8) NOT NULL,
    birthdate date NOT NULL,
    email varchar(64) NOT NULL,
    username varchar(32) NOT NULL,
    password varchar(32) NOT NULL,
    user_type varchar(16) NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE (username),
    UNIQUE (identification_number),
    UNIQUE (passport_number),
    CHECK (NOT(identification_number IS NULL AND passport_number IS NULL))
);

CREATE TABLE PATIENT(
    patient_id int AUTO_INCREMENT,
    user_id int,
    PRIMARY KEY (patient_id),
    FOREIGN KEY (user_id) REFERENCES SYSTEM_USER(user_id) ON DELETE CASCADE
);

CREATE TABLE DOCTOR(
    doctor_id int AUTO_INCREMENT,
    user_id int,
    PRIMARY KEY (doctor_id),
    FOREIGN KEY (user_id) REFERENCES SYSTEM_USER(user_id) ON DELETE CASCADE
);

CREATE TABLE PHARMACIST(
    pharmacist_id int AUTO_INCREMENT,
    user_id int,
    pharmacist_type char(2) NOT NULL,
    PRIMARY KEY (pharmacist_id),
    FOREIGN KEY (user_id) REFERENCES SYSTEM_USER(user_id) ON DELETE CASCADE
);

CREATE TABLE CLINIC(
    clinic_id char(4),
    clinic_name varchar(64) NOT NULL,
    working_hours varchar(64) NOT NULL,
    PRIMARY KEY (clinic_id)
);

CREATE TABLE DIAGNOSIS_ROOM(
    diagnosis_room_id char(10),
    location_ varchar(64) NOT NULL,
    clinic_id char(4),
    PRIMARY KEY (diagnosis_room_id),
    FOREIGN KEY (clinic_id) REFERENCES CLINIC(clinic_id) ON DELETE CASCADE
);

CREATE TABLE SCHEDULE(
    schedule_number int AUTO_INCREMENT,
    patient_id int,
    doctor_id int,
    time_in datetime NOT NULL,
    time_out datetime NOT NULL,
    diagnosis_room_id char(10),
    PRIMARY KEY (schedule_number),
    FOREIGN KEY (patient_id) REFERENCES PATIENT(patient_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES DOCTOR(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (diagnosis_room_id) REFERENCES DIAGNOSIS_ROOM(diagnosis_room_id) ON DELETE CASCADE
);

CREATE TABLE DIAGNOSIS(
    visit_number int AUTO_INCREMENT,
    schedule_number int,
    doctors_recommendation varchar(1024),
    created_time datetime NOT NULL,
    clinic_id char(4),
    PRIMARY KEY (visit_number),
    FOREIGN KEY (schedule_number) REFERENCES SCHEDULE(schedule_number)
);

CREATE TABLE DISEASE(
    icd_code char(4),
    disease_name varchar(64) NOT NULL,
    symptom varchar(1024) NOT NULL,
    PRIMARY KEY (icd_code)  
);

CREATE TABLE SHOW_ICD(
    visit_number int,
    icd_code char(4),
    PRIMARY KEY (visit_number, icd_code),
    FOREIGN KEY (visit_number) REFERENCES DIAGNOSIS(visit_number) ON DELETE CASCADE,
    FOREIGN KEY (icd_code) REFERENCES DISEASE(icd_code)
);

CREATE TABLE MEDICINE(
    pharma_code varchar(8),
    tmtid varchar(7),
    general_name varchar(64) NOT NULL,
    price float NOT NULL,
    PRIMARY KEY (pharma_code)
);

CREATE TABLE RECEIPT(
    receipt_number int AUTO_INCREMENT,
    status varchar(8),
    PRIMARY KEY (receipt_number)
);

CREATE TABLE DISPENSATION(
    dispensation_number int AUTO_INCREMENT,
    quantity int NOT NULL,
    price float NOT NULL,
    created_time datetime NOT NULL,
    visit_number int,
    pharma_code varchar(8),
    receipt_number int,
    description text,
    PRIMARY KEY (dispensation_number),
    FOREIGN KEY (visit_number) REFERENCES DIAGNOSIS (visit_number) ON DELETE CASCADE,
    FOREIGN KEY (pharma_code) REFERENCES MEDICINE (pharma_code),
    FOREIGN KEY (receipt_number) REFERENCES RECEIPT (receipt_number)
);

CREATE TABLE PHARMA_ROOM(
    pharma_room_id char(3),
    pharma_room_name varchar(32) NOT NULL,
    PRIMARY KEY (pharma_room_id)
);

CREATE TABLE STORED_MEDICINE(
    pharma_code varchar(16),
    pharma_room_id char(3),
    quantity int NOT NULL, 
    PRIMARY KEY (pharma_code, pharma_room_id),
    FOREIGN KEY (pharma_code) REFERENCES MEDICINE(pharma_code) ON DELETE CASCADE,
    FOREIGN KEY (pharma_room_id) REFERENCES PHARMA_ROOM(pharma_room_id) ON DELETE CASCADE
);

CREATE TABLE PR_PHARMACIST(
    pharmacist_id int,
    pharma_room_id char(3),
    PRIMARY KEY (pharmacist_id, pharma_room_id),
    FOREIGN KEY (pharmacist_id) REFERENCES PHARMACIST(pharmacist_id) ON DELETE CASCADE,
    FOREIGN KEY (pharma_room_id) REFERENCES PHARMA_ROOM(pharma_room_id)
);

CREATE TABLE SUPPLIER(
    supplier_id int AUTO_INCREMENT,
    company_name varchar(64) NOT NULL,
    phone_number varchar(10) NOT NULL,
    address_ varchar(64) NOT NULL,
    province varchar(32) NOT NULL,
    postal_code char(5) NOT NULL,
    PRIMARY KEY(supplier_id)
);

CREATE TABLE MEDICINE_ORDER(
    order_id int AUTO_INCREMENT,
    order_time datetime NOT NULL,
    pharma_room_id char(3),
    supplier_id int,
    manufacturing_date date NOT NULL,
    expired_date date NOT NULL,
    quantity int NOT NULL,
    price float NOT NULL,
    pharma_code varchar(8),
    status varchar(16),
    PRIMARY KEY (order_id),
    FOREIGN KEY (pharma_room_id) REFERENCES PHARMA_ROOM(pharma_room_id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES SUPPLIER(supplier_id),
    FOREIGN KEY (pharma_code) REFERENCES MEDICINE(pharma_code)
);