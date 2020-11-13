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


DELIMITER ;