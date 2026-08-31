import ContactItem, { type Contact } from "./ContactItem";
import contacts from "./contacts.json";
import styles from "./Contact.module.css";

export default function ContactList() {
  return (
    <div className={styles.contactList}>
      {contacts.map((contact: Contact, i) => (
        <ContactItem key={contact.id} contact={contact} index={i} />
      ))}
    </div>
  );
}
