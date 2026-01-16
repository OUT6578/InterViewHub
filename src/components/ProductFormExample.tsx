import React, { useState } from "react";

export function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "", // 1. Added category to state
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "20px" }}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product Name"
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
      />

      {/* 2. Added Category Select */}
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
      </select>

      <button type="submit">Submit</button>

      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}
