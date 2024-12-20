import {signal} from "@angular/core";
import {User} from "../../infrastructures/types/user";
import {render, RenderResult} from "@testing-library/angular";
import {UserListComponent} from "./user-list.component";
import {UserManagementService} from "../../services/user-management.service";
import {By} from "@angular/platform-browser";

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

const MockUserManagementService: any = {
  users: signal(mockUsers),
  deleteUser: jest.fn().mockImplementation((id) => {
    const users = mockUsers.filter((r) => r._id !== id);
    MockUserManagementService.users.set(users);
  })
}

let component: RenderResult<UserListComponent>

describe('UserListComponent', () => {
  beforeEach(async () => {
    component = await render(UserListComponent, {
      providers: [{provide: UserManagementService, useValue: MockUserManagementService}]
    })
  })

  it('should render the component', () => {
    expect(component).toBeTruthy()
  })

  it('should render users', () => {
    const userList = component.debugElement.queryAll(By.css('ul li'));

    expect(userList.length).toBe(2);
    expect(userList[0].nativeElement.textContent).toContain('Hugo');
    expect(userList[1].nativeElement.textContent).toContain('Carlos');
  })

  it('should delete a user', () => {
    const deleteButtons = component.debugElement.queryAll(By.css('ul li button'));

    deleteButtons[0].nativeElement.click();

    component.detectChanges();

    expect(MockUserManagementService.deleteUser).toHaveBeenCalledWith(1);
    expect(MockUserManagementService.users().length).toBe(1);
    expect(MockUserManagementService.users()[0].first_name).toBe('Carlos');
  })
})
