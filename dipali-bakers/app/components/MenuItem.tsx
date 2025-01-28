'use client'

import { useState } from 'react'
import styles from './MenuItem.module.css'

interface MenuItemProps {
  id: number
  name: string
  price: number
  onQuantityChange: (id: number, quantity: number) => void // Prop to notify parent
}

export default function MenuItem({ id, name, price,onQuantityChange  }: MenuItemProps) {
  const [quantity, setQuantity] = useState(0)

  const handleIncrement = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onQuantityChange(id, newQuantity) // Notify parent
  }

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - 1)
    setQuantity(newQuantity)
    onQuantityChange(id, newQuantity) // Notify parent
  }


  return (
    <tr className={styles.row}>
      <td className={styles.name} data-price={price}>{name}</td>
      <td className={styles.price}>₹{price}</td>
      <td className={styles.counter}>
        <button onClick={handleDecrement} className={styles.button}>-</button>
        <span className={styles.quantity}>{quantity}</span>
        <button onClick={handleIncrement} className={styles.button}>+</button>
      </td>
    </tr>
  )
}

