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
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<any | null>(null);
  // useRef to track if the effect has run to prevent multiple executions
  // This is useful to ensure that the token retrieval logic runs only once 
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code"); 

  // Separate useEffects for better sequencing and clarity
  useEffect(() => {
    if (!hasRun.current && code && !token) {
      hasRun.current = true;
      getToken();
    }
  }, [code, token]);

  useEffect(() => {
    if (token) {
      getUserInfo(token);
    }
  }, [token]);

  useEffect(() => {
    if (userId && token) {
      getPlaylists(userId);
    }
  }, [userId, token]);

  useEffect(() => {
    if (selectedPlaylist && token) {
      getTracks(selectedPlaylist);
    }
  }, [selectedPlaylist, token]);

  useEffect(() => {
    if (token && selectedPlaylist && deviceId) {
      playTrack();
    }
  }, [token, selectedPlaylist, deviceId]);

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
    
    // Filter out items with null track
    const validTracks = data.items.filter((item: any) => item.track?.uri);
    setTracks(validTracks);
    getCurrentTrack();
  }

  const transferPlayback = async () => {
    if(!deviceId || !token) return;
    await fetch(`https://api.spotify.com/v1/me/player`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true
      }),
    }); 
  }

  const playTrack = async () => {
    await transferPlayback();
    const playlistUri = `spotify:playlist:${selectedPlaylist}`;
    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        context_uri: playlistUri,
        offset: { position: 0 },
        position_ms: 0
      }),
    });
    
  };


  const auth = !token ? <Login /> : 
    <>
      <Nav userInfo={userInfo} isLoggedIn={!!token} />
      <Contianer>
        <TrackView>
          <TrackInfo currentTrack={currentTrack} />
        </TrackView>

        <Side>
          <Sidebar 
            playlists={userPlaylists} 
            onSelectedPlaylist={setSelectedPlaylist} 
            token={token} 
            tracks={tracks} 
            onDeviceReady={setDeviceId}
            onCurrentTrackChange={setCurrentTrack} />
        </Side>
      </Contianer>
    </>;

  return <>{auth}</>;
}

export default App
