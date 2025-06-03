import { redirectToAuthCodeFlow } from '../../auth';
import Nav from '../Nav';
const clientId = import.meta.env.VITE_CLIENT_ID;
const Login = () => {
    const handleClick = async () => {
        await redirectToAuthCodeFlow(clientId);
    };

    return (
        <>
            <h1>Brut</h1>
            <Nav></Nav>
            <button onClick={handleClick}>when the music is ovar</button>
        </>
    );
};
export default Login;