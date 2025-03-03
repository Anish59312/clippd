'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux';
import styles from './FloatingSubmitButton.module.css'
import { menuItems, menuSections, phoneNumber } from '../data/itemsData'

interface FloatingSubmitButtonProps {
  quantities: { [key: number]: number }
  name: string; // Added name prop
}

export default function FloatingSubmitButton({quantities, name} : FloatingSubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  var totalCost = 0;

  const printItems = () => {
    menuSections.forEach((section) => {
      const sectionTitle = section.title
      console.log(`\nSection: ${sectionTitle}`)

      menuItems[section.id as keyof typeof menuItems].forEach((item) => {
        const quantity = quantities[item.id] || 0 
        console.log(`Item: ${item.name}, Price: ₹${item.price}, Quantity: ${quantity}`)
      })
    })
  }

  const serializeMenuData = () => {
    let serializedData = 'Order Summary\n==============\nName\tQty\tPrice\n-----------------------\n'; // Header row for the table
  
    menuSections.forEach((section) => {
      menuItems[section.id as keyof typeof menuItems].forEach((item) => {
        const quantity = quantities[item.id] ?? 0;
  
        if (quantity <= 0) {
          return; // Skip items with zero or undefined quantity
        }
  
        totalCost += item.price * quantity

        const line = `${item.name}\t${quantity}\t${item.price * quantity}`;
        serializedData += `${line}\n`; 
      });
    });
  
    return encodeURIComponent(serializedData);
  };

  const handleSubmit = () => {

    if(name == ''){
      alert('enter you name');
      return;
    }

    setIsSubmitting(true);
    
    // reset isSubmitting after 1 sec
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);

    printItems();
    const url_menu = serializeMenuData(); 
    const ending_message = encodeURIComponent(`\n\n--- Send Payment Screenshot for Order Confirmation ---\n\n\n----- Click 'Send Button' to place the order-----\nTotal - ${totalCost}Rs. Name: ${name}`);
    const url_to_hit = `https://wa.me/${phoneNumber}?text=${url_menu}${ending_message}`;

    console.log(url_to_hit);
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
