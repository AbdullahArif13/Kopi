"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { productService } from "../../service/MenuService";

export default function AddMenuPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "hot",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Categories
    const categories = [
        { id: "hot", label: "Hot Series" },
        { id: "cold", label: "Cold Series" },
        { id: "small", label: "Small Bite" },
    ];

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleImageSelect(file);
        }
    };

    const handleImageSelect = (file) => {
        setFormData((prev) => ({ ...prev, image: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? parseFloat(value) || "" : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.category) return;

        setLoading(true);
        try {
            // Create product objects matching the data structure
            const newProduct = {
                name: formData.name,
                price: Number(formData.price),
                category: formData.category,
                image: imagePreview || "https://img.freepik.com/free-photo/latte-coffee-cup_74190-1194.jpg?semt=ais_se_enriched&w=740&q=80",
                // In a real app, we would upload the image file to a server here
            };

            await productService.createProduct(newProduct);
            navigate("/manajemen-menu");
        } catch (error) {
            console.error("Failed to create product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Tambah Menu Baru</h1>
            </div>

            {/* Content */}
            <main className="flex-1 p-4 sm:p-8 max-w-3xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Single Card Container */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Menu</h2>

                        {/* Kategori */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Kategori</label>
                            <div className="grid grid-cols-3 gap-4">
                                {categories.map((cat) => (
                                    <label
                                        key={cat.id}
                                        className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-2 transition-all ${formData.category === cat.id
                                            ? "border-teal-500 bg-teal-50 text-teal-700"
                                            : "border-gray-100 hover:border-teal-200 hover:bg-gray-50 text-gray-600"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="category"
                                            value={cat.id}
                                            checked={formData.category === cat.id}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <span className="font-semibold text-sm">{cat.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Nama Menu */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nama Menu</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Contoh: Cappuccino Latte"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 focus:bg-white"
                            />
                        </div>

                        {/* Harga */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Harga (Rp)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Contoh: 25000"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-gray-50 focus:bg-white"
                            />
                        </div>

                        {/* Foto Menu */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Foto Menu</label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer ${isDragging
                                    ? "border-teal-500 bg-teal-50"
                                    : "border-gray-300 hover:border-teal-400 hover:bg-gray-50"
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                                    multiple={false}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />

                                {imagePreview ? (
                                    <div className="relative w-full max-w-xs h-64 rounded-lg overflow-hidden shadow-md">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setImagePreview(null);
                                                setFormData(prev => ({ ...prev, image: null }));
                                            }}
                                            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-red-600 hover:bg-white"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4 pointer-events-none">
                                        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto text-teal-600">
                                            <Upload size={32} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-700">Klik atau geser gambar ke sini</p>
                                            <p className="text-sm text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-4 px-6 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-4 px-6 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading && <Loader2 className="animate-spin" size={20} />}
                            <span>Simpan Menu</span>
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
}
