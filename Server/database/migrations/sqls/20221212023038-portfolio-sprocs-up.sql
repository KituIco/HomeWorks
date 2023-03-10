-- Create new portfolio
DROP PROCEDURE IF EXISTS `create_portfolio`;
CREATE PROCEDURE `create_portfolio`(
    IN `portID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `portImg` TEXT,
    IN `portDesc` TEXT,
    IN `portPrice` DECIMAL(10,2)
)
BEGIN
    INSERT INTO 
        Portfolio(
            portfolio_id, 
            service_id, 
            images, 
            portfolio_description, 
            project_price
        )
    VALUES(
        portID, 
        srvceID, 
        portImg, 
        portDesc, 
        portPrice
    );
END;

-- Patch existing portfolio by portfolio_id
DROP PROCEDURE IF EXISTS `patch_portfolio`;
CREATE PROCEDURE `patch_portfolio`(
    IN `portID` VARCHAR(14),
    IN `srvceID` VARCHAR(14),
    IN `portImg` TEXT,
    IN `portDesc` TEXT,
    IN `portPrice` DECIMAL(10,2)
)
BEGIN
    UPDATE 
        Portfolio
    SET
        service_id = COALESCE(srvceID, service_id),
        images = COALESCE(portImg, images),
        portfolio_description = COALESCE(portDesc, portfolio_description),
        project_price = COALESCE(portPrice, project_price)
    WHERE 
        portfolio_id = portID;
END;

-- Delete existing portfolio by portfolio_id
DROP PROCEDURE IF EXISTS `delete_portfolio`;
CREATE PROCEDURE `delete_portfolio`(
    IN `portID` VARCHAR(14)
)
BEGIN
    DELETE FROM 
        Portfolio
    WHERE 
        portfolio_id = portID;
END;

-- Get all portfolios
DROP PROCEDURE IF EXISTS `get_all_portfolios`;
CREATE PROCEDURE `get_all_portfolios`()
BEGIN
    SELECT 
        portfolio_id AS portfolioID,
        service_id AS serviceID,
        images,
        portfolio_description AS portfolioDescription,
        project_price AS projectPrice
    FROM 
        Portfolio;
END;

-- Get all portfolios by service (unsorted)
DROP PROCEDURE IF EXISTS `get_service_portfolios`;
CREATE PROCEDURE `get_service_portfolios`(
    IN `srvceID` VARCHAR(14)
)
BEGIN
    SELECT 
        portfolio_id AS portfolioID,
        service_id AS serviceID,
        images,
        portfolio_description AS portfolioDescription,
        project_price AS projectPrice
    FROM 
        Portfolio
    WHERE
        service_id = srvceID;
END;

-- Get all portfolios by service (sorted by price ascending)
DROP PROCEDURE IF EXISTS `get_service_portfolios_sorted_by_price_asc`;
CREATE PROCEDURE `get_service_portfolios_sorted_by_price_asc`(
    IN `srvceID` VARCHAR(14)
)
BEGIN
    SELECT 
        portfolio_id AS portfolioID,
        service_id AS serviceID,
        images,
        portfolio_description AS portfolioDescription,
        project_price AS projectPrice
    FROM 
        Portfolio
    WHERE
        service_id = srvceID
    ORDER BY
        project_price ASC;
END;

-- Get all portfolios by service (sorted by price descending)
DROP PROCEDURE IF EXISTS `get_service_portfolios_sorted_by_price_desc`;
CREATE PROCEDURE `get_service_portfolios_sorted_by_price_desc`(
    IN `srvceID` VARCHAR(14)
)
BEGIN
    SELECT 
        portfolio_id AS portfolioID,
        service_id AS serviceID,
        images,
        portfolio_description AS portfolioDescription,
        project_price AS projectPrice
    FROM 
        Portfolio
    WHERE
        service_id = srvceID
    ORDER BY
        project_price DESC;
END;

-- Get portfolio by portfolio_id
DROP PROCEDURE IF EXISTS `get_portfolio`;
CREATE PROCEDURE `get_portfolio`(
    IN `portID` VARCHAR(14)
)
BEGIN
    SELECT 
        portfolio_id AS portfolioID,
        service_id AS serviceID,
        images,
        portfolio_description AS portfolioDescription,
        project_price AS projectPrice
    FROM 
        Portfolio
    WHERE
        portfolio_id = portID;
END;