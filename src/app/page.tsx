"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      {...props}
    >
      {children}
    </button>
  );
}

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function Card({ children, onClick }: CardProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} onClick={onClick}>
      <div className="border rounded-lg shadow p-4 cursor-pointer">
        {children}
      </div>
    </motion.div>
  );
}

interface InputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      type="text"
      className="border p-2 rounded w-full dark:bg-gray-800 dark:text-white"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

interface SelectProps {
  onValueChange: (value: string) => void;
  defaultValue: string;
  children: React.ReactNode;
}

function Select({ onValueChange, defaultValue, children }: SelectProps) {
  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => onValueChange(e.target.value)}
      className="border p-2 rounded w-full dark:bg-gray-800 dark:text-white"
    >
      {children}
    </select>
  );
}

function Skeleton({ className }: { className: string }) {
  return <div className={`bg-gray-300 ${className} animate-pulse`} />;
}

interface ImageData {
  id: number;
  title: string;
  date: string;
  model: string;
  image: string;
}

const sampleData: ImageData[] = [
  {
    id: 1,
    title: "Alien world",
    date: "2025-01-27",
    model: "Type 1 civilisation",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-UD5VkxYkHCcZD2joco-C6BAkjHRO7gaIw&s",
  },
  {
    id: 2,
    title: "Alien world",
    date: "2025-01-26",
    model: "Type 2 civilisation",
    image: "https://media.gettyimages.com/id/909222638/vector/alien-planets-in-orbit-around-a-dyson-sphere.jpg?s=1024x1024&w=gi&k=20&c=zWmBXHVFCaq5XlIvfXQdtlGclM0ChcOCQAxs1lWdno0=",
  },
];

export default function Dashboard() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [modalImage, setModalImage] = useState<ImageData | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setImages(sampleData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredImages = images.filter(
    (image) =>
      (filter === "All" || image.model === filter) &&
      image.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`p-6 max-w-5xl mx-auto ${darkMode ? "dark" : ""}`}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mb-4 px-4 py-2 bg-red-700 text-white rounded"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <Input
          placeholder="Search images..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select onValueChange={setFilter} defaultValue="All">
          <option value="All">All Models</option>
          <option value="Type 1 civilisation">Type 1 civilisation</option>
          <option value="Type 2 civilisation">Type 2 civilisation</option>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <p className="text-center text-gray-500">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card key={image.id} onClick={() => setModalImage(image)}>
              <img src={image.image} alt={image.title} className="w-full h-40 object-cover" />
              <h3 className="mt-2 font-semibold">{image.title}</h3>
              <p className="text-sm text-gray-500">{image.date} - {image.model}</p>
            </Card>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalImage && (
          <Dialog open={!!modalImage} onClose={() => setModalImage(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
              <img src={modalImage.image} alt={modalImage.title} className="w-full rounded" />
              <h3 className="mt-2 font-semibold text-center">{modalImage.title}</h3>
              <p className="text-sm text-gray-500 text-center">{modalImage.date} - {modalImage.model}</p>
              <div className="text-center mt-4">
                <Button onClick={() => setModalImage(null)}>Close</Button>
              </div>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
