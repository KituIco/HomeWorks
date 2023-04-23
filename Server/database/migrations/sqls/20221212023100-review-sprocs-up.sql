-- Create new review
DROP PROCEDURE IF EXISTS `create_review`;
CREATE PROCEDURE `create_review`(
    IN `rvwID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `skrID` VARCHAR(14),
    IN `dateTS` BIGINT,
    IN `rvwRtng` INT,
    IN `rvwCmnt` TEXT,
    IN `rvwImg` TEXT
)
BEGIN
    INSERT INTO
        Review(
            review_id,
            service_id,
            seeker_id,
            date_timestamp,
            rating,
            comment,
            images
        )
    VALUES(
        rvwID,
        srvceID,
        skrID,
        dateTS,
        rvwRtng,
        rvwCmnt,
        rvwImg
    );
    
    CALL concurrent_updates_service(srvceID, rvwRtng, 1);
    SELECT provider_id INTO @serviceProviderId FROM Service WHERE service_id = srvceID LIMIT 1;
    CALL concurrent_updates_provider(@serviceProviderId, rvwRtng, 1);
END;

-- Patch existing review by review_id
DROP PROCEDURE IF EXISTS `patch_review`;
CREATE PROCEDURE `patch_review`(
    IN `rvwID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `skrID` VARCHAR(14),
    IN `dateTS` BIGINT,
    IN `rvwRtng` INT,
    IN `rvwCmnt` TEXT,
    IN `rvwImg` TEXT
)
BEGIN
    DECLARE current_rating INT;
    DECLARE current_provider_id VARCHAR(14);
    IF rvwRtng IS NOT NULL THEN
        SELECT rating INTO current_rating FROM Review WHERE review_id = rvwID;
        SELECT provider_id INTO current_provider_id FROM Service WHERE service_id = srvceID LIMIT 1;
        CALL concurrent_updates_service(srvceID, current_rating, -1);
        CALL concurrent_updates_provider(current_provider_id, current_rating, -1);
        CALL concurrent_updates_service(srvceID, rvwRtng, 1);
        CALL concurrent_updates_provider(current_provider_id, rvwRtng, 1);
    END IF;

    UPDATE
        Review
    SET
        service_id = COALESCE(srvceID, service_id),
        seeker_id = COALESCE(skrID, seeker_id),
        date_timestamp = COALESCE(dateTS, date_timestamp),
        rating = COALESCE(rvwRtng, rating),
        comment = COALESCE(rvwCmnt, comment),
        images = COALESCE(rvwImg, images)
    WHERE
        review_id = rvwID;
END;

-- Delete review by review_id
DROP PROCEDURE IF EXISTS `delete_review`;
CREATE PROCEDURE `delete_review`(
    IN `rvwID` VARCHAR(14)
)
BEGIN
    DECLARE current_rating INT;
    DECLARE current_service_id VARCHAR(14);
    DECLARE current_provider_id VARCHAR(14);
    SELECT service_id, rating INTO current_service_id, current_rating FROM Review WHERE review_id = rvwID LIMIT 1;
    SELECT provider_id INTO current_provider_id FROM Service WHERE service_id = current_service_id LIMIT 1;
    CALL concurrent_updates_service(current_service_id, current_rating, -1);
    CALL concurrent_updates_provider(current_provider_id, current_rating, -1);

    DELETE FROM
        Review
    WHERE
        review_id = rvwID;
END;

-- Get all reviews
DROP PROCEDURE IF EXISTS `get_all_reviews`;
CREATE PROCEDURE `get_all_reviews`()
BEGIN
    SELECT
        review_id AS reviewId,
        service_id AS serviceId,
        seeker_id AS seekerId,
        date_timestamp AS dateTimestamp,
        rating,
        comment,
        images
    FROM
        Review;
END;

-- Get all reviews for a service via service_id
DROP PROCEDURE IF EXISTS `get_service_reviews`;
CREATE PROCEDURE `get_service_reviews`(
    IN `srvceID` VARCHAR(14)
)
BEGIN
    SELECT
        review_id AS reviewId,
        service_id AS serviceId,
        seeker_id AS seekerId,
        date_timestamp AS dateTimestamp,
        rating,
        comment,
        images
    FROM
        Review
    WHERE
        service_id = srvceID;
END;

-- Get particular review
DROP PROCEDURE IF EXISTS `get_review`;
CREATE PROCEDURE `get_review`(
    IN `rvwID` VARCHAR(14)
)
BEGIN
    SELECT
        review_id AS reviewId,
        service_id AS serviceId,
        seeker_id AS seekerId,
        date_timestamp AS dateTimestamp,
        rating,
        comment,
        images
    FROM
        Review
    WHERE
        review_id = rvwID;
END;