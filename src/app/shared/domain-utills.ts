export class DomainUtills {
    baseUrl = new BaseUrl();
    GetDomain(): any {
      return this.baseUrl.ApiUrl + "api/";
    }
  
    GetClientDomain(isProduction: boolean = true): string {
      if (window.location.origin.includes('localhost')) {
        return this.baseUrl.ApiUrl;
      }
      else
        return this.baseUrl.ApplicationUrl;
    }
  };
  export class BaseUrl {
    private applicationUrl: string;
    private apiUrl: string;
    constructor() {
      this.applicationUrl = window.location.origin + "/";
      this.apiUrl = this.getApiUrl();
    }
    get ApplicationUrl() {
      return this.applicationUrl;
    }
    get ApiUrl() {
      return this.apiUrl;
    }
    getApiUrl() {
      let originalPath = window.location.origin;
      let domain: string = "";
      let env = originalPath.split("-");
      if (originalPath.includes("localhost")) {
        domain = "https://localhost:7062/";
      }
      return domain;
    }
  }