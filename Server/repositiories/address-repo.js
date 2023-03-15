class AddressRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createAddress = async(
        addressID,
        userID,
        userFullName,
        userNum,
        latitude,
        longitude,
        city,
        country,
        district,
        isoCountryCode,
        name,
        postalCode,
        region,
        street,
        streetNumber,
        subRegion,
        timeZone,
        isDefault
    ) => {
        try {
            let sqlQuery = `CALL create_address(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                addressID,
                userID,
                userFullName,
                userNum,
                latitude,
                longitude,
                city,
                country,
                district,
                isoCountryCode,
                name,
                postalCode,
                region,
                street,
                streetNumber,
                subRegion,
                timeZone,
                isDefault
            ]);
        } catch (error) {
            // TODO: Handle error
            throw error;
        }
    };

    patchAddress = async(
        addressID,
        userID,
        userFullName,
        userNum,
        latitude,
        longitude,
        city,
        country,
        district,
        isoCountryCode,
        name,
        postalCode,
        region,
        street,
        streetNumber,
        subRegion,
        timeZone,
        isDefault
    ) => {
        try {
            let sqlQuery = `CALL patch_address(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                addressID,
                userID,
                userFullName,
                userNum,
                latitude,
                longitude,
                city,
                country,
                district,
                isoCountryCode,
                name,
                postalCode,
                region,
                street,
                streetNumber,
                subRegion,
                timeZone,
                isDefault
            ]);
        } catch (error) {
            // TODO: Handle error
            throw error;
        }
    };

    deleteAddress = async(addressID) => {
        try {
            let sqlQuery = `CALL delete_address(?)`;
            await this.db.query(sqlQuery, [addressID]);
        } catch (error) {
            //TODO: Handle error
            throw error;
        }
    };

    setAddressDefault = async(addressID, userID) => {
        try {
            let sqlQuery = `CALL set_address_default(?, ?)`;
            await this.db.query(sqlQuery, [addressID, userID]);
        } catch (error) {
            //TODO: Handle error
            throw error;
        }
    };

    getAllAddress = async() => {
        try {
            let sqlQuery = `CALL get_all_address()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            //TODO: Handle error
            throw error;
        }
    };

    getAllAddressOfUser = async(userID) => {
        try {
            let sqlQuery = `CALL get_all_address_of_user(?)`;
            let [result, _] = await this.db.query(sqlQuery, [userID]);
            return result[0];
        } catch (error) {
            //TODO: Handle error
            throw error;
        }
    };

    getAddressByID = async(addressID) => {
        try {
            let sqlQuery = `CALL get_address_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [addressID]);
            return result[0][0];
        } catch (error) {
            //TODO: Handle error
            throw error;
        }
    };

    getAllDefaultProviderAddress = async() => {
        try {
            let sqlQuery = `CALL get_all_default_provider_address()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            throw error;
        }
    };

    getAllDefaultSeekerAddress = async() => {
        try {
            let sqlQuery = `CALL get_all_default_seeker_address()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AddressRepository;