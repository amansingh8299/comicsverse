import { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";

function Course() {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get(
                    "https://comicsverse.onrender.com/book"
                );
                console.log(res.data);
                setBook(res.data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        };
        getBook();
    }, []);

    return (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
            <div className="mt-16 items-center justify-center text-center">
                <h1 className="text-2xl md:text-4xl">
                    We're delighted to have you{" "}
                    <span className="text-green-500">Here! :)</span>
                </h1>
                <p className="mt-4">
                    Unleash your love for reading with our diverse range of
                    books. From classics to bestsellers, our shelves are stocked
                    with tales of adventure, romance, mystery, and more.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center mt-10">
                    <p className="text-lg font-semibold">Loading some books for you...</p>
                </div>
            ) : (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {book.map((item) => (
                        <Cards key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Course;
