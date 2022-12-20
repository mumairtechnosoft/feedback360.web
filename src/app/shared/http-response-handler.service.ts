import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpResponseHandlerService {

  constructor(private injector: Injector) { }

  /**
    * Global http error handler.
    *
    * @param error
    * @param source
    * @returns {ErrorObservable}
    */
  public onCatch(response: any, source: Observable<any>): Observable<any> {
    switch (response.status) {
      case 400:
        this.handleBadRequest(response);
        break;

      case 401:
        //this.handleUnauthorized(response);
        break;

      case 403:
        this.handleForbidden();
        break;

      case 404:
        this.handleNotFound(response);
        break;

      case 500:
        this.handleServerError();
        break;

      default:
        break;
    }

    return throwError(response);
  }
  /**
   * Shows notification errors when server response status is 401
   *
   * @param error
   */
  private handleBadRequest(responseBody: any): void {
    if (responseBody._body) {
      try {
        const bodyParsed = responseBody.json();
        this.handleErrorMessages(bodyParsed);
      } catch (error) {
        this.handleServerError();
      }
    } else {
      this.handleServerError();
    }
  }
  /**
   * Shows notification errors when server response status is 401 and redirects user to login page
   *
   * @param responseBody
   */
//   public handleUnauthorized(responseBody: any): void {
//     // Read configuration in order to see if we need to display 401 notification message
//     const auth = this.injector.get(AuthService);
//     //if(!auth.getisRefreashisProcess)
//     auth.loggedOut();
//   }

  /**
 * Shows notification errors when server response status is 403
 */
  private handleForbidden(): void {
  }
  /**
     * Shows notification errors when server response status is 404
     *
     * @param responseBody
     */
  private handleNotFound(responseBody: any): void {
    // Read configuration in order to see if we need to display 401 notification message
  }
  /**
     * Shows notification errors when server response status is 500
     */
  private handleServerError(): void {

  }
  /**
  * Parses server response and shows notification errors with translated messages
  *
  * @param response
  */
  private handleErrorMessages(response: any): void {
    if (!response) {
      return;
    }
  }
  /**
* Returns relative url from the absolute path
*
* @param responseBody
* @returns {string}
*/
  private getRelativeUrl(url: string): string {
    return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '');
  }

}