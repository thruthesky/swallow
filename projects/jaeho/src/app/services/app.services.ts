import { Injectable, NgZone } from '@angular/core';
import { Error, FirehouseService } from 'firehouse';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(
        private ngZone: NgZone,
        private router: Router,
        public f: FirehouseService
    ) {
        window['a'] = this;
        this.initRenderOnStateChange();
    }


    initRenderOnStateChange() {
        this.f.fireAuth.auth.onAuthStateChanged(() => {
            this.render();
        });
    }

    render() {
        this.ngZone.run(() => { });
    }


    alert(msg: string) {
        alert(msg);
    }
    error(err) {
        if (err['code'] === void 0) {
            // not error
            return;
        }
        alert(`Error(${err.code}): ${err.message}`);
    }

    get homeUrl(): string {
        return '/';
    }
    openHome() {
        this.router.navigateByUrl(this.homeUrl);
    }
}