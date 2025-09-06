import TaskEditFormContainer from "../../features/tasks/containers/TaskEditFormContainer";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskEditPage() {
  const [open, setOpen] = useState(true);
  const { id } = useParams<{ id?: string }>(); //編集時にはidが必要なためidを渡す

  if (!id) {
    return null;
  }
  return (
    <div>
      <TaskEditFormContainer
        open={open}
        onClose={() => setOpen(false)}
        id={id}
      />
    </div>
  )
}