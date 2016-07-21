import { Headers, Http, Response, RequestOptionsArgs, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Thin wrapper for the main Http library
 */
@Injectable()
export class HttpService {

    private headers = new Headers({
        'Content-Type': 'application/json;charset=UTF-8'
    });

    constructor( private http: Http ) {}

    public post(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let url: string = path;
        let requestOptions = this.buildRequestMethods(RequestMethod.Post, url, options, body);

        return this.http.request(url, requestOptions);
    }

    public get(path: string, options?: RequestOptionsArgs): Observable<Response> {
        let url: string = path;
        let requestOptions = this.buildRequestMethods(RequestMethod.Get, url, options);

        return this.http.request(url, requestOptions);
    }

    public put(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let url: string = path;
        let requestOptions = this.buildRequestMethods(RequestMethod.Put, url, options, body);

        return this.http.request(url, requestOptions);
    }

    public patch(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let url: string = path;
        let requestOptions = this.buildRequestMethods(RequestMethod.Put, url, options, body);

        return this.http.request(url, requestOptions);
    }

    public delete(path: string, options?: RequestOptionsArgs): Observable<Response> {
        let url: string = path;
        let requestOptions = this.buildRequestMethods(RequestMethod.Put, url, options);

        return this.http.request(url, requestOptions);
    }

    private buildRequestMethods(method: RequestMethod, url: string, options: RequestOptionsArgs, body?: string): RequestOptionsArgs {
        let requestBody = body ? body : options && options.body ? options.body : undefined;
        let opts: RequestOptionsArgs = {
            method: method,
            url: url,
            headers: options && options.headers ? options.headers : this.headers,
            search: options && options.search ? options.search : undefined,
            body: requestBody
        };

        return opts;
    }
}
