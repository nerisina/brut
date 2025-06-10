interface SidebarProps {
    playlists: any[]; // Expecting an array of playlist names or IDs
}

const Sidebar = ({playlists}: SidebarProps) => {
    return(
        <>
        <select id="sidebar-playlist-select">
            {playlists.map((playList) => (
                <option key={playList.id} value={playList.value}>
                    {playList.name}
                </option>
            ))}
        </select>
        </>
    )
};
export default Sidebar