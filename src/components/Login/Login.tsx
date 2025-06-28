import { redirectToAuthCodeFlow } from '../../auth';
import { LoginContainer } from './Login.styles';
const clientId = import.meta.env.VITE_CLIENT_ID;
const Login = () => {
    const handleClick = async () => {
        await redirectToAuthCodeFlow(clientId);
    };

    return (
        <LoginContainer>
            <h1>Brut</h1>
            <button onClick={handleClick}>when the music is ovar</button>
        </LoginContainer>
    );
};
export default Login;