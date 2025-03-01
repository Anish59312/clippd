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

interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void; // Added onClose prop
}

const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {

    
    // Removed the previous onClose function


    return (
        isOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                    <button onClick={onClose} className={styles.closeButton} type="button">
                        <Close className="w-8 h-8 text-blue-500" />
                    </button>
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    );
};

export default SubmitModal;
