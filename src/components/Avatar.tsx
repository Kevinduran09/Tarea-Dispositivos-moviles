import React, { useState } from 'react';
import { IonAvatar, IonContent, IonPopover } from '@ionic/react';
import { useHistory } from 'react-router';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthStore } from '../store/useAuthStore';


function Avatar() {
    const [showPopover, setShowPopover] = useState(false);
    const auth = getAuth();
    const history = useHistory();
    const [popoverEvent, setPopoverEvent] = useState<any>(null);
    const { user } = useAuthStore()
    async function handleLogout() {
        await signOut(auth);
        
        history.push('/login');
    }

    const presentPopover = (e: React.MouseEvent) => {
        e.persist();
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };
    return (
        <>
            <div>
                <IonAvatar id="click-trigger" className='size-10' onClick={presentPopover}>
                    <img alt="Silhouette of a person's head" src={user?.photoURL ? user.photoURL : "https://ionicframework.com/docs/img/demos/avatar.svg"} />
                </IonAvatar>
                <IonPopover
                    event={popoverEvent} isOpen={showPopover} onDidDismiss={() => setShowPopover(false)} className='notifications-popover'
                >
                    <IonContent class="ion-padding">
                        <button className='text-red-500 font-semibold' onClick={handleLogout}>
                            <span>Log out</span>
                        </button>
                    </IonContent>
                </IonPopover>
            </div>
        </>
    );
}

export default Avatar;
