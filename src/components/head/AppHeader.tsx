import React from "react";
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonMenuButton } from "@ionic/react";
import NotificationIcon from "../notification/notificationicon";
import "../notification/notificationicon.css";
import Avatar from "../Avatar";

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, showBackButton = false, showMenuButton = false }) => {
  return (
    <IonHeader>
      <IonToolbar className="px-2">
        <IonButtons slot='start'>
          {showBackButton && <IonBackButton defaultHref='/' />}
          {showMenuButton && <IonMenuButton />}
        </IonButtons>

        <IonTitle>{title}</IonTitle>

        <IonButtons slot='end'>
         <div className="flex flex-row justify-center items-center">
            <Avatar />
            <NotificationIcon />
         </div>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
