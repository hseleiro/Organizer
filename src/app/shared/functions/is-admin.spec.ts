import {BehaviorSubject} from "rxjs";
import {isAdmin} from "./is-admin";

jest.mock('../functions/is-admin', () => ({
  isAdmin: jest.fn()
}));

describe('isAdmin', () => {
  let mockIsAdminSubject: BehaviorSubject<boolean>

  beforeEach(() => {
    mockIsAdminSubject = new BehaviorSubject<boolean>(false);

    (isAdmin as jest.Mock).mockImplementation(() => mockIsAdminSubject.asObservable());
  })

  it('should instantiate isAdmin', () => {
    expect(isAdmin()).toBeTruthy();
  })

  it('should return isAdmin$ as observable', (done) => {
    mockIsAdminSubject.next(true);

    isAdmin().subscribe((res) => {
      expect(res).toBe(true);
      done()
    })
  })

})
