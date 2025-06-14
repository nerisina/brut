import { useEffect, useState } from 'react';
type ControlsProps = {
    token: string;
    tracks?: any[];
    onDeviceReady?: (deviceId: string) => void;
};

const initialTrack = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}


const Controls = ({token, onDeviceReady, tracks}: ControlsProps) => {
    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);;
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState<SpotifyTrack>(tracks?.[0] || initialTrack);
    
    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);
        // Type the window object for the SDK ready callback
        window.onSpotifyWebPlaybackSDKReady = () => {
            if (!window.Spotify) {
                console.error("Spotify SDK not available.");
                return;
            }

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });

            setPlayer(player);
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                onDeviceReady?.(device_id);
            });
            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
                player.getCurrentState().then(state => {
                    setActive(!!state);
                });
            }));

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });


            player.connect();

        };
    }, [token]);
    
return (
    <div>
        <button
            className="btn-spotify"
            onClick={() => { if (player) player.previousTrack(); }}
            disabled={!player}
        >
            &lt;&lt;
        </button>

        <button
            className="btn-spotify"
            onClick={() => { if (player) player.togglePlay(); }}
            disabled={!player}
        >
            {is_paused ? "PLAY" : "PAUSE"}
        </button>

        <button
            className="btn-spotify"
            onClick={() => { if (player) player.nextTrack(); }}
            disabled={!player}
        >
            &gt;&gt;
        </button>

        <div className="container">
            <div className="main-wrapper">
                <img src={current_track.album.images[0].url}
                    className="now-playing__cover" alt="" />

                <div className="now-playing__side">
                    <div className="now-playing__name">
                        {current_track.name}
                    </div>

                    <div className="now-playing__artist">
                        {current_track.artists[0].name}
                    </div>
                </div>
            </div>
        </div>
    </div>
)

}
export default Controls;