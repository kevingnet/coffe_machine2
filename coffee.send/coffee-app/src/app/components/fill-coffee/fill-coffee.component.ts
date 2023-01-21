import { Component, OnInit } from '@angular/core';
import { Coffee } from 'src/app/models/coffee.model';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-fill-coffee',
  templateUrl: './fill-coffee.component.html',
  styleUrls: ['./fill-coffee.component.css']
})
export class FillCoffeeComponent implements OnInit {

  coffee: Coffee = {
    water: 480,
    beans: 240
  };
  submitted = false;

  constructor(private coffeeService: CoffeeService) { }

  ngOnInit(): void {
    //alert('ngOnInit');
    //this.fill();
  }

  fill(): void {
    this.coffeeService.fill(this.coffee.water, this.coffee.beans)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitted = true;
          this.coffee = {
            water: data.water,
            beans: data.beans
          };
        },
        error: (e) => console.error(e)
      });
  }
}
