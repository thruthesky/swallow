# Swallow

Powerful PWA CMS

## Documents & References

* [Git issues](https://github.com/thruthesky/swallow#issue-sh-boards?repos=swallow)
* [Firebase Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
* [Firebase CMS](https://github.com/thruthesky/firebase-cms)

## Installation & Dependencies

### Npm modules

$ ng add @angular/material
$ npm install @angular/fire firebase --save
$ npm i bootstrap

### Setup

* Add environment of your own with firebase configuration.

* Environment

```` typescript
export const environment = {
  production: false, // production flag
  debug: true, // for debugging. Should be false on production site.
  firebase: { // firebase keys.
    apiKey: '-----------------------------------',
    authDomain: '-------------------------------',
    databaseURL: '------------------------------',
    projectId: '--------------------------------',
    storageBucket: '----------------------------',
    messagingSenderId: '------------------------'
  }
};
````

### Resources

* Angular materials
* Angular fire
* Bootstrap v4. Only utiltiy and grid of Bootstrap v4 is included. You can not use all of the bootstrap v4.

## Run

```` sh
ng s -c jaeho
````

## Coding Style Guide

* Follow [Angular Coding Style Guide](https://angular.io/guide/styleguide) first.
  100% Angular Coding Style Guide 를 따르고 본 지침을 따를 것.

* Avoid writing css code by yourself. SCSS 코드를 작성하지 말고 디자인 할 것.
  * Use Bootstrap utility classes. Bootstrap 유틸리티 클래스 및
  * Or create your own utility classes. 직접 유틸리티 클래스를 작성해서 사용 할 것.
  * Follow SMACSS. SCSS 유틸리티 클래스를 작성할 때 SMACSS 를 따를 것.
  * Reason for this is to communicate with CSS code. 사유: CSS/SCSS 코드를 통해서 개발간의 의미 전달이 매우 어려움

## Development Guide

### Debugging

* To enable `debug` mode, set `debug` to true on your environment.

* In debug mode,
  * You can use `a` as app service instance in dev consloe.

### Security Rules

* To set firestore security rules, plesae run the following

```` sh
firebase deploy --only firestore:rules
````

### User authentication - Register, Login, Update

* see [Angularfire Authentication](https://github.com/angular/angularfire2/blob/master/docs/auth/getting-started.md#5-getting-started-with-firebase-authentication)


## Database Struecture

### Firestore admin structure

```` text
swallow/{domain}/settings/admin/{ email: 'admin email adress '}
````


## Unit Testing

* To do unit testing, inject `SwallowTestService` and call `run()` method.

```` typescript
constructor( private st: SwallowTestService) { st.run(); }
````

## History

* 2018-10-08 `firebase cli` and `firebaes project` has been added & initilized.
* 2018-10-04 adding `change` module.
* 2018-10-04 window[a] added in global.
* 2018-09-28 firebase and angular fire aded.
* 2018-09-27 Angular material and Bootstrap v4 added.