interface TrackInfoProps {
    currentTrack: any
}
const TrackInfo = ({ currentTrack }: TrackInfoProps) => {

    return (
        <div>
            <h1>{currentTrack?.name || "No track selected"}</h1>
            <h3>Artist: {currentTrack?.artists[0]?.name || "Unknown Artist"} : {currentTrack?.album?.name || "Unknown Album"}</h3>  
        </div>
    );
}

export default TrackInfo;