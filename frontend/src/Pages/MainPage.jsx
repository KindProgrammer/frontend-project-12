import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import routes from '../routes.js';
// import ChannelsList from '../Components/ChannelsList.jsx';
import ChatContainer from '../Components/ChatContainer.jsx';

const MainPage = () => {
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!loggedIn) {
            navigate(routes.loginPagePath);
        }
    }, []);

    return (
            <ChatContainer />
    );
}

export default MainPage;
