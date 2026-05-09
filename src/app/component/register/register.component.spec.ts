import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

// describe('RegisterComponent', () => {
//   let component: RegisterComponent;
//   let fixture: ComponentFixture<RegisterComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RegisterComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(RegisterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // create spies for the dependencies
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      // if your component is standalone keep it in imports; otherwise use declarations
      imports: [RegisterComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    loginServiceSpy.register.calls.reset();
    routerSpy.navigate.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call register and should alert when passwords do not match', () => {
    spyOn(window, 'alert');
    component.payload = { name: '', email: '', password: 'abc', confirmPassword: 'xyz' };

    component.onregister();

    expect(loginServiceSpy.register).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('password do not match');
  });

  it('should call register and navigate to /login on successful registration', () => {
    const mockResponse = { userId: '123' };
    loginServiceSpy.register.and.returnValue(of(mockResponse));

    component.payload = { name: 'Rahul', email: 'r@example.com', password: 'pass', confirmPassword: 'pass' };
    component.onregister();

    expect(loginServiceSpy.register).toHaveBeenCalledWith(component.payload);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should log error and not navigate when registration fails', () => {
    spyOn(console, 'error');
    loginServiceSpy.register.and.returnValue(throwError(() => new Error('registration failed')));

    component.payload = { name: 'Rahul', email: 'r@example.com', password: 'pass', confirmPassword: 'pass' };
    component.onregister();

    expect(loginServiceSpy.register).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
