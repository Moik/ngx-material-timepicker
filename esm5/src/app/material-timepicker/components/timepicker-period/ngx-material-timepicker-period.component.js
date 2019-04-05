/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { DateTime } from 'luxon';
import { disableHours, disableMinutes } from '../../utils/timepicker-time.namespace';
var NgxMaterialTimepickerPeriodComponent = /** @class */ (function () {
    function NgxMaterialTimepickerPeriodComponent() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.changePeriod = /**
     * @param {?} period
     * @return {?}
     */
    function (period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.animationDone = /**
     * @return {?}
     */
    function () {
        this.isPeriodAvailable = true;
    };
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.isSwitchPeriodAvailable = /**
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        /** @type {?} */
        var time = this.getDisabledTimeByPeriod(period);
        return !time.every(function (t) { return t.disabled; });
    };
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.getDisabledTimeByPeriod = /**
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            case TimeUnit.MINUTE:
                return disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    };
    NgxMaterialTimepickerPeriodComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-period',
                    template: "<div class=\"timepicker-period\">\r\n\t\t\t<button class=\"timepicker-dial__item timepicker-period__btn\"\r\n                  [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.AM}\"\r\n                  (click)=\"changePeriod(timePeriod.AM)\"\r\n                  type=\"button\">AM</button>\r\n    <button class=\"timepicker-dial__item timepicker-period__btn\"\r\n          [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.PM}\"\r\n          (click)=\"changePeriod(timePeriod.PM)\"\r\n          type=\"button\">PM</button>\r\n    <div class=\"timepicker-period__warning\" [@scaleInOut] (@scaleInOut.done)=\"animationDone()\" *ngIf=\"!isPeriodAvailable\">\r\n        <p>Current time would be invalid in this period.</p>\r\n    </div>\r\n</div>\r\n",
                    animations: [
                        trigger('scaleInOut', [
                            transition(':enter', [
                                style({ transform: 'scale(0)' }),
                                animate('.2s', style({ transform: 'scale(1)' })),
                                sequence([
                                    animate('3s', style({ opacity: 1 })),
                                    animate('.3s', style({ opacity: 0 }))
                                ])
                            ])
                        ])
                    ],
                    styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border-radius:3px;transition:background-color .5s;font-family:Roboto,sans-serif}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{padding:5px 10px;border-radius:3px;background-color:rgba(0,0,0,.55);color:#fff;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning>p{margin:0;font-size:12px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn,.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
                }] }
    ];
    NgxMaterialTimepickerPeriodComponent.propDecorators = {
        selectedPeriod: [{ type: Input }],
        format: [{ type: Input }],
        activeTimeUnit: [{ type: Input }],
        hours: [{ type: Input }],
        minutes: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        selectedHour: [{ type: Input }],
        periodChanged: [{ type: Output }]
    };
    return NgxMaterialTimepickerPeriodComponent;
}());
export { NgxMaterialTimepickerPeriodComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.timePeriod;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.isPeriodAvailable;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.selectedPeriod;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.activeTimeUnit;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.hours;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.minutes;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.minTime;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.maxTime;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.selectedHour;
    /** @type {?} */
    NgxMaterialTimepickerPeriodComponent.prototype.periodChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXJGO0lBQUE7UUFtQkksZUFBVSxHQUFHLFVBQVUsQ0FBQztRQUN4QixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFXZixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7SUFzQzdELENBQUM7Ozs7O0lBcENHLDJEQUFZOzs7O0lBQVosVUFBYSxNQUFrQjtRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlELElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQzs7OztJQUVELDREQUFhOzs7SUFBYjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBRU8sc0VBQXVCOzs7OztJQUEvQixVQUFnQyxNQUFrQjs7WUFDeEMsSUFBSSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUM7UUFDakQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUVPLHNFQUF1Qjs7Ozs7SUFBL0IsVUFBZ0MsTUFBa0I7UUFDOUMsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3pCLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDNUIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtvQkFDbkIsTUFBTSxRQUFBO2lCQUNULENBQUMsQ0FBQztZQUNQLEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNwRCxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixNQUFNLFFBQUE7aUJBQ1QsQ0FBQyxDQUFDO1lBQ1A7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQzs7Z0JBcEVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO29CQUMxQywyeUJBQTREO29CQUU1RCxVQUFVLEVBQUU7d0JBQ1IsT0FBTyxDQUFDLFlBQVksRUFBRTs0QkFDbEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDakIsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDO2dDQUM5QixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO2dDQUM5QyxRQUFRLENBQUM7b0NBQ0wsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztvQ0FDbEMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztpQ0FDdEMsQ0FBQzs2QkFDTCxDQUFDO3lCQUNMLENBQUM7cUJBQ0w7O2lCQUNKOzs7aUNBTUksS0FBSzt5QkFDTCxLQUFLO2lDQUNMLEtBQUs7d0JBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzsrQkFDTCxLQUFLO2dDQUVMLE1BQU07O0lBc0NYLDJDQUFDO0NBQUEsQUFyRUQsSUFxRUM7U0FwRFksb0NBQW9DOzs7SUFFN0MsMERBQXdCOztJQUN4QixpRUFBeUI7O0lBRXpCLDhEQUFvQzs7SUFDcEMsc0RBQXdCOztJQUN4Qiw4REFBa0M7O0lBQ2xDLHFEQUFnQzs7SUFDaEMsdURBQWtDOztJQUNsQyx1REFBMkI7O0lBQzNCLHVEQUEyQjs7SUFDM0IsNERBQXVDOztJQUV2Qyw2REFBeUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUaW1lUGVyaW9kIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGFuaW1hdGUsIHNlcXVlbmNlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuaW1wb3J0IHsgZGlzYWJsZUhvdXJzLCBkaXNhYmxlTWludXRlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS5uYW1lc3BhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcignc2NhbGVJbk91dCcsIFtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xyXG4gICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDApJ30pLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnLjJzJywgc3R5bGUoe3RyYW5zZm9ybTogJ3NjYWxlKDEpJ30pKSxcclxuICAgICAgICAgICAgICAgIHNlcXVlbmNlKFtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCczcycsIHN0eWxlKHtvcGFjaXR5OiAxfSkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJy4zcycsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXHJcbiAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJQZXJpb2RDb21wb25lbnQge1xyXG5cclxuICAgIHRpbWVQZXJpb2QgPSBUaW1lUGVyaW9kO1xyXG4gICAgaXNQZXJpb2RBdmFpbGFibGUgPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkUGVyaW9kOiBUaW1lUGVyaW9kO1xyXG4gICAgQElucHV0KCkgZm9ybWF0OiBudW1iZXI7XHJcbiAgICBASW5wdXQoKSBhY3RpdmVUaW1lVW5pdDogVGltZVVuaXQ7XHJcbiAgICBASW5wdXQoKSBob3VyczogQ2xvY2tGYWNlVGltZVtdO1xyXG4gICAgQElucHV0KCkgbWludXRlczogQ2xvY2tGYWNlVGltZVtdO1xyXG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAgIEBPdXRwdXQoKSBwZXJpb2RDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxUaW1lUGVyaW9kPigpO1xyXG5cclxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUGVyaW9kQXZhaWxhYmxlID0gdGhpcy5pc1N3aXRjaFBlcmlvZEF2YWlsYWJsZShwZXJpb2QpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGVyaW9kQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyaW9kQ2hhbmdlZC5uZXh0KHBlcmlvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGlvbkRvbmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1BlcmlvZEF2YWlsYWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc1N3aXRjaFBlcmlvZEF2YWlsYWJsZShwZXJpb2Q6IFRpbWVQZXJpb2QpOiBib29sZWFuIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5nZXREaXNhYmxlZFRpbWVCeVBlcmlvZChwZXJpb2QpO1xyXG4gICAgICAgIHJldHVybiAhdGltZS5ldmVyeSh0ID0+IHQuZGlzYWJsZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGlzYWJsZWRUaW1lQnlQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogQ2xvY2tGYWNlVGltZVtdIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuYWN0aXZlVGltZVVuaXQpIHtcclxuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5IT1VSOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpc2FibGVIb3Vycyh0aGlzLmhvdXJzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRpbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiB0aGlzLmZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICBwZXJpb2RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjYXNlIFRpbWVVbml0Lk1JTlVURTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNhYmxlTWludXRlcyh0aGlzLm1pbnV0ZXMsICt0aGlzLnNlbGVjdGVkSG91ciwge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gc3VjaCBUaW1lVW5pdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=