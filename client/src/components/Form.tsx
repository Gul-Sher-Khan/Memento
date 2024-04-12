import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router";

const Form = () => {
  const {
    initialName,
    initialText,
    id,
    setId,
    setInitialName,
    setInitialText,
  } = useContext(AppContext);
  const [name, setName] = useState(initialName || ""); // Use initialName as default name
  const [text, setText] = useState(initialText || ""); // Use initialText as default text

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.patch(`http://localhost:3000/api/v1/notes/${id}`, {
          name,
          text,
        });
      } else {
        // Add new note
        await axios.post(`http://localhost:3000/api/v1/notes`, { name, text });
      }

      // Redirect to home page after successful submission
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      // Handle error if needed
    }

    // Reset form fields
    setName("");
    setText("");
    setId(null);
    setInitialName("");
    setInitialText("");
  };

  return (
    <div className="max-w-md mx-auto bg-[#164e55] p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {id ? "Edit Note" : "Add Note"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[#a2a2a2] mb-2"
          >
            name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border bg-white/70 text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            placeholder="Enter Note name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="text"
            className="block text-sm font-semibold text-[#a2a2a2] mb-2"
          >
            Text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border bg-white/70 text-black border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-400"
            placeholder="Enter your note text"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#135D66] hover:bg-[#77B0AA]/80 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          {id ? "Save Changes" : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default Form;
