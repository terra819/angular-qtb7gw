import { Component } from '@angular/core';
import { StoryService } from './services/story.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentStory: any = undefined;

  constructor(storyService: StoryService) {
    storyService.currentStory$.subscribe(story => {
      this.currentStory = story;
    });
  }
}