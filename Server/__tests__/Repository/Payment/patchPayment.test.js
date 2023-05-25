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
            null
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

    describe('patchPayment', () => {
        it('should update payment if valid paymentID is provided', async () => {
            const newPayment = {
                paymentID: paymentID,
                seekerID: seekerID,
                providerID: providerID,
                serviceID: serviceID,
                paymentMethod: null,
                amount: 500.0,
                paymentStatus: 1,
            };

            await paymentRepo.patchPayment(
                newPayment.paymentID,
                newPayment.seekerID,
                newPayment.providerID,
                newPayment.serviceID,
                newPayment.paymentMethod,
                newPayment.amount,
                newPayment.paymentStatus
            );

            const result = await paymentRepo.getPaymentByID(paymentID);

            expect(result.paymentStatus).toEqual(newPayment.paymentStatus);
        });

        it('should throw an error if invalid paymentID is provided', async () => {
            const newPayment = {
                paymentID: paymentID,
                seekerID: seekerID,
                providerID: providerID,
                serviceID: serviceID,
                paymentMethod: null,
                amount: 500.0,
                paymentStatus: 1,
            };

            await expect(
                paymentRepo.patchPayment(
                    'invalid_paymentID'.repeat(10),
                    newPayment.seekerID,
                    newPayment.providerID,
                    newPayment.serviceID,
                    newPayment.paymentMethod,
                    newPayment.amount,
                    newPayment.paymentStatus
                )
            ).rejects.toThrow();
        });

        it('should update non null fields if null fields are provided', async () => {
            const newPayment = {
                paymentID: paymentID,
                seekerID: seekerID,
                providerID: providerID,
                serviceID: null,
                paymentMethod: null,
                amount: 500.0,
                paymentStatus: null,
            };

            await paymentRepo.patchPayment(
                newPayment.paymentID,
                newPayment.seekerID,
                newPayment.providerID,
                newPayment.serviceID,
                newPayment.paymentMethod,
                newPayment.amount,
                newPayment.paymentStatus
            );

            const result = await paymentRepo.getPaymentByID(paymentID);

            expect(result.serviceID).toEqual(serviceID);
        });
    });
});
