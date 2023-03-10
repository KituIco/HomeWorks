-- Create new address
DROP PROCEDURE IF EXISTS create_address;
CREATE PROCEDURE create_address(
    IN addID VARCHAR(14),
    IN usrID VARCHAR(14),
    IN usrFullName VARCHAR(128),
    IN usrNum VARCHAR(20),
    IN lat DOUBLE,
    IN lon DOUBLE,
    IN ct VARCHAR(25),
    IN cntry VARCHAR(60),
    IN dstrct VARCHAR(90),
    IN isoCntryCode VARCHAR(3),
    IN nem VARCHAR(90),
    IN zip VARCHAR(6),
    IN reg VARCHAR(50),
    IN strt VARCHAR(50),
    IN strtNum VARCHAR(10),
    IN subReg VARCHAR(50),
    IN tzone VARCHAR(50),
    IN dflt TINYINT
)
BEGIN
    INSERT INTO 
        Address(
            address_id, 
            user_id, 
            user_full_name, 
            user_num, 
            latitude,
            longitude,
            city,
            country,
            district,
            iso_country_code,
            name,
            postal_code,
            region,
            street,
            street_number,
            sub_region,
            time_zone,
            is_default
        )
    VALUES(
        addID, 
        usrID, 
        usrFullName, 
        usrNum, 
        lat,
        lon,
        ct,
        cntry,
        dstrct,
        isoCntryCode,
        nem,
        zip,
        reg,
        strt,
        strtNum,
        subReg,
        tzone,
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
    IN lat DOUBLE,
    IN lon DOUBLE,
    IN ct VARCHAR(25),
    IN cntry VARCHAR(60),
    IN dstrct VARCHAR(90),
    IN isoCntryCode VARCHAR(3),
    IN nem VARCHAR(90),
    IN zip VARCHAR(6),
    IN reg VARCHAR(50),
    IN strt VARCHAR(50),
    IN strtNum VARCHAR(10),
    IN subReg VARCHAR(50),
    IN tzone VARCHAR(50),
    IN dflt TINYINT
)
BEGIN
    UPDATE
        Address
    SET
        user_id = COALESCE(usrID, user_id),
        user_full_name = COALESCE(usrFullName, user_full_name),
        user_num = COALESCE(usrNum, user_num),
        latitude = COALESCE(lat, latitude),
        longitude = COALESCE(lon, longitude),
        city = COALESCE(ct, city),
        country = COALESCE(cntry, country),
        district = COALESCE(dstrct, district),
        iso_country_code = COALESCE(isoCntryCode, iso_country_code),
        name = COALESCE(nem, name),
        postal_code = COALESCE(zip, postal_code),
        region = COALESCE(reg, region),
        street = COALESCE(strt, street),
        street_number = COALESCE(strtNum, street_number),
        sub_region = COALESCE(subReg, sub_region),
        time_zone = COALESCE(tzone, time_zone),
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
        latitude,
        longitude,
        city,
        country,
        district,
        iso_country_code AS isoCountryCode,
        name,
        postal_code AS postalCode,
        region,
        street,
        street_number AS streetNumber,
        sub_region as subRegion,
        time_zone as timeZone,
        is_default as isDefault
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
        latitude,
        longitude,
        city,
        country,
        district,
        iso_country_code AS isoCountryCode,
        name,
        postal_code AS postalCode,
        region,
        street,
        street_number AS streetNumber,
        sub_region as subRegion,
        time_zone as timeZone,
        is_default as isDefault
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
        latitude,
        longitude,
        city,
        country,
        district,
        iso_country_code AS isoCountryCode,
        name,
        postal_code AS postalCode,
        region,
        street,
        street_number AS streetNumber,
        sub_region as subRegion,
        time_zone as timeZone,
        is_default as isDefault
    FROM
        Address
    WHERE
        address_id = addID;
END;

-- Get default addresses of all providers
DROP PROCEDURE IF EXISTS get_all_default_provider_address;
CREATE PROCEDURE get_all_default_provider_address()
BEGIN
    SELECT DISTINCT
        Address.address_id AS addressID,
        Address.user_id AS userID,
        Address.user_full_name AS userFullName,
        Address.user_num AS userNum,
        Address.latitude AS latitude,
        Address.longitude AS longitude,
        Address.city AS city,
        Address.country AS country,
        Address.district AS district,
        Address.iso_country_code AS isoCountryCode,
        Address.name AS name,
        Address.postal_code AS postalCode,
        Address.region AS region,
        Address.street AS street,
        Address.street_number AS streetNumber,
        Address.sub_region as subRegion,
        Address.time_zone as timeZone,
        Address.is_default as isDefault
    FROM
        Address
            INNER JOIN
        Provider ON Address.user_id = Provider.provider_id
    WHERE
        Address.is_default = 1;
END;

-- Get default addresses of all seekers
DROP PROCEDURE IF EXISTS get_all_default_seeker_address;
CREATE PROCEDURE get_all_default_seeker_address()
BEGIN
    SELECT DISTINCT
        Address.address_id AS addressID,
        Address.user_id AS userID,
        Address.user_full_name AS userFullName,
        Address.user_num AS userNum,
        Address.latitude AS latitude,
        Address.longitude AS longitude,
        Address.city AS city,
        Address.country AS country,
        Address.district AS district,
        Address.iso_country_code AS isoCountryCode,
        Address.name AS name,
        Address.postal_code AS postalCode,
        Address.region AS region,
        Address.street AS street,
        Address.street_number AS streetNumber,
        Address.sub_region as subRegion,
        Address.time_zone as timeZone,
        Address.is_default as isDefault
    FROM
        Address
            INNER JOIN
        Seeker ON Address.user_id = Seeker.seeker_id
    WHERE
        Address.is_default = 1;
END;