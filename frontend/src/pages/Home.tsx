import axios from "axios";
import { useState, useEffect } from "react";
import Note from "../components/Note";
import { Link } from "react-router-dom";

interface NoteProps {
  _id: string;
  name: string;
  text: string;
}

const Home = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios.get("http://localhost:3000/api/v1/notes");
      setNotes(data.notes);
    };

    fetchNotes();
  }, []);

  return (
    <main className="flex-col w-full h-screen justify-center bg-bg text-white font-mono">
      <section className="w-full p-6 bg-primary flex justify-center">
        <h1 className="text-5xl ">My Notes</h1>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-10">
        {notes.map((note) => (
          <Note id={note._id} name={note.name} text={note.text} />
        ))}
      </div>
      <Link to="/add">
        <button className="flex absolute bottom-14 right-20 items-center justify-center w-10 h-10 rounded-full bg-[#135D66] hover:bg-[#77B0AA]/80 text-white focus:outline-none hover:scale-110">
          {/* SVG Plus Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className="w-6 h-6"
          >
            <rect fill="none" height="50" width="50" />
            <line
              fill="none"
              stroke="#FFFFFF"
              strokeMiterlimit="10"
              strokeWidth="4"
              x1="9"
              x2="41"
              y1="25"
              y2="25"
            />
            <line
              fill="none"
              stroke="#FFFFFF"
              strokeMiterlimit="10"
              strokeWidth="4"
              x1="25"
              x2="25"
              y1="9"
              y2="41"
            />
          </svg>
        </button>
      </Link>
    </main>
  );
};

export default Home;
