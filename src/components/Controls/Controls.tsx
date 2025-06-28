import { useEffect, useState } from 'react';
import { ControlsContainer, PlaylistButton } from './Controls.styles';
type Track = {
    name: string;
    album: {
        images: { url: string }[];
    };
    artists: { name: string }[];
};

const initialTrack: Track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
};

type ControlsProps = {
    token: string;
    tracks?: any[];
    onDeviceReady?: (deviceId: string) => void;
    onCurrentTrackChange?: (track: Track) => void;
};



const Controls = ({ token, onDeviceReady, tracks, onCurrentTrackChange }: ControlsProps) => {
    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
    const [isPaused, setPaused] = useState<boolean>(false);
    const [isActive, setActive] = useState<boolean>(false);
    const [currentTrack, setTrack] = useState<Track>(tracks?.[0] || initialTrack);
    
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
                onCurrentTrackChange?.(state.track_window.current_track);
            }));

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });


            player.connect();

        };
    }, [token]);
    
return (
    <ControlsContainer>
        <PlaylistButton
            onClick={async () => { if (player) await player.previousTrack(); }}
            disabled={!player}
        >
            &lt;&lt;
        </PlaylistButton>

        <PlaylistButton
            onClick={async () => { if (player) await player.togglePlay(); }}
            disabled={!player}
        >
            {isPaused ? ">" : "||"}
        </PlaylistButton>

        <PlaylistButton
            onClick={async () => { if (player) await player.nextTrack(); }}
            disabled={!player}
        >
            &gt;&gt;
        </PlaylistButton>
    </ControlsContainer>
)

}
export default Controls;

