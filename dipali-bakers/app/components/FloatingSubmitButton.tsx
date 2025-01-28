'use client'

import { useState } from 'react'
import styles from './FloatingSubmitButton.module.css'
import { menuItems, menuSections, phoneNumber } from '../data/itemsData'

interface FloatingSubmitButtonProps {
  quantities: { [key: number]: number }
  printItems: () => void 
  tableNumber: number
  phoneNumber: string
}


export default function FloatingSubmitButton({printItems, quantities, tableNumber, phoneNumber} : FloatingSubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const serializeMenuData = () => {
    let serializedData = 'Order Summary\n==============\nName\tQuantity\n-----------------------\n'; // Header row for the table
  
    menuSections.forEach((section) => {
  
      menuItems[section.id as keyof typeof menuItems].forEach((item) => {
        const quantity = quantities[item.id] ?? 0;
  
        if (quantity <= 0) {
          return; // Skip items with zero or undefined quantity
        }
  
        const line = `${item.name}\t${quantity}`;
        serializedData += `${line}\n`; 
      });
    });
  
    return encodeURIComponent(serializedData);
  };

  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // a flase timeout for user experience
    setTimeout(() => {
      setIsSubmitting(false)
    }, 1000)

    printItems();
    const url_menu = serializeMenuData(); 
    phoneNumber = phoneNumber
    const table_number = tableNumber; // table number from parent
    const ending_message = encodeURIComponent(`\n\n--- Info for Staff ---\nTable Number: ${table_number}\n--- Add Special Instructions ---\n\n\n----- Click 'Send Button' to place the order-----`);
    const url_to_hit = `https://wa.me/${phoneNumber}?text=${url_menu}${ending_message}`;

    console.log(url_to_hit)
    window.open(url_to_hit, '_blank');
    // hitting whatsapp url in a new tab
  }

  return (
    <button 
      className={`${styles.button} ${isSubmitting ? styles.submitting : ''}`} 
      onClick={handleSubmit}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Submitting...' : 'Submit Order'}
    </button>
  )
}

