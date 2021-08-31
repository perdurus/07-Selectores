import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'reactive',
    loadChildren: ()=> import('./paises/paises.module').then(m => m.PaisesModule)
  },  
  { 
    path: '**',
    redirectTo: 'reactive'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
