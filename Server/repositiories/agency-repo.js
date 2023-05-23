class AgencyRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createAgency = async (
        agencyID,
        agencyName,
        agencyDesc,
        agencyDP,
        agencyImages,
        agencyServiceTypes,
        agencyRating
    ) => {
        try {
            let sqlQuery = `CALL create_agency(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                agencyID,
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating,
            ]);
        } catch (error) {
            //TODO: Handle SQL Error
            throw error;
        }
    };

    patchAgency = async (
        agencyID,
        agencyName,
        agencyDesc,
        agencyDP,
        agencyImages,
        agencyServiceTypes,
        agencyRating
    ) => {
        try {
            let sqlQuery = `CALL patch_agency(?, ?, ?, ?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                agencyID,
                agencyName,
                agencyDesc,
                agencyDP,
                agencyImages,
                agencyServiceTypes,
                agencyRating,
            ]);
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };

    deleteAgency = async (agencyID) => {
        try {
            let sqlQuery = `CALL delete_agency(?)`;
            await this.db.query(sqlQuery, [agencyID]);
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };

    getAgencyByID = async (agencyID) => {
        try {
            let sqlQuery = `CALL get_agency_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [agencyID]);
            return result[0][0];
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };

    getAllAgency = async () => {
        try {
            let sqlQuery = `CALL get_all_agencies()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            //TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getAgencyProviders = async (agencyID) => {
        try {
            let sqlQuery = `CALL get_agency_providers(?)`;
            let [result, _] = await this.db.query(sqlQuery, [agencyID]);
            return result[0];
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };

    getAgencyServiceTypes = async (agencyID) => {
        try {
            let sqlQuery = `CALL get_agency_service_types(?)`;
            let [result, _] = await this.db.query(sqlQuery, [agencyID]);
            return result[0][0];
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };

    addProviderToAgency = async (agencyID, providerID) => {
        try {
            let sqlQuery = `CALL add_provider_to_agency(?, ?)`;
            await this.db.query(sqlQuery, [agencyID, providerID]);
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };

    removeProviderFromAgency = async (providerID) => {
        try {
            let sqlQuery = `CALL remove_provider_from_agency(?)`;
            await this.db.query(sqlQuery, [providerID]);
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };

    searchProviderInAgency = async (agencyID, searchQuery) => {
        try {
            let sqlQuery = `CALL search_provider_in_agency(?, ?)`;
            let [result, _] = await this.db.query(sqlQuery, [
                agencyID,
                searchQuery,
            ]);
            return result[0];
        } catch (error) {
            //TODO: Handle SQL error
            throw error;
        }
    };
}

module.exports = AgencyRepository;
