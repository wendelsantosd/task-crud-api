import { Task } from '@modules/task/domain/model/task.aggregate';
import { Tasks } from '@modules/task/domain/model/task.repository';

type TaskPresenterProps = {
  id?: string;
  title: string;
  description: string;
  priority: string;
  done?: boolean;
  completionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

type TasksPresenterProps = {
  tasks: TaskPresenterProps[];
  metadata: {
    count: number;
  };
};

export class TasksPresenter {
  public toPresenter(data: Tasks): TasksPresenterProps {
    const tasks: TaskPresenterProps[] = data.tasks.map((task) => {
      return {
        id: task.id.value(),
        title: task.title,
        description: task.description,
        priority: task.priority,
        completionDate: task.completionDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      };
    });

    return {
      tasks,
      metadata: { count: data.metadata.count },
    };
  }
}

export class TaskPresenter {
  public toPresenter(task: Task): TaskPresenterProps {
    return {
      id: task.id.value(),
      title: task.title,
      description: task.description,
      priority: task.priority,
      completionDate: task.completionDate,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
