import {UserManagementService} from "./user-management.service";
import {TestBed} from "@angular/core/testing";
import {User} from "../infrastructures/types/user";
import {UserRequestsService} from "./user-requests.service";
import {of} from "rxjs";
import {MockProvider} from "ng-mocks";
import {UserManagementStubComponent} from "../testing/stubs/user-management-stub.component";

const mockUsers: User[] = [
  {
    _id: 1,
    first_name: 'Hugo',
    last_name: 'Seleiro',
    email: 'hseleiro1@gm.com',
    role: 'admin',
  },
  {
    _id: 2,
    first_name: 'Carlos',
    last_name: 'Xixa',
    email: 'hseleiro@cw.com',
    role: 'worker',
  }
]

const MockUserRequestService: Partial<UserRequestsService> = {
  getUsers: jest.fn().mockReturnValue(of(mockUsers)),
  deleteUser: jest.fn().mockImplementation((id) => {
    const index = mockUsers.findIndex((r) => r._id === id);
    if(index !== -1) {
      mockUsers.splice(index, 1);
    }
    return of({})
  })
}

let service: UserManagementService;

describe('UserManagementService', () => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [MockProvider(UserRequestsService, MockUserRequestService)],
      imports: [UserManagementStubComponent]
    });

    TestBed.runInInjectionContext(() => {
      service = new UserManagementService();
    });
  })

  it('should be successfully instantiated', () => {
    expect(service).toBeTruthy();
  });

  it('should have all users loaded initially', () => {
    const fixture = TestBed.createComponent(UserManagementStubComponent);
    fixture.detectChanges();
    expect(service.users()).toEqual(mockUsers)
  })

  it('should delete a user', () => {
    const fixture = TestBed.createComponent(UserManagementStubComponent);
    service.deleteUser(1);
    fixture.detectChanges()
    expect(service.users()).toBe(mockUsers);
  })

})
