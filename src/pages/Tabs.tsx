import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { homeOutline, personCircleOutline, shieldOutline, phoneLandscapeOutline, mapOutline, imagesOutline, qrCodeOutline } from 'ionicons/icons';

import Home from './Home';
import AdminPage from '../modules/Administrator/adminScreen'
import ProtectedRoute from '../components/segurity/ProtectedRouter';
import { useAuthStore } from '../store/useAuthStore';
import Account from './Account';
import Acelerometro from './Acelerometro';
import Maps from './MapsPage';
import GalleryPage from './GalleryPage';
import { Style } from '@capacitor/status-bar';
import { StatusBar } from '@capacitor/status-bar';
import { useEffect } from 'react';
import { QRPage } from './QRPage';

const Tabs: React.FC = () => {
  const role = useAuthStore((state) => state.role);

  useEffect(() => {
    setupStatusBar();
  }, []);

  const setupStatusBar = async () => {
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#ffffff' });
      await StatusBar.setOverlaysWebView({ overlay: false });
    } catch (error) {
      console.error('Error setting up status bar:', error);
    }
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" exact component={Home} />
        <Route path="/tabs/account" exact component={Account} />
        <Route path="/tabs/map" exact component={Maps} />
        <Route path="/tabs/acelerometro" exact component={Acelerometro} />
        <Route path="/tabs/gallery" exact component={GalleryPage} />
        <Route path="/tabs/qr" exact component={QRPage} />
        <ProtectedRoute path="/tabs/admin" roleRequired="admin" component={AdminPage} />

        <Redirect exact from="/tabs" to="/tabs/home" />
        <Route path="tabs/*">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom" className="ion-tab-bar">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>

        <IonTabButton tab="gallery" href="/tabs/gallery">
          <IonIcon icon={imagesOutline} />
          <IonLabel>Galería</IonLabel>
        </IonTabButton>

        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={mapOutline} />
          <IonLabel>Mapa</IonLabel>
        </IonTabButton>

        <IonTabButton tab="qr" href="/tabs/qr">
          <IonIcon icon={qrCodeOutline} />
          <IonLabel>QR</IonLabel>
        </IonTabButton>

        <IonTabButton tab="acelerometro" href="/tabs/acelerometro">
          <IonIcon icon={phoneLandscapeOutline} />
          <IonLabel>Acelerómetro</IonLabel>
        </IonTabButton>

        <IonTabButton tab="account" href="/tabs/account">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Cuenta</IonLabel>
        </IonTabButton>

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
