import axiosClient from "./axiosClient";
import { productsDummy } from "../data/productsData";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const TEMP_KEY = "temp_products";

export const productService = {
  async getProducts() {
    try {
      const res = await axiosClient.get("/products");
      return res.data;
    } catch {
      console.warn("API belum tersedia. Load from temp...");

      let temp = JSON.parse(localStorage.getItem(TEMP_KEY));

      if (!temp || temp.length === 0) {
        console.log("Menggunakan dummy product sebagai inisiasi awal.");
        localStorage.setItem(TEMP_KEY, JSON.stringify(productsDummy));
        temp = productsDummy;
      }

      return temp;
    }
  },

  async createProduct(product) {
    try {
      const res = await axiosClient.post("/products", product);
      return res.data;
    } catch {
      console.warn("API belum tersedia. Create dummy...");

      const newProduct = { ...product, id: Date.now() };

      const tempProducts = JSON.parse(localStorage.getItem(TEMP_KEY)) || [];
      tempProducts.push(newProduct);

      localStorage.setItem(TEMP_KEY, JSON.stringify(tempProducts));

      return newProduct;
    }
  },

  async updateProduct(id, updates) {
    try {
      const res = await axiosClient.put(`/products/${id}`, updates);
      return res.data;
    } catch {
      console.warn("API belum tersedia. Update dummy...");

      let temp = JSON.parse(localStorage.getItem(TEMP_KEY)) || [];

      temp = temp.map((p) => (p.id === id ? { ...p, ...updates } : p));

      localStorage.setItem(TEMP_KEY, JSON.stringify(temp));

      return { id, ...updates };
    }
  },

  async deleteProduct(id) {
    try {
      const res = await axiosClient.delete(`/products/${id}`);
      return res.data;
    } catch {
      console.warn("API belum tersedia. Delete dummy...");

      let temp = JSON.parse(localStorage.getItem(TEMP_KEY)) || [];
      temp = temp.filter((p) => p.id !== id);

      localStorage.setItem(TEMP_KEY, JSON.stringify(temp));

      return true;
    }
  },
};