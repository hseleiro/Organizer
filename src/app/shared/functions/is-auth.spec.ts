import {BehaviorSubject} from "rxjs";
import {isAuth} from "./is-auth";

jest.mock('../functions/is-auth', () => ({
  isAuth: jest.fn()
}))

describe('isAuth', () => {
  let mockIsAuthSubject: BehaviorSubject<boolean>

  beforeEach(() => {
    mockIsAuthSubject = new BehaviorSubject<boolean>(false);

    (isAuth as jest.Mock).mockImplementation(() => mockIsAuthSubject.asObservable());
  })

  it('should instantiate isAuth', () => {
    expect(isAuth()).toBeTruthy()
  })

  it('should return isAuth as observable', (done) => {
    mockIsAuthSubject.next(true);

    isAuth().subscribe((r) => {
      expect(r).toBe(true);
      done()
    })
  })

})
