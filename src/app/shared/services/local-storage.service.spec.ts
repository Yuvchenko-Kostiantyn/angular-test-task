import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save items into local storage', () => {
    spyOn(localStorage, 'setItem');

    service.setItem('testKey', 'testValue');
    expect(localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue');
  });

  it('should get items from local storage', () => {
    const spy = spyOn(localStorage, 'getItem');
    spy.withArgs('testKey').and.returnValue('testValue')

    expect(service.getItem('testKey')).toEqual('testValue');
  });
});

