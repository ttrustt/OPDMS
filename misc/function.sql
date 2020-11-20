DELIMITER $$

CREATE PROCEDURE getSchedule(IN UI int)
BEGIN
    SELECT CONCAT(u.fname, " ", u.lname) AS doctor_name, clinic_name, location_ AS location, SUBSTRING(dr.diagnosis_room_id, 7,4) AS room, time_in, time_out
    FROM schedule s, doctor d, system_user u, diagnosis_room dr, clinic c, patient p, system_user su
    WHERE s.doctor_id = d.doctor_id
    AND s.patient_id = p.patient_id
    AND d.user_id = u.user_id
    AND p.user_id = su.user_id
    AND s.diagnosis_room_id = dr.diagnosis_room_id
    AND dr.clinic_id = c.clinic_id
    AND su.user_id = UI
    ORDER BY time_in DESC;
END $$

CREATE PROCEDURE getDispensation(IN UI int)
BEGIN
    SELECT dp.created_time, CONCAT( u.fname, " ", u.lname ) AS doctor_name, general_name, quantity, description
    FROM diagnosis d, dispensation dp, medicine m, schedule s, doctor c, system_user u, patient p, system_user su
    WHERE dp.visit_number = d.visit_number
    AND dp.pharma_code = m.pharma_code
    AND d.schedule_number = s.schedule_number
    AND s.doctor_id = c.doctor_id
    AND s.patient_id = p.patient_id
    AND c.user_id = u.user_id
    AND p.user_id = su.user_id
    AND su.user_id = UI;
END $$

DELIMITER ;