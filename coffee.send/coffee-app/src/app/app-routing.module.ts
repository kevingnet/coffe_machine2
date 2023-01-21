import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeBrewComponent } from './components/coffee-brew/coffee-brew.component';
import { CoffeeLevelComponent } from './components/coffee-level/coffee-level.component';
import { FillCoffeeComponent } from './components/fill-coffee/fill-coffee.component';

const routes: Routes = [
  { path: '', redirectTo: 'coffees', pathMatch: 'full' },
  { path: 'brew', component: CoffeeBrewComponent },
  { path: 'level', component: CoffeeLevelComponent },
  { path: 'fill', component: FillCoffeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
