import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from "./shared/components/toolbar.component";
import {MockComponents} from "ng-mocks";
import '@testing-library/jest-dom';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

describe('AppComponent', () => {
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn()
    }

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: Router, useValue: mockRouter}],
      declarations: [
        AppComponent,
        MockComponents(ToolbarComponent),
      ],
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  })

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'))
    expect(routerOutlet).toBeTruthy()
  })

  it('should render toolbar if user is authenticated', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.isAuth$ = new Observable((observable) => {
      observable.next(true);
    })

    Object.defineProperty(mockRouter, 'url', {
      get: jest.fn(() => '/dashboard')
    })

    fixture.detectChanges();

    const toolbar = fixture.debugElement.query(By.css('toolbar'))
    expect(toolbar).toBeTruthy();
  })

  it('should not render the toolbar is user is not authenticated', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.isAuth$ = new Observable((observable) => {
      observable.next(false);
    })

    Object.defineProperty(mockRouter, 'url', {
      get: jest.fn(() => '/login')
    })

    fixture.detectChanges();

    const toolbar = fixture.debugElement.query(By.css('toolbar'))
    expect(toolbar).toBeFalsy();
  })

});
