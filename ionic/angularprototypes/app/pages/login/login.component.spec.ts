import { provide } from '@angular/core';
import {
  describe, expect, it, xit, inject, beforeEach, beforeEachProviders,
  setBaseTestProviders, async, resetBaseTestProviders
}  from '@angular/core/testing';
import {
  TestComponentBuilder, ComponentFixture
} from '@angular/compiler/testing';
import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
} from '@angular/platform-browser-dynamic/testing';
import { HTTP_PROVIDERS, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { NavController } from 'ionic-angular';

resetBaseTestProviders();
setBaseTestProviders(
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

import { UserService } from '../../shared/shared'

import { UserComponent } from '../user'

import { LoginComponent } from './login.component';

declare const jasmine: any, spyOn: any;

class NavControllerMock {
  push(comp: any) {
    return true;
  }
}

describe('Component: LoginComponent', () => {

  // rc4 has some breaking changes which does not work with component is having templateUrl.
  let tempate = `
  `;

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    provide(XHRBackend, { useClass: MockBackend }),
    provide(NavController, { useClass: NavControllerMock }),
    UserService
  ]);

  it('initially should be defined ', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let ci = fixture.componentInstance;
        expect(ci).toBeDefined();
      });
  })));

  it('should have empty form at initial.', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.componentInstance;
        fixture.detectChanges();

        expect(ci.username).not.toBeDefined();
        expect(ci.password).not.toBeDefined();
      });
  })));

  it('should prompt error with wrong credentials', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        ci.username = 'test';
        ci.password = 'test123';
        fixture.detectChanges();

        ci.login();
        fixture.detectChanges();

        setTimeout(() => {
          expect(ci.errorMessage).toBeDefined();
          expect(ci.errorMessage).toBe('unkwown username/password.')
        }, 100)
      });
  })));

  it('should let user to login and navigate to user page', async(inject([ NavController, TestComponentBuilder ], (navCtrl, tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(LoginComponent, tempate)
      .createAsync(LoginComponent).then((fixture) => {
        let el = fixture.nativeElement;
        let ci = fixture.componentInstance;
        fixture.detectChanges();

        ci.username = 'demo';
        ci.password = 'demo';
        fixture.detectChanges();

        spyOn(navCtrl, 'push');

        ci.login();
        fixture.detectChanges();

        setTimeout(() => {
          expect(ci.errorMessage).not.toBeDefined();
          expect(navCtrl.push).toHaveBeenCalledWith(UserComponent);
        }, 100);
      });
  })));
});