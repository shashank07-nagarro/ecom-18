import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FilteredListComponent } from './filtered-list.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { reducers } from '../store/reducers';
import { metaReducers } from '../meta-reducers';

import { loadState } from '../local-storage';

const isBrowser =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const initialState = isBrowser ? loadState('ngrx-state') : undefined;

describe('FilteredListComponent', () => {
  let component: FilteredListComponent;
  let fixture: ComponentFixture<FilteredListComponent>;
  let meta: Meta;
  let activatedRouteStub: any;

  beforeEach(async () => {
    // Stub for ActivatedRoute
    activatedRouteStub = {
      paramMap: of({
        get: (param: string) => {
          const params: any = { category: 'shoes', gender: 'male' };
          return params[param];
        },
      }),
    };

    await TestBed.configureTestingModule({
      imports: [FilteredListComponent], // Standalone components directly imported
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        Meta,
        provideStore(reducers, { metaReducers, initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilteredListComponent);
    component = fixture.componentInstance;
    meta = TestBed.inject(Meta);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize selectedColors form controls', () => {
    const expectedControls = component.colorList.reduce((acc, color) => {
      acc[color] = false;
      return acc;
    }, {} as any);

    expect(component.selectedColors.value).toEqual(expectedControls);
  });

  it('should correctly update filterData$ when route params change', (done) => {
    component.filterData$.subscribe((data) => {
      expect(data).toEqual({
        category: 'shoes',
        gender: 'male',
        minPrice: 99,
        maxPrice: 1000,
        color: [],
      });
      done();
    });
  });

  it('should update color array and call modelChangeFn on selectedColors value change', () => {
    spyOn(component, 'modelChangeFn').and.callThrough();
    component.selectedColors.patchValue({ black: true, white: true });

    expect(component.color).toEqual(['black', 'white']);
    expect(component.modelChangeFn).toHaveBeenCalled();
  });

  it('should update filterData$ in modelChangeFn', (done) => {
    component.color = ['red', 'yellow'];
    component.modelChangeFn();

    component.filterData$.subscribe((data) => {
      expect(data).toEqual({
        category: 'shoes',
        gender: 'male',
        minPrice: 99,
        maxPrice: 1000,
        color: ['red', 'yellow'],
      });
      done();
    });
  });
});
