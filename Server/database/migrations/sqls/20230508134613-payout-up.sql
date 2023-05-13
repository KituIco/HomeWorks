-- Create new payout
DROP PROCEDURE IF EXISTS `create_payout`;
CREATE PROCEDURE `create_payout`(
    IN `payoutID` VARCHAR(14),
    IN `sekerID` VARCHAR(14),
    IN `provID` VARCHAR(14),
    IN `amnt` INT,
    IN `timestmp` BIGINT,
    IN `stat` INT
)
BEGIN
    INSERT INTO 
        Payout(
            payout_id,
            seeker_id,
            provider_id,
            amount,
            date_timestamp,
            payout_status
        )
    VALUES(
        payoutID,
        sekerID,
        provID,
        amnt,
        timestmp,
        stat
    );
END;

-- Patch existing payout by payout_id
DROP PROCEDURE IF EXISTS `patch_payout`;
CREATE PROCEDURE `patch_payout`(
    IN `payoutID` VARCHAR(14),
    IN `sekerID` VARCHAR(14),
    IN `provID` VARCHAR(14),
    IN `amnt` INT,
    IN `timestmp` BIGINT,
    IN `stat` INT
)
BEGIN
    UPDATE
        Payout
    SET
        seeker_id = COALESCE(sekerID, seeker_id),
        provider_id = COALESCE(provID, provider_id),
        amount = COALESCE(amnt, amount),
        date_timestamp = COALESCE(timestmp, date_timestamp),
        payout_status = COALESCE(stat, payout_status)
    WHERE
        payout_id = payoutID;
END;

-- Delete existing payout by payout_id
DROP PROCEDURE IF EXISTS `delete_payout`;
CREATE PROCEDURE `delete_payout`(
    IN `payoutID` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Payout
    WHERE
        payout_id = payoutID;
END;

-- Get all payouts
DROP PROCEDURE IF EXISTS `get_payouts`;
CREATE PROCEDURE `get_payouts`()
BEGIN
    SELECT
        payout_id AS payoutID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        amount,
        date_timestamp AS dateTimestamp,
        payout_status AS payoutStatus
    FROM
        Payout;
END;

-- Get seeker payouts
DROP PROCEDURE IF EXISTS `get_seeker_payouts`;
CREATE PROCEDURE `get_seeker_payouts`(
    IN `sekerID` VARCHAR(14)
)
BEGIN
    SELECT
        payout_id AS payoutID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        amount,
        date_timestamp AS dateTimestamp,
        payout_status AS payoutStatus
    FROM
        Payout
    WHERE
        seeker_id = sekerID;
END;

-- Get provider payouts
DROP PROCEDURE IF EXISTS `get_provider_payouts`;
CREATE PROCEDURE `get_provider_payouts`(
    IN `provID` VARCHAR(14)
)
BEGIN
    SELECT
        payout_id AS payoutID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        amount,
        date_timestamp AS dateTimestamp,
        payout_status AS payoutStatus
    FROM
        Payout
    WHERE
        provider_id = provID;
END;

-- Get payout by payout_id
DROP PROCEDURE IF EXISTS `get_payout_by_id`;
CREATE PROCEDURE `get_payout_by_id`(
    IN `payoutID` VARCHAR(14)
)
BEGIN
    SELECT
        payout_id AS payoutID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        amount,
        date_timestamp AS dateTimestamp,
        payout_status AS payoutStatus
    FROM
        Payout
    WHERE
        payout_id = payoutID;
END;
