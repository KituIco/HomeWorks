/* Replace with your SQL commands */
-- DROP TABLE IF EXISTS `User`;
CREATE TABLE IF NOT EXISTS `User`(
    `user_id` VARCHAR(14) NOT NULL,
    PRIMARY KEY (`user_id`)
);

-- DROP TABLE IF EXISTS `Agency`;
CREATE TABLE IF NOT EXISTS `Agency`(
    `agency_id` VARCHAR(14) NOT NULL,
    `agency_name` VARCHAR(128) NOT NULL,
    `agency_desc` TEXT,
    `agency_dp` VARCHAR(255),
    `agency_images` TEXT,
    `agency_service_types` VARCHAR(255),
    `agency_rating` FLOAT,
    PRIMARY KEY (`agency_id`)
);

-- DROP TABLE IF EXISTS `Seeker`;
CREATE TABLE IF NOT EXISTS `Seeker`(
    `seeker_id` VARCHAR(14) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `birthdate` VARCHAR(30),
    `gender` VARCHAR(10),
    `seeker_dp` VARCHAR(255),
    PRIMARY KEY (`seeker_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES User(`user_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Provider`;
CREATE TABLE IF NOT EXISTS `Provider`(
    `provider_id` VARCHAR(14) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `birthdate` VARCHAR(30),
    `gender` VARCHAR(10),
    `provider_dp` VARCHAR(255),
    `valid_id` VARCHAR(255),
    `agency_id` VARCHAR(14),
    `verified` TINYINT,
    `accepting` TINYINT,
    `ave_rating` FLOAT,
    `total_reviews` INT,
    `review_count` INT,
    `five_star` INT,
    `four_star` INT,
    `three_star` INT,
    `two_star` INT,
    `one_star` INT,
    PRIMARY KEY (`provider_id`),
    FOREIGN KEY (`provider_id`) REFERENCES User(`user_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Admin`;
CREATE TABLE IF NOT EXISTS `Admin` (
    `admin_id` VARCHAR(14) NOT NULL,
    PRIMARY KEY (`admin_id`),
    FOREIGN KEY (`admin_id`) REFERENCES User(`user_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Credentials`;
CREATE TABLE IF NOT EXISTS `Credentials`(
    `credentials_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `identifier` VARCHAR(320) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`credentials_id`),
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Certificate`;
CREATE TABLE IF NOT EXISTS `Certificate`(
    `certificate_id` VARCHAR(14) NOT NULL,
    `provider_id` VARCHAR(14) NOT NULL,
    `certificate_name` VARCHAR(50) NOT NULL,
    `file_attached` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`certificate_id`),
    FOREIGN KEY (`provider_id`) REFERENCES Provider(`provider_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `ServiceType`;
CREATE TABLE IF NOT EXISTS `ServiceType`(
    `type_id` VARCHAR(14) NOT NULL,
    `type_name` VARCHAR(50) NOT NULL,
    `type_desc` TEXT NOT NULL,
    `min_service_cost` DECIMAL(10,2),
    PRIMARY KEY (`type_id`)
);

-- DROP TABLE IF EXISTS `Service`;
CREATE TABLE IF NOT EXISTS `Service`(
    `service_id` VARCHAR(14) NOT NULL,
    `provider_id` VARCHAR(14) NOT NULL,
    `type_id` VARCHAR(14) NOT NULL,
    `type_name` VARCHAR(50) NOT NULL,
    `initial_cost` DECIMAL(10,2),
    `service_enabled` TINYINT,
    `service_rating` FLOAT,
    `total_reviews` INT,
    `reviews_count` INT,
    `five_star` INT,
    `four_star` INT,
    `three_star` INT,
    `two_star` INT,
    `one_star` INT,
    PRIMARY KEY (`service_id`),
    FOREIGN KEY (`provider_id`) REFERENCES Provider(`provider_id`) ON DELETE CASCADE,
    FOREIGN KEY (`type_id`) REFERENCES ServiceType(`type_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Portfolio`;
CREATE TABLE IF NOT EXISTS `Portfolio`(
    `portfolio_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `images` TEXT,
    `portfolio_description` TEXT,
    `project_price` DECIMAL(10,2),
    PRIMARY KEY (`portfolio_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Review`;
CREATE TABLE IF NOT EXISTS `Review`(
    `review_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `date_timestamp` BIGINT NOT NULL,
    `rating` FLOAT NOT NULL,
    `comment` TEXT,
    `images` TEXT,
    PRIMARY KEY (`review_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`) ON DELETE CASCADE,
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `ServiceSpecs`;
CREATE TABLE IF NOT EXISTS `ServiceSpecs`(
    `specs_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `type_id` VARCHAR(14) NOT NULL,
    `address_id` VARCHAR(14),
    `referenced_id` TEXT,
    `specs_desc` TEXT,
    `images` TEXT,
    `specs_status` INT,
    `specs_timestamp` BIGINT,
    PRIMARY KEY (`specs_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Booking`;
CREATE TABLE IF NOT EXISTS `Booking`(
    `booking_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `booking_status` INT,
    `date_timestamp` BIGINT,
    `description` TEXT,
    `cost` DECIMAL(10,2),
    `specs_id` VARCHAR(14),
    PRIMARY KEY (`booking_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`) ON DELETE CASCADE,
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Payment`;
CREATE TABLE IF NOT EXISTS `Payment`(
    `payment_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `provider_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `payment_method` INT,
    `amount` DECIMAL(10,2),
    `payment_status` INT,
    PRIMARY KEY (`payment_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`) ON DELETE CASCADE,
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `TransactionReports`;
CREATE TABLE IF NOT EXISTS `TransactionReports`(
    `report_id` VARCHAR(14) NOT NULL,
    `booking_id` VARCHAR(14) NOT NULL,
    `payment_id` VARCHAR(14) NOT NULL,
    `specs_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `provider_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `review_id` VARCHAR(14),
    `transaction_stat` INT,
    PRIMARY KEY (`report_id`),
    FOREIGN KEY (`booking_id`) REFERENCES Booking(`booking_id`) ON DELETE CASCADE,
    FOREIGN KEY (`payment_id`) REFERENCES Payment(`payment_id`) ON DELETE CASCADE,
    FOREIGN KEY (`specs_id`) REFERENCES ServiceSpecs(`specs_id`) ON DELETE CASCADE,
    FOREIGN KEY (`provider_id`) REFERENCES Provider(`provider_id`) ON DELETE CASCADE,
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`) ON DELETE CASCADE,
    FOREIGN KEY (`review_id`) REFERENCES Review(`review_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `CardPayment`;
CREATE TABLE IF NOT EXISTS `CardPayment`(
    `card_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `card_num` VARCHAR(16) NOT NULL,
    `expiry_date` BIGINT NOT NULL,
    `cvv` VARCHAR(4) NOT NULL,
    `merchant` VARCHAR(30),
    `card_type` TINYINT NOT NULL,
    PRIMARY KEY (`card_id`),
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Address`;
CREATE TABLE IF NOT EXISTS `Address`(
    `address_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `user_full_name` VARCHAR(128) NOT NULL,
    `user_num` VARCHAR(20) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `city` VARCHAR(25),
    `country` VARCHAR(60),
    `district` VARCHAR(90),
    `iso_country_code` VARCHAR(3),
    `name` VARCHAR(90),
    `postal_code` VARCHAR(6),
    `region` VARCHAR(50),
    `street` VARCHAR(50),
    `street_number` VARCHAR(10),
    `sub_region` VARCHAR(50),
    `time_zone` VARCHAR(50),
    `is_default` TINYINT NOT NULL,
    PRIMARY KEY (`address_id`),
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`) ON DELETE CASCADE
);

-- DROP TABLE IF EXISTS `Message`;
CREATE TABLE IF NOT EXISTS `Message`(
    `message_id` VARCHAR(14) NOT NULL,
    `booking_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `date_timestamp` BIGINT NOT NULL,
    `message` TEXT,
    `images` TEXT,
    PRIMARY KEY (`message_id`),
    FOREIGN KEY (`booking_id`) REFERENCES Booking(`booking_id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`) ON DELETE CASCADE
);