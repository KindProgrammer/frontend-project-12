const ChannelControlsButton = ({ channel, activeChannel, handleClick }) => {
    if (channel.removable) {
        return (
            <div className="dropdown d-flex">
                <button 
                    onClick={() => {handleClick(channel)}} 
                    type="button" 
                    className={`w-100 rounded-0 text-start text-truncate btn ${activeChannel.id === channel.id ? 'btn-secondary' : ''}`}
                >
                    <span className="me-1">#</span>
                    {channel.name}
                </button>
                <button 
                    type="button" 
                    id="channelMenuButton" 
                    className={`btn dropdown-toggle rounded-0 ${activeChannel.id === channel.id ? 'btn-secondary' : ''}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    </button>
                <ul className="dropdown-menu" aria-labelledby="channelMenuButton">
                    <li><a className="dropdown-item" href="#">Удалить</a></li>
                    <li><a className="dropdown-item" href="#">Переименовать</a></li>
                </ul>
            </div>
        )
    }

    return (
        <button 
            onClick={() => {handleClick(channel)}} 
            type="button" 
            className={`w-100 rounded-0 text-start text-truncate btn ${activeChannel.id === channel.id ? 'btn-secondary' : ''}`}
        >
            <span className="me-1">#</span>
            {channel.name}
        </button>
    );
}

export default ChannelControlsButton;