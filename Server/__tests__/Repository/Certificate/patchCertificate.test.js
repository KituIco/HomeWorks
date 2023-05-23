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
            fileAttached: 'path/to/file',
        };

        await certificateRepo.createCertificate(
            newCertificate.certificateID,
            newCertificate.providerID,
            newCertificate.certificateName,
            newCertificate.fileAttached
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

    describe('patchCertificate', () => {
        it('Test with valid input', async () => {
            const updatedCertificateName = 'Updated Certificate';
            const updatedFileAttachment = 'path/to/updated/file';

            // Patch the certificate with valid values
            await certificateRepo.patchCertificate(
                certificateID,
                userID,
                updatedCertificateName,
                updatedFileAttachment
            );

            // Verify that the certificate is patched successfully in the database
            const patchedCertificate = await certificateRepo.getCertificateByID(
                certificateID
            );
            expect(patchedCertificate).toBeDefined();
            expect(patchedCertificate.certificateName).toEqual(
                updatedCertificateName
            );
            expect(patchedCertificate.fileAttached).toEqual(
                updatedFileAttachment
            );
        });

        it('Test with invalid certificate ID', async () => {
            const invalidCertificateID = 'nonexistent_certificate_id';
            const updatedCertificateName = 'Updated Certificate';
            const updatedFileAttachment = 'path/to/updated/file';

            // Attempt to patch the certificate with an invalid certificate ID
            await expect(
                certificateRepo.patchCertificate(
                    invalidCertificateID,
                    userID,
                    updatedCertificateName,
                    updatedFileAttachment
                )
            ).rejects.toThrow();

            // Verify that the certificate was not patched
            const certificate = await certificateRepo.getCertificateByID(
                certificateID
            );
            expect(certificate.certificateName).not.toEqual(
                updatedCertificateName
            );
            expect(certificate.fileAttached).not.toEqual(updatedFileAttachment);
        });

        it('Test with invalid provider ID', async () => {
            const updatedCertificateName = 'Updated Certificate';
            const updatedFileAttachment = 'path/to/updated/file';
            const invalidProviderID = 'nonexistent_provider_id';

            // Attempt to patch the certificate with an invalid provider ID
            await expect(
                certificateRepo.patchCertificate(
                    certificateID,
                    invalidProviderID,
                    updatedCertificateName,
                    updatedFileAttachment
                )
            ).rejects.toThrow();

            // Verify that the certificate was not patched
            const certificate = await certificateRepo.getCertificateByID(
                certificateID
            );
            expect(certificate.certificateName).not.toEqual(
                updatedCertificateName
            );
            expect(certificate.fileAttached).not.toEqual(updatedFileAttachment);
        });
    });
});
