-- Create new certificate
DROP PROCEDURE IF EXISTS `create_certificate`;
CREATE PROCEDURE `create_certificate`(
    IN `certID` VARCHAR(14),
    IN `provID` VARCHAR(14),
    IN `certName` VARCHAR(50),
    IN `fileAttach` VARCHAR(255)
)
BEGIN
    INSERT INTO
        Certificate(
            certificate_id,
            provider_id,
            certificate_name,
            file_attached
        )
    VALUES(
        certID,
        provID,
        certName,
        fileAttach
    );
END;

-- Patch existing certificate by certificate_id
DROP PROCEDURE IF EXISTS `patch_certificate`;
CREATE PROCEDURE `patch_certificate`(
    IN `certID` VARCHAR(14),
    IN `provID` VARCHAR(14),
    IN `certName` VARCHAR(50),
    IN `fileAttach` VARCHAR(255)
)
BEGIN
    UPDATE
        Certificate
    SET
        provider_id = COALESCE(provID, provider_id),
        certificate_name = COALESCE(certName, certificate_name),
        file_attached = COALESCE(fileAttach, file_attached)
    WHERE
        certificate_id = certID;
END;

-- Delete certificate by certificate_id
DROP PROCEDURE IF EXISTS `delete_certificate`;
CREATE PROCEDURE `delete_certificate`(
    IN `certID` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Certificate
    WHERE
        certificate_id = certID;
END;

-- Get all certificates
DROP PROCEDURE IF EXISTS `get_certificates`;
CREATE PROCEDURE `get_certificates`()
BEGIN
    SELECT
        certificate_id AS certificateID,
        provider_id AS providerID,
        certificate_name AS certificateName,
        file_attached AS fileAttached
    FROM
        Certificate;
END;

-- Get all certificates by service provider
DROP PROCEDURE IF EXISTS `get_provider_certificates`;
CREATE PROCEDURE `get_provider_certificates`(
    IN `provID` VARCHAR(14)
)
BEGIN
    SELECT
        certificate_id AS certificateID,
        provider_id AS providerID,
        certificate_name AS certificateName,
        file_attached AS fileAttached
    FROM
        Certificate
    WHERE
        provider_id = provID;
END;

-- Get particular certificate by certificate_id
DROP PROCEDURE IF EXISTS `get_certificate_by_id`;
CREATE PROCEDURE `get_certificate_by_id`(
    IN `certID` VARCHAR(14)
)
BEGIN
    SELECT
        certificate_id AS certificateID,
        provider_id AS providerID,
        certificate_name AS certificateName,
        file_attached AS fileAttached
    FROM
        Certificate
    WHERE
        certificate_id = certID;
END;