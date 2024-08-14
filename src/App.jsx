import React, { useEffect, useState } from "react";
import Navbar from "./components/nabvar"; 
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/contact-card";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDiscoluse";

const App = () => {
    const [contacts, setContacts] = useState([]);
    const { isOpen, onClose, onOpen } = useDisclouse();

    useEffect(() => {
        const getContacts = async () => {
            try {
                const contactsRef = collection(db, 'contacts');
                const contactsSnapshot = await getDocs(contactsRef);
                const contactLists = contactsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setContacts(contactLists);
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };

        getContacts();
    }, []);

    const handleAddContact = async (contact) => {
        if (!contact.name.trim() || !contact.number.trim()) {
            console.log("All fields are required");
            return; 
        }
    
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            setContacts(prevContacts => [...prevContacts, contact]);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

   return (
        <>
            <div  className="max-w-[370px] mx-auto bg-neutral-900 h-[40rem] rounded-xl mt-4 overflow-y-auto">
                <Navbar />
                <div className="flex justify-center gap-2 mt-4">
                    <div className="flex relative items-center ">
                        <FiSearch className="ml-2 text-neutral-500 text-3xl absolute" />
                        <input 
                            type="text" 
                            className="rounded-xl border bg-transparent border-neutral-600 h-10 flex-grow text-white pl-10" 
                        />
                    </div>
                    <AiFillPlusCircle onClick={onOpen} className="text-5xl cursor-pointer text-purple-600" />
                </div>
                <div className="text-white mt-4 flex flex-col gap-3">
                    {contacts.map((contact) => (
                        <ContactCard 
                            key={contact.id} 
                            contact={contact} 
                            onDelete={() => handleDeleteContact(contact.id)} 
                        />
                    ))}
                </div>
            </div>
            <AddAndUpdateContact 
                onClose={onClose} 
                isOpen={isOpen} 
                onAddContact={handleAddContact} 
            />
        </>
    );
};

export default App;
