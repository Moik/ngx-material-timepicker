/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
export class TimeFormatterPipe {
    /**
     * @param {?} time
     * @param {?} timeUnit
     * @return {?}
     */
    transform(time, timeUnit) {
        if (time === undefined) {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return DateTime.fromObject({ hour: time }).toFormat('HH');
            case TimeUnit.MINUTE:
                return DateTime.fromObject({ minute: time }).toFormat('mm');
            default:
                throw new Error('no such time unit');
        }
    }
}
TimeFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeFormatter'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBS2pDLE1BQU0sT0FBTyxpQkFBaUI7Ozs7OztJQUUxQixTQUFTLENBQUMsSUFBWSxFQUFFLFFBQWtCO1FBQ3RDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsUUFBUSxRQUFRLEVBQUU7WUFDZCxLQUFLLFFBQVEsQ0FBQyxJQUFJO2dCQUNkLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1RCxLQUFLLFFBQVEsQ0FBQyxNQUFNO2dCQUNoQixPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQ7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQzVDO0lBQ0wsQ0FBQzs7O1lBakJKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsZUFBZTthQUN4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICd0aW1lRm9ybWF0dGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZUZvcm1hdHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0odGltZTogbnVtYmVyLCB0aW1lVW5pdDogVGltZVVuaXQpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodGltZVVuaXQpIHtcclxuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lLmZyb21PYmplY3Qoe2hvdXI6IHRpbWV9KS50b0Zvcm1hdCgnSEgnKTtcclxuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5NSU5VVEU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbU9iamVjdCh7bWludXRlOiB0aW1lfSkudG9Gb3JtYXQoJ21tJyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHN1Y2ggdGltZSB1bml0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=