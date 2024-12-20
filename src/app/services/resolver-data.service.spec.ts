import { ResolverDataService } from './resolver-data.service';
import {BehaviorSubject, of} from "rxjs";

describe('ResolverDataService', () => {
  let service: ResolverDataService;
  let isAdminMock$: BehaviorSubject<boolean>;

  beforeEach(() => {
    isAdminMock$ = new BehaviorSubject<boolean>(false);

    service = {
      isAdmin$: of(true),
      setAdminPermission: jest.fn((isAdmin: boolean) => {
        isAdminMock$.next(isAdmin);
      }),
    } as unknown as ResolverDataService
  });

  it('should be successfully instantiated', () => {
    expect(service).toBeTruthy();
  });

  it('should set admin permission', (done) => {
    service.setAdminPermission(true);

    isAdminMock$.subscribe((res) => {
        expect(res).toBe(true);
        done()
      })
  });
});
