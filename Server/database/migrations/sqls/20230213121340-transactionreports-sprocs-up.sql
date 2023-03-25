-- Create new transaction report
DROP PROCEDURE IF EXISTS `create_transaction_report`;
CREATE PROCEDURE `create_transaction_report`(
    IN `rprt_id` VARCHAR(14),
    IN `bkng_id` VARCHAR(14),
    IN `pment_id` VARCHAR(14),
    IN `spcs_id` VARCHAR(14),
    IN `seker_id` VARCHAR(14),
    IN `prov_id` VARCHAR(14),
    IN `srvc_id` VARCHAR(14),
    IN `revw_id` VARCHAR(14),
    IN `stat` INT
)
BEGIN
    INSERT INTO
        TransactionReports(
            report_id,
            booking_id,
            payment_id,
            specs_id,
            seeker_id,
            provider_id,
            service_id,
            review_id,
            transaction_stat
        )
    VALUES(
        rprt_id,
        bkng_id,
        pment_id,
        spcs_id,
        seker_id,
        prov_id,
        srvc_id,
        revw_id,
        stat
    );
END;

-- Patch existing transaction report by report_id
DROP PROCEDURE IF EXISTS `patch_transaction_report`;
CREATE PROCEDURE `patch_transaction_report`(
    IN `rprt_id` VARCHAR(14),
    IN `bkng_id` VARCHAR(14),
    IN `pment_id` VARCHAR(14),
    IN `spcs_id` VARCHAR(14),
    IN `seker_id` VARCHAR(14),
    IN `prov_id` VARCHAR(14),
    IN `srvc_id` VARCHAR(14),
    IN `revw_id` VARCHAR(14),
    IN `stat` INT
)
BEGIN
    UPDATE
        TransactionReports
    SET
        booking_id = COALESCE(bkng_id, booking_id),
        payment_id = COALESCE(pment_id, payment_id),
        specs_id = COALESCE(spcs_id, specs_id),
        seeker_id = COALESCE(seker_id, seeker_id),
        provider_id = COALESCE(prov_id, provider_id),
        service_id = COALESCE(srvc_id, service_id),
        review_id = COALESCE(revw_id, review_id),
        transaction_stat = COALESCE(stat, transaction_stat)
    WHERE
        report_id = rprt_id;
END;

-- Delete existing transaction report by report_id
DROP PROCEDURE IF EXISTS `delete_transaction_report`;
CREATE PROCEDURE `delete_transaction_report`(
    IN `rprt_id` VARCHAR(14)
)
BEGIN
    DELETE FROM
        TransactionReports
    WHERE
        report_id = rprt_id;
END;

-- Get all transaction reports
DROP PROCEDURE IF EXISTS `get_transaction_reports`;
CREATE PROCEDURE `get_transaction_reports`()
BEGIN
    SELECT
        report_id AS reportID,
        booking_id AS bookingID,
        payment_id AS paymentID,
        specs_id AS specsID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        review_id AS reviewID,
        transaction_stat AS transactionStat
    FROM
        TransactionReports;
END;

-- Get all transaction reports by seeker_id
DROP PROCEDURE IF EXISTS `get_transaction_reports_by_seeker_id`;
CREATE PROCEDURE `get_transaction_reports_by_seeker_id`(
    IN `seker_id` VARCHAR(14)
)
BEGIN
    SELECT
        report_id AS reportID,
        booking_id AS bookingID,
        payment_id AS paymentID,
        specs_id AS specsID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        review_id AS reviewID,
        transaction_stat AS transactionStat
    FROM
        TransactionReports
    WHERE
        seeker_id = seker_id;
END;

-- Get all transaction reports by provider_id
DROP PROCEDURE IF EXISTS `get_transaction_reports_by_provider_id`;
CREATE PROCEDURE `get_transaction_reports_by_provider_id`(
    IN `prov_id` VARCHAR(14)
)
BEGIN
    SELECT
        report_id AS reportID,
        booking_id AS bookingID,
        payment_id AS paymentID,
        specs_id AS specsID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        review_id AS reviewID,
        transaction_stat AS transactionStat
    FROM
        TransactionReports
    WHERE
        provider_id = prov_id;
END;

-- Get all transaction reports by service_id
DROP PROCEDURE IF EXISTS `get_transaction_reports_by_service_id`;
CREATE PROCEDURE `get_transaction_reports_by_service_id`(
    IN `srvc_id` VARCHAR(14)
)
BEGIN
    SELECT
        report_id AS reportID,
        booking_id AS bookingID,
        payment_id AS paymentID,
        specs_id AS specsID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        review_id AS reviewID,
        transaction_stat AS transactionStat
    FROM
        TransactionReports
    WHERE
        service_id = srvc_id;
END;

-- Get all transaction reports by keywords
DROP PROCEDURE IF EXISTS `get_transaction_reports_by_keywords`;
CREATE PROCEDURE `get_transaction_reports_by_keywords`(
    IN `keywds` VARCHAR(255)
)
BEGIN
    SELECT DISTINCT
        TransactionReports.report_id AS reportID,
        TransactionReports.booking_id AS bookingID,
        TransactionReports.payment_id AS paymentID,
        TransactionReports.specs_id AS specsID,
        TransactionReports.seeker_id AS seekerID,
        TransactionReports.provider_id AS providerID,
        TransactionReports.service_id AS serviceID,
        TransactionReports.review_id AS reviewID,
        TransactionReports.transaction_stat AS transactionStat
    FROM
        TransactionReports
        INNER JOIN 
        Booking ON TransactionReports.booking_id = Booking.booking_id
        INNER JOIN
        Provider ON TransactionReports.provider_id = Provider.provider_id
        INNER JOIN
        Service ON TransactionReports.service_id = Service.service_id
    WHERE
        Booking.booking_id LIKE CONCAT('%', keywds, '%') 
            OR
        Service.type_name LIKE CONCAT('%', keywds, '%')
            OR
        Provider.first_name LIKE CONCAT('%', keywds, '%')
            OR
        Provider.last_name LIKE CONCAT('%', keywds, '%');
END;

-- Get all transaction reports by date range

-- Get all transaction reports sorted by date range

-- Get all transaction reports by status code
DROP PROCEDURE IF EXISTS `get_transaction_reports_by_status_code`;
CREATE PROCEDURE `get_transaction_reports_by_status_code`(
    IN `stat` INT
)
BEGIN
    SELECT
        report_id AS reportID,
        booking_id AS bookingID,
        payment_id AS paymentID,
        specs_id AS specsID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        review_id AS reviewID,
        transaction_stat AS transactionStat
    FROM
        TransactionReports
    WHERE
        transaction_stat = stat;
END;

-- Get particular transaction report by transaction_id
DROP PROCEDURE IF EXISTS `get_transaction_report_by_id`;
CREATE PROCEDURE `get_transaction_report_by_id`(
    IN `rep_id` VARCHAR(14)
)
BEGIN
    SELECT
        report_id AS reportID,
        booking_id AS bookingID,
        payment_id AS paymentID,
        specs_id AS specsID,
        seeker_id AS seekerID,
        provider_id AS providerID,
        service_id AS serviceID,
        review_id AS reviewID,
        transaction_stat AS transactionStat
    FROM
        TransactionReports
    WHERE
        report_id = rep_id;
END;