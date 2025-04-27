import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeListComponent } from './coffee-list.component';
import { CoffeeService } from '../services/coffee.service';
import { of } from 'rxjs';
import { Coffee } from '../models/coffee';

describe('CoffeeListComponent', () => {
  let component: CoffeeListComponent;
  let fixture: ComponentFixture<CoffeeListComponent>;
  let mockCoffeeService: jasmine.SpyObj<CoffeeService>;

  beforeEach(async () => {
    // Creamos un mock del servicio
    const coffeeServiceSpy = jasmine.createSpyObj('CoffeeService', ['getCoffees']);

    await TestBed.configureTestingModule({
      declarations: [CoffeeListComponent],
      providers: [
        { provide: CoffeeService, useValue: coffeeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeListComponent);
    component = fixture.componentInstance;
    mockCoffeeService = TestBed.inject(CoffeeService) as jasmine.SpyObj<CoffeeService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load coffees on init', () => {
    const mockCoffees: Coffee[] = [
      new Coffee(1, 'Coffee 1', 'Tipo 1', 'Región 1', 'Sabor 1', 1000, 'imagen1.jpg'),
      new Coffee(2, 'Coffee 2', 'Tipo 2', 'Región 2', 'Sabor 2', 1200, 'imagen2.jpg')
    ];

    // Hacemos que el servicio retorne nuestro mock
    mockCoffeeService.getCoffees.and.returnValue(of(mockCoffees));

    // Disparamos el ngOnInit
    fixture.detectChanges();

    // Verificamos que se asignaron los cafés
    expect(component.coffees.length).toBe(2);
    expect(component.coffees).toEqual(mockCoffees);
    expect(mockCoffeeService.getCoffees).toHaveBeenCalled();
  });
});
