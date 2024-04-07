import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

interface FormProps {
  initialName?: string;
  initialText?: string;
}

const Form: React.FC<FormProps> = ({ initialName = "", initialText = "" }) => {
  const navigate = useNavigate();

  // State variables for form fields
  const [name, setName] = useState(initialName);
  const [text, setText] = useState(initialText);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Determine whether to send a POST (for new note) or PUT (for editing) request
    const method = initialName && initialText ? "put" : "post";
    const url =
      initialName && initialText
        ? `http://localhost:3000/api/v1/notes/${name}`
        : "http://localhost:3000/api/v1/notes";

    try {
      // Send API request
      await axios[method](url, { name, text });

      // Reset form fields
      setName("");
      setText("");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Update form fields when initialName or initialText change
  useEffect(() => {
    setName(initialName);
    setText(initialText);
  }, [initialName, initialText]);

  return (
    <div className="max-w-md mx-auto bg-[#164e55] p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialName && initialText ? "Edit Note" : "Add Note"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[#a2a2a2] mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border bg-white/70 text-black border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
            placeholder="Enter Note Title"
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
          {initialName && initialText ? "Save Changes" : "Add Note"}
        </button>
      </form>
    </div>
  );
};

export default Form;
