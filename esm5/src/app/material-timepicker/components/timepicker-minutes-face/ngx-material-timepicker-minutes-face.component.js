/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimePeriod } from '../../models/time-period.enum';
import { DateTime } from 'luxon';
import { getMinutes, disableMinutes } from '../../utils/timepicker-time.namespace';
var NgxMaterialTimepickerMinutesFaceComponent = /** @class */ (function () {
    function NgxMaterialTimepickerMinutesFaceComponent() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['period'] && changes['period'].currentValue) {
            /** @type {?} */
            var minutes = getMinutes(this.minutesGap);
            this.minutesList = disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
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
    return NgxMaterialTimepickerMinutesFaceComponent;
}());
export { NgxMaterialTimepickerMinutesFaceComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1taW51dGVzLWZhY2Uvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFHbkY7SUFBQTtRQU1JLGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUNsQyxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBVVYsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQWEvRCxDQUFDOzs7OztJQVhHLCtEQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxFQUFFOztnQkFDL0MsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUMxRCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEIsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDOztnQkE3QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELDhTQUFvRTtpQkFDdkU7OztpQ0FNSSxLQUFLOytCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFDTCxLQUFLOytCQUVMLE1BQU07O0lBYVgsZ0RBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTFCWSx5Q0FBeUM7OztJQUVsRCxnRUFBa0M7O0lBQ2xDLDZEQUFvQjs7SUFFcEIsbUVBQXVDOztJQUN2QyxpRUFBOEI7O0lBQzlCLDJEQUE0Qjs7SUFDNUIsNERBQTJCOztJQUMzQiw0REFBMkI7O0lBQzNCLDJEQUF3Qjs7SUFDeEIsK0RBQTRCOztJQUU1QixpRUFBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IGdldE1pbnV0ZXMsIGRpc2FibGVNaW51dGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLm5hbWVzcGFjZSc7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLW1pbnV0ZXMtZmFjZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItbWludXRlcy1mYWNlLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyTWludXRlc0ZhY2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG5cclxuICAgIG1pbnV0ZXNMaXN0OiBDbG9ja0ZhY2VUaW1lW10gPSBbXTtcclxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0ZWRNaW51dGU6IENsb2NrRmFjZVRpbWU7XHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZEhvdXI6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIHBlcmlvZDogVGltZVBlcmlvZDtcclxuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIG1pbnV0ZXNHYXA6IG51bWJlcjtcclxuXHJcbiAgICBAT3V0cHV0KCkgbWludXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1sncGVyaW9kJ10gJiYgY2hhbmdlc1sncGVyaW9kJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBnZXRNaW51dGVzKHRoaXMubWludXRlc0dhcCk7XHJcbiAgICAgICAgICAgIHRoaXMubWludXRlc0xpc3QgPSBkaXNhYmxlTWludXRlcyhtaW51dGVzLCB0aGlzLnNlbGVjdGVkSG91ciwge1xyXG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXHJcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl19