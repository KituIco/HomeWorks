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

    describe('createCertificate', () => {
        it('Test with valid input', async () => {
            // Generate valid input values
            const validCertificateID = nanoid(10);
            const validProviderID = userID;
            const validCertificateName = 'Valid Certificate';
            const validFileAttachment = 'valid_attachment.pdf';

            // Create the certificate with valid input
            await certificateRepo.createCertificate(
                validCertificateID,
                validProviderID,
                validCertificateName,
                validFileAttachment
            );

            // Verify that the certificate is created successfully in the database
            const createdCertificate = await certificateRepo.getCertificateByID(
                validCertificateID
            );
            expect(createdCertificate).toBeDefined();
            expect(createdCertificate.certificateID).toEqual(
                validCertificateID
            );
            expect(createdCertificate.providerID).toEqual(validProviderID);
            expect(createdCertificate.certificateName).toEqual(
                validCertificateName
            );
            expect(createdCertificate.fileAttached).toEqual(
                validFileAttachment
            );
        });

        it('Test with invalid input', async () => {
            // Generate invalid input values
            const invalidCertificateID = 'invalid_certificate_id';
            const nonExistentProviderID = 'nonexistent_provider_id';
            const invalidCertificateName = 'a'.repeat(51); // Exceeds the maximum length

            // Attempt to create the certificate with invalid input
            await expect(
                certificateRepo.createCertificate(
                    invalidCertificateID,
                    nonExistentProviderID,
                    invalidCertificateName,
                    'invalid_attachment.pdf'
                )
            ).rejects.toThrow();
        });

        it('Test with existing certificate ID', async () => {
            // Generate existing certificate ID
            const existingCertificateID = nanoid(10);

            // Create a certificate with the existing ID
            await certificateRepo.createCertificate(
                existingCertificateID,
                userID,
                'Existing Certificate',
                'existing_attachment.pdf'
            );

            // Attempt to create a certificate with the same ID
            await expect(
                certificateRepo.createCertificate(
                    existingCertificateID,
                    userID,
                    'Updated Certificate',
                    'updated_attachment.pdf'
                )
            ).rejects.toThrow();

            // Verify that the existing certificate is not updated
            const existingCertificate =
                await certificateRepo.getCertificateByID(existingCertificateID);
            expect(existingCertificate.certificate_name).not.toEqual(
                'Updated Certificate'
            );
            expect(existingCertificate.file_attached).not.toEqual(
                'updated_attachment.pdf'
            );
        });

        it('Test with missing or incomplete required fields', async () => {
            // Attempt to create a certificate with missing or incomplete required fields
            await expect(certificateRepo.createCertificate()).rejects.toThrow();

            // Verify that the certificate was not created
            const certificate = await certificateRepo.getCertificateByID(
                certificateID
            );
            expect(certificate).not.toBeDefined();
        });
    });
});
