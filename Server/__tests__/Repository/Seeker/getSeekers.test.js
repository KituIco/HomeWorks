const SeekerRepository = require('../../../repositiories/seeker-repo');
const UserRepository = require('../../../repositiories/user-repo');
const db = require('../../../middlewares/mysql_data_access');
const { nanoid } = require('nanoid');

describe('SeekerRepository', () => {
    let seekerRepo;
    let userRepo;
    let userID;
    let userID1;
    let userID2;

    beforeAll(async () => {
        // Create a new seekerRepo instance before every test.
        seekerRepo = new SeekerRepository(db);
        userRepo = new UserRepository(db);

        // Create a new user and store the userID
        userID = nanoid(10);
        userID1 = nanoid(10);
        userID2 = nanoid(10);
        await userRepo.createUser(userID);
        await userRepo.createUser(userID1);
        await userRepo.createUser(userID2);
    });

    beforeEach(async () => {
        const firstName = 'Test';
        const lastName = 'User';
        const birthdate = '2000-01-01';
        const gender = 'male';
        const seekerDP = 'path/to/seeker-dp';

        await seekerRepo.createSeeker(
            userID,
            firstName,
            lastName,
            birthdate,
            gender,
            seekerDP
        );
    });

    afterEach(async () => {
        // Delete the created seeker
        await seekerRepo.deleteSeeker(userID);
    });

    afterAll(async () => {
        // Delete the created user
        await userRepo.deleteUser(userID);
        // Close the database connection after all tests
        await db.end();
    });

    describe('getSeekers', () => {
        it('Test with valid data', async () => {
            // Call the getSeekers function
            const seekers = await seekerRepo.getSeekers();

            // Verify that the returned data is an array
            expect(Array.isArray(seekers)).toBe(true);

            // Verify that the returned data matches the expected format
            for (const seeker of seekers) {
                expect(seeker).toHaveProperty('seekerId');
                expect(seeker).toHaveProperty('firstName');
                expect(seeker).toHaveProperty('lastName');
                expect(seeker).toHaveProperty('birthdate');
                expect(seeker).toHaveProperty('gender');
                expect(seeker).toHaveProperty('seekerDp');
            }
        });

        it('Test database integrity', async () => {
            // Insert sample seeker records into the Seeker table
            const sampleSeekers = [
                {
                    seekerId: userID2,
                    firstName: 'John',
                    lastName: 'Doe',
                    birthdate: '1990-05-15',
                    gender: 'male',
                    seekerDp: 'path/to/seeker-dp-1',
                },
                {
                    seekerId: userID1,
                    firstName: 'Jane',
                    lastName: 'Smith',
                    birthdate: '1985-12-10',
                    gender: 'female',
                    seekerDp: 'path/to/seeker-dp-2',
                },
            ];

            for (const seeker of sampleSeekers) {
                await db.query(
                    'INSERT INTO Seeker (seeker_id, first_name, last_name, birthdate, gender, seeker_dp) VALUES (?, ?, ?, ?, ?, ?)',
                    [
                        seeker.seekerId,
                        seeker.firstName,
                        seeker.lastName,
                        seeker.birthdate,
                        seeker.gender,
                        seeker.seekerDp,
                    ]
                );
            }

            // Call the getSeekers function
            const fetchedSeekers = await seekerRepo.getSeekers();

            // Verify that the returned seekers match the inserted sample data
            expect(fetchedSeekers).toEqual(
                expect.arrayContaining(sampleSeekers)
            );
        });

        it('Test with an empty seeker table', async () => {
            // Mock the getSeekers function to return an empty array
            jest.spyOn(seekerRepo, 'getSeekers').mockImplementation(
                async () => []
            );

            // Call the getSeekers function
            const seekers = await seekerRepo.getSeekers();

            // Verify that the function returns an empty array or an appropriate response
            expect(seekers).toEqual([]);
        });
    });
});
