import MenuItem from './MenuItem'
import styles from './MenuSection.module.css'

interface MenuSectionProps {
  id: string
  title: string
  items: { id: number; name: string; price: number }[]
  onQuantityChange: (id: number, quantity: number) => void // Parent's handler
}

export default function MenuSection({ id, title, items, onQuantityChange }: MenuSectionProps) {
  return (
    <section id={id} className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th className='to-remove-sm'>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <MenuItem key={item.id} {...item} onQuantityChange={onQuantityChange}  />
            ))}
          </tbody>
        </table>
    </section>
  )
}

