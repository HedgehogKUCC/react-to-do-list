import axios from 'axios';

const usersRequest = axios.create({
    baseURL: `${process.env.REACT_APP_ApiBaseUrl}/users`,
    timeout: 5000,
});

export const usersRequestInstance = usersRequest;
export const postUserSignUp = (data) => usersRequest.post('', data);
export const postUserSignIn = (data) => usersRequest.post('/sign_in', data);
export const deleteUserSignOut = () => usersRequest.delete('/sign_out');
