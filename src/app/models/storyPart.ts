import { Choice } from './choice';

export class StoryPart {
    public If: string;
    public Show: string;
    public Content: string;
    public Choice: Choice;

    constructor() {}
}