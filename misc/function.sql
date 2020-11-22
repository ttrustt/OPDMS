DELIMITER $$

CREATE PROCEDURE getSchedule(IN UN varchar(32))
BEGIN
SELECT d.doctor_id, CONCAT(u.fname, " ", u.lname) AS doctor_name, clinic_name, location_ AS location, SUBSTRING(dr.diagnosis_room_id, 7,4) AS room, time_in, time_out
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
SELECT p.patient_id, s.schedule_number, CONCAT(su.fname, " ", su.lname) AS patient_name, clinic_name, location_ AS location, SUBSTRING(dr.diagnosis_room_id, 7,4) AS room, time_in, time_out
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

CREATE TRIGGER genTypeID
AFTER INSERT ON SYSTEM_USER
FOR EACH ROW
BEGIN
	IF (NEW.user_type = "Patient") THEN
		INSERT INTO PATIENT(user_id) VALUES (NEW.user_id);
	ELSEIF (NEW.user_type = "Doctor") THEN
		INSERT INTO DOCTOR(user_id) VALUES (NEW.user_id);
	ELSEIF (NEW.user_type = "Pharmacist") THEN
		INSERT INTO PHARMACIST(user_id) VALUES (NEW.user_id);
    END IF;
END $$

CREATE TRIGGER receiptLog
BEFORE UPDATE ON RECEIPT
FOR EACH ROW
BEGIN
	INSERT INTO RECEIPT_LOG VALUES (OLD.receipt_number, NOW());
END $$

CREATE TRIGGER orderLog
BEFORE UPDATE ON MEDICINE_ORDER
FOR EACH ROW
BEGIN
	INSERT INTO ORDER_LOG VALUES (OLD.order_id, NOW());
END $$

CREATE TRIGGER updateStorage
BEFORE UPDATE ON MEDICINE_ORDER
FOR EACH ROW
BEGIN
	IF (OLD.status = "ORDERED") THEN
		UPDATE STORED_MEDICINE 
        SET quantity = (select quantity from (select quantity from STORED_MEDICINE 
        where pharma_room_id = OLD.pharma_room_id and pharma_code = OLD.pharma_code) as SM) + OLD.quantity
        WHERE pharma_room_id = OLD.pharma_room_id and pharma_code = OLD.pharma_code;
    END IF;
END $$

CREATE FUNCTION StorageLevel (storage int, max_storage int)
	RETURNS varchar(10)
    DETERMINISTIC
BEGIN
	DECLARE level varchar(10);
    IF storage / max_storage < 0.3 THEN
		SET level = 'DANGER';
	ELSEIF (storage / max_storage >= 0.3 AND storage / max_storage <= 0.7) THEN
		SET level = 'SAFE';
	ELSEIF storage / max_storage > 0.7 THEN
		SET level = 'OVERLOAD';
	END IF;
    RETURN (level);
END $$

CREATE FUNCTION CreditReceivable (price int)
	RETURNS varchar(4)
    DETERMINISTIC
BEGIN
	DECLARE level varchar(4);
    IF price < 300 THEN
		SET level = 'NO';
	ELSE
		SET level = 'YES';
	END IF;
    RETURN (level);
END $$

DELIMITER ;

CREATE INDEX password ON SYSTEM_USER(password);
CREATE INDEX medicine_price ON MEDICINE(price);