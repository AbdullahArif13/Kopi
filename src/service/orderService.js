import axiosClient from "./axiosClient";
import { ordersDummy } from "../data/ordersData";
import { generateOrderCode } from "../utils/generateOrderCode";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const orderService = {
  async getOrders() {
    try {
      const res = await axiosClient.get("/orders");
      return res.data;
    } catch (err) {
      console.warn("API Order belum tersedia. Menggunakan dummy...");
      await delay(300);
      return ordersDummy;
    }
  },

  async getOrderById(id) {
    try {
      const res = await axiosClient.get(`/orders/${id}`);
      return res.data;
    } catch {
      console.warn("API belum tersedia. Cari dari dummy...");
      return ordersDummy.find((o) => o.id === id);
    }
  },

  async updateOrder(id, data) {
    try {
      const res = await axiosClient.put(`/orders/${id}`, data);
      return res.data;
    } catch {
      console.warn("API belum tersedia. Update dummy...");
      return { id, ...data };
    }
  },

  async createOrder(order) {
    try {
      const res = await axiosClient.post("/orders", order);
      return res.data;
    } catch {
      console.warn("API belum tersedia. Create dummy...");

      return {
        ...order,
        id: Date.now(),
        orderNumber: generateOrderCode(),
      };
    }
  },

  async deleteOrder(id) {
    try {
      const res = await axiosClient.delete(`/orders/${id}`);
      return res.data;
    } catch {
      console.warn("API belum tersedia. Delete dummy...");
      return { success: true, id };
    }
  },
};
