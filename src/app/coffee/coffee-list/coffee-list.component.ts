import { Component, OnInit } from '@angular/core';
import { CoffeeService } from '../services/coffee.service';
import { Coffee } from '../models/coffee';

@Component({
  standalone: false,
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.css']
})
export class CoffeeListComponent implements OnInit {
  coffees: Coffee[] = [];

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit() {
    this.coffeeService.getCoffees().subscribe((data: Coffee[]) => {
      this.coffees = data;
    });
  }
}
