import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

interface Note {
  id: string;
  name: string;
  text: string;
}

const Note = (props: Note) => {
  const { setInitialName, setInitialText, setId } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log(props.id);
    try {
      await axios.delete(`http://localhost:3000/api/v1/notes/${props.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = () => {
    setInitialName(props.name);
    setInitialText(props.text);
    setId(props.id);
    navigate("/add");
  };

  return (
    <div className="bg-gray-100/80 shadow-lg rounded-lg p-6 m-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{props.name}</h2>
      <p className="text-lg text-gray-700 leading-relaxed">{props.text}</p>
      <div className="flex w-full justify-between">
        <button
          onClick={handleDelete}
          className=" bg-[#135D66] hover:bg-[#77B0AA]/80 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Delete
        </button>
        <button
          onClick={handleEdit}
          className=" bg-[#135D66] hover:bg-[#77B0AA]/80 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Note;
