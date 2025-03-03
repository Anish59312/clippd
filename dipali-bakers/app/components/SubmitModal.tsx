import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '../../components/ui/card';
import styles from './SubmitModal.module.css';
import Close from '../icons/close.svg'
import Info from '../icons/info.svg'
import FloatingSubmitButton from './FloatingSubmitButton'

const InfoLink = "https://drive.google.com/file/d/1nLjQXPC3UL8mUVRpyCuVv5gxI21IC-_T/view?usp=sharing"

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    quantites: { [key: number]: number }
}

const SubmitModal: React.FC<SubmitModalProps> = ({ quantites, isOpen, onClose }) => {
    const [name, setName] = useState('');


    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <Card>
                        <CardHeader>
                            <div className='flex w-auto mb-2'>
                                <a href={InfoLink}
                                target='_blank'
                                ><Info className="w-6 h-6 text-blue-500"/></a>
                                <span className='flex-grow'></span>
                                <button onClick={onClose} className={styles.closeButton} type="button">
                                    <Close className="w-6 h-6 text-blue-500" />
                                </button>
                            </div>
                            <input className={styles.takeInput}
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                required
                            />
                        </CardHeader>
                        {/* <CardContent className='font-light'>Amount payable will be given in next step</CardContent> */}
                        <CardFooter>
                            <FloatingSubmitButton quantities={quantites} name={name} />
                            <br/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    );
};

export default SubmitModal;
