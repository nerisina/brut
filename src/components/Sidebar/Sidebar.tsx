import Controls from "../Controls/Controls";

interface SidebarProps {
    playlists: any[]; // Expecting an array of playlist names or IDs
    onSelectedPlaylist: (playlistId: string) => void; // Optional callback for when a playlist is selected
    token: string; // Token prop for Controls component (required)
    tracks: any[]; // Tracks prop for Controls component (required)
    onDeviceReady: (deviceId: string) => void; // Callback for when the device is ready
}


const Sidebar = ({ playlists, onSelectedPlaylist, token, tracks, onDeviceReady }: SidebarProps) => {
    const handlePlaylistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlaylist = e.target.value;
        onSelectedPlaylist?.(selectedPlaylist);
    };
    
    function setDeviceId(deviceId: string): void {
        onDeviceReady(deviceId);
    }

    return(
        <>
            <Controls token={token} tracks={tracks} onDeviceReady={setDeviceId} />
        <select id="sidebar-playlist-select" onChange={handlePlaylistChange}>
            {playlists.map((playList) => (
                <option key={playList.id} value={playList.id}>
                    {playList.name}
                </option>
            ))}
        </select>
        </>
    )
};
export default Sidebar