
import { TrackInfoContainer, TrackName, TrackAlbum } from "./styles";  
interface TrackInfoProps {
    currentTrack: any
}
const TrackInfo = ({ currentTrack }: TrackInfoProps) => {

    return (
        <TrackInfoContainer>
            <TrackName><h1>{currentTrack?.name || "No track selected"}</h1></TrackName>
            <TrackAlbum><h3>{currentTrack?.album?.name || "Unknown Album"}</h3></TrackAlbum>
        </TrackInfoContainer>
    );
}

export default TrackInfo;