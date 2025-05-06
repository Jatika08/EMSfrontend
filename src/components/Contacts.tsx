"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";

interface Contact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

const contactsData: Contact[] = [
  {
    name: "John Doe",
    role: "Manager",
    phone: "+1 (234) 567-8901",
    email: "johndoe@company.com",
  },
  {
    name: "Jane Smith",
    role: "Manager's Manager",
    phone: "+1 (234) 567-8902",
    email: "janesmith@company.com",
  },
  {
    name: "Emily Brown",
    role: "HR",
    phone: "+1 (234) 567-8903",
    email: "emilybrown@company.com",
  },
];

const Contacts: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-stone-800/80 to-stone-900/80 rounded-3xl p-6 border border-stone-700/30 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-lg  w-full text-stone-200">
      <h2 className="text-xl font-semibold mb-6 text-stone-100 bg-clip-text  bg-gradient-to-r from-white to-stone-400">
        Emergency Contacts
      </h2>
      <div className="space-y-4">
        {contactsData.map((contact, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 px-4 bg-stone-800/70 rounded-lg hover:bg-stone-700/70 hover:shadow-mdp transition duration-300"
          >
            <div>
              <p className="font-semibold text-stone-100">{contact.name}</p>
              <p className="text-sm text-stone-400">{contact.role}</p>
            </div>
            <div className="flex gap-3 items-center">
              <a
                href={`tel:${contact.phone}`}
                className="text-stone-300 hover:text-stone-100"
              >
                <Phone size={18} />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="text-stone-300 hover:text-stone-100"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
