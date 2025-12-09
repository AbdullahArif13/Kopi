import { generateOrderCode } from "../utils/generateOrderCode";

export const ordersDummy = [
  {
    id: 1,
    orderNumber: generateOrderCode(),
    customerName: "Budi Santoso",
    tableNumber: "Lantai 1 - 5",
    status: "pending",
    createdAt: "2025-01-01 10:23",
    items: [
      { id: 101, name: "Kopi Latte", qty: 2, price: 18000 },
      { id: 102, name: "Americano", qty: 1, price: 15000 }
    ],
    notes: "Kurang manis sedikit",
  },
  {
    id: 2,
    orderNumber: generateOrderCode(),
    customerName: "Rina Wijaya",
    tableNumber: "Lantai 1 - 12",
    status: "ongoing",
    createdAt: "2025-01-01 10:45",
    items: [
      { id: 103, name: "Espresso", qty: 1, price: 12000 },
      { id: 104, name: "Matcha Latte", qty: 1, price: 25000 }
    ],
    notes: "",
  },
  {
    id: 3,
    orderNumber: generateOrderCode(),
    customerName: "Andi Pratama",
    tableNumber: "Lantai 1 - 27",
    status: "done",
    createdAt: "2025-01-01 11:02",
    items: [
      { id: 105, name: "Caramel Macchiato", qty: 1, price: 22000 }
    ],
    notes: "Panaskan ya",
  }
];
