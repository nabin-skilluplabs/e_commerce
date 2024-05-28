import { jwtDecode } from 'jwt-decode'

export function getCurrentUser(authToken){
    const user = jwtDecode(authToken);
    return user
}