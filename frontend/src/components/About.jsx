import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const AboutUs = () => {
    return (
        <>
        <Navbar />
        <div className="container mx-auto p-4 mt-10">
            <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-1/2 xl:w-1/2 p-6">
                    <img
                        src="/images/about.jpeg"
                        alt="comicverse"
                        className="w-full h-full object-cover transition duration-500 ease-in-out hover:scale-105"
                    />
                </div>
                <div className="w-full md:w-1/2 xl:w-1/2 p-6">
                    <p>
                        <span className="text-green-500 text-2xl">
                            Welcome to ComicVerse,
                        </span>{" "}
                        the ultimate destination for comic book enthusiasts!
                        Explore our vast collection of comics, graphic novels,
                        and manga from renowned publishers. Stay updated with
                        the latest news, reviews, and discussions in the comic
                        book community. Join our forums to connect with fellow
                        fans, share your thoughts, and discover new titles.
                    </p>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <Link to="/">
                    <button className="bg-green-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
                        Back
                    </button>
                </Link>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AboutUs;
