class AddressRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createAddress = async(
        addressID,
        userID,
        userFullNAme,
        userNum,
        region,
        province,
        city,
        barangay,
        postalCode,
        streetName,
        unitNum,
        isDefault
    ) => {
        try {
            let sqlQuery = `CALL create_address(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                addressID, 
                userID, 
                userFullNAme, 
                userNum, 
                region, 
                province, 
                city, 
                barangay, 
                postalCode, 
                streetName, 
                unitNum, 
                isDefault
            ]);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
            throw error;
        }
    };

    patchAddress = async(
        addressID,
        userID,
        userFullNAme,
        userNum,
        region,
        province,
        city,
        barangay,
        postalCode,
        streetName,
        unitNum,
        isDefault
    ) => {
        try {
            let sqlQuery = `CALL patch_address(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                addressID,
                userID,
                userFullNAme,
                userNum,
                region,
                province,
                city,
                barangay,
                postalCode,
                streetName,
                unitNum,
                isDefault
            ]);
        } catch (error) {
            // TODO: Handle error
            console.log(error);
            throw error;
        }
    };

    deleteAddress = async(addressID) => {
        try {
            let sqlQuery = `CALL delete_address(?)`;
            await this.db.query(sqlQuery, [addressID]);
        } catch (error) {
            //TODO: Handle error
            console.log(error);
            throw error;
        }
    };

    setAddressDefault = async(addressID, userID) => {
        try {
            let sqlQuery = `CALL set_address_default(?, ?)`;
            await this.db.query(sqlQuery, [addressID, userID]);
        } catch (error) {
            //TODO: Handle error
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
            throw error;
        }
    };
}

module.exports = AddressRepository;