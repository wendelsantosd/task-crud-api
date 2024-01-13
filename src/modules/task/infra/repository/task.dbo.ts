export type TaskDBO = {
  id?: string;
  title: string;
  description: string;
  priority: string;
  done?: boolean;
  completionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};
