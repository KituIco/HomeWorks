-- Create new user
DROP PROCEDURE IF EXISTS `create_user`;
CREATE PROCEDURE `create_user`(
    IN `usr_id` VARCHAR(14)
)
BEGIN
    INSERT INTO
        User(
            user_id
        )
    VALUES(
        usr_id
    );
END;

-- Delete existing user via user_id
DROP PROCEDURE IF EXISTS `delete_user`;
CREATE PROCEDURE `delete_user`(
    IN `usr_id` VARCHAR(14)
)
BEGIN
    DELETE FROM
        User
    WHERE
        user_id = usr_id;
END;