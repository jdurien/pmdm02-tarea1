import { TestBed } from '@angular/core/testing';

import { GestionFicherosService } from './gestion-ficheros.service';

describe('GestionFicherosService', () => {
  let service: GestionFicherosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionFicherosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
