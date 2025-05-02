import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { home, homeOutline, person, personCircle, personCircleOutline, personOutline, phoneLandscape, phonePortrait, phonePortraitOutline, shieldOutline } from 'ionicons/icons';

import Home from './Home';
import AdminPage from '../modules/Administrator/adminScreen'
import ProtectedRoute from '../components/segurity/ProtectedRouter';
import { useAuthStore } from '../store/useAuthStore';
import Account from './Account';
import DeviceInfoPage from './DeviceInfoPage';

const Tabs: React.FC = () => {
  const role = useAuthStore((state) => state.role);



  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" exact component={Home} />
        <Route path="/tabs/account" exact component={Account} />
        <Route path="/tabs/device" exact component={DeviceInfoPage} />

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
        <IonTabButton tab="device" href="/tabs/device">
          <IonIcon icon={phonePortraitOutline} />
          <IonLabel>My Device</IonLabel>
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
