-- Create new credentials
DROP PROCEDURE IF EXISTS `create_credentials`;
CREATE PROCEDURE `create_credentials`(
    IN `credID` VARCHAR(14),
    IN `usrID` VARCHAR(14),
    IN `idntfier` VARCHAR(320),
    IN `paswrd` VARCHAR(128)
)
BEGIN
    INSERT INTO
        Credentials(
            credentials_id,
            user_id,
            identifier,
            password
        )
    VALUES(
        credID,
        usrID,
        idntfier,
        paswrd
    );
END;

-- Patch existing credentials by credentials_id
DROP PROCEDURE IF EXISTS `patch_credentials`;
CREATE PROCEDURE `patch_credentials`(
    IN `credID` VARCHAR(14),
    IN `usrID` VARCHAR(14),
    IN `idntfier` VARCHAR(320),
    IN `paswrd` VARCHAR(128)
)
BEGIN
    UPDATE
        Credentials
    SET
        user_id = COALESCE(usrID, user_id),
        identifier = COALESCE(idntfier, identifier),
        password = COALESCE(paswrd, password)
    WHERE
        credentials_id = credID;
END;

-- Patch existing credentials by user_id
DROP PROCEDURE IF EXISTS `patch_user_credentials`;
CREATE PROCEDURE `patch_user_credentials`(
    IN `usrID` VARCHAR(14),
    IN `idntfier` VARCHAR(320),
    IN `paswrd` VARCHAR(128)
)
BEGIN
    UPDATE
        Credentials
    SET
        identifier = COALESCE(idntfier, identifier),
        password = COALESCE(paswrd, password)
    WHERE
        user_id = usrID;
END;

-- Delete credentials by credentials_id
DROP PROCEDURE IF EXISTS `delete_credentials`;
CREATE PROCEDURE `delete_credentials`(
    IN `credID` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Credentials
    WHERE
        credentials_id = credID;
END;

-- Get all credentials
DROP PROCEDURE IF EXISTS `get_credentials`;
CREATE PROCEDURE `get_credentials`()
BEGIN
    SELECT
        credentials_id AS credentialsID,
        user_id AS userID,
        identifier
    FROM
        Credentials;
END;

-- Get credentials by credentials_id
DROP PROCEDURE IF EXISTS `get_credentials_by_id`;
CREATE PROCEDURE `get_credentials_by_id`(
    IN `credID` VARCHAR(14)
)
BEGIN
    SELECT
        credentials_id AS credentialsID,
        user_id AS userID,
        identifier
    FROM
        Credentials
    WHERE
        credentials_id = credID;
END;

-- Get user credentials by user_id
DROP PROCEDURE IF EXISTS `get_user_credentials`;
CREATE PROCEDURE `get_user_credentials`(
    IN `usrID` VARCHAR(14)
)
BEGIN
    SELECT
        credentials_id AS credentialsID,
        user_id AS userID,
        identifier,
        password AS hashedPassword
    FROM
        Credentials
    WHERE
        user_id = usrID;
END;

-- Get hashed password by identifier of seeker
DROP PROCEDURE IF EXISTS `get_seeker_hashed_password`;
CREATE PROCEDURE `get_seeker_hashed_password`(
    IN `idntfier` VARCHAR(320)
)
BEGIN
    SELECT DISTINCT
        Credentials.user_id AS userID,
        Credentials.password AS hashedPassword
    FROM
        Credentials
            INNER JOIN
        Seeker ON Seeker.seeker_id = Credentials.user_id
    WHERE
        Credentials.identifier = idntfier;
END;

-- Get hashed password by identifier of provider
DROP PROCEDURE IF EXISTS `get_provider_hashed_password`;
CREATE PROCEDURE `get_provider_hashed_password`(
    IN `idntfier` VARCHAR(320)
)
BEGIN
    SELECT DISTINCT
        Credentials.user_id AS userID,
        Credentials.password AS hashedPassword
    FROM
        Credentials
            INNER JOIN
        `Provider` ON Provider.provider_id = Credentials.user_id
    WHERE
        Credentials.identifier = idntfier;
END;


-- Login Validation via username or email or phone number
DROP PROCEDURE IF EXISTS `login_validation`;
CREATE PROCEDURE `login_validation`(
    IN `idntfier` VARCHAR(320),
    IN `paswrd` VARCHAR(128)
)
BEGIN
    SELECT
        credentials_id AS credentialsID,
        user_id AS userID,
        identifier
    FROM
        Credentials
    WHERE
        identifier = idntfier AND password = paswrd;
END;

-- Get credentials by identifier
DROP PROCEDURE IF EXISTS `get_credentials_by_identifier`;
CREATE PROCEDURE `get_credentials_by_identifier`(
    IN `idntfier` VARCHAR(320)
)
BEGIN
    SELECT
        credentials_id AS credentialsID,
        user_id AS userID,
        identifier
    FROM
        Credentials
    WHERE
        identifier = idntfier;
END;