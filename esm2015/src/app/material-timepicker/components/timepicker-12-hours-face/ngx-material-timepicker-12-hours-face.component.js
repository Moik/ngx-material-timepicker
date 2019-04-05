/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { TimePeriod } from '../../models/time-period.enum';
import { disableHours } from '../../utils/timepicker-time.namespace';
export class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(12);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
NgxMaterialTimepicker12HoursFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-12-hours-face',
                template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\r\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n"
            }] }
];
/** @nocollapse */
NgxMaterialTimepicker12HoursFaceComponent.ctorParameters = () => [];
NgxMaterialTimepicker12HoursFaceComponent.propDecorators = {
    period: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    NgxMaterialTimepicker12HoursFaceComponent.prototype.period;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMTItaG91cnMtZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItMTItaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQTJCLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLDZEQUE2RCxDQUFDO0FBQzNHLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFPckUsTUFBTSxPQUFPLHlDQUEwQyxTQUFRLDhCQUE4QjtJQUl6RjtRQUNJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQzlCLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDckQsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDMUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3RCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7O1lBdEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUNBQXVDO2dCQUNqRCwwUEFBbUU7YUFDdEU7Ozs7O3FCQUlJLEtBQUs7Ozs7SUFBTiwyREFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd4TWF0ZXJpYWxUaW1lcGlja2VySG91cnNGYWNlfSBmcm9tICcuLi90aW1lcGlja2VyLWhvdXJzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZSc7XHJcbmltcG9ydCB7VGltZVBlcmlvZH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBkaXNhYmxlSG91cnMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0xMi1ob3Vycy1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMTItaG91cnMtZmFjZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXIxMkhvdXJzRmFjZUNvbXBvbmVudCBleHRlbmRzIE5neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KCkgcGVyaW9kOiBUaW1lUGVyaW9kO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDEyKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhvdXJzTGlzdCA9IGRpc2FibGVIb3Vycyh0aGlzLmhvdXJzTGlzdCwge1xyXG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXHJcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=