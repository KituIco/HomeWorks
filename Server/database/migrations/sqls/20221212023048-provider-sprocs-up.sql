-- Create new provider
DROP PROCEDURE IF EXISTS `create_provider`;
CREATE PROCEDURE `create_provider`(
    IN `provID` VARCHAR(14),
    IN `frstName` VARCHAR(64),
    IN `lstName` VARCHAR(64),
    IN `bdy` VARCHAR(30),
    IN `gendr` VARCHAR(10),
    IN `provDP` VARCHAR(255),
    IN `valID` VARCHAR(255),
    IN `agncyID` VARCHAR(14),
    IN `vrfy` TINYINT,
    IN `aveRtng` FLOAT
)
BEGIN
    INSERT INTO
        Provider(
            provider_id,
            first_name,
            last_name,
            birthdate,
            gender,
            provider_dp,
            valid_id,
            agency_id,
            verified,
            accepting,
            ave_rating,
            total_reviews,
            review_count,
            five_star,
            four_star,
            three_star,
            two_star,
            one_star
        )
    VALUES(
        provID,
        frstName,
        lstName,
        bdy,
        gendr,
        provDP,
        valID,
        agncyID,
        vrfy,
        0,
        aveRtng,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    );
END;

-- Patch existing provider by provider_id
DROP PROCEDURE IF EXISTS `patch_provider`;
CREATE PROCEDURE `patch_provider`(
    IN `provID` VARCHAR(14),
    IN `frstName` VARCHAR(64),
    IN `lstName` VARCHAR(64),
    IN `bdy` VARCHAR(30),
    IN `gendr` VARCHAR(10),
    IN `provDP` VARCHAR(255),
    IN `valID` VARCHAR(255),
    IN `agncyID` VARCHAR(14),
    IN `vrfy` TINYINT,
    IN `accpting` TINYINT,
    IN `aveRtng` FLOAT,
    IN `ttlRvws` INT,
    IN `rvwCnt` INT,
    IN `fvStr` INT,
    IN `fStr` INT,
    IN `tStr` INT,
    IN `twStr` INT,
    IN `oStr` INT
)
BEGIN
    UPDATE
        Provider
    SET
        first_name = COALESCE(frstName, first_name),
        last_name = COALESCE(lstName, last_name),
        birthdate = COALESCE(bdy, birthdate),
        gender = COALESCE(gendr, gender),
        provider_dp = COALESCE(provDP, provider_dp),
        valid_id = COALESCE(valID, valid_id),
        agency_id = COALESCE(agncyID, agency_id),
        verified = COALESCE(vrfy, verified),
        accepting = COALESCE(accpting, accepting),
        ave_rating = COALESCE(aveRtng, ave_rating),
        total_reviews = COALESCE(ttlRvws, total_reviews),
        review_count = COALESCE(rvwCnt, review_count),
        five_star = COALESCE(fvStr, five_star),
        four_star = COALESCE(fStr, four_star),
        three_star = COALESCE(tStr, three_star),
        two_star = COALESCE(twStr, two_star),
        one_star = COALESCE(oStr, one_star)
    WHERE
        provider_id = provID;
END;

-- Delete existing provider by provider_id
DROP PROCEDURE IF EXISTS `delete_provider`;
CREATE PROCEDURE `delete_provider`(
    IN `provID` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Provider
    WHERE
        provider_id = provID;
END;

-- Get all providers
DROP PROCEDURE IF EXISTS `get_providers`;
CREATE PROCEDURE `get_providers`()
BEGIN
    SELECT
        provider_id AS providerId,
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        provider_dp AS providerDp,
        valid_id AS validId,
        agency_id AS agencyID,
        verified,
        accepting,
        ave_rating AS aveRating,
        total_reviews AS totalReviews,
        review_count AS reviewCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
    FROM
        Provider;
END;

-- Get provider by provider_id
DROP PROCEDURE IF EXISTS `get_provider`;
CREATE PROCEDURE `get_provider`(
    IN `provID` VARCHAR(14)
)
BEGIN
    SELECT
        provider_id AS providerId,
        first_name AS firstName,
        last_name AS lastName,
        birthdate,
        gender,
        provider_dp AS providerDp,
        valid_id AS validId,
        agency_id AS agencyID,
        verified,
        accepting,
        ave_rating AS aveRating,
        total_reviews AS totalReviews,
        review_count AS reviewCount,
        five_star AS fiveStar,
        four_star AS fourStar,
        three_star AS threeStar,
        two_star AS twoStar,
        one_star AS oneStar
    FROM
        Provider
    WHERE
        provider_id = provID;
END;

-- Concurrently update ave_rating, total_reviews, review_count, five_star, four_star, three_star, two_star, one_star
DROP PROCEDURE IF EXISTS `concurrent_updates_provider`;
CREATE PROCEDURE `concurrent_updates_provider`(
    IN `provID` VARCHAR(14),
    IN `rating` INT,
    IN `mult` INT
)
BEGIN
    DECLARE current_ave_rating FLOAT;
    DECLARE current_total_reviews INT;
    DECLARE current_review_count INT;
    DECLARE current_five_star INT;
    DECLARE current_four_star INT;
    DECLARE current_three_star INT;
    DECLARE current_two_star INT;
    DECLARE current_one_star INT;

    IF rating >= 1 AND rating <= 5 THEN
        START TRANSACTION;

        SELECT ave_rating, total_reviews, review_count, five_star, four_star, three_star, two_star, one_star
        INTO current_ave_rating, current_total_reviews, current_review_count,
            current_five_star, current_four_star, current_three_star, current_two_star, current_one_star
        FROM Provider
        WHERE provider_id = provID;

        UPDATE Provider
        SET ave_rating = (
            CASE
                WHEN current_review_count + mult = 0 THEN 0
                ELSE (current_total_reviews + (rating * mult)) / (current_review_count + mult)
            END
        ),
        total_reviews = current_total_reviews + (rating * mult),
        review_count = current_review_count + mult,
        five_star = CASE WHEN rating = 5 THEN current_five_star + mult ELSE current_five_star END,
        four_star = CASE WHEN rating = 4 THEN current_four_star + mult ELSE current_four_star END,
        three_star = CASE WHEN rating = 3 THEN current_three_star + mult ELSE current_three_star END,
        two_star = CASE WHEN rating = 2 THEN current_two_star + mult ELSE current_two_star END,
        one_star = CASE WHEN rating = 1 THEN current_one_star + mult ELSE current_one_star END
        WHERE provider_id = provID;

        COMMIT;
    END IF;
END;
