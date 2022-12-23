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
    `agency_images` VARCHAR(255),
    `agency_rating` FLOAT,
    PRIMARY KEY (`agency_id`)
);

-- DROP TABLE IF EXISTS `Seeker`;
CREATE TABLE IF NOT EXISTS `Seeker`(
    `seeker_id` VARCHAR(14) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `birthdate` BIGINT NOT NULL,
    `gender` VARCHAR(10),
    `seeker_dp` VARCHAR(255),
    PRIMARY KEY (`seeker_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES User(`user_id`)
);

-- DROP TABLE IF EXISTS `Provider`;
CREATE TABLE IF NOT EXISTS `Provider`(
    `provider_id` VARCHAR(14) NOT NULL,
    `first_name` VARCHAR(64) NOT NULL,
    `last_name` VARCHAR(64) NOT NULL,
    `birthdate` BIGINT NOT NULL,
    `gender` VARCHAR(10),
    `provider_dp` VARCHAR(255),
    `valid_id` VARCHAR(255),
    `agency_id` VARCHAR(14),
    `verified` TINYINT,
    `ave_rating` FLOAT,
    PRIMARY KEY (`provider_id`),
    FOREIGN KEY (`provider_id`) REFERENCES User(`user_id`),
    FOREIGN KEY (`agency_id`) REFERENCES Agency(`agency_id`)
);

-- DROP TABLE IF EXISTS `Credentials`;
CREATE TABLE IF NOT EXISTS `Credentials`(
    `credentials_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `identifier` VARCHAR(320) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    PRIMARY KEY (`credentials_id`),
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`)
);

-- DROP TABLE IF EXISTS `Certificate`;
CREATE TABLE IF NOT EXISTS `Certificate`(
    `certificate_id` VARCHAR(14) NOT NULL,
    `provider_id` VARCHAR(14) NOT NULL,
    `certificate_name` VARCHAR(50) NOT NULL,
    `file_attached` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`certificate_id`),
    FOREIGN KEY (`provider_id`) REFERENCES Provider(`provider_id`)
);

-- DROP TABLE IF EXISTS `ServiceType`;
CREATE TABLE IF NOT EXISTS `ServiceType`(
    `type_id` VARCHAR(14) NOT NULL,
    `type_name` VARCHAR(50) NOT NULL,
    `type_desc` TEXT NOT NULL,
    PRIMARY KEY (`type_id`)
);

-- DROP TABLE IF EXISTS `Service`;
CREATE TABLE IF NOT EXISTS `Service`(
    `service_id` VARCHAR(14) NOT NULL,
    `provider_id` VARCHAR(14) NOT NULL,
    `type_id` VARCHAR(14) NOT NULL,
    `initial_cost` FLOAT,
    `service_rating` FLOAT,
    PRIMARY KEY (`service_id`),
    FOREIGN KEY (`provider_id`) REFERENCES Provider(`provider_id`),
    FOREIGN KEY (`type_id`) REFERENCES ServiceType(`type_id`)
);

-- DROP TABLE IF EXISTS `Portfolio`;
CREATE TABLE IF NOT EXISTS `Portfolio`(
    `portfolio_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `images` VARCHAR(500),
    `description` TEXT,
    `project_price` FLOAT,
    PRIMARY KEY (`portfolio_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`)
);

-- DROP TABLE IF EXISTS `Review`;
CREATE TABLE IF NOT EXISTS `Review`(
    `review_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `date_timestamp` BIGINT NOT NULL,
    `rate` FLOAT,
    `comment` TEXT,
    `images` VARCHAR(500),
    PRIMARY KEY (`review_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`)
);

-- DROP TABLE IF EXISTS `ServiceSpecs`;
CREATE TABLE IF NOT EXISTS `ServiceSpecs`(
    `specs_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `description` TEXT,
    `images` VARCHAR(500),
    PRIMARY KEY (`specs_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`)
);

-- DROP TABLE IF EXISTS `Booking`;
CREATE TABLE IF NOT EXISTS `Booking`(
    `booking_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `booking_status` VARCHAR(20),
    `date_timestamp` BIGINT,
    PRIMARY KEY (`booking_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`)
);

-- DROP TABLE IF EXISTS `Payment`;
CREATE TABLE IF NOT EXISTS `Payment`(
    `payment_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `service_id` VARCHAR(14) NOT NULL,
    `payment_method` VARCHAR(20),
    `amount` FLOAT,
    `payment_status` VARCHAR(20),
    PRIMARY KEY (`payment_id`),
    FOREIGN KEY (`service_id`) REFERENCES Service(`service_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`)
);

-- DROP TABLE IF EXISTS `TransactionReports`;
CREATE TABLE IF NOT EXISTS `TransactionReports`(
    `report_id` VARCHAR(14) NOT NULL,
    `booking_id` VARCHAR(14) NOT NULL,
    `payment_id` VARCHAR(14) NOT NULL,
    `specs_id` VARCHAR(14) NOT NULL,
    PRIMARY KEY (`report_id`),
    FOREIGN KEY (`booking_id`) REFERENCES Booking(`booking_id`),
    FOREIGN KEY (`payment_id`) REFERENCES Payment(`payment_id`),
    FOREIGN KEY (`specs_id`) REFERENCES ServiceSpecs(`specs_id`)
);

-- DROP TABLE IF EXISTS `CardPayment`;
CREATE TABLE IF NOT EXISTS `CardPayment`(
    `card_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `card_num` VARCHAR(16) NOT NULL,
    `expiry_date` BIGINT,
    `cvv` VARCHAR(4),
    `merchant` VARCHAR(30),
    `card_type` TINYINT,
    PRIMARY KEY (`card_id`),
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`)
);

-- DROP TABLE IF EXISTS `Address`;
CREATE TABLE IF NOT EXISTS `Address`(
    `address_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `user_full_name` VARCHAR(128) NOT NULL,
    `user_num` VARCHAR(20),
    `region` VARCHAR(50),
    `province` VARCHAR(25),
    `city` VARCHAR(25),
    `barangay` VARCHAR(30),
    `postal_code` VARCHAR(6),
    `street_name` VARCHAR(25),
    `unit_num` VARCHAR(6),
    `default` TINYINT,
    PRIMARY KEY (`address_id`),
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`)
);

-- DROP TABLE IF EXISTS `ChatRoom`;
CREATE TABLE IF NOT EXISTS `ChatRoom`(
    `room_id` VARCHAR(14) NOT NULL,
    `seeker_id` VARCHAR(14) NOT NULL,
    `provider_id` VARCHAR(14) NOT NULL,
    PRIMARY KEY (`room_id`),
    FOREIGN KEY (`provider_id`) REFERENCES Provider(`provider_id`),
    FOREIGN KEY (`seeker_id`) REFERENCES Seeker(`seeker_id`)
);

-- DROP TABLE IF EXISTS `Message`;
CREATE TABLE IF NOT EXISTS `Message`(
    `message_id` VARCHAR(14) NOT NULL,
    `room_id` VARCHAR(14) NOT NULL,
    `user_id` VARCHAR(14) NOT NULL,
    `date_timestamp` BIGINT NOT NULL,
    `message` TEXT,
    `images` VARCHAR(500),
    PRIMARY KEY (`message_id`),
    FOREIGN KEY (`room_id`) REFERENCES ChatRoom(`room_id`),
    FOREIGN KEY (`user_id`) REFERENCES User(`user_id`)
);