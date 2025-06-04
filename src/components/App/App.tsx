import './App.css';
import Login from '../Login/Login';
import { useState, useEffect, useRef, use } from 'react';
import TrackInfo from '../TrackInfo/TrackInfo';
import { getAccessToken } from '../../auth';
import axios from 'axios';
import Nav from '../Nav/Nav';

function App() {
  const hasRun = useRef(false);

  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);

  // useRef to track if the effect has run to prevent multiple executions
  // This is useful to ensure that the token retrieval logic runs only once 
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code"); 

  useEffect(() => {
    if (!hasRun.current && code && !token) {
      hasRun.current = true; // Set the flag to true to prevent re-running 
      getToken();
    }
    if(token){
      getUserInfo(token);
    }
   }, [token]);

  const getToken = async () => {
    if (code) {
      const accessToken = await getAccessToken(clientId, code);
      setToken(accessToken);
    }
  }
  
  const getUserInfo = async (token: string) => {
    const { data } = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log("Spotify User Info Response:", data);
    console.log("Images array:", data.images);
    console.log("Token used:", token);
    setUserInfo(data.images[0]?.url || null);
  }
  const auth = !token ? <Login /> : <><Nav userInfo={userInfo} isLoggedIn={!!token}/><TrackInfo /></>;

  return <>{auth}</>;
}

export default App
