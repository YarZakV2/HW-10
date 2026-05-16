import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";

const STORAGE_KEY = "contacts";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem(STORAGE_KEY);

    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }

    return [];
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    const isExist = contacts.find(
      (c) => c.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isExist) {
      alert("Контакт уже существует");
      return;
    }

    setContacts([...contacts, contact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onAdd={addContact} />

      <h2>Contacts</h2>

      <Filter value={filter} onChange={setFilter} />

      <ContactList
        contacts={filteredContacts}
        onDelete={deleteContact}
      />
    </div>
  );
}