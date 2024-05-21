import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

const routes: Routes = [
  { path: 'tareas', component: TaskListComponent },
  { path: 'tareas/formulario', component: TaskFormComponent },
  { path: 'tareas/formulario/:id', component: TaskFormComponent },
  { path: '**', redirectTo: 'tareas' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
