import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(input: Array<any>, properties: string[], sep: string = ', '): string {
    if (!input || !Array.isArray(input)) {
      return '';
    }
    return input.map(item => 
      properties.map(prop => item[prop]).join(' ')
    ).join(sep);
  }
}
