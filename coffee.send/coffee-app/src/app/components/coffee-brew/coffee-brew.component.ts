import { Component, OnInit } from '@angular/core';
import { Brew } from 'src/app/models/brew.model';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-coffee-brew',
  templateUrl: './coffee-brew.component.html',
  styleUrls: ['./coffee-brew.component.css']
})
export class CoffeeBrewComponent implements OnInit {

  theBrew: Brew = {};
  submitted = false;

  constructor(private coffeeService: CoffeeService) {}

  changeSize(val: any)
  {
    this.theBrew.size = val;
  }

  ngOnInit(): void {
    this.theBrew.size = 4;
    this.theBrew.grain = 5;
    this.theBrew.delay = 0;
  }

  brew(): void {
    this.coffeeService.brew(this.theBrew.size, this.theBrew.grain, this.theBrew.delay)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.submitted = true;
          this.theBrew = {
            size: data.size,
            grain: data.grain,
            delay: data.delay
          };
        },
        error: (e) => console.error(e)
      });
  }
}
