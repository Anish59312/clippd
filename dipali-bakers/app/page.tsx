'use client'

//TODO Add floating modal for name submission
//TODO Routing not working

import Navigation from './components/Navigation'
import MenuSection from './components/MenuSection'
import FloatingSubmitButton from './components/FloatingSubmitButton'
import {menuItems, menuSections} from './data/itemsData'
import TakeUserInfoButton from './components/TakeUserInfoButton' 
import { useState, useEffect } from 'react'
import SubmitModal from './components/SubmitModal'
import { useSelector, useDispatch, Provider } from 'react-redux';
import { setTableNumber } from './store';



export default function Home() {

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
  const [tableNumber,setTableNumber] = useState(0)

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

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
      const tableNumberFromUrl = urlParams.get('table_number') || '';
      return tableNumberFromUrl;
    }

    setTableNumber(parseInt(getTableNumber()))
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
      
      {/* <FloatingSubmitButton tableNumber={tableNumber} phoneNumber={phoneNumber} quantities={quantities} /> */}
      <TakeUserInfoButton toggleModal={toggleModal} />
      <SubmitModal isOpen={isOpen} onClose={toggleModal} quantites={quantities} />
    </main>
  )
}
