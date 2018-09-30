import { Injectable } from '@angular/core';
import { SwallowService } from './swallow.service';


@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(
        public s: SwallowService
    ) {

    }
}
