import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularIsAwesomeComponent } from './blogs/angular-is-awesome/angular-is-awesome.component';

const routes: Routes = [
    {
        path: 'blog-1',
        component: AngularIsAwesomeComponent,
    },
    {
        path: '**',
        component: AngularIsAwesomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
