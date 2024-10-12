import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisionApiService {

  constructor(
    private http: HttpClient
    ) { }

  sendToVisionApi(base64Image: string) {
    const customeSerachApiUrl = "https://vision.googleapis.com/v1/images:annotate?key=";
    
    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image.replace('data:image/jpeg;base64,', '')
          },
          features: [
            {
              type: "OBJECT_LOCALIZATION",
              maxResults: 10
            }
          ]
        }
      ]
    };

    return this.http.post(customeSerachApiUrl, requestBody);
  }
}
