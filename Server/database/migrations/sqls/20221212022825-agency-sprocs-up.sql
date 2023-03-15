-- Create new agency
DROP PROCEDURE IF EXISTS create_agency;
CREATE PROCEDURE create_agency(
    IN agncyID VARCHAR(14),
    IN agncyName VARCHAR(128),
    IN agncyDesc TEXT,
    IN agncyDP VARCHAR(255),
    IN agncyImages TEXT,
    IN agncyServiceTypes VARCHAR(255),
    IN agncyRating FLOAT
)
BEGIN
    INSERT INTO 
        Agency(
            agency_id, 
            agency_name, 
            agency_desc, 
            agency_dp, 
            agency_images, 
            agency_service_types, 
            agency_rating
        )
    VALUES(
        agncyID, 
        agncyName, 
        agncyDesc, 
        agncyDP, 
        agncyImages, 
        agncyServiceTypes, 
        agncyRating
    );
END;

-- Patch existing agency by agency_id
DROP PROCEDURE IF EXISTS patch_agency;
CREATE PROCEDURE patch_agency(
    IN agncyID VARCHAR(14),
    IN agncyName VARCHAR(128),
    IN agncyDesc TEXT,
    IN agncyDP VARCHAR(255),
    IN agncyImages TEXT,
    IN agncyServiceTypes VARCHAR(255),
    IN agncyRating FLOAT
)
BEGIN
    UPDATE 
        Agency
    SET
        agency_name = COALESCE(agncyName, agency_name),
        agency_desc = COALESCE(agncyDesc, agency_desc),
        agency_dp = COALESCE(agncyDP, agency_dp),
        agency_images = COALESCE(agncyImages, agency_images),
        agency_service_types = COALESCE(agncyServiceTypes, agency_service_types),
        agency_rating = COALESCE(agncyRating, agency_rating)
    WHERE 
        agency_id = agncyID;
END;

-- Delete agency by agency_id
DROP PROCEDURE IF EXISTS delete_agency;
CREATE PROCEDURE delete_agency(
    IN agncyID VARCHAR(14)
)
BEGIN
    DELETE FROM 
        Agency
    WHERE 
        agency_id = agncyID;
END;

-- Get particular agency by agency_id
DROP PROCEDURE IF EXISTS get_agency_by_id;
CREATE PROCEDURE get_agency_by_id(
    IN agncyID VARCHAR(14)
)
BEGIN
    SELECT 
        agency_id AS agencyID, 
        agency_name AS agencyName, 
        agency_desc AS agencyDesc, 
        agency_dp AS agencyDP, 
        agency_images AS agencyImages, 
        agency_service_types AS agencyServiceTypes, 
        agency_rating AS agencyRating
    FROM 
        Agency
    WHERE 
        agency_id = agncyID;
END;

-- Get all agencies
DROP PROCEDURE IF EXISTS get_all_agencies;
CREATE PROCEDURE get_all_agencies()
BEGIN
    SELECT 
        agency_id AS agencyID, 
        agency_name AS agencyName, 
        agency_desc AS agencyDesc, 
        agency_dp AS agencyDP, 
        agency_images AS agencyImages, 
        agency_service_types AS agencyServiceTypes, 
        agency_rating AS agencyRating
    FROM 
        Agency;
END;

-- Get all providers under agency
DROP PROCEDURE IF EXISTS get_agency_providers;
CREATE PROCEDURE get_agency_providers(
    IN agncyID VARCHAR(14)
)
BEGIN
    SELECT 
        provider_id AS providerID, 
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        provider_dp AS providerDP,
        valid_id AS validID,
        agency_id AS agencyID,
        verified,
        ave_rating AS aveRating
    FROM 
        Provider
    WHERE 
        agency_id = agncyID;
END;

-- Get agency service types
DROP PROCEDURE IF EXISTS get_agency_service_types;
CREATE PROCEDURE get_agency_service_types(
    IN agncyID VARCHAR(14)
)
BEGIN
    SELECT 
        agency_service_types AS agencyServiceTypes
    FROM 
        Agency
    WHERE 
        agency_id = agncyID;
END;

-- Add provider to agency
DROP PROCEDURE IF EXISTS add_provider_to_agency;
CREATE PROCEDURE add_provider_to_agency(
    IN provID VARCHAR(14),
    IN agncyID VARCHAR(14)
)
BEGIN
    UPDATE 
        Provider
    SET
        agency_id = agncyID
    WHERE 
        provider_id = provID;
END;

-- Remove provider from agency
DROP PROCEDURE IF EXISTS remove_provider_from_agency;
CREATE PROCEDURE remove_provider_from_agency(
    IN provID VARCHAR(14)
)
BEGIN
    UPDATE 
        Provider
    SET
        agency_id = NULL
    WHERE 
        provider_id = provID;
END;

-- Search provider in agency
DROP PROCEDURE IF EXISTS search_provider_in_agency;
CREATE PROCEDURE search_provider_in_agency(
    IN agncyID VARCHAR(14),
    IN searchQuery VARCHAR(255)
)
BEGIN
    SELECT
        provider_id AS providerID, 
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        provider_dp AS providerDP,
        valid_id AS validID,
        agency_id AS agencyID,
        verified,
        ave_rating AS aveRating
    FROM 
        Provider
    WHERE agency_id = agncyID AND (
        first_name LIKE CONCAT('%', searchQuery, '%') OR
        last_name LIKE CONCAT('%', searchQuery, '%') OR
        CONCAT(first_name, ' ', last_name) LIKE CONCAT('%', searchQuery, '%')
    );
END;