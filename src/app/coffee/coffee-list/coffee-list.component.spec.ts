import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeListComponent } from './coffee-list.component';
import { CoffeeService } from '../services/coffee.service';
import { of } from 'rxjs';
import { Coffee } from '../models/coffee';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

describe('CoffeeListComponent', () => {
  let component: CoffeeListComponent;
  let fixture: ComponentFixture<CoffeeListComponent>;
  let coffeeServiceSpy: jasmine.SpyObj<CoffeeService>;
  let el: DebugElement;

  // Mock data to test counts: 3 origen, 3 blend
  const mockCoffees: Coffee[] = [
    new Coffee(1, 'Café A', 'Blend', 'R1', 'S1', 1000, ''),
    new Coffee(2, 'Café B', 'Café de Origen', 'R2', 'S2', 1100, ''),
    new Coffee(3, 'Café C', 'Blend', 'R3', 'S3', 1200, ''),
    new Coffee(4, 'Café D', 'Café de Origen', 'R4', 'S4', 1300, ''),
    new Coffee(5, 'Café E', 'Blend', 'R5', 'S5', 1400, ''),
    new Coffee(6, 'Café F', 'Café de Origen', 'R6', 'S6', 1500, '')
  ];

  beforeEach(async () => {
    coffeeServiceSpy = jasmine.createSpyObj('CoffeeService', ['getCoffees']);
    coffeeServiceSpy.getCoffees.and.returnValue(of(mockCoffees));

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [CoffeeListComponent],
      providers: [{ provide: CoffeeService, useValue: coffeeServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges(); // triggers ngOnInit and rendering
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load coffees on init', () => {
    expect(coffeeServiceSpy.getCoffees).toHaveBeenCalled();
    expect(component.coffees.length).toBe(mockCoffees.length);
  });

  it('should calculate correct origin and blend counts', () => {
    expect(component.originCount).toBe(3);
    expect(component.blendCount).toBe(3);
  });

  it('should display origin count in the template', () => {
    const pOrigin = el.query(By.css('div.mt-2 p:first-child')).nativeElement;
    expect(pOrigin.textContent.trim()).toBe('Total café de origen: 3');
  });

  it('should display blend count in the template', () => {
    const pBlend = el.query(By.css('div.mt-2 p:last-child')).nativeElement;
    expect(pBlend.textContent.trim()).toBe('Total café blend: 3');
  });
});
