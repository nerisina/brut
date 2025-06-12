import Login from '../Login/Login';
import { useState, useEffect, useRef } from 'react';
import TrackInfo from '../TrackInfo/TrackInfo';
import { getAccessToken } from '../../auth';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Sidebar from '../Sidebar/Sidebar';
import { Contianer, TrackView, Side } from './styles';

function App() {
  const hasRun = useRef(false);

  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userPlaylists, setUserPlaylists] = useState<any[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [tracks, setTracks] = useState<any[]>([]);

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
      if(userId){
        getPlaylists(userId);
      }
      if (selectedPlaylist) {
        getTracks(selectedPlaylist);
      }
    }
      console.log("🎵 Tracks fetched:", selectedPlaylist);
   }, [token, userId, selectedPlaylist]);

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
    setUserId(data.id);
    setUserInfo(data.images[0]?.url || null);
  }

  const getPlaylists = async (userId: string) => {
    if (!userId) return;
    const { data } = await axios.get(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    setUserPlaylists(data.items);
  }

  const getTracks = async (playlistId: string) => {
    const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log(data.items);
    setTracks(data.items);
  }

  const auth = !token ? <Login /> : 
    <>
      <Nav userInfo={userInfo} isLoggedIn={!!token} />
      <Contianer>
        <TrackView>
          <TrackInfo  tracks={tracks}/>
        </TrackView>

        <Side>
          <Sidebar playlists={userPlaylists} onSelectedPlaylist={setSelectedPlaylist} /></Side>
      </Contianer>
    </>;

  return <>{auth}</>;
}

export default App
