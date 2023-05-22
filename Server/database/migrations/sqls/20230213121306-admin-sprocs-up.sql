-- Create new admin
DROP PROCEDURE IF EXISTS `create_admin`;
CREATE PROCEDURE `create_admin`(
    IN `admn_id` VARCHAR(14)
)
BEGIN
    INSERT INTO
        Admin(
            admin_id
        )
    VALUES(
        admn_id
    );
END;

-- Delete existing admin by admin_id
DROP PROCEDURE IF EXISTS `delete_admin`;
CREATE PROCEDURE `delete_admin`(
    IN `admn_id` VARCHAR(14)
)
BEGIN
    DELETE FROM
        Admin
    WHERE
        admin_id = admn_id;
    DELETE FROM
        User
    WHERE
        user_id = admn_id;
END;