import React from 'react';
import {useUser} from "./authentication/UserContext";
import FullPageSpinner from "./utils/FullPageSpinner";

const loadAuthenticatedApp = () => import('./authentication/AuthenticatedApp');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() => import('./authentication/UnauthenticatedApp'));

function App() {    const user = useUser();
    React.useEffect(() => {
        loadAuthenticatedApp();
    }, []);

    return (
        <React.Suspense fallback={<FullPageSpinner />}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
    );
}

export default App;
