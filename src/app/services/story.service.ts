import { Injectable } from '@angular/core';
import { Option } from '../models/option';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Story } from '../models/story';
import { StoryPart } from '../models/storyPart';
var json = require('../../assets/stories.json');

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  http: any;

  constructor(http: HttpClient) {
    this.http = http;
  }

  private _stories = new BehaviorSubject<Array<string>>(json.stories);
  public stories$ = this._stories.asObservable();

  private _currentStory = new BehaviorSubject<Story>(undefined);
  public currentStory$ = this._currentStory.asObservable();

  private _currentStoryPart = new BehaviorSubject<StoryPart>(undefined);
  public currentStoryPart$ = this._currentStoryPart.asObservable();

  setStory(file: string) {
    this.http.get(`../../assets/stories/${file}.json`).subscribe(data => {
      this._currentStory.next(data);
      this.next();
    });
  }

  next() {
    // loop through next parts and evaluate if and show
    var story = this._currentStory.value;
    if (this._currentStory.value.Next.length > 0) {
      for (var i = 0, a = this._currentStory.value.Next; i < a.length; i++) {
        var next = a[i];
        if (eval(next.If)) {
          if (eval(next.Show)) {
            // show this to the user
            this._currentStoryPart.next(next);
            this._currentStory.next(story);
            break;
          }
          else {
            // auto answer this without showing user
            this.autoAnswer(next);
          }
        }
        else {
          // this isn't part of the story anymore
          this.advanceStory(next);
        }
      }
    }
    else {
      // no more story left
      this.startOver();
    }
  }

  advanceStory = function (storyPart) {
    this._currentStory.value.Back.push(storyPart);
  }

  autoAnswer(storyPart: StoryPart) {
    const randomOption = storyPart.Choice.Options[Math.floor(Math.random() * storyPart.Choice.Options.length)];
    console.log(randomOption);
    this.pickConsequence(randomOption);
  }

  answer(option: Option) {
    this.pickConsequence(option);
  }

  pickConsequence(option: Option) {
    const story = this._currentStory.value;
    const randomConsequence = option.Consequences[Math.floor(Math.random() * option.Consequences.length)];
    const currentPart = this._currentStoryPart.value;
    currentPart.Choice.Option = option;
    currentPart.Choice.Consequence = randomConsequence;
    this._currentStory.value.Back.push(currentPart);
    this._currentStory.value.Next.splice(0, 1);
    eval(randomConsequence.Action);
    this._currentStory.next(story);
    this.next();
  }

  startOver() {
    this._currentStory.next(undefined);
    this._currentStoryPart.next(undefined);
  }
}