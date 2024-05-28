import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function SignOut() {
    const navigate = useNavigate();
    const [cookies,,removeCookie]= useCookies(['authToken']);
    
    useEffect(() => {
        if(cookies.authToken) {
            removeCookie('authToken');
            navigate('/');
        }
    })
}