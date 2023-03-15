const Validator = require('./validator.js');

class CertificateValidator extends Validator {
    constructor(
        clientErrors,
        certificateRepo,
        providerRepo
    ) {
        super(clientErrors);
        this.certificateRepo = certificateRepo;
        this.providerRepo = providerRepo;
        this._rules = {
            certificateID: {
                required : true,
                type : 'string'
            },
            providerID: {
                required : true,
                type : 'string'
            },
            certificateName: {
                required : true,
                type : 'string'
            },
            fileAttached: {
                required : true,
                type : 'string'
            }
        };
    }

    validateExistence = async (id, type) => {
        if (type == 'provider') {
            const provider = await this.providerRepo.getProvider(id);
            if (provider == null) {
                throw new this.clientErrors.Api404Error(`Provider with id ${id} not found`);
            }
        } else if (type == 'certificate') {
            const certificate = await this.certificateRepo.getCertificateByID(id);
            if (certificate == null) {
                throw new this.clientErrors.Api404Error(`Certificate with id ${id} not found`);
            }
        }
    }
}

module.exports = CertificateValidator;