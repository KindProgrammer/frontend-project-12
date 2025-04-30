import React from "react";
import PropTypes from 'prop-types';

const MessageItem = (props) => {
    const username = props.username;
    const message = props.message;
    return(
        <div className="text-break mb-2">
            <b>{username}</b> : {message}
        </div>
    );
}

MessageItem.PropTypes = {
    username: PropTypes.string,
    message: PropTypes.string
}

export default MessageItem;