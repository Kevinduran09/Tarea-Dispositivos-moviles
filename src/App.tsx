import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

/* Pages */
import { LoginScreen } from './modules/LoginPage/LoginScreen';
import Home from './pages/Home';
import Account from './pages/Account';
import Tabs from './pages/Tabs';

import { RegisterScreen } from './pages/Register';

/* Components */
import ProtectedRoute from './components/segurity/ProtectedRouter';  // Componente para ruta protegida

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import { useState, useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('firebase user: ', firebaseUser);
      
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return null; // O un splash screen

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {user ? (
            <>
              <Route path="/tabs" render={() => <Tabs />} />
              <Redirect exact from="/" to="/tabs/home" />
            </>
          ) : (
            <>
              <Route path="/login" exact component={LoginScreen} />
              <Route path="/register" exact component={RegisterScreen} />
              <Redirect to="/login" />
            </>
          )}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
