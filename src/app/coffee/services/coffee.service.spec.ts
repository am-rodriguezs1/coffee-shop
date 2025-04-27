import { TestBed } from '@angular/core/testing';
import { CoffeeService } from './coffee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Coffee } from '../models/coffee';

describe('CoffeeService', () => {
  let service: CoffeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoffeeService]
    });

    service = TestBed.inject(CoffeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no haya peticiones pendientes
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch and map coffees correctly', () => {
    const mockResponse = [
      {
        id: 1,
        nombre: 'Coffee 1',
        tipo: 'Tipo 1',
        region: 'Región 1',
        sabor: 'Sabor 1',
        altura: 1000,
        imagen: 'imagen1.jpg'
      },
      {
        id: 2,
        nombre: 'Coffee 2',
        tipo: 'Tipo 2',
        region: 'Región 2',
        sabor: 'Sabor 2',
        altura: 1200,
        imagen: 'imagen2.jpg'
      },
      {
        id: 3,
        nombre: 'Coffee 3',
        tipo: 'Tipo 3',
        region: 'Región 3',
        sabor: 'Sabor 3',
        altura: 1200,
        imagen: 'imagen3.jpg'
      }
    ];

    service.getCoffees().subscribe(coffees => {
      expect(coffees.length).toBe(3);
      expect(coffees[0]).toEqual(jasmine.any(Coffee));
      expect(coffees[0].name).toBe('Coffee 1');
      expect(coffees[1].region).toBe('Región 2');
      expect(coffees[2].region).toBe('Región 3');
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); 
  });
});
