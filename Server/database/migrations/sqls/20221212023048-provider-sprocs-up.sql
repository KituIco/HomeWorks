-- Create new provider
DROP PROCEDURE IF EXISTS `create_provider`;
CREATE PROCEDURE `create_provider`(
    IN `provID` VARCHAR(14),
    IN `frstName` VARCHAR(64),
    IN `lstName` VARCHAR(64),
    IN `bdy` VARCHAR(30),
    IN `gendr` VARCHAR(10),
    IN `provDP` VARCHAR(255),
    IN `valID` VARCHAR(255),
    IN `agncyID` VARCHAR(14),
    IN `vrfy` TINYINT,
    IN `aveRtng` FLOAT
)
BEGIN
    INSERT INTO
        Provider(
            provider_id,
            first_name,
            last_name,
            birthdate,
            gender,
            provider_dp,
            valid_id,
            agency_id,
            verified,
            ave_rating
        )
    VALUES(
        provID,
        frstName,
        lstName,
        bdy,
        gendr,
        provDP,
        valID,
        agncyID,
        vrfy,
        aveRtng
    );
END;

-- Patch existing provider by provider_id
DROP PROCEDURE IF EXISTS `patch_provider`;
CREATE PROCEDURE `patch_provider`(
    IN `provID` VARCHAR(14),
    IN `frstName` VARCHAR(64),
    IN `lstName` VARCHAR(64),
    IN `bdy` VARCHAR(30),
    IN `gendr` VARCHAR(10),
    IN `provDP` VARCHAR(255),
    IN `valID` VARCHAR(255),
    IN `agncyID` VARCHAR(14),
    IN `vrfy` TINYINT,
    IN `aveRtng` FLOAT
)
BEGIN
    UPDATE
        Provider
    SET
        first_name = COALESCE(frstName, first_name),
        last_name = COALESCE(lstName, last_name),
        birthdate = COALESCE(bdy, birthdate),
        gender = COALESCE(gendr, gender),
        provider_dp = COALESCE(provDP, provider_dp),
        valid_id = COALESCE(valID, valid_id),
        agency_id = COALESCE(agncyID, agency_id),
        verified = COALESCE(vrfy, verified),
        ave_rating = COALESCE(aveRtng, ave_rating)
    WHERE
        provider_id = provID;
END;

-- Delete existing provider by provider_id
DROP PROCEDURE IF EXISTS `delete_provider`;
CREATE PROCEDURE `delete_provider`(
    IN `provID` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Provider
    WHERE
        provider_id = provID;
END;

-- Get all providers
DROP PROCEDURE IF EXISTS `get_providers`;
CREATE PROCEDURE `get_providers`()
BEGIN
    SELECT
        provider_id AS providerId,
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        provider_dp AS providerDp,
        valid_id AS validId,
        agency_id AS agencyId,
        verified,
        ave_rating AS aveRating
    FROM
        Provider;
END;

-- Get provider by provider_id
DROP PROCEDURE IF EXISTS `get_provider`;
CREATE PROCEDURE `get_provider`(
    IN `provID` VARCHAR(14)
)
BEGIN
    SELECT
        provider_id AS providerId,
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        provider_dp AS providerDp,
        valid_id AS validId,
        agency_id AS agencyId,
        verified,
        ave_rating AS aveRating
    FROM
        Provider
    WHERE
        provider_id = provID;
END;