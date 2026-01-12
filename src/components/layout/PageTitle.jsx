import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = 'Nebula Pro';

        switch (true) {
            case path === '/':
            case path === '/dashboard':
                title = 'Dashboard | Nebula Pro';
                break;
            case path === '/orders':
                title = 'Orders | Nebula Pro';
                break;
            case path === '/products':
                title = 'Products | Nebula Pro';
                break;
            case path === '/customers':
                title = 'Customers | Nebula Pro';
                break;
            case path === '/settings':
                title = 'Settings | Nebula Pro';
                break;
            case path === '/login':
                title = 'Sign In | Nebula Pro';
                break;
            default:
                title = 'Nebula Pro';
        }

        document.title = title;
    }, [location]);

    return null;
};

export default PageTitle;
