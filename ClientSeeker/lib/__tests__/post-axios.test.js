import {postAxios} from '../axios';

test('postAxios', async () => {
    let url = '/seeker';
    let data = {
        email: 'a@b.com',
        username: 'abc',
        phoneNumber: '+639053113401',
        password: 'password',
        firstName: 'first',
        lastName: 'last',
        birthdate: 1,
        gender: null,
        seekerDp: null
    };

    let res = await postAxios(url, data);
});