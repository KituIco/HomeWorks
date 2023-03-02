-- Create new payment
DROP PROCEDURE IF EXISTS `create_payment`;
CREATE PROCEDURE `create_payment`(
    IN `payID` VARCHAR(14),
    IN `sekerID` VARCHAR(14),
    IN `provID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `payMthd` INT,
    IN `payAmt` DECIMAL(10,2),
    IN `payStts` INT
)
BEGIN 
    INSERT INTO 
        Payment(
            payment_id, 
            seeker_id,
            provider_id, 
            service_id, 
            payment_method, 
            amount, 
            payment_status
        )
    VALUES(
        payID, 
        sekerID,
        provID, 
        srvceID, 
        payMthd, 
        payAmt, 
        payStts
    );
END;

-- Patch existing payment by payment_id
DROP PROCEDURE IF EXISTS `patch_payment`;
CREATE PROCEDURE `patch_payment`(
    IN `payID` VARCHAR(14),
    IN `sekerID` VARCHAR(14),
    IN `provID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `payMthd` INT,
    IN `payAmt` DECIMAL(10,2),
    IN `payStts` INT
)
BEGIN 
    UPDATE 
        Payment
    SET
        seeker_id = COALESCE(sekerID, seeker_id),
        provider_id = COALESCE(provID, provider_id),
        service_id = COALESCE(srvceID, service_id),
        payment_method = COALESCE(payMthd, payment_method),
        amount = COALESCE(payAmt, amount),
        payment_status = COALESCE(payStts, payment_status)
    WHERE 
        payment_id = payID;
END;

-- Delete existing payment by payment_id
DROP PROCEDURE IF EXISTS `delete_payment`;
CREATE PROCEDURE `delete_payment`(
    IN `payID` VARCHAR(14)
)
BEGIN 
    DELETE FROM 
        Payment
    WHERE 
        payment_id = payID;
END;

-- Get all payments
DROP PROCEDURE IF EXISTS `get_all_payments`;
CREATE PROCEDURE `get_all_payments`()
BEGIN 
    SELECT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment;
END;

-- Get all payments by status code
DROP PROCEDURE IF EXISTS `get_all_payments_by_status`;
CREATE PROCEDURE `get_all_payments_by_status`(
    IN `payStts` INT
)
BEGIN 
    SELECT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment
    WHERE 
        payment_status = payStts;
END;

-- Get all payments by service seeker
DROP PROCEDURE IF EXISTS `get_seeker_payments`;
CREATE PROCEDURE `get_seeker_payments`(
    IN `sekerID` VARCHAR(14)
)
BEGIN 
    SELECT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment
    WHERE 
        seeker_id = sekerID;
END;

-- Get all payments of service seeker by status code
DROP PROCEDURE IF EXISTS `get_seeker_payments_by_status`;
CREATE PROCEDURE `get_seeker_payments_by_status`(
    IN `sekerID` VARCHAR(14),
    IN `payStts` INT
)
BEGIN 
    SELECT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment
    WHERE 
        seeker_id = sekerID AND payment_status = payStts;
END;

-- Get all payments by service provider
DROP PROCEDURE IF EXISTS `get_provider_payments`;
CREATE PROCEDURE `get_provider_payments`(
    IN `prvdrID` VARCHAR(14)
)
BEGIN 
    SELECT DISTINCT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment
    WHERE
        provider_id = prvdrID;
END;

-- Get all payments of service provider by status code
DROP PROCEDURE IF EXISTS `get_provider_payments_by_status`;
CREATE PROCEDURE `get_provider_payments_by_status`(
    IN `prvdrID` VARCHAR(14),
    IN `payStts` INT
)
BEGIN 
    SELECT DISTINCT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment
    WHERE
        provider_id = prvdrID AND payment_status = payStts;
END;

-- Get all payments by payment method
DROP PROCEDURE IF EXISTS `get_payments_by_method`;
CREATE PROCEDURE `get_payments_by_method`(
    IN `payMthd` INT
)
BEGIN 
    SELECT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment
    WHERE 
        payment_method = payMthd;
END;

-- Get payment by payment_id
DROP PROCEDURE IF EXISTS `get_payment_by_id`;
CREATE PROCEDURE `get_payment_by_id`(
    IN `payID` VARCHAR(14)
)
BEGIN 
    SELECT
        payment_id AS paymentID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        payment_method AS paymentMethod,
        amount,
        payment_status AS paymentStatus 
    FROM 
        Payment
    WHERE 
        payment_id = payID;
END;