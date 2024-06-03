import { API_URL } from "../constants";

async function updateProfileAction(data, authToken) {
    const url = `${API_URL}/api/v1/profile`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "authToken": authToken
        },
        body: JSON.stringify(data)
    });
    return response;
}
export default updateProfileAction;