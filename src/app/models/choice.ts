import { Option } from './option';
import { Consequence } from './consequence';

export class Choice {
    Title: string;
    Description: string;
    Options: Option[];
    Option: Option;
    Consequence: Consequence;

    constructor() {}
}