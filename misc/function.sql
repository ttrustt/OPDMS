DELIMITER $$

CREATE PROCEDURE getPassword(IN USN varchar(32))
BEGIN
    SELECT password FROM system_user WHERE username = USN;
END $$

CREATE PROCEDURE getDispensation(IN RN varchar(32))
BEGIN
    SELECT general_name, quantity, d.price, created_time FROM dispensation d, medicine m 
    WHERE d.pharma_code = m.pharma_code AND receipt_number = RN;
END $$

CREATE PROCEDURE getTotalPrice(IN RN varchar(32))
BEGIN
    SELECT receipt_number, sum(d.price) as total_price FROM dispensation d, medicine m 
    WHERE d.pharma_code = m.pharma_code and receipt_number = RN;
END $$

CREATE PROCEDURE getMedicineSQ(IN PC varchar(32))
BEGIN
    SELECT pharma_room_id, quantity FROM stored_medicine WHERE pharma_code=PC;
END $$

CREATE PROCEDURE getPharmaRoomSQ(IN PR varchar(32))
BEGIN
    SELECT pharma_code, quantity FROM stored_medicine WHERE pharma_room_id=PR;
END $$

CREATE PROCEDURE getDiagnosis(IN UI int)
BEGIN
    SELECT g.created_time, fname AS doctor_name, disease_name, doctors_recommendation 
    FROM show_icd i, disease d, schedule s, diagnosis g, doctor c, system_user u
    WHERE i.icd_code = d.icd_code 
    AND i.visit_number = g.visit_number 
    AND g.schedule_number = s.schedule_number
    AND s.doctor_id = c.doctor_id
    AND c.user_id = u.user_id
    AND u.user_id = UI;
END $$

CREATE PROCEDURE getDispensation(IN UI int)
BEGIN
    SELECT p.created_time, fname AS doctor_name, general_name, quantity, p.price
    FROM diagnosis d, dispensation p, medicine m, schedule s, doctor c, system_user u
    WHERE p.visit_number = d.visit_number
    AND p.pharma_code = m.pharma_code
    AND d.schedule_number = s.schedule_number
    AND s.doctor_id = c.doctor_id
    AND c.user_id = u.user_id
    AND u.user_id = UI;
END $$

DELIMITER ;