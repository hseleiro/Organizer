import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar.component';
import { By } from '@angular/platform-browser';
import { render, RenderResult } from '@testing-library/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { isAdmin } from '../functions/is-admin';
import {AuthService} from "../../services/auth.service";
import {MockProvider} from "ng-mocks";

jest.mock('../../shared/functions/is-admin', () => ({
  isAdmin: jest.fn()
}));

let component: RenderResult<ToolbarComponent>;
let mockRouter: Router;
let mockIsAdminSubject: BehaviorSubject<boolean>;

describe('ToolbarComponent', () => {
  beforeEach(async () => {
    mockIsAdminSubject = new BehaviorSubject<boolean>(false);

    (isAdmin as jest.Mock).mockReturnValue(mockIsAdminSubject.asObservable());

    mockRouter = {
      navigateByUrl: jest.fn()
    } as unknown as Router;

    component = await render(ToolbarComponent, {
      imports: [
        MatToolbarModule,
        MatMenuModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        MockProvider(AuthService)
      ],
    });
  });

  it('should create the toolbar', () => {
    expect(component.fixture.componentInstance).toBeTruthy();
  })

  it('should render Admin menu-item when user has admin privileges', () => {
    mockIsAdminSubject.next(true);
    openMenu();

    const menuItems = component.debugElement.queryAll(By.css('button[mat-menu-item]'));
    const menuTexts = menuItems.map(item => item.nativeElement.textContent.trim());

    expect(menuTexts).toEqual(['Admin', 'Logout']);
  });

  it('should not render Admin menu-item when user has no admin privileges', () => {
    mockIsAdminSubject.next(false);
    openMenu();

    const menuItems = component.debugElement.queryAll(By.css('button[mat-menu-item]'));
    const menuTexts = menuItems.map(item => item.nativeElement.textContent.trim());

    expect(menuTexts).toEqual(['Logout']);
  });

  it('should navigate to admin route when clicking Admin menu-item', () => {
    mockIsAdminSubject.next(true);
    openMenu();

    const menuItems = component.debugElement.queryAll(By.css('button[mat-menu-item]'));
    const adminMenuItem = menuItems.find(item => item.nativeElement.textContent.trim() === 'Admin');

    expect(adminMenuItem).toBeTruthy();

    adminMenuItem?.nativeElement.click();
    component.detectChanges();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/admin');
  });
});

// Helper function to open the menu
function openMenu() {
  const trigger = component.debugElement
    .query(By.directive(MatMenuTrigger))
    .injector.get(MatMenuTrigger);

  trigger.openMenu();
  component.detectChanges();
  return trigger;
}
