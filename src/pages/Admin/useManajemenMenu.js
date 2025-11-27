"use client"

import { useState } from "react"

export default function useManajemenMenu() {
  const [activeCategory, setActiveCategory] = useState("hot")

  const categories = [
    { id: "hot", label: "Hot Series", icon: "☕" },
    { id: "cold", label: "Cold Series", icon: "🥤" },
    { id: "small", label: "Small Bite", icon: "🍪" },
  ]

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Nama Menu", price: 23000, category: "hot", image: null },
    { id: 2, name: "Nama Menu", price: 23000, category: "hot", image: null },
    { id: 3, name: "Nama Menu", price: 23000, category: "cold", image: null },
    { id: 4, name: "Nama Menu", price: 23000, category: "small", image: null },
  ])

  const filteredItems = menuItems.filter((item) =>
    item.selectedCategories?.length > 0
      ? item.selectedCategories.includes(activeCategory)
      : item.category === activeCategory,
  )

  const addMenuItem = (newItem) => {
    setMenuItems([...menuItems, newItem])
  }

  const deleteMenuItem = (itemId) => {
    setMenuItems(menuItems.filter((item) => item.id !== itemId))
  }

  return {
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
    menuItems,
    addMenuItem,
    deleteMenuItem,
  }
}
