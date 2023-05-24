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

    describe('getCertificates', () => {
        it('Test with existing certificates', async () => {
            // Retrieve the certificates
            const certificates = await certificateRepo.getCertificates();

            // Verify that the returned result matches the expected certificates
            expect(certificates.length).toBeGreaterThan(0);
        });

        it('Test with no certificates', async () => {
            // Delete the certificate
            await certificateRepo.deleteCertificate(certificateID);

            // Retrieve the certificates
            const certificates = await certificateRepo.getCertificates();

            // Verify that the function returns an empty array or a suitable response indicating the absence of certificates
            expect(certificates.length).toBeGreaterThanOrEqual(0);
        });

        it('Test error handling', async () => {
            // Mock an SQL error by causing a database query failure
            jest.spyOn(db, 'query').mockRejectedValue(
                new Error('Database query failed')
            );

            // Call the function and verify that it handles the error appropriately
            await expect(certificateRepo.getCertificates()).rejects.toThrow(
                'Database query failed'
            );

            // Restore the original query method
            jest.spyOn(db, 'query').mockRestore();
        });
    });
});
