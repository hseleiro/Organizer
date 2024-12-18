import {UserRequestsService} from "./user-requests.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

let service: UserRequestsService
let httpMock: HttpTestingController;

describe('RequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    TestBed.runInInjectionContext(() => {
      service = new UserRequestsService();
    });
    httpMock = TestBed.inject(HttpTestingController);
  })

  it('should be successfully instantiated', () => {
    expect(service).toBeTruthy();
  })

  it('should get users', () => {
    service.getUsers().subscribe((res) => {
      expect(res).toBe(
        {
          _id: 123456,
          first_name: 'teste',
          last_name: 'teste',
          email: 'teste',
          role: 'teste',
        }
      )

      const request = httpMock.expectOne(({
        url: 'http://localhost:5005/app/users',
        method: 'GET',
      }))

      request.flush({
        _id: 123456,
        first_name: 'teste',
        last_name: 'teste',
        email: 'teste',
        role: 'teste',
      });

    })
  })

  it('should delete a user', () => {
    service.deleteUser(1).subscribe((res) => {
      expect(res).toBe(
        {
          _id: 1,
          first_name: 'teste',
          last_name: 'teste',
          email: 'teste',
          role: 'teste',
        }
      )

      const request = httpMock.expectOne(({
        url: 'http://localhost:5005/app/users/:id',
        method: 'DELETE',
      }))

      request.flush({
        _id: 1,
        first_name: 'teste',
        last_name: 'teste',
        email: 'teste',
        role: 'teste',
      });

    })
  });

})
