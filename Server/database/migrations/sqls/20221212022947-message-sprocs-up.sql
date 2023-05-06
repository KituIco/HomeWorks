-- Create new message
DROP PROCEDURE IF EXISTS `create_message`;
CREATE PROCEDURE `create_message`(
    IN `msgID` VARCHAR(14),
    IN `bkngID` VARCHAR(14),
    IN `usrID` VARCHAR(14),
    IN `dateTS` BIGINT,
    IN `msg` TEXT,
    IN `images` TEXT
)
BEGIN
    INSERT INTO
        Message(
            message_id,
            booking_id,
            user_id,
            date_timestamp,
            message,
            images
        )
    VALUES(
        msgID,
        bkngID,
        usrID,
        dateTS,
        msg,
        images
    );
END;

-- Patch existing message by message_id
DROP PROCEDURE IF EXISTS `patch_message`;
CREATE PROCEDURE `patch_message`(
    IN `msgID` VARCHAR(14),
    IN `bkngID` VARCHAR(14),
    IN `usrID` VARCHAR(14),
    IN `dateTS` BIGINT,
    IN `msg` TEXT,
    IN `images` TEXT
)
BEGIN
    UPDATE
        Message
    SET
        booking_id = COALESCE(bkngID, booking_id),
        user_id = COALESCE(usrID, user_id),
        date_timestamp = COALESCE(dateTS, date_timestamp),
        message = COALESCE(msg, message),
        images = COALESCE(images, images)
    WHERE
        message_id = msgID;
END;

-- Delete existing message by message_id
DROP PROCEDURE IF EXISTS `delete_message`;
CREATE PROCEDURE `delete_message`(
    IN `msgID` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Message
    WHERE
        message_id = msgID;
END;

-- Get all messages
DROP PROCEDURE IF EXISTS `get_messages`;
CREATE PROCEDURE `get_messages`()
BEGIN
    SELECT
        message_id AS messageID,
        booking_id AS bookingID,
        user_id AS userID,
        date_timestamp AS dateTimestamp,
        message,
        images
    FROM
        Message;
END;

-- Get all messages by booking_id
DROP PROCEDURE IF EXISTS `get_booking_messages`;
CREATE PROCEDURE `get_booking_messages`(
    IN `bkngID` VARCHAR(14)
)
BEGIN
    SELECT
        message_id AS messageID,
        booking_id AS bookingID,
        user_id AS userID,
        date_timestamp AS dateTimestamp,
        message,
        images
    FROM
        Message
    WHERE
        booking_id = bkngID
    ORDER BY
        date_timestamp ASC;
END;

-- Get all messages containing keyword in particular booking
DROP PROCEDURE IF EXISTS `get_booking_messages_by_keyword`;
CREATE PROCEDURE `get_booking_messages_by_keyword`(
    IN `bkngID` VARCHAR(14),
    IN `keyword` VARCHAR(128)
)
BEGIN
    SELECT
        message_id AS messageID,
        booking_id AS bookingID,
        user_id AS userID,
        date_timestamp AS dateTimestamp,
        message,
        images
    FROM
        Message
    WHERE
        booking_id = bkngID
        AND message LIKE CONCAT('%', keyword, '%');
END;

-- Get message by message_id
DROP PROCEDURE IF EXISTS `get_message`;
CREATE PROCEDURE `get_message`(
    IN `msgID` VARCHAR(14)
)
BEGIN
    SELECT
        message_id AS messageID,
        booking_id AS bookingID,
        user_id AS userID,
        date_timestamp AS dateTimestamp,
        message,
        images
    FROM
        Message
    WHERE
        message_id = msgID;
END;