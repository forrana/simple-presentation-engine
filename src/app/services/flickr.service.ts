import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class FlickrService {
  private API_KEY = '8e2e23136a5f26f8a2d2e414a9f6dcff';
  private imagesUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&tags=`;  // URL to web API

  constructor (private http: Http) {}

   getImagesByTags(tags): Observable<any[]> {
       return this.http.get(this.imagesUrl + tags)
                     .map(this.extractData)
                     .catch(this.handleError);
   }

   private extractData(res: any) {
     var oParser = new DOMParser(),
         oDOM = oParser.parseFromString(res._body, "text/xml"),
         photo = oDOM.querySelector('photo');

     let farmId = photo.getAttribute('farm'),
         serverId = photo.getAttribute('server'),
         secret = photo.getAttribute('secret'),
         id = photo.getAttribute('id');

     let photoURL = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}.jpg`;

     return photoURL || '';
   }
   private handleError (error: Response | any) {
     // In a real world app, you might use a remote logging infrastructure
     let errMsg: string;
     if (error instanceof Response) {
       const body = error.json() || '';
       const err = body.error || JSON.stringify(body);
       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
     } else {
       errMsg = error.message ? error.message : error.toString();
     }
     console.error(errMsg);
     return Observable.throw(errMsg);
   }

}
