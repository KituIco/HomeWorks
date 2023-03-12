class UserRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createUser = async(
        userID
    ) => {
        try {
            let sqlQuery = `CALL create_user(?)`;
            await this.db.query(sqlQuery, [
                userID
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    deleteUser = async(
        userID
    ) => {
        try {
            let sqlQuery = `CALL delete_user(?)`;
            await this.db.query(sqlQuery, [
                userID
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getUser = async(
        userID
    ) => {
        try {
            let sqlQuery = `CALL get_user(?)`;
            let results = await this.db.query(sqlQuery, [
                userID
            ]);
            return results[0][0];
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

module.exports = UserRepository;