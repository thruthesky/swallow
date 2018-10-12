import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class MessageService {
  public error(code, message) {
    return { code: code, message: message }
  }
}
