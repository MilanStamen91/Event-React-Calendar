import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { CalendarContext } from "../context/CalendarContext";
import { CirclePicker } from "react-color";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function TaskForm() {

  const { date, task, setTask, saveTask, setDate, deleteTask } =  useContext(CalendarContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#f44336");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (task) {
      setDescription(task.description || "")
      setName(task.name || "");
      setColor(task.color || "#f44336");
    }
  }, [task]);

  const closeModal = () => {
    setTask(null);
    setError(false);
  };

  const _saveTask = () => {
 
    if(name.trim().length < 1 || description.trim().length < 1) {
        setError(true);
        return;
    }
    setError(false);

    saveTask({
      ...task,
      date: date,
      name: name,
      description: description,
      color: color,
    });
    setDate(date);
    closeModal();

  };

  const _deleteTask = ()=> {
    deleteTask(task.id);
    setDate(date);
    closeModal();
    setError(false);
  }

  return (
    <Modal
      isOpen={task != null}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Task Form"
    >
      <div className="task-form">
        
        <label>Zadatak</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Naziv zadatka"
        />
        <label>Opis</label>
        <textarea
          rows="4" 
          cols="50"
          description="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Opis"
        />
        <label>Color</label>

        <div>
          <CirclePicker
            color={color}
            onChange={(color) => {
              setColor(color.hex);
            }}
          />
        </div>

        <div>
          <button className="button button-red" onClick={closeModal}>
            Cancel
          </button>
          {task && task.id ? (
            <button
              className="button button-orange"
              onClick={_deleteTask}
            >
              Delete
            </button>
          ) : null}
          <button
            className="button button-green"
            onClick={_saveTask}
          >
            Save
          </button>
        </div>
        {error ? <p className="error">Naziv zadatka i opis su obavezani</p> : null}
      </div>
    </Modal>
  );
}

export default TaskForm;
