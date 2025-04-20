import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import routes from '../routes.js';
import ChatContainer from '../Components/ChatContainer.jsx';
import selectModal from '../Components/Modals/selectModal.js';
import { typeSelector } from '../store/slices/modalSlice.js';
import { useSelector } from 'react-redux';

const MainPage = () => {
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);
    const modalType = useSelector(typeSelector);
    const Modal = selectModal[modalType];

    useEffect(() => {
        if (!loggedIn) {
            navigate(routes.loginPagePath);
        }
    }, []);

    return (
        <>
            <ChatContainer />
            {Modal ? <Modal /> : ''}
        </>

    );
}

export default MainPage;
