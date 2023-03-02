class ProviderRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createProvider = async (
        providerID,
        firstName,
        lastName,
        birthdate,
        gender,
        providerDp,
        validID,
        agencyID,
        verified,
        aveRating
    ) => {
        try {
            let sqlQuery = `CALL create_provider(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                providerID,
                firstName,
                lastName,
                birthdate,
                gender,
                providerDp,
                validID,
                agencyID,
                verified,
                aveRating
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    patchProvider = async (
        providerID,
        firstName,
        lastName,
        birthdate,
        gender,
        providerDp,
        validID,
        agencyID,
        verified,
        aveRating
    ) => {
        try {
            let sqlQuery = `CALL patch_provider(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                providerID,
                firstName,
                lastName,
                birthdate,
                gender,
                providerDp,
                validID,
                agencyID,
                verified,
                aveRating
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    deleteProvider = async (providerID) => {
        try {
            let sqlQuery = `CALL delete_provider(?)`;
            await this.db.query(sqlQuery, [providerID]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getProviders = async () => {
        try {
            let sqlQuery = `CALL get_providers()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getProvider = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };
}

module.exports = ProviderRepository;