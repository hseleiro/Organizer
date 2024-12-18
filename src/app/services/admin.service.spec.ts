import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AdminService} from "./admin.service";

let service: AdminService;
let httpMock: HttpTestingController;

describe('AdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    TestBed.runInInjectionContext(() => {
      service = new AdminService();
    });
    httpMock = TestBed.inject(HttpTestingController);
  })

  it('should be successfully instantiated', () => {
    expect(service).toBeTruthy();
  })

  it('should validade if the user is admin', () => {
    service.validateAdmin().subscribe((res) => {
      expect(res).toBe(
        {
          status: "success",
          message: "Welcome to the Admin portal!",
        }
      )
    })

    const request = httpMock.expectOne(({
      url: 'http://localhost:5005/app/admin',
      method: 'GET',
    }))

    request.flush({
      status: "success",
      message: "Welcome to the Admin portal!",
    });

  })
})
