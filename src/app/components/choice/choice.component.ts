import { Component, OnInit, Input } from '@angular/core';
import { Choice } from '../../models/choice';
import { Option } from '../../models/option';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html'
})
export class ChoiceComponent {
  @Input() choice: Choice;
  storyService: StoryService;

  constructor(storyService: StoryService) {
    this.storyService = storyService;
  }

  answer(option: Option) {
    this.storyService.answer(option);
  }
}