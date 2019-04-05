/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimePeriod } from '../../models/time-period.enum';
import { DateTime } from 'luxon';
import { getMinutes, disableMinutes } from '../../utils/timepicker-time.namespace';
export class NgxMaterialTimepickerMinutesFaceComponent {
    constructor() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            /** @type {?} */
            const minutes = getMinutes(this.minutesGap);
            this.minutesList = disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
NgxMaterialTimepickerMinutesFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-minutes-face',
                template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\r\n                              [minutesGap]=\"minutesGap\"\r\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\r\n"
            }] }
];
NgxMaterialTimepickerMinutesFaceComponent.propDecorators = {
    selectedMinute: [{ type: Input }],
    selectedHour: [{ type: Input }],
    period: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    minuteChange: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.minutesList;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.selectedMinute;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.selectedHour;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.period;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.minTime;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.maxTime;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.minutesGap;
    /** @type {?} */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.minuteChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1taW51dGVzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFPbkYsTUFBTSxPQUFPLHlDQUF5QztJQUp0RDtRQU1JLGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBVVYsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQWEvRCxDQUFDOzs7OztJQVhHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFOztrQkFDL0MsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUMxRCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOzs7WUE3QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQ0FBc0M7Z0JBQ2hELDhTQUFvRTthQUN2RTs7OzZCQU1JLEtBQUs7MkJBQ0wsS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7MkJBRUwsTUFBTTs7OztJQVhQLGdFQUFrQzs7SUFDbEMsNkRBQW9COztJQUVwQixtRUFBdUM7O0lBQ3ZDLGlFQUE4Qjs7SUFDOUIsMkRBQTRCOztJQUM1Qiw0REFBMkI7O0lBQzNCLDREQUEyQjs7SUFDM0IsMkRBQXdCOztJQUN4QiwrREFBNEI7O0lBRTVCLGlFQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgZ2V0TWludXRlcywgZGlzYWJsZU1pbnV0ZXMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1taW51dGVzLWZhY2UuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJNaW51dGVzRmFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgbWludXRlc0xpc3Q6IENsb2NrRmFjZVRpbWVbXSA9IFtdO1xyXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZE1pbnV0ZTogQ2xvY2tGYWNlVGltZTtcclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgcGVyaW9kOiBUaW1lUGVyaW9kO1xyXG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSBtaW51dGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IGdldE1pbnV0ZXModGhpcy5taW51dGVzR2FwKTtcclxuICAgICAgICAgICAgdGhpcy5taW51dGVzTGlzdCA9IGRpc2FibGVNaW51dGVzKG1pbnV0ZXMsIHRoaXMuc2VsZWN0ZWRIb3VyLCB7XHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXX0=