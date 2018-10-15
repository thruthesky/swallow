import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FirehouseService } from 'projects/modules/firehouse/firehouse.service';

@Injectable({ providedIn: 'root' })
export class AppService {

    constructor(
        private ngZone: NgZone,
        private router: Router,
        public firehouse: FirehouseService
    ) {
        window['a'] = this;
        this.initRenderOnStateChange();
    }


    initRenderOnStateChange() {

        this.firehouse.auth.onAuthStateChanged( user => {
            this.render();
        });
        // this.firehouse.authChange.subscribe( user => {
        //     this.render();
        // });
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