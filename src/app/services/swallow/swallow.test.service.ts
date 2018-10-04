import { Injectable } from "@angular/core";
import {
    SwallowService, ERROR_EMPTY_INPUT, ERROR_EMPTY_PASSWORD, ERROR_EMPTY_EMAIL, ERROR_LOGIN_FIRST, User
} from "./swallow.service";
import { Chance } from 'chance';

@Injectable({ providedIn: 'root' })
export class SwallowTestService {
    constructor(
        private s: SwallowService
    ) {
        window['st'] = this;
    }

    log(msg) {
        console.log(`=========> `, ...msg);
    }
    success(msg) {
        console.log(`SUCCESS: `, ...msg);
    }
    failure(msg) {
        console.error(`FAILURE: msg`, ...msg);
    }

    true(re, ...msg) {
        if (re) {
            this.success(msg);
        } else {
            this.failure(msg);
        }
    }

    run() {
        this.log('test::run()');
        this.testUserRegisterLogoutLoginUpdate();
    }



    async testUserRegisterLogoutLoginUpdate() {

        // error test
        let re = await this.s.userRegister(undefined).catch(e => e);
        this.true(re.code === ERROR_EMPTY_INPUT, 'Expect error: Empty input test');

        re = await this.s.userRegister({ email: '', password: '' }).catch(e => e);
        this.true(re.code === ERROR_EMPTY_EMAIL, 'Expect error: Email is empty.');

        re = await this.s.userRegister({ email: 'abc', password: '' }).catch(e => e);
        this.true(re.code === ERROR_EMPTY_PASSWORD, 'Expect error: Password is empty.');

        
        re = await this.s.userRegister({ email: 'abc', password: 'abc' }).catch(e => e);
        this.true(re.code, re.message);

        re = await this.s.userRegister({ email: 'abc@abc.com', password: 'a' }).catch(e => e);
        this.true(re.code, re.message);

        // expect success
        const email = new Chance().email();
        const password = new Chance().string({ length: 8 });
        const form: User = {
            email: email,
            password: password,
            gender: 'M'
        };
        re = await this.s.userRegister( form ).catch( e => e );
        this.true( re.code === void 0, `Expect success. No error. Registered with ${email} and password: ${password} or Error code and message: coe: ${re.code}, message: ${re.message} `);

        await this.s.userLogout();

        re = await this.s.userUpdate({ mobile: '12345' }).catch( e => e );
        this.true( re.code === ERROR_LOGIN_FIRST, `Express failure: ${re.message}` );

        re = await this.s.userLogin( undefined, undefined ).catch(e => e);
        this.true(re.code === ERROR_EMPTY_EMAIL, 'Expect error: Email is empty.');

        re = await this.s.userLogin( 'abc@abc.com', undefined ).catch(e => e);
        this.true(re.code === ERROR_EMPTY_PASSWORD, 'Expect error: Password is empty.');

        // Expect wrong login information.
        re = await this.s.userLogin( 'abc@abc.com', 'abc' ).catch(e => e);
        this.true(re.code !== void 0, 'Wrong login email/password: ' + re.message);

        // Expect success on login
        let user = await this.s.userLogin( email, password ).catch(e => e);
        this.true(user.code === void 0, `Success login with: ${user.email} uid: ${user.uid}` );


        re = await this.s.userUpdate({ mobile: '12345' }).catch( e => e );
        this.true( re.code === void 0, 'User update: ', re );


    }
}
