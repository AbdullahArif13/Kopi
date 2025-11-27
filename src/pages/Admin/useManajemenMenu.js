"use client"

import { useState } from "react"

export default function useManajemenMenu() {
  const [activeCategory, setActiveCategory] = useState("hot")

  const categories = [
    { id: "hot", label: "Hot Series", icon: "☕" },
    { id: "cold", label: "Cold Series", icon: "🥤" },
    { id: "small", label: "Small Bite", icon: "🍪" },
  ]

  const [menuItems] = useState([
    { id: 1, name: "Nama Menu", price: 23000, category: "hot", image: null },
    { id: 2, name: "Nama Menu", price: 23000, category: "hot", image: null },
    { id: 3, name: "Nama Menu", price: 23000, category: "hot", image: null },
    { id: 4, name: "Nama Menu", price: 23000, category: "hot", image: null },
  ])

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  return {
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
  }
}
