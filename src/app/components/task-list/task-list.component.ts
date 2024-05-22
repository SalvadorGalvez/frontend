import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (tasks) => this.tasks = tasks,
        error: (err) => this.error = 'Error al cargar las tareas.'
      });
  }

  delete(id: number): void {
    if (confirm('¿Seguro que quieres borrar el elemento?')) {
    this.loading = true;
      this.taskService.deleteTask(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.tasks = this.tasks.filter(task => task.id !== id),
        error: (err) => this.error = 'Error al borrar la tarea'
      });
    }
  }
}
