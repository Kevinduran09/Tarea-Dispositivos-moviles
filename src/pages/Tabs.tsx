import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { home, mail, person } from 'ionicons/icons';

import Home from './Home';
import ViewMessage from './ViewMessage';
import AdminPage from '../modules/Administrator/adminScreen' // Ruta protegida para Admin
import ProtectedRoute from '../components/segurity/ProtectedRouter'; // Componente de ruta protegida
import { useAuthStore } from '../store/userStore';

const Tabs: React.FC = () => {
   const role = useAuthStore((state) => state.role);
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" exact component={Home} />
        <Route path="/tabs/messages" exact component={ViewMessage} />

        {/* Ruta protegida para Admin */}
        <ProtectedRoute path="/tabs/admin" roleRequired="admin" component={AdminPage} />

        <Redirect exact from="/tabs" to="/tabs/home" />
        <Route path="tabs/*">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
       
        {/* Mostrar el tab de Admin solo si el rol es 'admin' */}
        {role ==='admin' && (
          <IonTabButton tab="admin" href="/tabs/admin">
            <IonIcon icon={person} />
            <IonLabel>Admin</IonLabel>
          </IonTabButton>
        )}
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
