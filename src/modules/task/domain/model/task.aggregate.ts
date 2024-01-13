import { Aggregate, Result, UID } from 'types-ddd';

export type TaskProps = {
  id?: UID;
  title: string;
  description: string;
  priority: string;
  isCompleted: boolean;
  completionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

enum PRIORITY {
  Baixa = 'Baixa',
  'Média' = 'Média',
  Alta = 'Alta',
}

export class Task extends Aggregate<TaskProps> {
  private constructor(props: TaskProps) {
    super(props);
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get priority(): string {
    return this.props.priority;
  }

  get completionDate(): Date {
    return this.props.completionDate;
  }

  get isCompleted(): boolean {
    return this.props.isCompleted;
  }

  private static isValid({
    title,
    description,
    completionDate,
    priority,
  }: TaskProps): Result<void> {
    const { string, date } = this.validator;

    if (string(title).isEmpty())
      return Result.fail('O título não pode ser vazio.');

    if (string(description).isEmpty())
      return Result.fail('A descrição não pode ser vazia.');

    if (string(priority).isEmpty())
      return Result.fail('A prioridade não pode ser vazia.');

    if (!PRIORITY[priority])
      return Result.fail('Prioridade inserida inválida.');

    if ('Invalid Date' === completionDate.toDateString())
      return Result.fail(
        'Insira uma data válida para a finalização da tarefa.',
      );

    if (date(completionDate).isBeforeNow())
      return Result.fail('A data de conclusão não pode ser antiga.');

    return Result.Ok();
  }

  public static create(props: TaskProps): Result<Task> {
    const isValid = Task.isValid(props);

    if (isValid.isFail()) return Result.fail(isValid.error());

    return Result.Ok(new Task(props));
  }
}
