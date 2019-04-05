/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
export class MinutesFormatterPipe {
    /**
     * @param {?} minute
     * @param {?=} gap
     * @return {?}
     */
    transform(minute, gap = 5) {
        if (!minute) {
            return minute;
        }
        return minute % gap === 0 ? minute : '';
    }
}
MinutesFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'minutesFormatter'
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludXRlcy1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL21pbnV0ZXMtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBS2xELE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQUU3QixTQUFTLENBQUMsTUFBYyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUVELE9BQU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVDLENBQUM7OztZQVhKLElBQUksU0FBQztnQkFDRixJQUFJLEVBQUUsa0JBQWtCO2FBQzNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHtcclxuICAgIG5hbWU6ICdtaW51dGVzRm9ybWF0dGVyJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTWludXRlc0Zvcm1hdHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuXHJcbiAgICB0cmFuc2Zvcm0obWludXRlOiBudW1iZXIsIGdhcCA9IDUpOiBudW1iZXIgfCBzdHJpbmcge1xyXG4gICAgICAgIGlmICghbWludXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtaW51dGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWludXRlICUgZ2FwID09PSAwID8gbWludXRlIDogJyc7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==