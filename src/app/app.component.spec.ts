import { AppComponent } from './app.component';
import '@testing-library/jest-dom';
import {BehaviorSubject} from "rxjs";
import {render, RenderResult} from "@testing-library/angular";
import { isAuth } from './shared/functions/is-auth'
import {AuthService} from "./services/auth.service";
import {MockProvider} from "ng-mocks";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser";

jest.mock('./shared/functions/is-auth', () => ({
  isAuth: jest.fn()
}))

let component: RenderResult<AppComponent>
let mockRouter: Partial<Router>;
let mockIsAuthSubject: BehaviorSubject<boolean>;

describe('AppComponent', () => {

  mockRouter = {};

  beforeEach(async () => {
    mockIsAuthSubject = new BehaviorSubject<boolean>(false);

    (isAuth as jest.Mock).mockReturnValue(mockIsAuthSubject.asObservable());

    component = await render(AppComponent, {
      providers: [
        { provide: Router, useValue: mockRouter },
        MockProvider(AuthService)
      ]
    });
  })

  it('should create the toolbar', () => {
    expect(component.fixture.componentInstance).toBeTruthy();
  })

  it('should render the toolbar component', () => {
    mockIsAuthSubject.next(true);

    Object.defineProperty(mockRouter, 'url', {
      get: jest.fn(() => '/dashboard')
    })

    component.detectChanges();

    const toolbar = component.debugElement.query(By.css('toolbar'))
    expect(toolbar).toBeTruthy();
  })

})
