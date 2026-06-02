export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
};

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
  dueDate?: string | null;
  labels: string[];
  position: number;
  columnId: string;
  assignedUser?: Pick<User, "id" | "name" | "avatar"> | null;
};

export type Column = {
  id: string;
  title: string;
  position: number;
  tasks: Task[];
};

export type Board = {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
  columns: Column[];
};
