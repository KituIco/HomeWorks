-- Create new booking
DROP PROCEDURE IF EXISTS create_booking;
CREATE PROCEDURE create_booking(
    IN bkingID VARCHAR(14),
    IN skerID VARCHAR(14),
    IN srviceID VARCHAR(14),
    IN bkingStatus INT,
    IN dtTimestamp BIGINT,
    IN descrpt TEXT,
    IN cst DECIMAL(10,2),
    IN spcsID VARCHAR(14)
)
BEGIN
    INSERT INTO 
        Booking(
            booking_id, 
            seeker_id, 
            service_id, 
            booking_status, 
            date_timestamp,
            description,
            cost,
            specs_id
        )
    VALUES(
        bkingID, 
        skerID, 
        srviceID, 
        bkingStatus, 
        dtTimestamp,
        descrpt,
        cst,
        spcsID
    );
END;

-- Patch existing booking by booking_id
DROP PROCEDURE IF EXISTS patch_booking;
CREATE PROCEDURE patch_booking(
    IN bkingID VARCHAR(14),
    IN skerID VARCHAR(14),
    IN srviceID VARCHAR(14),
    IN bkingStatus INT,
    IN dtTimestamp BIGINT,
    IN descrpt TEXT,
    IN cst DECIMAL(10,2),
    IN spcsID VARCHAR(14)
)
BEGIN
    UPDATE 
        Booking
    SET
        seeker_id = COALESCE(skerID, seeker_id),
        service_id = COALESCE(srviceID, service_id),
        booking_status = COALESCE(bkingStatus, booking_status),
        date_timestamp = COALESCE(dtTimestamp, date_timestamp),
        description = COALESCE(descrpt, description),
        cost = COALESCE(cst, cost),
        specs_id = COALESCE(spcsID, specs_id)
    WHERE 
        booking_id = bkingID;
END;

-- Delete booking by booking_id
DROP PROCEDURE IF EXISTS delete_booking;
CREATE PROCEDURE delete_booking(
    IN bkingID VARCHAR(14)
)
BEGIN
    DELETE FROM 
        Booking
    WHERE 
        booking_id = bkingID;
END;

-- Get all bookings
DROP PROCEDURE IF EXISTS get_all_bookings;
CREATE PROCEDURE get_all_bookings()
BEGIN
    SELECT 
        booking_id AS bookingID,
        seeker_id AS seekerID,
        service_id AS serviceID,
        booking_status AS bookingStatus,
        date_timestamp AS dateTimestamp,
        description,
        cost,
        specs_id AS specsID
    FROM 
        Booking;
END;

-- Get all bookings by service seeker
DROP PROCEDURE IF EXISTS get_seeker_bookings;
CREATE PROCEDURE get_seeker_bookings(
    IN skerID VARCHAR(14)
)
BEGIN
    SELECT 
        booking_id AS bookingID,
        seeker_id AS seekerID,
        service_id AS serviceID,
        booking_status AS bookingStatus,
        date_timestamp AS dateTimestamp,
        description,
        cost,
        specs_id AS specsID
    FROM 
        Booking
    WHERE 
        seeker_id = skerID;
END;

-- Get all bookings by service provider
DROP PROCEDURE IF EXISTS get_provider_bookings;
CREATE PROCEDURE get_provider_bookings(
    IN prviderID VARCHAR(14)
)
BEGIN
    SELECT DISTINCT
        Booking.booking_id AS bookingID,
        Booking.seeker_id AS seekerID,
        Booking.service_id AS serviceID,
        Booking.booking_status AS bookingStatus,
        Booking.date_timestamp AS dateTimestamp,
        Booking.description,
        Booking.cost,
        Booking.specs_id AS specsID
    FROM 
        Booking 
            INNER JOIN
        Service 
            ON Booking.service_id = Service.service_id
    WHERE 
        Service.provider_id = prviderID
    ORDER BY
        Booking.date_timestamp DESC;
END;

-- Get booking by booking_id
DROP PROCEDURE IF EXISTS get_booking_by_id;
CREATE PROCEDURE get_booking_by_id(
    IN bkingID VARCHAR(14)
)
BEGIN
    SELECT 
        booking_id AS bookingID,
        seeker_id AS seekerID,
        service_id AS serviceID,
        booking_status AS bookingStatus,
        date_timestamp AS dateTimestamp,
        description,
        cost,
        specs_id AS specsID
    FROM 
        Booking
    WHERE 
        booking_id = bkingID;
END;