import { patchAxios } from '../axios';

test('patchAxios', async () => {
    let url = '/seeker/Bd5SSPaVnIKsJS';
    let data = {
        firstName: 'hello',
        lastName: null,
        birthdate: null,
        gender: null,
        seekerDp: null
    };

    let res = await patchAxios(url, data);
});