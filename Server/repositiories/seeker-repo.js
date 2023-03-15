class SeekerRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createSeeker = async (
        seekerID,
        firstName,
        lastName,
        birthdate,
        gender,
        seekerDp
    ) => {
        try {
            let sqlQuery = `CALL create_seeker(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                seekerID,
                firstName,
                lastName,
                birthdate,
                gender,
                seekerDp
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchSeeker = async (
        seekerID,
        firstName,
        lastName,
        birthdate,
        gender,
        seekerDp
    ) => {
        try {
            let sqlQuery = `CALL patch_seeker(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                seekerID,
                firstName,
                lastName,
                birthdate,
                gender,
                seekerDp
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    deleteSeeker = async (seekerID) => {
        try {
            let sqlQuery = `CALL delete_seeker(?)`;
            await this.db.query(sqlQuery, [seekerID]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekers = async () => {
        try {
            let sqlQuery = `CALL get_seekers()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeeker = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_seeker(?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID]);
            return result[0][0];
        } catch (error) {
           // TODO: Handle SQL error
            throw error;
        }
    };
}

module.exports = SeekerRepository;