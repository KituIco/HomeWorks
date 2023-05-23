const CertificateRepository = require('../../../repositiories/certificate-repo');
const UserRepository = require('../../../repositiories/user-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('CertificateRepository', () => {
    let certificateRepo;
    let userRepo;
    let providerRepo;
    let userID = nanoid(10);
    let certificateID = nanoid(10);

    beforeAll(async () => {
        // Create a new certificateRepo instance before every test.
        certificateRepo = new CertificateRepository(db);
        providerRepo = new ProviderRepository(db);
        userRepo = new UserRepository(db);

        // create a new user
        await userRepo.createUser(userID);
        await providerRepo.createProvider(
            userID,
            'John',
            'Doe',
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
    });

    beforeEach(async () => {
        // create a new certificate
        let newCertificate = {
            certificateID: certificateID,
            providerID: userID,
            certificateName: 'Test Certificate',
            fileAttachment: 'path/to/file',
        };

        await certificateRepo.createCertificate(
            newCertificate.certificateID,
            newCertificate.providerID,
            newCertificate.certificateName,
            newCertificate.fileAttachment
        );
    });

    afterEach(async () => {
        // Delete the certificate
        await certificateRepo.deleteCertificate(certificateID);
    });

    afterAll(async () => {
        // Delete the user
        await userRepo.deleteUser(userID);
        await db.end();
    });

    describe('getProviderCertificates', () => {
        it('Test with valid input', async () => {
            // Retrieve the certificates associated with the provider
            const certificates = await certificateRepo.getProviderCertificates(
                userID
            );

            // Verify that the function retrieves the certificates correctly and returns the expected result
            expect(certificates).toBeDefined();
            expect(certificates).toHaveLength(1);
            expect(certificates[0].certificateID).toBe(certificateID);
            expect(certificates[0].providerID).toBe(userID);
            // Add additional assertions for other properties of the certificate if needed
        });

        it('Test with invalid input', async () => {
            const invalidProviderID = 'nonexistent_provider_id';

            // Retrieve the certificates using an invalid provider ID
            await expect(
                certificateRepo.getProviderCertificates(invalidProviderID)
            ).rejects.toThrow();
        });

        it('Test with no certificates', async () => {
            // Delete the certificate associated with the provider
            await certificateRepo.deleteCertificate(certificateID);

            // Retrieve the certificates for the provider
            const certificates = await certificateRepo.getProviderCertificates(
                userID
            );

            // Verify that the function returns an empty array or an appropriate response indicating the absence of certificates
            expect(certificates).toBeDefined();
            expect(certificates).toHaveLength(0);
            // Add additional assertions or specific error message checks if needed
        });
    });
});
