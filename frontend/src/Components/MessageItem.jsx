const MessageItem = (props) => {
    return(
        <div className="text-break mb-2">
            <b>{props.username}</b> : {props.message}
        </div>
    );
}

export default MessageItem;