-- Create new cardpayment
DROP PROCEDURE IF EXISTS `create_card_payment`;
CREATE PROCEDURE `create_card_payment`(
    IN `crdID` VARCHAR(14),
    IN `usrID` VARCHAR(14),
    IN `crdNum` VARCHAR(16),
    IN `expDate` BIGINT,
    IN `cv` VARCHAR(4),
    IN `mrchnt` VARCHAR(30),
    IN `crdType` TINYINT
)
BEGIN
    INSERT INTO 
        CardPayment(
            card_id, 
            user_id, 
            card_num, 
            expiry_date, 
            cvv, 
            merchant, 
            card_type
        )
    VALUES(
        crdID, 
        usrID, 
        crdNum, 
        expDate, 
        cv, 
        mrchnt, 
        crdType
    );
END;

-- Patch existing cardpayment by cardpayment_id
DROP PROCEDURE IF EXISTS `patch_card_payment`;
CREATE PROCEDURE `patch_card_payment`(
    IN `crdID` VARCHAR(14),
    IN `usrID` VARCHAR(14),
    IN `crdNum` VARCHAR(16),
    IN `expDate` BIGINT,
    IN `cv` VARCHAR(4),
    IN `mrchnt` VARCHAR(30),
    IN `crdType` TINYINT
)
BEGIN
    UPDATE 
        CardPayment
    SET
        user_id = COALESCE(usrID, user_id),
        card_num = COALESCE(crdNum, card_num),
        expiry_date = COALESCE(expDate, expiry_date),
        cvv = COALESCE(cv, cvv),
        merchant = COALESCE(mrchnt, merchant),
        card_type = COALESCE(crdType, card_type)
    WHERE 
        card_id = crdID;
END;

-- Delete cardpayment by cardpayment_id
DROP PROCEDURE IF EXISTS `delete_card_payment`;
CREATE PROCEDURE `delete_card_payment`(
    IN `crdID` VARCHAR(14)
)
BEGIN
    DELETE FROM 
        CardPayment
    WHERE 
        card_id = crdID;
END;

-- Get all cardpayments
DROP PROCEDURE IF EXISTS `get_all_card_payments`;
CREATE PROCEDURE `get_all_card_payments`()
BEGIN
    SELECT 
        card_id AS cardID,
        user_id AS userID,
        card_num AS cardNum,
        expiry_date AS expiryDate,
        cvv,
        merchant,
        card_type AS cardType
    FROM 
        CardPayment;
END;

-- Get all cardpayments by user_id
DROP PROCEDURE IF EXISTS `get_user_card_payments`;
CREATE PROCEDURE `get_user_card_payments`(
    IN `usrID` VARCHAR(14)
)
BEGIN
    SELECT 
        card_id AS cardID,
        user_id AS userID,
        card_num AS cardNum,
        expiry_date AS expiryDate,
        cvv,
        merchant,
        card_type AS cardType
    FROM 
        CardPayment
    WHERE 
        user_id = usrID;
END;

-- Get particular cardpayment by cardpayment_id
DROP PROCEDURE IF EXISTS `get_card_payment_by_id`;
CREATE PROCEDURE `get_card_payment_by_id`(
    IN `crdID` VARCHAR(14)
)
BEGIN
    SELECT 
        card_id AS cardID,
        user_id AS userID,
        card_num AS cardNum,
        expiry_date AS expiryDate,
        cvv,
        merchant,
        card_type AS cardType
    FROM 
        CardPayment
    WHERE 
        card_id = crdID;
END;
