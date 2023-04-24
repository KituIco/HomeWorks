-- Create Service specs
DROP PROCEDURE IF EXISTS `create_service_specs`;
CREATE PROCEDURE `create_service_specs`(
    IN `spcs_id` VARCHAR(14),
    IN `seker_id` VARCHAR(14),
    IN `typ_id` VARCHAR(14),
    IN `addr_id` VARCHAR(14),
    IN `refr_id` TEXT,
    IN `spcs_desc` TEXT,
    IN `spcs_images` TEXT,
    IN `stat` INT,
    IN `spcs_date` BIGINT
)
BEGIN
    INSERT INTO
        ServiceSpecs(
            specs_id,
            seeker_id,
            type_id,
            address_id,
            referenced_id,
            specs_desc,
            images,
            specs_status,
            specs_timestamp
        )
    VALUES(
        spcs_id,
        seker_id,
        typ_id,
        addr_id,
        refr_id,
        spcs_desc,
        spcs_images,
        stat,
        spcs_date
    );
END;

-- Patch existing service specs by specs_id
DROP PROCEDURE IF EXISTS `patch_service_specs`;
CREATE PROCEDURE `patch_service_specs`(
    IN `spcs_id` VARCHAR(14),
    IN `seker_id` VARCHAR(14),
    IN `typ_id` VARCHAR(14),
    IN `addr_id` VARCHAR(14),
    IN `refr_id` TEXT,
    IN `spcs_desc` TEXT,
    IN `spcs_images` TEXT,
    IN `stat` INT,
    IN `spcs_date` BIGINT
)
BEGIN
    UPDATE
        ServiceSpecs
    SET
        seeker_id = COALESCE(seker_id, seeker_id),
        type_id = COALESCE(typ_id, type_id),
        address_id = COALESCE(addr_id, address_id),
        referenced_id = COALESCE(refr_id, referenced_id),
        specs_desc = COALESCE(spcs_desc, specs_desc),
        images = COALESCE(spcs_images, images),
        specs_status = COALESCE(stat, specs_status),
        specs_timestamp = COALESCE(spcs_date, specs_timestamp)
    WHERE
        specs_id = spcs_id;
END;

-- Delete service specs by specs_id
DROP PROCEDURE IF EXISTS `delete_service_specs`;
CREATE PROCEDURE `delete_service_specs`(
    IN `spcs_id` VARCHAR(14)
)
BEGIN
    DELETE FROM
        ServiceSpecs
    WHERE
        specs_id = spcs_id;
END;

-- Get all service specs
DROP PROCEDURE IF EXISTS `get_all_service_specs`;
CREATE PROCEDURE `get_all_service_specs`()
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs;
END;

-- Get all service specs by service seeker (unsorted)
DROP PROCEDURE IF EXISTS `get_seeker_specs`;
CREATE PROCEDURE `get_seeker_specs`(
    IN `seker_id` VARCHAR(14)
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        seeker_id = seker_id;
END;

-- GET all service specs by service seeker (filtered by type)
DROP PROCEDURE IF EXISTS `get_seeker_specs_by_type`;
CREATE PROCEDURE `get_seeker_specs_by_type`(
    IN `seker_id` VARCHAR(14),
    IN `typ_id` VARCHAR(14)
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        seeker_id = seker_id
    AND
        type_id = typ_id;
END;

-- Get all service specs by service seeker (filtered by status)
DROP PROCEDURE IF EXISTS `get_seeker_specs_by_status`;
CREATE PROCEDURE `get_seeker_specs_by_status`(
    IN `seker_id` VARCHAR(14),
    IN `stat` INT
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        seeker_id = seker_id
    AND
        specs_status = stat;
END;

-- Get all service specs by service type
DROP PROCEDURE IF EXISTS `get_specs_by_type`;
CREATE PROCEDURE `get_specs_by_type`(
    IN `typ_id` VARCHAR(14)
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        type_id = typ_id;
END;

-- Get all service specs by status
DROP PROCEDURE IF EXISTS `get_specs_by_status`;
CREATE PROCEDURE `get_specs_by_status`(
    IN `stat` INT
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        specs_status = stat;
END;

-- Get all service specs by service seeker (sorted by date descending)
DROP PROCEDURE IF EXISTS `get_seeker_specs_by_date_desc`;
CREATE PROCEDURE `get_seeker_specs_by_date_desc`(
    IN `seker_id` VARCHAR(14)
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        seeker_id = seker_id
    ORDER BY
        specs_timestamp DESC;
END;

-- Get all service specs by service seeker (sorted by date ascending)
DROP PROCEDURE IF EXISTS `get_seeker_specs_by_date_asc`;
CREATE PROCEDURE `get_seeker_specs_by_date_asc`(
    IN `seker_id` VARCHAR(14)
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        seeker_id = seker_id
    ORDER BY
        specs_timestamp ASC;
END;

-- Get particular service specs by spec_id
DROP PROCEDURE IF EXISTS `get_specs_by_id`;
CREATE PROCEDURE `get_specs_by_id`(
    IN `spcs_id` VARCHAR(14)
)
BEGIN
    SELECT
        specs_id AS specsID,
        seeker_id AS seekerID,
        type_id AS typeID,
        address_id AS addressID,
        referenced_id AS referencedID,
        specs_desc AS specsDesc,
        images,
        specs_status AS specsStatus,
        specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    WHERE
        specs_id = spcs_id;
END;

-- Get service specs by coordinates and given radius
DROP PROCEDURE IF EXISTS `get_specs_by_coords`;
CREATE PROCEDURE `get_specs_by_coords`(
    IN `lat` DOUBLE,
    IN `lng` DOUBLE,
    IN `inner_radius` DOUBLE,
    IN `outer_radius` DOUBLE
)
BEGIN
    SELECT
        ServiceSpecs.specs_id AS specsID,
        ServiceSpecs.seeker_id AS seekerID,
        ServiceSpecs.type_id AS typeID,
        ServiceSpecs.address_id AS addressID,
        ServiceSpecs.referenced_id AS referencedID,
        ServiceSpecs.specs_desc AS specsDesc,
        ServiceSpecs.images AS images,
        ServiceSpecs.specs_status AS specsStatus,
        ServiceSpecs.specs_timestamp AS specsTimestamp
    FROM
        ServiceSpecs
    INNER JOIN
        Address
    ON
        ServiceSpecs.address_id = Address.address_id
    WHERE
        ST_Distance_Sphere(Address.coordinates, POINT(lat, lng)) BETWEEN (inner_radius * 1000) AND (outer_radius * 1000)
        ORDER BY specsTimestamp ASC;
END;