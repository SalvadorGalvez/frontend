import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = { id: 0, title: '', description: '', status: false };
  loading: boolean = false;
  error: { message: string } | null = null;

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.loadTask(parseInt(id, 10));
    }
  }

  loadTask(id: number): void {
    this.loading = true;
    this.taskService.getTask(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (task) => this.task = task,
        error: (err) => this.handleError(err.error.message)
      });
  }

  submit(): void {
    this.loading = true;
    if (this.task.id === 0) {
      this.taskService.createTask(this.task)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError('Error al cargar la tarea')
      });
    } else {
      this.taskService.updateTask(this.task)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError('Error al cargar la tarea')
      });
    }
  }

  handleSuccess(): void {
    this.router.navigate(['/']);
  }

  handleError(message: string): void {
    this.error = { message };
  }
}
