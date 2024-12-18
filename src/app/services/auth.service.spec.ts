import {AuthService} from "./auth.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TestBed} from "@angular/core/testing";

let service: AuthService;
let httpMock: HttpTestingController;

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    TestBed.runInInjectionContext(() => {
      service = new AuthService();
    });
    httpMock = TestBed.inject(HttpTestingController);
  })

  it('should be successfully instantiated', () => {
    expect(service).toBeTruthy();
  })

  it('should log the user in', () => {
    service.login({email: 'test', password: 'test'}).subscribe((res) => {
      expect(res).toBe(
        {
          status: "success",
          message: "You have successfully logged in.",
        }
      )
    })

    const request = httpMock.expectOne(({
      url: 'http://localhost:5005/app/auth/login',
      method: 'POST',
    }))

    request.flush({
      status: "success",
      message: "You have successfully logged in.",
    });
  })

  it('should register a new user', () => {
    service.register({first_name: 'test', last_name: 'test', email: 'test', password: 'test'}).subscribe((res) => {
      expect(res).toBe(
        {
          status: 'success',
          data: [],
          message: 'Thank you for registering with us. Your account has been successfully created.'
        }
      )

      const request = httpMock.expectOne(({
        url: 'http://localhost:5005/app/auth/register',
        method: 'POST',
      }))

      request.flush({
        status: 'success',
        data: [],
        message: 'Thank you for registering with us. Your account has been successfully created.'
      });
    })
  })

  it('should log out the user', () => {
    service.logout().subscribe((res) => {
      expect(res).toBe(
        { message: 'You are logged out!' }
      )
      expect(service.isAuth$.getValue()).toBe(false)
    })

    const request = httpMock.expectOne(({
      url: 'http://localhost:5005/app/auth/logout',
      method: 'GET',
    }))

    request.flush(
      { message: 'You are logged out!' }
    )
  })

  it('should validate session', () => {
    service.validateSession().subscribe((res) => {
      expect(res).toBe({
        status: "success",
        message: "Welcome to the your Dashboard!",
      })

      expect(service.isAuth$.getValue()).toBe(true);
    })

    const request = httpMock.expectOne(({
      url: 'http://localhost:5005/app/user',
      method: 'GET',
    }))

    request.flush({
      status: "success",
      message: "Welcome to the your Dashboard!",
    })

  })

})
