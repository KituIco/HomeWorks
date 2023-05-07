-- Create Service
DROP PROCEDURE IF EXISTS `create_service`;
CREATE PROCEDURE `create_service`(
    IN `srvce_id` VARCHAR(14),
    IN `prov_id` VARCHAR(14),
    IN `typ_id` VARCHAR (14),
    IN `typ_name` VARCHAR(50),
    IN `init_cost` DECIMAL(10,2),
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
            service_enabled,
            service_rating,
            total_reviews,
            reviews_count,
            five_star,
            four_star,
            three_star,
            two_star,
            one_star
        )
    VALUES(
        srvce_id,
        prov_id,
        typ_id,
        typ_name,
        init_cost,
        1,
        srvce_rating,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    );
END;

-- Patch existing service by service_id
DROP PROCEDURE IF EXISTS `patch_service`;
CREATE PROCEDURE `patch_service`(
    IN `srvce_id` VARCHAR(14),
    IN `prov_id` VARCHAR(14),
    IN `typ_id` VARCHAR (14),
    IN `typ_name` VARCHAR(50),
    IN `init_cost` DECIMAL(10,2),
    IN `srvce_enabled` TINYINT,
    IN `srvce_rating` FLOAT,
    IN `tot_reviews` INT,
    IN `rev_count` INT,
    IN `fvStar` INT,
    IN `frStar` INT,
    IN `thStar` INT,
    IN `twStar` INT,
    IN `onStar` INT
)
BEGIN
    UPDATE
        Service
    SET
        provider_id = COALESCE(prov_id, provider_id),
        type_id = COALESCE(typ_id, type_id),
        type_name = COALESCE(typ_name, type_name),
        initial_cost = COALESCE(init_cost, initial_cost),
        service_enabled = COALESCE(srvce_enabled, service_enabled),
        service_rating = COALESCE(srvce_rating, service_rating),
        total_reviews = COALESCE(tot_reviews, total_reviews),
        reviews_count = COALESCE(rev_count, reviews_count),
        five_star = COALESCE(fvStar, five_star),
        four_star = COALESCE(frStar, four_star),
        three_star = COALESCE(thStar, three_star),
        two_star = COALESCE(twStar, two_star),
        one_star = COALESCE(onStar, one_star)
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
        service_enabled AS serviceEnabled,
        service_rating AS serviceRating,
        total_reviews AS totalReviews,
        reviews_count AS reviewsCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
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
        service_enabled AS serviceEnabled,
        service_rating AS serviceRating,
        total_reviews AS totalReviews,
        reviews_count AS reviewsCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
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
        service_enabled AS serviceEnabled,
        service_rating AS serviceRating,
        total_reviews AS totalReviews,
        reviews_count AS reviewsCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
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
        service_enabled AS serviceEnabled,
        service_rating AS serviceRating,
        total_reviews AS totalReviews,
        reviews_count AS reviewsCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
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
        service_enabled AS serviceEnabled,
        service_rating AS serviceRating,
        total_reviews AS totalReviews,
        reviews_count AS reviewsCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
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
        service_enabled AS serviceEnabled,
        service_rating AS serviceRating,
        total_reviews AS totalReviews,
        reviews_count AS reviewsCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
    FROM
        Service
    WHERE
        service_id = srvce_id;
END;

