/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { DateTime } from 'luxon';
import { getHours, disableHours, getMinutes, disableMinutes } from '../../utils/timepicker-time.namespace';
var NgxMaterialTimepickerDialComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialComponent() {
        this.timeUnit = TimeUnit;
        this.periodChanged = new EventEmitter();
        this.timeUnitChanged = new EventEmitter();
        this.hourChanged = new EventEmitter();
        this.minuteChanged = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            /** @type {?} */
            var hours = getHours(this.format);
            this.hours = disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            /** @type {?} */
            var minutes = getMinutes(this.minutesGap);
            this.minutes = disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeTimeUnit = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.timeUnitChanged.next(unit);
    };
    /**
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changePeriod = /**
     * @param {?} period
     * @return {?}
     */
    function (period) {
        this.periodChanged.next(period);
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        this.hourChanged.next(hour);
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeMinute = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        this.minuteChanged.next(minute);
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.showHint = /**
     * @return {?}
     */
    function () {
        this.isHintVisible = true;
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.hideHint = /**
     * @return {?}
     */
    function () {
        this.isHintVisible = false;
    };
    NgxMaterialTimepickerDialComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-dial',
                    template: "<div class=\"timepicker-dial\">\r\n    <div class=\"timepicker-dial__container\">\r\n        <div class=\"timepicker-dial__time\">\r\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeHour($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n            <span>:</span>\r\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  [minutesGap]=\"minutesGap\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeMinute($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n        </div>\r\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\r\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\r\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\r\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\r\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\r\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\r\n    </div>\r\n    <div *ngIf=\"isEditable\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\r\n        <!--suppress HtmlUnknownAttribute -->\r\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\r\n        <ng-template #editableHintDefault>\r\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\r\n        </ng-template>\r\n    </div>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{display:flex;align-items:center;justify-content:flex-end;-webkit-tap-highlight-color:transparent}.timepicker-dial__time{display:flex;align-items:baseline;line-height:normal;font-size:50px;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{display:inline-block;font-size:10px;color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
                }] }
    ];
    NgxMaterialTimepickerDialComponent.propDecorators = {
        editableHintTmpl: [{ type: Input }],
        hour: [{ type: Input }],
        minute: [{ type: Input }],
        format: [{ type: Input }],
        period: [{ type: Input }],
        activeTimeUnit: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        isEditable: [{ type: Input }],
        minutesGap: [{ type: Input }],
        periodChanged: [{ type: Output }],
        timeUnitChanged: [{ type: Output }],
        hourChanged: [{ type: Output }],
        minuteChanged: [{ type: Output }]
    };
    return NgxMaterialTimepickerDialComponent;
}());
export { NgxMaterialTimepickerDialComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.hours;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minutes;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.isHintVisible;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.editableHintTmpl;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.hour;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minute;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.period;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.activeTimeUnit;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minTime;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.maxTime;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.isEditable;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minutesGap;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.periodChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.timeUnitChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.hourChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialComponent.prototype.minuteChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFFM0c7SUFBQTtRQVFJLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFrQlYsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQy9DLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFrRGhFLENBQUM7Ozs7O0lBaERHLHdEQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWTtlQUNoRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRTs7Z0JBQ2xELEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUVuQyxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUU7Z0JBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtRQUNELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZO2VBQ2hELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFOztnQkFDOUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBRTNDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQy9DLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRUQsMkRBQWM7Ozs7SUFBZCxVQUFlLElBQWM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCx5REFBWTs7OztJQUFaLFVBQWEsTUFBa0I7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCx1REFBVTs7OztJQUFWLFVBQVcsSUFBbUI7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCx5REFBWTs7OztJQUFaLFVBQWEsTUFBcUI7UUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELHFEQUFROzs7SUFBUjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxxREFBUTs7O0lBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDOztnQkE5RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLDZ3RkFBMEQ7b0JBRTFELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDbEQ7OzttQ0FVSSxLQUFLO3VCQUNMLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7aUNBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLO2dDQUVMLE1BQU07a0NBQ04sTUFBTTs4QkFDTixNQUFNO2dDQUNOLE1BQU07O0lBa0RYLHlDQUFDO0NBQUEsQUEvRUQsSUErRUM7U0F6RVksa0NBQWtDOzs7SUFFM0Msc0RBQW9COztJQUVwQixtREFBdUI7O0lBQ3ZCLHFEQUF5Qjs7SUFFekIsMkRBQXVCOztJQUV2Qiw4REFBNkM7O0lBQzdDLGtEQUErQjs7SUFDL0Isb0RBQWlDOztJQUNqQyxvREFBd0I7O0lBQ3hCLG9EQUE0Qjs7SUFDNUIsNERBQWtDOztJQUNsQyxxREFBMkI7O0lBQzNCLHFEQUEyQjs7SUFDM0Isd0RBQTZCOztJQUM3Qix3REFBNEI7O0lBRTVCLDJEQUF5RDs7SUFDekQsNkRBQXlEOztJQUN6RCx5REFBMEQ7O0lBQzFELDJEQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQgeyBnZXRIb3VycywgZGlzYWJsZUhvdXJzLCBnZXRNaW51dGVzLCBkaXNhYmxlTWludXRlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS5uYW1lc3BhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcclxuXHJcbiAgICBob3VyczogQ2xvY2tGYWNlVGltZVtdO1xyXG4gICAgbWludXRlczogQ2xvY2tGYWNlVGltZVtdO1xyXG5cclxuICAgIGlzSGludFZpc2libGU6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoKSBob3VyOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBtaW51dGU6IG51bWJlciB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgcGVyaW9kOiBUaW1lUGVyaW9kO1xyXG4gICAgQElucHV0KCkgYWN0aXZlVGltZVVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIGlzRWRpdGFibGU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIHBlcmlvZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVQZXJpb2Q+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGltZVVuaXRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lVW5pdD4oKTtcclxuICAgIEBPdXRwdXQoKSBob3VyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuICAgIEBPdXRwdXQoKSBtaW51dGVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1sncGVyaW9kJ10gJiYgY2hhbmdlc1sncGVyaW9kJ10uY3VycmVudFZhbHVlXHJcbiAgICAgICAgICAgIHx8IGNoYW5nZXNbJ2Zvcm1hdCddICYmIGNoYW5nZXNbJ2Zvcm1hdCddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IGdldEhvdXJzKHRoaXMuZm9ybWF0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaG91cnMgPSBkaXNhYmxlSG91cnMoaG91cnMsIHtcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZVxyXG4gICAgICAgICAgICB8fCBjaGFuZ2VzWydob3VyJ10gJiYgY2hhbmdlc1snaG91ciddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gZ2V0TWludXRlcyh0aGlzLm1pbnV0ZXNHYXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5taW51dGVzID0gZGlzYWJsZU1pbnV0ZXMobWludXRlcywgK3RoaXMuaG91ciwge1xyXG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXHJcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcclxuICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXHJcbiAgICAgICAgICAgICAgICBwZXJpb2Q6IHRoaXMucGVyaW9kXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VUaW1lVW5pdCh1bml0OiBUaW1lVW5pdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZVVuaXRDaGFuZ2VkLm5leHQodW5pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucGVyaW9kQ2hhbmdlZC5uZXh0KHBlcmlvZCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlSG91cihob3VyOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ob3VyQ2hhbmdlZC5uZXh0KGhvdXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZU1pbnV0ZShtaW51dGU6IENsb2NrRmFjZVRpbWUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1pbnV0ZUNoYW5nZWQubmV4dChtaW51dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dIaW50KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNIaW50VmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZUhpbnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc0hpbnRWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIl19