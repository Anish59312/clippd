import React from 'react';
import styles from './TakeUserInfo.module.css'



const TakeUserInfoButton: React.FC<{ toggleModal: () => void }> = ({ toggleModal }) => {

    return (
        <button onClick={toggleModal} className={styles.button}>
            Take User Info
        </button>
    );
};

export default TakeUserInfoButton;
