import { useState } from "react";
import { nanoid } from "nanoid";

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      id: nanoid(),
      name,
      number,
    });

    setName("");
    setNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="tel"
        placeholder="Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />

      <button type="submit">Add contact</button>
    </form>
  );
}