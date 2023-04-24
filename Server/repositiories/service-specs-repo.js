class ServiceSpecsRepository {
    constructor(db, errors=null) {
        this.db = db;
        this.errors = errors;
    }

    createServiceSpecs = async (
        specsID,
        seekerID,
        typeID,
        addressID,
        referencedID,
        specsDesc,
        images,
        specsStatus,
        specsTimestamp
    ) => {
        try {
            let sqlQuery = `CALL create_service_specs(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                specsID,
                seekerID,
                typeID,
                addressID,
                referencedID,
                specsDesc,
                images,
                specsStatus,
                specsTimestamp
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchServiceSpecs = async (
        specsID,
        seekerID,
        typeID,
        addressID,
        referencedID,
        specsDesc,
        images,
        specsStatus,
        specsTimestamp
    ) => {
        try {
            let sqlQuery = `CALL patch_service_specs(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                specsID,
                seekerID,
                typeID,
                addressID,
                referencedID,
                specsDesc,
                images,
                specsStatus,
                specsTimestamp
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    deleteServiceSpecs = async (specsID) => {
        try {
            let sqlQuery = `CALL delete_service_specs(?)`;
            await this.db.query(sqlQuery, [specsID]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getAllServiceSpecs = async () => {
        try {
            let sqlQuery = `CALL get_all_service_specs()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerSpecs = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_seeker_specs(?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerSpecsByType = async (seekerID, typeID) => {
        try {
            let sqlQuery = `CALL get_seeker_specs_by_type(?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID, typeID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerSpecsByStatus = async (seekerID, specsStatus) => {
        try {
            let sqlQuery = `CALL get_seeker_specs_by_status(?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID, specsStatus]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSpecsByType = async (typeID) => {
        try {
            let sqlQuery = `CALL get_specs_by_type(?)`;
            let [result, _] = await this.db.query(sqlQuery, [typeID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSpecsByStatus = async (specsStatus) => {
        try {
            let sqlQuery = `CALL get_specs_by_status(?)`;
            let [result, _] = await this.db.query(sqlQuery, [specsStatus]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerSpecsByDateDesc = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_seeker_specs_by_date_desc(?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSeekerSpecsByDateAsc = async (seekerID) => {
        try {
            let sqlQuery = `CALL get_seeker_specs_by_date_asc(?)`;
            let [result, _] = await this.db.query(sqlQuery, [seekerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSpecsByID = async (specsID) => {
        try {
            let sqlQuery = `CALL get_specs_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [specsID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getSpecsByCoords = async (latitude, longitude, innerRadius, outerRadius) => {
        try {
            let sqlQuery = `CALL get_specs_by_coords(?, ?, ?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [latitude, longitude, innerRadius, outerRadius]);
            return result[0];
        } catch (error) {
            throw error;
        }
    };
}

module.exports = ServiceSpecsRepository;