class ServiceRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createService = async (
        serviceID,
        providerID,
        typeID,
        typeName,
        initialCost,
        serviceRating
    ) => {
        try {
            let sqlQuery = `CALL create_service(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                serviceID,
                providerID,
                typeID,
                typeName,
                initialCost,
                serviceRating
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    patchService = async (
        serviceID,
        providerID,
        typeID,
        typeName,
        initialCost,
        serviceRating
    ) => {
        try {
            let sqlQuery = `CALL patch_service(?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                serviceID,
                providerID,
                typeID,
                typeName,
                initialCost,
                serviceRating
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    deleteService = async (serviceID) => {
        try {
            let sqlQuery = `CALL delete_service(?)`;
            await this.db.query(sqlQuery, [serviceID]);
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getAllServices = async () => {
        try {
            let sqlQuery = `CALL get_all_services()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getProviderServices = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider_services(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getProviderServicesSortedDesc = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider_services_sorted_desc(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getProviderServicesSortedAsc = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider_services_sorted_asc(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getProviderServiceByKeyword = async (providerID, keyword) => {
        try {
            let sqlQuery = `CALL get_provider_service_by_keyword(?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID, keyword]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };

    getService = async (serviceID) => {
        try {
            let sqlQuery = `CALL get_service(?)`;
            let [result, _] = await this.db.query(sqlQuery, [serviceID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            throw error;
        }
    };
}

module.exports = ServiceRepository;