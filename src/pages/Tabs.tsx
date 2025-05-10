import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { homeOutline, personCircleOutline, phonePortraitOutline, shieldOutline,phoneLandscapeOutline, mapOutline } from 'ionicons/icons';

import Home from './Home';
import AdminPage from '../modules/Administrator/adminScreen'
import ProtectedRoute from '../components/segurity/ProtectedRouter';
import { useAuthStore } from '../store/useAuthStore';
import Account from './Account';
import DeviceInfoPage from './DeviceInfoPage';
import Acelerometro from './Acelerometro';
import Maps from './MapsPage';

const Tabs: React.FC = () => {
  const role = useAuthStore((state) => state.role);



  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" exact component={Home} />
        <Route path="/tabs/account" exact component={Account} />
        <Route path="/tabs/map" exact component={Maps} />
        <Route path="/tabs/acelerometro" exact component={Acelerometro} />

        {/* Ruta protegida para Admin */}
        <ProtectedRoute path="/tabs/admin" roleRequired="admin" component={AdminPage} />

        <Redirect exact from="/tabs" to="/tabs/home" />
        <Route path="tabs/*">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="account" href="/tabs/account">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Account</IonLabel>
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={mapOutline} />
          <IonLabel>Mapa</IonLabel>
        </IonTabButton>
        <IonTabButton tab="acelerometro" href="/tabs/acelerometro">
          <IonIcon icon={phoneLandscapeOutline} />
          <IonLabel>Acelerometro</IonLabel>
        </IonTabButton>
        {/* Mostrar el tab de Admin solo si el rol es 'admin' */}
        {role === 'admin' && (
          <IonTabButton tab="admin" href="/tabs/admin">
            <IonIcon icon={shieldOutline} />
            <IonLabel>Admin</IonLabel>
          </IonTabButton>
        )}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
