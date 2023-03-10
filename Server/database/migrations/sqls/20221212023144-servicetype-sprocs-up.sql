-- Create new service type
DROP PROCEDURE IF EXISTS `create_service_type`;
CREATE PROCEDURE `create_service_type`(
    IN `typ_id` VARCHAR(14),
    IN `typ_name` VARCHAR(50),
    IN `typ_desc` TEXT,
    IN `min_serv_cost` DECIMAL(10,2)
)
BEGIN
    INSERT INTO
        ServiceType(
            type_id,
            type_name,
            type_desc,
            min_service_cost
        )
    VALUES(
        typ_id,
        typ_name,
        typ_desc,
        min_serv_cost
    );
END;

-- Patch existing service type by type_id
DROP PROCEDURE IF EXISTS `patch_service_type`;
CREATE PROCEDURE `patch_service_type`(
    IN `typ_id` VARCHAR(14),
    IN `typ_name` VARCHAR(50),
    IN `typ_desc` TEXT,
    IN `min_serv_cost` DECIMAL(10,2)
)
BEGIN
    UPDATE
        ServiceType
    SET
        type_name = COALESCE(typ_name, type_name),
        type_desc = COALESCE(typ_desc, type_desc),
        min_service_cost = COALESCE(min_serv_cost, min_service_cost)
    WHERE
        type_id = typ_id;
END;

-- Delete existing service type by type_id
DROP PROCEDURE IF EXISTS `delete_service_type`;
CREATE PROCEDURE `delete_service_type`(
    IN `typ_id` VARCHAR(14)
)
BEGIN
    DELETE FROM
        ServiceType
    WHERE
        type_id = typ_id;
END;

-- Get all service types
DROP PROCEDURE IF EXISTS `get_service_types`;
CREATE PROCEDURE `get_service_types`()
BEGIN
    SELECT
        type_id AS typeID,
        type_name AS typeName,
        type_desc AS typeDesc,
        min_service_cost AS minServiceCost
    FROM
        ServiceType;
END;

-- Get service type by type_id
DROP PROCEDURE IF EXISTS `get_service_type_by_id`;
CREATE PROCEDURE `get_service_type_by_id`(
    IN `typ_id` VARCHAR(14)
)
BEGIN
    SELECT
        type_id AS typeID,
        type_name AS typeName,
        type_desc AS typeDesc,
        min_service_cost AS minServiceCost
    FROM
        ServiceType
    WHERE
        type_id = typ_id;
END;