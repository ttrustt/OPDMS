DELIMITER $$

CREATE PROCEDURE getSchedule(IN UN varchar(32))
BEGIN
SELECT CONCAT(u.fname, " ", u.lname) AS doctor_name, clinic_name, location_ AS location, SUBSTRING(dr.diagnosis_room_id, 7,4) AS room, time_in, time_out
FROM SCHEDULE s, DOCTOR d, SYSTEM_USER u, DIAGNOSIS_ROOM dr, CLINIC c, PATIENT p, SYSTEM_USER su
WHERE s.doctor_id = d.doctor_id
AND s.patient_id = p.patient_id
AND d.user_id = u.user_id
AND p.user_id = su.user_id
AND s.diagnosis_room_id = dr.diagnosis_room_id
AND dr.clinic_id = c.clinic_id
AND su.username = UN
ORDER BY time_in DESC;
END $$

CREATE PROCEDURE getDispensation(IN UN varchar(32))
BEGIN
SELECT dp.created_time, CONCAT( u.fname, " ", u.lname ) AS doctor_name, general_name, quantity, description
FROM DIAGNOSIS d, DISPENSATION dp, MEDICINE m, SCHEDULE s, DOCTOR c, SYSTEM_USER u, PATIENT p, SYSTEM_USER su
WHERE dp.visit_number = d.visit_number
AND dp.pharma_code = m.pharma_code
AND d.schedule_number = s.schedule_number
AND s.doctor_id = c.doctor_id
AND s.patient_id = p.patient_id
AND c.user_id = u.user_id
AND p.user_id = su.user_id
AND su.username = UN;
END $$


CREATE PROCEDURE getScheduleForDoctor(IN UN varchar(32))
BEGIN
SELECT s.schedule_number, CONCAT(su.fname, " ", su.lname) AS patient_name, clinic_name, location_ AS location, SUBSTRING(dr.diagnosis_room_id, 7,4) AS room, time_in, time_out
FROM SCHEDULE s, DOCTOR d, SYSTEM_USER u, DIAGNOSIS_ROOM dr, CLINIC c, PATIENT p, SYSTEM_USER su
WHERE s.doctor_id = d.doctor_id
AND s.patient_id = p.patient_id
AND d.user_id = u.user_id
AND p.user_id = su.user_id
AND s.diagnosis_room_id = dr.diagnosis_room_id
AND dr.clinic_id = c.clinic_id
AND u.username = UN
ORDER BY time_in DESC;
END $$


DELIMITER ;