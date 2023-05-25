const PaymentRepository = require('../../../repositiories/payment-repo');
const UserRepository = require('../../../repositiories/user-repo');
const SeekerRepository = require('../../../repositiories/seeker-repo');
const ProviderRepository = require('../../../repositiories/provider-repo');
const ServiceRepository = require('../../../repositiories/service-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('Payment Repository', () => {
    let paymentRepo;
    let userRepo;
    let seekerRepo;
    let providerRepo;
    let serviceRepo;

    let seekerID;
    let providerID;
    let serviceID;
    let paymentID;

    beforeAll(async () => {
        paymentRepo = new PaymentRepository(db);
        userRepo = new UserRepository(db);
        seekerRepo = new SeekerRepository(db);
        providerRepo = new ProviderRepository(db);
        serviceRepo = new ServiceRepository(db);

        seekerID = nanoid(10);
        providerID = nanoid(10);
        serviceID = nanoid(10);
        paymentID = nanoid(10);

        await userRepo.createUser(seekerID);
        await userRepo.createUser(providerID);

        // Create seeker
        await seekerRepo.createSeeker(
            seekerID,
            'seeker',
            'seeker',
            null,
            null,
            null
        );

        // Create provider
        await providerRepo.createProvider(
            providerID,
            'provider',
            'provider',
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );

        // Create service
        await serviceRepo.createService(
            serviceID,
            providerID,
            '1',
            'Car Mechanic',
            500.0,
            null
        );
    });

    beforeEach(async () => {
        // Create payment
        await paymentRepo.createPayment(
            paymentID,
            seekerID,
            providerID,
            serviceID,
            null,
            500.0,
            1
        );
    });

    afterEach(async () => {
        await paymentRepo.deletePayment(paymentID);
    });

    afterAll(async () => {
        // Delete service
        await serviceRepo.deleteService(serviceID);
        // Delete seeker
        await seekerRepo.deleteSeeker(seekerID);
        // Delete provider
        await providerRepo.deleteProvider(providerID);

        // Delete users
        await userRepo.deleteUser(seekerID);
        await userRepo.deleteUser(providerID);

        await db.end();
    });

    describe('getProviderPayments', () => {
        it('should return an array of payments for a given provider', async () => {
            const payments = await paymentRepo.getProviderPayments(providerID);

            payments.forEach((payment) =>
                expect(payment.providerID).toEqual(providerID)
            );
        });

        it('should return an empty array if no payments are found', async () => {
            const payments = await paymentRepo.getProviderPayments('invalid');

            expect(payments).toEqual([]);
        });

        it('should throw an error if the providerID is too long', async () => {
            await expect(
                paymentRepo.getProviderPayments('a'.repeat(50))
            ).rejects.toThrow();
        });
    });
});
