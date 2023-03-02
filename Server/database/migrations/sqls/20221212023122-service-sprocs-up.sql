-- Create Service
DROP PROCEDURE IF EXISTS `create_service`;
CREATE PROCEDURE `create_service`(
    IN `srvce_id` VARCHAR(14),
    IN `prov_id` VARCHAR(14),
    IN `typ_id` VARCHAR (14),
    IN `typ_name` VARCHAR(50),
    IN `init_cost` DECIMAL(6, 2),
    IN `srvce_rating` FLOAT
)
BEGIN
    INSERT INTO
        Service(
            service_id,
            provider_id,
            type_id,
            type_name,
            initial_cost,
            service_rating
        )
    VALUES(
        srvce_id,
        prov_id,
        typ_id,
        typ_name,
        init_cost,
        srvce_rating
    );
END;

-- Patch existing service by service_id
DROP PROCEDURE IF EXISTS `patch_service`;
CREATE PROCEDURE `patch_service`(
    IN `srvce_id` VARCHAR(14),
    IN `prov_id` VARCHAR(14),
    IN `typ_id` VARCHAR (14),
    IN `typ_name` VARCHAR(50),
    IN `init_cost` DECIMAL(6, 2),
    IN `srvce_rating` FLOAT
)
BEGIN
    UPDATE
        Service
    SET
        provider_id = COALESCE(prov_id, provider_id),
        type_id = COALESCE(typ_id, type_id),
        type_name = COALESCE(typ_name, type_name),
        initial_cost = COALESCE(init_cost, initial_cost),
        service_rating = COALESCE(srvce_rating, service_rating)
    WHERE
        service_id = srvce_id;
END;

-- Delete service by service_id
DROP PROCEDURE IF EXISTS `delete_service`;
CREATE PROCEDURE `delete_service`(
    IN `srvce_id` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Service
    WHERE
        service_id = srvce_id;
END;

-- Get all services
DROP PROCEDURE IF EXISTS `get_all_services`;
CREATE PROCEDURE `get_all_services`()
BEGIN
    SELECT
        service_id AS serviceID,
        provider_id AS providerID,
        type_id AS typeID,
        type_name AS typeName,
        initial_cost AS initialCost,
        service_rating AS serviceRating
    FROM
        Service;
END;

-- Get all services provided by a service provider (unsorted)
DROP PROCEDURE IF EXISTS `get_provider_services`;
CREATE PROCEDURE `get_provider_services`(
    IN `prov_id` VARCHAR(14)
)
BEGIN
    SELECT
        service_id AS serviceID,
        provider_id AS providerID,
        type_id AS typeID,
        type_name AS typeName,
        initial_cost AS initialCost,
        service_rating AS serviceRating
    FROM
        Service
    WHERE
        provider_id = prov_id;
END;

-- Get all services provided by a service provider (sorted by rating in descending order)
DROP PROCEDURE IF EXISTS `get_provider_services_sorted_desc`;
CREATE PROCEDURE `get_provider_services_sorted_desc`(
    IN `prov_id` VARCHAR(14)
)
BEGIN
    SELECT
        service_id AS serviceID,
        provider_id AS providerID,
        type_id AS typeID,
        type_name AS typeName,
        initial_cost AS initialCost,
        service_rating AS serviceRating
    FROM
        Service
    WHERE
        provider_id = prov_id
    ORDER BY
        service_rating DESC;
END;

-- Get all services provided by a service provider (sorted by rating in ascending order)
DROP PROCEDURE IF EXISTS `get_provider_services_sorted_asc`;
CREATE PROCEDURE `get_provider_services_sorted_asc`(
    IN `prov_id` VARCHAR(14)
)
BEGIN
    SELECT
        service_id AS serviceID,
        provider_id AS providerID,
        type_id AS typeID,
        type_name AS typeName,
        initial_cost AS initialCost,
        service_rating AS serviceRating
    FROM
        Service
    WHERE
        provider_id = prov_id
    ORDER BY
        service_rating ASC;
END;

-- Get all service provided by a service provider filtered by search key
DROP PROCEDURE IF EXISTS `get_provider_service_by_keyword`;
CREATE PROCEDURE `get_provider_service_by_keyword`(
    IN `prov_id` VARCHAR(14),
    IN `search_key` VARCHAR(50)
)
BEGIN
    SELECT
        service_id AS serviceID,
        provider_id AS providerID,
        type_id AS typeID,
        type_name AS typeName,
        initial_cost AS initialCost,
        service_rating AS serviceRating
    FROM
        Service
    WHERE
        provider_id = prov_id AND type_name LIKE CONCAT('%', search_key, '%');
END;

-- Get particular service by service_id
DROP PROCEDURE IF EXISTS `get_service`;
CREATE PROCEDURE `get_service`(
    IN `srvce_id` VARCHAR(14)
)
BEGIN
    SELECT
        service_id AS serviceID,
        provider_id AS providerID,
        type_id AS typeID,
        type_name AS typeName,
        initial_cost AS initialCost,
        service_rating AS serviceRating
    FROM
        Service
    WHERE
        service_id = srvce_id;
END;