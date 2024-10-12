import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CustomSearchService {

  private apiKey = '';
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; // Adjust based on the API you are using

  constructor(
    private http: HttpClient
  ) { }

  customeSearchApi(searchText: string) {
    const customeSerachApiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchText}%203d%20images&cx=3445a144d26f841f7&key=&searchType=image&num=5&imgSize=large`;
    return this.http.get(customeSerachApiUrl);
  }

  customeSearchTextApi(searchText: string) {
    const customeSerachApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchText)}`;
    return this.http.get(customeSerachApiUrl);
  }

  async getResponse(prompt: string): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, {
        model: 'gpt-3.5-turbo', // Specify the model you want to use
        messages: [{ role: 'user', content: prompt }]
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error fetching from OpenAI:', error);
      throw error;
    }
  }
}
