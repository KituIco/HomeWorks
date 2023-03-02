-- Create new review
DROP PROCEDURE IF EXISTS `create_review`;
CREATE PROCEDURE `create_review`(
    IN `rvwID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `skrID` VARCHAR(14),
    IN `dateTS` BIGINT,
    IN `rvwRtng` FLOAT,
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
END;

-- Patch existing review by review_id
DROP PROCEDURE IF EXISTS `patch_review`;
CREATE PROCEDURE `patch_review`(
    IN `rvwID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `skrID` VARCHAR(14),
    IN `dateTS` BIGINT,
    IN `rvwRtng` FLOAT,
    IN `rvwCmnt` TEXT,
    IN `rvwImg` TEXT
)
BEGIN
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