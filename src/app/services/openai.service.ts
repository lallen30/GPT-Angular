import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {

  constructor() { }

  async getResponse(prompt: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: prompt,
          "model": "text-davinci-003",
          "max_tokens": 250,
          "temperature": 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <OPENAI_SECRET_KEY>', // Replace with your actual API key
          },
        }
      );

      console.log('response: ', response);

      if (response.data.choices[0].text && response.data.choices[0].text.length > 0) {
        const message = response.data.choices[0].text;
        if (message) {
          return message;
        }
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error fetching response from OpenAI API:', error);
      throw error;
    }
  }

}
