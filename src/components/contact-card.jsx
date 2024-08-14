import React from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDiscoluse";

const ContactCard = ({ contact, onDelete }) => {
    const { isOpen, onClose, onOpen } = useDisclouse();

    return (
        <>
            <div className="flex self-center justify-between bg-neutral-800 items-center p-2 rounded-xl w-[90%]">
                <div className="flex gap-1">
                    <HiOutlineUserCircle className="text-4xl text-purple-600" />
                    <div className="text-neutral-200">
                        <h2 className="font-medium">{contact.name}</h2>
                        <p className="text-sm">{contact.number}</p>
                    </div>
                </div>
                <div className="text-neutral-500 flex text-3xl">
                    <IoMdTrash 
                        onClick={onDelete}
                        className="ml-4 cursor-pointer" 
                    />
                </div>
            </div>
            <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default ContactCard;

