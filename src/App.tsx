import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';


/* Pages */
import { LoginScreen } from './modules/LoginPage/LoginScreen';
import Tabs from './pages/Tabs';

import { RegisterScreen } from './pages/Register';

/* Components */
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
import './theme/maps.css'
import { useAuth } from './hooks/useAuth';
import SplashScreen from './components/SplashScreen';
import { useEffect } from 'react';
setupIonicReact();


const App: React.FC = () => {
  const { loading, user } = useAuth(); 

  // Usamos un useEffect para asegurar que el componente se renderice correctamente después de que loading y user cambien
  useEffect(() => {
  
  }, [loading, user]);

  if (loading) {
  
    return <SplashScreen/>
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {user ? (
            <>
              <Route path="/tabs" render={() => <Tabs />} />
              <Route exact path="/">
                <Redirect to="/tabs/home" />
              </Route>
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
