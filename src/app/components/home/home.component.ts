import { Component } from '@angular/core';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  stories: any[];
  storyService: any;

  constructor(storyService: StoryService) {
    this.storyService = storyService;
    this.storyService.stories$.subscribe(stories => {
      this.stories = stories;
    });
  }

  begin(src: string) {
    this.storyService.setStory(src);
  }
}