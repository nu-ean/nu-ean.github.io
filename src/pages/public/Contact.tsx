import styles from "./Public.module.css";
import ContactList from "../../components/contact/ContactList";

export default function Contact() {
  return (
    <div className="wrapper wrapper-sm">
      <div className={styles.pageTitle}>CONTACT</div>
      <ContactList />
    </div>
  );
}
