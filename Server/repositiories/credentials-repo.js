class CredentialsRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createCredentials = async (
        credentialsID,
        userID,
        identifier,
        password
    ) => {
        try {
            let sqlQuery = `CALL create_credentials(?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                credentialsID,
                userID,
                identifier,
                password
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchCredentials = async (
        credentialsID,
        userID,
        identifier,
        password
    ) => {
        try {
            let sqlQuery = `CALL patch_credentials(?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                credentialsID,
                userID,
                identifier,
                password
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchUserCredentials = async (
        userID,
        identifier,
        password
    ) => {
        try {
            let sqlQuery = `CALL patch_user_credentials(?, ?, ?)`;
            await this.db.query(sqlQuery, [
                userID,
                identifier,
                password
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    deleteCredentials = async (credentialsID) => {
        try {
            let sqlQuery = `CALL delete_credentials(?)`;
            await this.db.query(sqlQuery, [credentialsID]);
        } catch {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getCredentials = async () => {
        try {
            let sqlQuery = `CALL get_credentials()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) { 
            // TODO: Handle SQL error
            throw error;
        }
    };

    getCredentialsByID = async (credentialsID) => {
        try {
            let sqlQuery = `CALL get_credentials_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [credentialsID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getUserCredentials = async (userID) => {
        try {
            let sqlQuery = `CALL get_user_credentials(?)`;
            let [result, _] = await this.db.query(sqlQuery, [userID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerHashedPassword = async (identifier) => {
        try {
            let sqlQuery = `CALL get_seeker_hashed_password(?)`;
            let [result, _] = await this.db.query(sqlQuery, [identifier]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getProviderHashedPassword = async (identifier) => {
        try {
            let sqlQuery = `CALL get_provider_hashed_password(?)`;
            let [result, _] = await this.db.query(sqlQuery, [identifier]);
            return result[0][0];
        } catch (error) {
            throw error;
        }
    };

    getCredentialsByIdentifier = async (identifier) => {
        try {
            let sqlQuery = `CALL get_credentials_by_identifier(?)`;
            let [result, _] = await this.db.query(sqlQuery, [identifier]);
            return result[0][0];
        } catch (error) {
            throw error;
        }
    };
}

module.exports = CredentialsRepository;