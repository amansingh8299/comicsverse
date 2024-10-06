import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4001/contact", {
                name,
                email,
                message,
            });
            setSuccess(true);
            setName("");
            setEmail("");
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <Navbar/>
            <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="mt-16 items-center justify-center text-center">
                    <h1 className="text-2xl  md:text-4xl">
                        Get in Touch <span className="text-green-500">:)!</span>
                    </h1>
                    <p className="mt-12">
                        Have a question, comment, or just want to say hi? We'd
                        love to hear from you!
                    </p>
                    <Link to="/">
                        <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                            Back
                        </button>
                    </Link>
                </div>
                <div className="mt-12">
                    <form action="https://getform.io/f/amdpnrjb" method="POST">
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 pl-10 text-sm text-gray-700"
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 pl-10 text-sm text-gray-700"
                            />
                        </label>
                        <label>
                            Message:
                            <textarea
                                value={message}
                                name="message"
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 pl-10 text-sm text-gray-700"
                            />
                        </label>
                        <button
                            type="submit"
                            name="button"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
                        >
                            Send
                        </button>
                        {success && (
                            <p className="text-green-500">
                                Message sent successfully!
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Contact;
