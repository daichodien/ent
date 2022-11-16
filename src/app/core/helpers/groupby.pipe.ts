import { Pipe, PipeTransform } from '@angular/core';
import { isEmpty } from 'rxjs/operators';
//import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';


// export class GroupByPipe implements PipeTransform {
//   transform(value: Array<any>, field: string): Array<any> {
//     const groupedObj = value.reduce((prev, cur)=> {
//       if(!prev[cur[field]]) {
//         prev[cur[field]] = [cur];
//       } else {
//         prev[cur[field]].push(cur);
//       }
//       return prev;
//     }, {});
//     return Object.keys(groupedObj).map(key => {return { key, value: groupedObj[key], }});
//   }
// }


@Pipe({name: 'groupBy'})
export class GroupByPipe implements PipeTransform {
    transform(collection:  Array<any>, property: string): Array<any> {
        // prevents the application from breaking if the array of objects doesn't exist yet
        if(!collection ||!Object.keys(collection).length) {
            return null;
        }

        const groupedCollection = collection.reduce((previous, current)=> {
            if(!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }

            return previous;
        }, {});

        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
    }
}


