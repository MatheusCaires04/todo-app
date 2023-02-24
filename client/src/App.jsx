import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [textUpdating, setTextUpdating] = useState("");
  const [listTodo, setListTodo] = useState([]);

  useEffect(() => {
    async function getTodo() {
      const listItems = await axios.get("http://localhost:5001/todos");

      setListTodo(listItems.data);
    }

    getTodo();
  }, [listTodo]);

  const addTodo = async (e) => {
    e.preventDefault();

    if (textUpdating === "") {
      await axios.post("http://localhost:5001/create", { text });
      setText("");
    } else {
      const todoUp = await axios.put(
        `http://localhost:5001/update-todo/${textUpdating}`,
        {
          text,
        }
      );
      setText("");
      setTextUpdating("");
    }
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5001/delete-todo/${id}`);
  };

  const updateTodo = async (id, text) => {
    setText(text);
    setTextUpdating(id);
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center">
      <div className="border-2 border-black rounded-lg shadow-2xl p-5 w-[90%] md:w-[500px]">
        <h1 className="text-center text-3xl font-serif font-extrabold">
          ToDo List APP
        </h1>
        <form className="flex gap-2 my-3" onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Adicione sua tarefa..."
            className="outline-none border-2 border-gray-500 rounded-md px-2 py-1 text-base flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {textUpdating ? (
            <input
              type="submit"
              value="Editar"
              className="w-[60px] border-2 border-blue-500 rounded-md text-base text-white font-bold bg-blue-500 cursor-pointer hover:bg-blue-300 hover:text-black duration-200"
            />
          ) : (
            <input
              type="submit"
              value="Add"
              className="w-[60px] border-2 border-blue-500 rounded-md text-base text-white font-bold bg-blue-500 cursor-pointer hover:bg-blue-300 hover:text-black duration-200"
            />
          )}
        </form>
        <ul className="mt-10 flex flex-col gap-2 max-h-[250px] overflow-y-auto shadow-md p-5">
          {listTodo.map((item) => {
            return (
              <li
                className="py-1 border-2 border-gray-400 rounded-lg flex justify-between items-center px-2"
                key={item._id}
              >
                <span className="text-base font-bold font-serif">
                  {item.text}
                </span>
                <div className="flex gap-2">
                  <AiFillEdit
                    className="bg-blue-400 p-1 border-2 border-blue-400 hover:bg-transparent hover:text-blue-400 cursor-pointer duration-200"
                    size={30}
                    onClick={() => updateTodo(item._id, item.text)}
                  />
                  <AiFillDelete
                    className="bg-red-400 p-1 border-2 border-red-400 hover:bg-transparent hover:text-red-400 cursor-pointer duration-200"
                    size={30}
                    onClick={() => deleteTodo(item._id)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
