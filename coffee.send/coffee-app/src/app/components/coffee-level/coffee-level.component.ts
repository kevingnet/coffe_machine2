import { Component, OnInit } from '@angular/core';
import { Coffee } from 'src/app/models/coffee.model';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-coffee-level',
  templateUrl: './coffee-level.component.html',
  styleUrls: ['./coffee-level.component.css']
})
export class CoffeeLevelComponent implements OnInit {

  coffee: Coffee = {
    water: 70,
    beans: 60
  };
  submitted = false;

  constructor(private coffeeService: CoffeeService) { }


  ngOnInit(): void {
    console.log('ngOnInit')
    this.level();
  }

  level(): void {
    console.log('level');
    this.coffeeService.levels()
      .subscribe({
        next: (data) => {
          console.log(data);
          //this.submitted = true;
          this.coffee = {
            water: data.water,
            beans: data.beans
          };
        },
        error: (e) => console.error(e)
      });
  }
}
