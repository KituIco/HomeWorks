import {postAxios} from '../axios';

test('postAxios', async () => {
    let url = '/seeker';
    let data = {
        email: 'a@b.c',
        username: 'abc',
        phoneNumber: '1234567890',
        password: 'password',
        firstName: 'first',
        lastName: 'last',
        birthdate: 1,
        gender: null,
        seekerDp: null
    };

    let res = await postAxios(url, data);
});