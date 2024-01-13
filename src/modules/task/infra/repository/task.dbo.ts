export type TaskDBO = {
  id?: string;
  title: string;
  description: string;
  priority: string;
  isCompleted?: boolean;
  completionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
