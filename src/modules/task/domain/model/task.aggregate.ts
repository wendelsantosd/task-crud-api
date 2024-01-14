import { Aggregate, Result, UID } from 'types-ddd';

export type TaskProps = {
  id?: UID;
  title: string;
  description: string;
  priority: string;
  status: string;
  completionDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum PriorityEnum {
  Baixa = 'Baixa',
  'Média' = 'Média',
  Alta = 'Alta',
}

export enum StatusEnum {
  'Concluído' = 'Concluído',
  'Não concluído' = 'Não concluído',
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

  get status(): string {
    return this.props.status;
  }

  get completionDate(): Date {
    return this.props.completionDate;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private static isValid({
    title,
    description,
    completionDate,
    priority,
    status,
  }: TaskProps): Result<void> {
    const { string, date } = this.validator;

    if (string(title).isEmpty())
      return Result.fail('O título não pode ser vazio.');

    if (string(description).isEmpty())
      return Result.fail('A descrição não pode ser vazia.');

    if (string(priority).isEmpty())
      return Result.fail('A prioridade não pode ser vazia.');

    if (!PriorityEnum[priority])
      return Result.fail('Prioridade inserida inválida.');

    if (status && !StatusEnum[status]) return Result.fail('Status inválido.');

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

  public update(props: Partial<TaskProps>): Result<void> {
    const isValid = Task.isValid({
      title: props.title ?? this.title,
      description: props.description ?? this.description,
      priority: props.priority ?? this.priority,
      completionDate: props.completionDate ?? this.completionDate,
      status: this.status,
    });

    if (isValid.isFail()) return Result.fail(isValid.error());

    if (props.title) this.change('title', props.title);
    if (props.description) this.change('description', props.description);
    if (props.priority) this.change('priority', props.priority);
    if (props.completionDate)
      this.change('completionDate', props.completionDate);

    return Result.Ok();
  }

  public changeDone(status: string): Result<void> {
    if (!StatusEnum[status]) return Result.fail('Status inválido.');

    this.change('status', status);

    return Result.Ok();
  }
}
