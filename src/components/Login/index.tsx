import { redirectToAuthCodeFlow } from '../../auth';
const clientId = import.meta.env.VITE_CLIENT_ID;
const Login = () => {
    const handleClick = async () => {
        await redirectToAuthCodeFlow(clientId);
    };

    return (
        <>
            <h1>Brut</h1>
            <button onClick={handleClick}>when the music is ovar</button>
        </>
    );
};
export default Login;