-- Concurrently update service_rating, total_reviews, reviews_count, five_star, four_star, three_star, two_star, one_star
DROP PROCEDURE IF EXISTS `concurrent_updates_service`;
CREATE PROCEDURE `concurrent_updates_service`(
    IN `srvce_id` VARCHAR(14), 
    IN `rating` INT,
    IN `mult` INT
)
BEGIN
    DECLARE current_service_rating FLOAT;
    DECLARE current_total_reviews INT;
    DECLARE current_reviews_count INT;
    DECLARE current_five_star INT;
    DECLARE current_four_star INT;
    DECLARE current_three_star INT;
    DECLARE current_two_star INT;
    DECLARE current_one_star INT;
    IF rating = 5 THEN
        START TRANSACTION;
            SELECT service_rating, total_reviews, reviews_count, five_star INTO current_service_rating, current_total_reviews, current_reviews_count, current_five_star FROM Service WHERE service_id = srvce_id FOR UPDATE;
            UPDATE 
                Service
            SET
                service_rating = (current_total_reviews + mult*(rating)) / (current_reviews_count + mult*(1)),
                total_reviews = current_total_reviews + mult*(rating),
                reviews_count = current_reviews_count + mult*(1),
                five_star = current_five_star + mult*(1)
            WHERE
                service_id = srvce_id;
        COMMIT;
    ELSEIF rating = 4 THEN
        START TRANSACTION;
            SELECT service_rating, total_reviews, reviews_count, four_star INTO current_service_rating, current_total_reviews, current_reviews_count, current_four_star FROM Service WHERE service_id = srvce_id FOR UPDATE;
            UPDATE 
                Service
            SET
                service_rating = (current_total_reviews + mult*(rating)) / (current_reviews_count + mult*(1)),
                total_reviews = current_total_reviews + mult*(rating),
                reviews_count = current_reviews_count + mult*(1),
                four_star = current_four_star + mult*(1)
            WHERE
                service_id = srvce_id;
        COMMIT;
    ELSEIF rating = 3 THEN
        START TRANSACTION;
            SELECT service_rating, total_reviews, reviews_count, three_star INTO current_service_rating, current_total_reviews, current_reviews_count, current_three_star FROM Service WHERE service_id = srvce_id FOR UPDATE;
            UPDATE 
                Service
            SET
                service_rating = (current_total_reviews + mult*(rating)) / (current_reviews_count + mult*(1)),
                total_reviews = current_total_reviews + mult*(rating),
                reviews_count = current_reviews_count + mult*(1),
                three_star = current_three_star + mult*(1)
            WHERE
                service_id = srvce_id;
        COMMIT;
    ELSEIF rating = 2 THEN
        START TRANSACTION;
            SELECT service_rating, total_reviews, reviews_count, two_star INTO current_service_rating, current_total_reviews, current_reviews_count, current_two_star FROM Service WHERE service_id = srvce_id FOR UPDATE;
            UPDATE 
                Service
            SET
                service_rating = (current_total_reviews + mult*(rating)) / (current_reviews_count + mult*(1)),
                total_reviews = current_total_reviews + mult*(rating),
                reviews_count = current_reviews_count + mult*(1),
                two_star = current_two_star + mult*(1)
            WHERE
                service_id = srvce_id;
        COMMIT;
    ELSEIF rating = 1 THEN
        START TRANSACTION;
            SELECT service_rating, total_reviews, reviews_count, one_star INTO current_service_rating, current_total_reviews, current_reviews_count, current_one_star FROM Service WHERE service_id = srvce_id FOR UPDATE;
            UPDATE 
                Service
            SET
                service_rating = (current_total_reviews + mult*(rating)) / (current_reviews_count + mult*(1)),
                total_reviews = current_total_reviews + mult*(rating),
                reviews_count = current_reviews_count + mult*(1),
                one_star = current_one_star + mult*(1)
            WHERE
                service_id = srvce_id;
        COMMIT;
    END IF;
END;

-- Get service recommendations from location and sort by service_rating
DROP PROCEDURE IF EXISTS `get_service_recommendations`;
CREATE PROCEDURE `get_service_recommendations`(
    IN `lat` FLOAT,
    IN `lng` FLOAT,
    IN `inner_radius` FLOAT,
    IN `outer_radius` FLOAT,
    IN `offset` INT,
    IN `return_size` INT
)
BEGIN
    SELECT
        Service.service_id AS serviceID,
        Service.provider_id AS providerID,
        Service.type_id AS typeID,
        Service.type_name AS typeName,
        Service.initial_cost AS initialCost,
        Service.service_enabled AS serviceEnabled,
        Service.service_rating AS serviceRating,
        Service.total_reviews AS totalReviews,
        Service.reviews_count AS reviewsCount,
        Service.five_star AS fiveStar,
        Service.four_star AS fourStar,
        Service.three_star AS threeStar,
        Service.two_star AS twoStar,
        Service.one_star AS oneStar
    FROM
        Service
            INNER JOIN
        Address ON Service.provider_id = Address.provider_id AND Address.is_default = 1 AND Service.service_enabled = 1
    WHERE
        ST_Distance_Sphere(POINT(RADIANS(ST_X(Address.coordinates)), RADIANS(ST_Y(Address.coordinates))), POINT(RADIANS(lat), RADIANS(lng))) BETWEEN (inner_radius*1000) AND (outer_radius*1000)
    ORDER BY service_rating DESC
    LIMIT offset, return_size;
END;