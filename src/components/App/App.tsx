import './App.css';
import Login from '../Login';
import { useState, useEffect, useRef, use } from 'react';
import TrackInfo from '../TrackInfo';
import { getAccessToken } from '../../auth';
import { axios } from 'axios';

function App() {
  const [token, setToken] = useState<string | null>(null);
  const hasRun = useRef(false); // Prevents the effect from running multiple times  
 
  useEffect(() => { 
    if(hasRun.current) return;
    hasRun.current = true; // Set the flag to true after the first run
    // Check if the token is already set in localStorage
    getToken(); 
  }, []); 

  const getToken = async () => {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) {
      const accessToken = await getAccessToken(clientId, code);
      setToken(accessToken);
      await getUserInfo(accessToken);
    }
  }
  
  const getUserInfo = async (accessToken: string) => {
    const {data} = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
    console.log("User Info:", data);
    return data;
  }

  const auth = !token ? <Login /> : <TrackInfo />;

  return <>{auth}</>;
}

export default App
