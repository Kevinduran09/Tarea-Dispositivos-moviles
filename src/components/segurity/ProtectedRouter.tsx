import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthStore } from '../../context/userStore';


interface ProtectedRouteProps extends RouteProps {
    component: React.ComponentType<any>;
    roleRequired: string;  
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, roleRequired, ...rest }) => {
    const user = useAuthStore((state) => state.user); 
    const role = useAuthStore((state) => state.role);
    
    if (user && role === roleRequired) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
        return <Redirect to="/tabs/home" />;
    }
};

export default ProtectedRoute;