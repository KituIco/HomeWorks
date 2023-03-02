-- Create new seeker
DROP PROCEDURE IF EXISTS `create_seeker`;
CREATE PROCEDURE `create_seeker`(
    IN `skrID` VARCHAR(14),
    IN `frstName` VARCHAR(64),
    IN `lstName` VARCHAR(64),
    IN `bdy` BIGINT,
    IN `gendr` VARCHAR(10),
    IN `skrDP` VARCHAR(255)
)
BEGIN 
    INSERT INTO
        Seeker(
            seeker_id,
            first_name,
            last_name,
            birthdate,
            gender,
            seeker_dp
        )
    VALUES(
        skrID,
        frstName,
        lstName,
        bdy,
        gendr,
        skrDP
    );
END;

-- Patch existing seeker by seeker_id
DROP PROCEDURE IF EXISTS `patch_seeker`;
CREATE PROCEDURE `patch_seeker`(
    IN `skrID` VARCHAR(14),
    IN `frstName` VARCHAR(64),
    IN `lstName` VARCHAR(64),
    IN `bdy` BIGINT,
    IN `gendr` VARCHAR(10),
    IN `skrDP` VARCHAR(255)
)
BEGIN
    UPDATE
        Seeker
    SET
        first_name = COALESCE(frstName, first_name),
        last_name = COALESCE(lstName, last_name),
        birthdate = COALESCE(bdy, birthdate),
        gender = COALESCE(gendr, gender),
        seeker_dp = COALESCE(skrDP, seeker_dp)
    WHERE
        seeker_id = skrID;
END;

-- Delete existing seeker by seeker_id
DROP PROCEDURE IF EXISTS `delete_seeker`;
CREATE PROCEDURE `delete_seeker`(
    IN `skrID` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Seeker
    WHERE
        seeker_id = skrID;
END;

-- Get all seekers
DROP PROCEDURE IF EXISTS `get_seekers`;
CREATE PROCEDURE `get_seekers`()
BEGIN
    SELECT
        seeker_id AS seekerId,
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        seeker_dp AS seekerDp
    FROM
        Seeker;
END;

-- Get seeker by seeker_id
DROP PROCEDURE IF EXISTS `get_seeker`;
CREATE PROCEDURE `get_seeker`(
    IN `skrID` VARCHAR(14)
)
BEGIN
    SELECT
        seeker_id AS seekerId,
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        seeker_dp AS seekerDp
    FROM
        Seeker
    WHERE
        seeker_id = skrID;
END;