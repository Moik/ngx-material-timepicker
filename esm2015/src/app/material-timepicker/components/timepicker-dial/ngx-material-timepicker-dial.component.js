/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { DateTime } from 'luxon';
import { getHours, disableHours, getMinutes, disableMinutes } from '../../utils/timepicker-time.namespace';
export class NgxMaterialTimepickerDialComponent {
    constructor() {
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
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            /** @type {?} */
            const hours = getHours(this.format);
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
            const minutes = getMinutes(this.minutesGap);
            this.minutes = disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    changeTimeUnit(unit) {
        this.timeUnitChanged.next(unit);
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.periodChanged.next(period);
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    changeHour(hour) {
        this.hourChanged.next(hour);
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    changeMinute(minute) {
        this.minuteChanged.next(minute);
    }
    /**
     * @return {?}
     */
    showHint() {
        this.isHintVisible = true;
    }
    /**
     * @return {?}
     */
    hideHint() {
        this.isHintVisible = false;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZGlhbC9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBaUIsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdkQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFRM0csTUFBTSxPQUFPLGtDQUFrQztJQU4vQztRQVFJLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFrQlYsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO1FBQy9DLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFrRGhFLENBQUM7Ozs7O0lBaERHLFdBQVcsQ0FBQyxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWTtlQUNoRCxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRTs7a0JBQ2xELEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUVuQyxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUU7Z0JBQzdCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtRQUNELElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZO2VBQ2hELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFOztrQkFDOUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBRTNDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQy9DLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTthQUN0QixDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQWM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBa0I7UUFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsSUFBbUI7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsTUFBcUI7UUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDOzs7O0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7OztZQTlFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsNndGQUEwRDtnQkFFMUQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7K0JBVUksS0FBSzttQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxLQUFLOzZCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzs0QkFFTCxNQUFNOzhCQUNOLE1BQU07MEJBQ04sTUFBTTs0QkFDTixNQUFNOzs7O0lBckJQLHNEQUFvQjs7SUFFcEIsbURBQXVCOztJQUN2QixxREFBeUI7O0lBRXpCLDJEQUF1Qjs7SUFFdkIsOERBQTZDOztJQUM3QyxrREFBK0I7O0lBQy9CLG9EQUFpQzs7SUFDakMsb0RBQXdCOztJQUN4QixvREFBNEI7O0lBQzVCLDREQUFrQzs7SUFDbEMscURBQTJCOztJQUMzQixxREFBMkI7O0lBQzNCLHdEQUE2Qjs7SUFDN0Isd0RBQTRCOztJQUU1QiwyREFBeUQ7O0lBQ3pELDZEQUF5RDs7SUFDekQseURBQTBEOztJQUMxRCwyREFBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgZ2V0SG91cnMsIGRpc2FibGVIb3VycywgZ2V0TWludXRlcywgZGlzYWJsZU1pbnV0ZXMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG5cclxuICAgIHRpbWVVbml0ID0gVGltZVVuaXQ7XHJcblxyXG4gICAgaG91cnM6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIG1pbnV0ZXM6IENsb2NrRmFjZVRpbWVbXTtcclxuXHJcbiAgICBpc0hpbnRWaXNpYmxlOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpIGVkaXRhYmxlSGludFRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gICAgQElucHV0KCkgaG91cjogbnVtYmVyIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgbWludXRlOiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIHBlcmlvZDogVGltZVBlcmlvZDtcclxuICAgIEBJbnB1dCgpIGFjdGl2ZVRpbWVVbml0OiBUaW1lVW5pdDtcclxuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBpc0VkaXRhYmxlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSBwZXJpb2RDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xyXG4gICAgQE91dHB1dCgpIHRpbWVVbml0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZVVuaXQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgaG91ckNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcbiAgICBAT3V0cHV0KCkgbWludXRlQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXNbJ3BlcmlvZCddICYmIGNoYW5nZXNbJ3BlcmlvZCddLmN1cnJlbnRWYWx1ZVxyXG4gICAgICAgICAgICB8fCBjaGFuZ2VzWydmb3JtYXQnXSAmJiBjaGFuZ2VzWydmb3JtYXQnXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgaG91cnMgPSBnZXRIb3Vycyh0aGlzLmZvcm1hdCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhvdXJzID0gZGlzYWJsZUhvdXJzKGhvdXJzLCB7XHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHBlcmlvZDogdGhpcy5wZXJpb2RcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjaGFuZ2VzWydwZXJpb2QnXSAmJiBjaGFuZ2VzWydwZXJpb2QnXS5jdXJyZW50VmFsdWVcclxuICAgICAgICAgICAgfHwgY2hhbmdlc1snaG91ciddICYmIGNoYW5nZXNbJ2hvdXInXS5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IGdldE1pbnV0ZXModGhpcy5taW51dGVzR2FwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWludXRlcyA9IGRpc2FibGVNaW51dGVzKG1pbnV0ZXMsICt0aGlzLmhvdXIsIHtcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgcGVyaW9kOiB0aGlzLnBlcmlvZFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVGltZVVuaXQodW5pdDogVGltZVVuaXQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVVbml0Q2hhbmdlZC5uZXh0KHVuaXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBlcmlvZENoYW5nZWQubmV4dChwZXJpb2QpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUhvdXIoaG91cjogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaG91ckNoYW5nZWQubmV4dChob3VyKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VNaW51dGUobWludXRlOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5taW51dGVDaGFuZ2VkLm5leHQobWludXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93SGludCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzSGludFZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVIaW50KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNIaW50VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==