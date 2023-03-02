class CertificateRepository {
    constructor(db, errors = null) {
        this.db = db;
        this.errors = errors;
    }

    createCertificate = async (
        certificateID,
        providerID,
        certificateName,
        fileAttached
    ) => {
        try {
            let sqlQuery = `CALL create_certificate(?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                certificateID,
                providerID,
                certificateName,
                fileAttached
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    patchCertificate = async (
        certificateID,
        providerID,
        certificateName,
        fileAttached
    ) => {
        try {
            let sqlQuery = `CALL patch_certificate(?, ?, ?, ?)`;
            await this.db.query(sqlQuery, [
                certificateID,
                providerID,
                certificateName,
                fileAttached
            ]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    deleteCertificate = async (certificateID) => {
        try {
            let sqlQuery = `CALL delete_certificate(?)`;
            await this.db.query(sqlQuery, [certificateID]);
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getCertificates = async () => {
        try {
            let sqlQuery = `CALL get_certificates()`;
            let [result, _] = await this.db.query(sqlQuery);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getProviderCertificates = async (providerID) => {
        try {
            let sqlQuery = `CALL get_provider_certificates(?)`;
            let [result, _] = await this.db.query(sqlQuery, [providerID]);
            return result[0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };

    getCertificateByID = async (certificateID) => {
        try {
            let sqlQuery = `CALL get_certificate_by_id(?)`;
            let [result, _] = await this.db.query(sqlQuery, [certificateID]);
            return result[0][0];
        } catch (error) {
            // TODO: Handle SQL error
            console.log(error);
            throw error;
        }
    };
}

module.exports = CertificateRepository;