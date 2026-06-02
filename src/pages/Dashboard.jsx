import { useState, useEffect } from "react";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  // Charger les tâches depuis le backend
  useEffect(() => {

    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error(error));

  }, []);

  const addTask = async (nouvelleTache) => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nouvelleTache)
        }
      );

      if (response.status === 201) {

        const taskSauvegardee = await response.json();

        setTasks([...tasks, taskSauvegardee]);
      }

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="container">

      <h1>Tableau de bord</h1>

      <p>{tasks.length} tâches au total</p>

      <TaskForm onAddTask={addTask} />

      {
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))
      }

    </div>
  );
}

export default Dashboard;