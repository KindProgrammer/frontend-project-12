import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import routes from '../routes.js';

const MainPage = () => {
    const navigate = useNavigate();
    const { loggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!loggedIn) {
            navigate(routes.loginPagePath);
        }
    }, []);

    return (
        <h1>MainPage</h1>
    );
}

export default MainPage;