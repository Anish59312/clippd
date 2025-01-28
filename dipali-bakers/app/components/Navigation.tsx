// 'use client'

// import { useState, useEffect } from 'react'
// import styles from './Navigation.module.css'

// interface NavigationProps {
//   sections: { id: string; title: string }[]
// }

// export default function Navigation({ sections }: NavigationProps)
// {
//   const [activeSection, setActiveSection] = useState('')

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY
//       const sectionElements = sections.map((section) => document.getElementById(section.id))
      
//       const currentSection = sectionElements.reduce((acc, section) => {
//         if (section && section.offsetTop <= scrollPosition + 100) {
//           return section.id
//         }
//         return acc
//       }, '')

//       setActiveSection(currentSection)
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [sections])

//   return (
//     <nav className={styles.navigation}>
//       {sections.map((section) => (
//         <a
//           key={section.id}
//           href={`#${section.id}`}
//           className={`${styles.navLink} ${activeSection === section.id ? styles.active : ''}`}
//         >
//           {section.title}
//         </a>
//       ))}
//     </nav>
//   )
// }


'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Navigation.module.css'

interface NavigationProps {
  sections: { id: string; title: string }[]
}

export default function Navigation({ sections }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [needsCollapse, setNeedsCollapse] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Check if navigation height exceeds threshold
  useEffect(() => {
    const checkHeight = () => {
      if (navRef.current) {
        const navHeight = navRef.current.scrollHeight
        const shouldCollapse = navHeight > 100 // Adjust threshold as needed
        setNeedsCollapse(shouldCollapse)
        setIsCollapsed(shouldCollapse)
      }
    }

    checkHeight()
    window.addEventListener('resize', checkHeight)
    return () => window.removeEventListener('resize', checkHeight)
  }, [])

  // Handle scroll to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const sectionElements = sections.map((section) => document.getElementById(section.id))
      
      const currentSection = sectionElements.reduce((acc, section) => {
        if (section && section.offsetTop <= scrollPosition + 100) {
          return section.id
        }
        return acc
      }, '')

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <div>
    <nav 
      ref={navRef}
      className={`${styles.navigation} ${needsCollapse && isCollapsed ? styles.collapsed : ''}`}
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`${styles.navLink} ${activeSection === section.id ? styles.active : ''}`}
        >
          {section.title}
        </a>
      ))}
    </nav>

    {/* Dropdown button */}
    {needsCollapse && (
        <div className={styles.buttonBackdrop}>
          <button
            className={`${styles.expandButton} ${!isCollapsed ? styles.expanded : ''}`}
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand menu' : 'Collapse menu'}
          />
        </div>
      )}
    </div>
  )
}