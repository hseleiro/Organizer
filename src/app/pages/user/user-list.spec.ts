import {UserListComponent} from "./user-list.component";

describe('User list component unit test', () => {
  let component: UserListComponent;

  beforeEach(() => {
    component = new UserListComponent();
  })

  it('should delete a product', () => {
    const userIdToDelete = 1;
    component.deleteUser(userIdToDelete);

    cy.wrap(component.users().length).should('eq', 1);
  })
});

