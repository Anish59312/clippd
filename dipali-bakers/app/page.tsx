'use client'

// TODO: make python app to make changes to itemsData
// TODO: make the site responsive - quantity on mobile mode, alignment  & margin of header quantity.

import Navigation from './components/Navigation'
import MenuSection from './components/MenuSection'
import FloatingSubmitButton from './components/FloatingSubmitButton'
import {menuItems, menuSections, phoneNumber} from './data/itemsData'
import { useState, useEffect } from 'react'

export default function Home() {

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [tableNumber, setTableNumber] = useState<number>(0);

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: quantity
    }))
  }

  useEffect(() => {
    const getTableNumber = () => {
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(new URL(currentUrl).search);
      const tableNumber = urlParams.get('table_number') || '';
      return tableNumber
    }

    setTableNumber(parseInt(getTableNumber(), 10));
  },[]);

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

  return (
    // <main className="min-h-screen pb-16">
    <main className="min-h-screen pb-16 max-w-4xl mx-auto px-4">
      <Navigation sections={menuSections} />
      {menuSections.map((section) => (
        <MenuSection
          key={section.id}
          id={section.id}
          title={section.title}
          items={menuItems[section.id as keyof typeof menuItems]}
          onQuantityChange={handleQuantityChange} // Pass handler
        />
      ))}
      <FloatingSubmitButton phoneNumber={phoneNumber} printItems={printItems} quantities={quantities} tableNumber={tableNumber}/>
    </main>
  )
}

