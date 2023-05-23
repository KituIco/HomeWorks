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

    describe('deleteCertificate', () => {
        it('Test with valid certificate ID', async () => {
            // Delete the certificate
            await certificateRepo.deleteCertificate(certificateID);

            // Verify that the certificate is deleted by retrieving it
            const deletedCertificate = await certificateRepo.getCertificateByID(
                certificateID
            );
            expect(deletedCertificate).not.toBeDefined();
        });

        it('Test with non-existent certificate ID', async () => {
            const nonExistentCertificateID = 'nonexistent_certificate_id';

            // Attempt to delete a non-existent certificate ID
            await expect(
                certificateRepo.deleteCertificate(nonExistentCertificateID)
            ).rejects.toThrow();

            // Verify that no records were deleted
            const certificate = await certificateRepo.getCertificateByID(
                certificateID
            );
            expect(certificate).toBeDefined();
        });

        it('Test with invalid certificate ID format', async () => {
            const invalidCertificateID = 'asdasdasdasdasdasdinvalid_id';

            // Attempt to delete a certificate with an invalid ID format
            await expect(
                certificateRepo.deleteCertificate(invalidCertificateID)
            ).rejects.toThrow();

            // Verify that no records were deleted
            const certificate = await certificateRepo.getCertificateByID(
                certificateID
            );
            expect(certificate).toBeDefined();
        });
    });
});
