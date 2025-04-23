import { IonButton, IonIcon } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const BackButton: React.FC = () => {
    const history = useHistory();

    return (
       <>
            <button
                onClick={() => history.goBack()}
                className="m-4 p-2 w-fit !rounded-xl !border-2 !border-gray-200/20 bg-white shadow-sm transition"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-10 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
       </>
    );
};

export default BackButton;