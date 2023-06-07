import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  userInput = '';
  chatHistory: { role: string, content: string }[] = [];

  constructor(
    private openaiService: OpenaiService,
    private changeDetector: ChangeDetectorRef
  ) { }

  async ngOnInit() { }

  async onFormSubmit(event: Event) {
    event.preventDefault();
    this.chatHistory.push({ role: 'user', content: this.userInput });
    const botReply = await this.openaiService.getResponse(this.userInput);
    this.chatHistory.push({ role: 'system', content: botReply });
    this.userInput = '';
    this.changeDetector.detectChanges();
  }
}
