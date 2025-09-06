import TaskFormContainer from "../../features/tasks/containers/TaskFormContainer";
import { useState } from "react";

export default function TaskCreatePage() {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <TaskFormContainer
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
