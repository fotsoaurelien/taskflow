import { useParams } from "react-router-dom";

function TaskDetail() {

  const { id } = useParams();

  return (
    <div>
      <h1>Détail de la tâche {id}</h1>
    </div>
  );
}

export default TaskDetail;