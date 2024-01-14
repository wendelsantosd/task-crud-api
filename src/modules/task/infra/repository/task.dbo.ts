export type TaskDBO = {
  id?: string;
  title: string;
  description: string;
  priority: string;
  status?: string;
  completionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
