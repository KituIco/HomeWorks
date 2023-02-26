class AdminRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createAdmin = async (adminID) => {
        try {
            let sqlQuery = `CALL create_admin(?)`;
            await this.db.query(sqlQuery, [adminID]);
        } catch (error) {
            // TODO: HAndle SQL Error
            throw error;
        }
    };

    deleteAdmin = async (adminID) => {
        try {
            let sqlQuery = `CALL delete_admin(?)`;
            await this.db.query(sqlQuery, [adminID]);
        } catch (error) {
            //TODO: Handle SQL Error
            throw error;
        }
    };
}

module.exports = AdminRepository;