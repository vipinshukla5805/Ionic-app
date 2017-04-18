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

import { DynamoDBService, CognitoService, ConfigProvider } from '../../shared/aws'

import { UserComponent } from '../user'

import { AWSComponent } from './aws.component';

declare const jasmine: any, spyOn: any;

describe('Component: AWSComponent', () => {

  // rc4 has some breaking changes which does not work with component is having templateUrl.
  let tempate = `
    <button type="submit" (click)="authAndGetData()">start</button>
  `;

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    provide(XHRBackend, { useClass: MockBackend }),
    ConfigProvider,
    CognitoService,
    DynamoDBService
  ]);

  it('initially should be defined ', async(inject([ TestComponentBuilder ], (tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(AWSComponent, tempate)
      .createAsync(AWSComponent).then((fixture) => {
        let ci = fixture.componentInstance;
        expect(ci).toBeDefined();
      });
  })));

  it('should call auth service on button click ', async(inject([ CognitoService , TestComponentBuilder ], ( cognitoService, tcb: TestComponentBuilder) => {
    tcb.overrideTemplate(AWSComponent, tempate)
      .createAsync(AWSComponent).then((fixture) => {
        let ci = fixture.componentInstance;
        let el = fixture.nativeElement;
        fixture.detectChanges();

        spyOn(cognitoService, 'loginUser');
        let btn = el.querySelector('button');
        btn.click();

        fixture.detectChanges();

        expect(cognitoService.loginUser).toHaveBeenCalled();
      });
  })));
});
