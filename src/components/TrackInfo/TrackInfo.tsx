interface TrackInfoProps {
    tracks?: any[]
}
const TrackInfo = ({ tracks }: TrackInfoProps) => {   
    return ( 
        <div>
            {tracks?.map((track) => (
                
                <div key={track.track.id} className="track-info">
                    <img src={track.track.album.images[0].url} alt={track.track.name} />
                    <div className="track-details">
                        <h3>{track.track.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TrackInfo;