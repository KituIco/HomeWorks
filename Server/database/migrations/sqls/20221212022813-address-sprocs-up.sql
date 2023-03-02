-- Create new address
DROP PROCEDURE IF EXISTS create_address;
CREATE PROCEDURE create_address(
    IN addID VARCHAR(14),
    IN usrID VARCHAR(14),
    IN usrFullName VARCHAR(128),
    IN usrNum VARCHAR(20),
    IN reg VARCHAR(50),
    IN prov VARCHAR(25),
    IN ct VARCHAR(25),
    IN brgy VARCHAR(30),
    IN zip VARCHAR(6),
    IN street VARCHAR(25),
    IN untNum VARCHAR(6),
    IN dflt TINYINT
)
BEGIN
    INSERT INTO 
        Address(
            address_id, 
            user_id, 
            user_full_name, 
            user_num, 
            region, 
            province, 
            city, 
            barangay, 
            postal_code, 
            street_name, 
            unit_num, 
            is_default
        )
    VALUES(
        addID, 
        usrID, 
        usrFullName, 
        usrNum, 
        reg, 
        prov, 
        ct, 
        brgy, 
        zip, 
        street, 
        untNum, 
        dflt
    );
END;

-- Patch existing address by address_id
DROP PROCEDURE IF EXISTS patch_address;
CREATE PROCEDURE patch_address(
    IN addID VARCHAR(14),
    IN usrID VARCHAR(14),
    IN usrFullName VARCHAR(128),
    IN usrNum VARCHAR(20),
    IN reg VARCHAR(50),
    IN prov VARCHAR(25),
    IN ct VARCHAR(25),
    IN brgy VARCHAR(30),
    IN zip VARCHAR(6),
    IN street VARCHAR(25),
    IN untNum VARCHAR(6),
    IN dflt TINYINT
)
BEGIN
    UPDATE
        Address
    SET
        user_id = COALESCE(usrID, user_id),
        user_full_name = COALESCE(usrFullName, user_full_name),
        user_num = COALESCE(usrNum, user_num),
        region = COALESCE(reg, region),
        province = COALESCE(prov, province),
        city = COALESCE(ct, city),
        barangay = COALESCE(brgy, barangay),
        postal_code = COALESCE(zip, postal_code),
        street_name = COALESCE(street, street_name),
        unit_num = COALESCE(untNum, unit_num),
        is_default = COALESCE(dflt, is_default)
    WHERE
        address_id = addID;
END;

-- Delete address by address_id
DROP PROCEDURE IF EXISTS delete_address;
CREATE PROCEDURE delete_address(
    IN addID VARCHAR(14)
)
BEGIN
    DELETE FROM
        Address
    WHERE
        address_id = addID;
END;

-- Set address to default by address_id
DROP PROCEDURE IF EXISTS set_address_default;
CREATE PROCEDURE set_address_default(
    IN addID VARCHAR(14),
    IN usrID VARCHAR(14)
)
BEGIN
    UPDATE
        Address
    SET
        is_default = 0
    WHERE
        user_id = usrID;
    UPDATE
        Address
    SET
        is_default = 1
    WHERE
        address_id = addID;
END;

-- Get all address in database
DROP PROCEDURE IF EXISTS get_all_address;
CREATE PROCEDURE get_all_address()
BEGIN
    SELECT
        address_id AS addressID,
        user_id AS userID,
        user_full_name AS userFullName,
        user_num AS userNum,
        region,
        province,
        city,
        barangay,
        postal_code AS postalCode,
        street_name AS streetName,
        unit_num AS unitNum,
        is_default AS isDefault
    FROM
        Address;
END;

-- Get all address of particulr user
DROP PROCEDURE IF EXISTS get_all_address_of_user;
CREATE PROCEDURE get_all_address_of_user(
    IN usrID VARCHAR(14)
)
BEGIN
    SELECT
        address_id AS addressID,
        user_id AS userID,
        user_full_name AS userFullName,
        user_num AS userNum,
        region,
        province,
        city,
        barangay,
        postal_code AS postalCode,
        street_name AS streetName,
        unit_num AS unitNum,
        is_default AS isDefault
    FROM
        Address
    WHERE
        user_id = usrID;
END;

-- Get particular address by address_id
DROP PROCEDURE IF EXISTS get_address_by_id;
CREATE PROCEDURE get_address_by_id(
    IN addID VARCHAR(14)
)
BEGIN
    SELECT
        address_id AS addressID,
        user_id AS userID,
        user_full_name AS userFullName,
        user_num AS userNum,
        region,
        province,
        city,
        barangay,
        postal_code AS postalCode,
        street_name AS streetName,
        unit_num AS unitNum,
        is_default AS isDefault
    FROM
        Address
    WHERE
        address_id = addID;
END;