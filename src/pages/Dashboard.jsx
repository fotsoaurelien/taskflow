import { useState, useEffect } from "react";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {

  // Chargement des tâches depuis localStorage
  const [tasks, setTasks] = useState(() => {

    const data = localStorage.getItem("taskflow_data");

    return data ? JSON.parse(data) : [];

  });

  // Ajouter une tâche
  const addTask = (nouvelleTache) => {
    setTasks([...tasks, nouvelleTache]);
  };

  // Sauvegarde automatique
  useEffect(() => {

    localStorage.setItem(
      "taskflow_data",
      JSON.stringify(tasks)
    );

  }, [tasks]);

  return (
  <div className="container">

    <h1>Tableau de bord</h1>

    <p>{tasks.length} tâches au total</p>

    <TaskForm onAddTask={addTask} />

    {
      tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
        />
      ))
    }

  </div>
);
}

export default Dashboard;