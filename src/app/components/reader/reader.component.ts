import { Component } from '@angular/core';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html'
})
export class ReaderComponent{
  currentStoryPart: any;

  constructor(public storyService: StoryService) {
    storyService.currentStoryPart$.subscribe(currentStoryPart => {
      this.currentStoryPart = currentStoryPart;
    });
  }

  startOver() {
    this.storyService.startOver();
  }
}