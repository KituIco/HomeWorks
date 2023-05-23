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

    describe('getCertificateByID', () => {
        it('Test with a valid certificate ID', async () => {
            // Retrieve the certificate by ID
            const certificate = await certificateRepo.getCertificateByID(
                certificateID
            );

            // Verify that the function retrieves the corresponding certificate successfully
            expect(certificate).toBeDefined();
            expect(certificate.certificateID).toBe(certificateID);
            // Add additional assertions for other fields if necessary
        });

        it('Test with an invalid certificate ID', async () => {
            const invalidCertificateID = 'nonexistent_certificate_id';

            // Retrieve the certificate by an invalid certificate ID
            await expect(
                certificateRepo.getCertificateByID(invalidCertificateID)
            ).rejects.toThrow();
        });

        it('Test database integrity', async () => {
            // Retrieve the certificate by ID
            const certificate = await certificateRepo.getCertificateByID(
                certificateID
            );

            // Verify that the data returned matches the expected values for all the fields
            const expectedCertificate = {
                certificateID: certificateID,
                providerID: userID,
                certificateName: 'Test Certificate',
                fileAttached: 'path/to/file',
            };

            expect(certificate).toEqual(expectedCertificate);
        });
    });
});
