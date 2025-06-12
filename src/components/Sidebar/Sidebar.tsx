interface SidebarProps {
    playlists: any[]; // Expecting an array of playlist names or IDs
    onSelectedPlaylist: (playlistId: string) => void; // Optional callback for when a playlist is selected
}


const Sidebar = ({ playlists, onSelectedPlaylist }: SidebarProps) => {
    const handlePlaylistChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPlaylist = e.target.value;
        onSelectedPlaylist?.(selectedPlaylist);
    };
    
    return(
        <select id="sidebar-playlist-select" onChange={handlePlaylistChange}>
            {playlists.map((playList) => (
                <option key={playList.id} value={playList.id}>
                    {playList.name}
                </option>
            ))}
        </select>
    )
};
export default Sidebar