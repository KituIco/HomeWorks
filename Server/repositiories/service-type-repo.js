class ServiceTypeRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createServiceType = async (
        typeID, 
        typeName, 
        typeDesc
    ) => {
        try {
            let sqlQuery = `CALL create_service_type(?, ?, ?)`;
            await this.db.query(sqlQuery, [
                typeID,
                typeName,
                typeDesc
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    patchServiceType = async (
        typeID,
        typeName,
        typeDesc
    ) => {
        try {
            let sqlQuery = `CALL patch_service_type(?, ?, ?)`;
            await this.db.query(sqlQuery, [
                typeID,
                typeName,
                typeDesc
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    deleteServiceType = async (typeID) => {
        try {
            let sqlQuery = `CALL delete_service_type(?)`;
            await this.db.query(sqlQuery, [typeID]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getServiceTypes = async () => {
        try {
            let sqlQuery = `CALL get_service_types()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getServiceTypeByID = async (typeID) => {
        try {
            let sqlQuery = `CALL get_service_type_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [typeID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };
}

module.exports = ServiceTypeRepository;