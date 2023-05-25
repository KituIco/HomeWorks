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

    beforeEach(async () => {});

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

    describe('createPayment', () => {
        it('should create a payment with valid data', async () => {
            await paymentRepo.createPayment(
                paymentID,
                seekerID,
                providerID,
                serviceID,
                1,
                500.0,
                1
            );

            const payment = await paymentRepo.getPaymentByID(paymentID);

            expect(payment).toEqual({
                paymentID,
                serviceID,
                seekerID,
                providerID,
                paymentMethod: 1,
                amount: '500.00',
                paymentStatus: 1,
            });
        });

        it('should throw an error if paymentID, seekerID, serviceID is null', async () => {
            await expect(
                paymentRepo.createPayment(
                    null,
                    seekerID,
                    providerID,
                    serviceID,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();

            await expect(
                paymentRepo.createPayment(
                    paymentID,
                    null,
                    providerID,
                    serviceID,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();

            await expect(
                paymentRepo.createPayment(
                    paymentID,
                    seekerID,
                    null,
                    serviceID,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();

            await expect(
                paymentRepo.createPayment(
                    paymentID,
                    seekerID,
                    providerID,
                    null,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();
        });

        it('should throw an error if paymentID, seekerID, providerID, or serviceID is too long', async () => {
            await expect(
                paymentRepo.createPayment(
                    '12345678901'.repeat(3),
                    seekerID,
                    providerID,
                    serviceID,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();

            await expect(
                paymentRepo.createPayment(
                    paymentID,
                    '12345678901'.repeat(3),
                    providerID,
                    serviceID,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();

            await expect(
                paymentRepo.createPayment(
                    paymentID,
                    seekerID,
                    '12345678901'.repeat(3),
                    serviceID,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();

            await expect(
                paymentRepo.createPayment(
                    paymentID,
                    seekerID,
                    providerID,
                    '12345678901'.repeat(3),
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();
        });

        it('should throw an error if duplicate paymentID is used', async () => {
            await paymentRepo.createPayment(
                paymentID,
                seekerID,
                providerID,
                serviceID,
                1,
                500.0,
                1
            );

            await expect(
                paymentRepo.createPayment(
                    paymentID,
                    seekerID,
                    providerID,
                    serviceID,
                    1,
                    500.0,
                    1
                )
            ).rejects.toThrow();
        });
    });
});
