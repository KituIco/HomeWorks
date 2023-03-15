class CertificateController{
    constructor(
        certificateRepo,
        clientErrors,
        certificateValidator,
        nanoid
    ) {
        this.certificateRepo = certificateRepo;
        this.clientErrors = clientErrors;
        this.certificateValidator = certificateValidator;
        this.nanoid = nanoid;
    }

    // POST: ""
    createCertificate = async(req, res, next) => {
        try {
            let {
                providerID,
                certificateName,
                fileAttached
            } = req.body;

            // TODO: Pre-query validations
                // Validate if necessary fields are not null
            this.certificateValidator.validateCreatePayload(
                req.body, [
                    'providerID',
                    'certificateName',
                    'fileAttached'
                ]
            )
                // Validate if providerID exists in database
            await this.certificateValidator.validateExistence(
                providerID, 'provider'
            );
            
            let certificateID = this.nanoid(14);

            await this.certificateRepo.createCertificate(
                certificateID, 
                providerID,
                certificateName,
                fileAttached
            );

            let newCertificate = {
                ...req.body
            }
            newCertificate.certificateID = certificateID;

            res.status(201).json({
                message: `Certificate for Provider ${providerID} created successfully`,
                body: newCertificate
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:certificateID"
    patchCertificate = async(req, res, next) => {
        try {
            let {
                providerID,
                certificateName,
                fileAttached
            } = req.body;

            let {certificateID} = req.params;

            // TODO: Pre-query validations
                // Validate if certificateID is not null
            this.certificateValidator.checkRequiredParameters(req.params, ['certificateID']);
                // Validate if certificateID exists in database
            await this.certificateValidator.validateExistence(certificateID, 'certificate');
                // Validate if necessary fields are not null
            this.certificateValidator.validatePatchPayload(req.body);
                // Validate if providerID exists in database
            providerID != null && await this.certificateValidator.validateExistence(providerID, 'provider');
            
            await this.certificateRepo.patchCertificate(
                certificateID,
                providerID,
                certificateName,
                fileAttached
            );

            let patchedCertificate = {
                ...req.body
            }
            patchedCertificate.certificateID = certificateID;

            res.status(200).json({
                message: `Certificate for Provider ${providerID} patched successfully`,
                body: patchedCertificate
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // DELETE: "/:certificateID"
    deleteCertificate = async(req, res, next) => {
        try {
            let {certificateID} = req.params;

            // TODO: Pre-query validations
                // Validate if certificateID is not null
            this.certificateValidator.checkRequiredParameters(req.params, ['certificateID']);
                // Validate if certificateID exists in database
            await this.certificateValidator.validateExistence(certificateID, 'certificate');
            
            await this.certificateRepo.deleteCertificate(certificateID);

            res.status(204);
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getCertificates = async(req, res, next) => {
        try {
            let certificates = await this.certificateRepo.getCertificates();

            res.status(200).json({
                message: 'Certificates retrieved successfully',
                body: certificates
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/provider/:providerID"
    getProviderCertificates = async(req, res, next) => {
        try {
            let {providerID} = req.params;

            // TODO: Pre-query validations
                // Validate if providerID is not null
            this.certificateValidator.checkRequiredParameters(req.params, ['providerID']);
                // Validate if providerID exists in database
            await this.certificateValidator.validateExistence(providerID, 'provider');
            
            let providerCertificates = await this.certificateRepo.getProviderCertificates(providerID);

            res.status(200).json({
                message: `Certificates for Provider ${providerID} retrieved successfully`,
                body: providerCertificates
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/:certificateID"
    getCertificateByID = async(req, res, next) => {
        try {
            let {certificateID} = req.params;

            // TODO: Pre-query validations
                // Validate if certificateID is not null
            this.certificateValidator.checkRequiredParameters(req.params, ['certificateID']);
            
            let certificate = await this.certificateRepo.getCertificateByID(certificateID);

            // TODO: Post-query validations
                // Validate if certificate exists in database
            
            res.status(200).json({
                message: `Certificate ${certificateID} retrieved successfully`,
                body: certificate
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = CertificateController;