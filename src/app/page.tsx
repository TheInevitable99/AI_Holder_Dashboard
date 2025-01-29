"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;  // This ensures children is typed correctly
  [key: string]: any;         // To accept other props like onClick, etc.
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




// UI Components

//Button Components


interface CardProps {
  children: React.ReactNode;
  onClick?: () => void; // You can make this optional depending on your use case
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


//INPUT component for entering text
interface InputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}
function Input({ value, onChange, placeholder }) {
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

function Select({ onValueChange, defaultValue, children }) {
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
// Skeleton component for showing loading placeholder (animated pulse effect)
function Skeleton({ className }) {
  return (
    <div className={`bg-gray-300 ${className} animate-bounce`} />

  );
}


const sampleData : ImageData[] = [ [
  { id: 1, title: "Alien world ", date: "2025-01-27", model: "Type 1 civilisation", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-UD5VkxYkHCcZD2joco-C6BAkjHRO7gaIw&s" },
  { id: 2, title: "Alien world ", date: "2025-01-26", model: "Type 2 civilisation",  image: "https://media.gettyimages.com/id/909222638/vector/alien-planets-in-orbit-around-a-dyson-sphere.jpg?s=1024x1024&w=gi&k=20&c=zWmBXHVFCaq5XlIvfXQdtlGclM0ChcOCQAxs1lWdno0=" },
  { id: 3, title: "Extraterrestrial ", date: "2025-01-24", model: "Terra", image: "https://img.freepik.com/premium-photo/portrait-creepy-humanoid-alien-created-with-generative-ai_419341-3055.jpg" },
  { id: 4, title: "Extraterrestrial ", date: "2025-01-23", model: "Aqua", image: "https://imgcdn.stablediffusionweb.com/2024/3/17/e0b14600-c0b4-4e62-9dcb-8e6367d74110.jpg" },
  { id: 5, title: "WARMACHINE ", date: "2025-01-22", model: "Fighter", image: "data:image/jpeg;base64,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" },
  { id: 6, title: "WARMACHINE ", date: "2025-01-21", model: "Tank", image: "data:image/jpeg;base64,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" },
];

export default function Dashboard() {
  const [images, setImages] = useState([]);
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

  const filteredImages = images.filter((image) =>
    (filter === "All" || image.model === filter) && image.title.toLowerCase().includes(search.toLowerCase())
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
        <Input placeholder="Search images..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select onValueChange={setFilter} defaultValue="All">
          <option value="All">All Models</option>
          <option value="Type 1 civilisation">Type 1 civilisation</option>
          <option value="Type 2 civilisation">Type 2 civilisation</option>
          <option value="Terra">Terra</option>
          <option value="Aqua">Aqua</option>
          <option value="Tank">Tank</option>
          <option value="Fighter">Fighter</option>
          <option value="Cosmic Champion">Cosmic champion</option>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : filteredImages.length === 0 ? (
        <p className="text-center text-gray-500">No images found. Try a different search or filter.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card key={image.id} onClick={() => setModalImage(image)}>
              <img src={image.image} alt={image.title} className="w-full h-40 object-cover outline-none focus:outline-none" />
              <h3 className="mt-2 font-semibold">{image.title}</h3>
              <p className="text-sm text-gray-500">{image.date} - {image.model}</p>
            </Card>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalImage && (
          <Dialog open={!!modalImage} onClose={() => setModalImage(null)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-blue p-6 rounded-lg shadow-lg max-w-lg"
            >
              
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
