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
export class NgxMaterialTimepickerPeriodComponent {
    constructor() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }
    /**
     * @return {?}
     */
    animationDone() {
        this.isPeriodAvailable = true;
    }
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    isSwitchPeriodAvailable(period) {
        /** @type {?} */
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    getDisabledTimeByPeriod(period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1wZXJpb2Qvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItcGVyaW9kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXZELE9BQU8sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBbUJyRixNQUFNLE9BQU8sb0NBQW9DO0lBakJqRDtRQW1CSSxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ3hCLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQVdmLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQXNDN0QsQ0FBQzs7Ozs7SUFwQ0csWUFBWSxDQUFDLE1BQWtCO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7SUFDTCxDQUFDOzs7O0lBRUQsYUFBYTtRQUNULElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQzs7Ozs7O0lBRU8sdUJBQXVCLENBQUMsTUFBa0I7O2NBQ3hDLElBQUksR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDO1FBQ2pELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7OztJQUVPLHVCQUF1QixDQUFDLE1BQWtCO1FBQzlDLFFBQVEsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN6QixLQUFLLFFBQVEsQ0FBQyxJQUFJO2dCQUNkLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQzVCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLE1BQU07aUJBQ1QsQ0FBQyxDQUFDO1lBQ1AsS0FBSyxRQUFRLENBQUMsTUFBTTtnQkFDaEIsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3BELEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztvQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPO29CQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLE1BQU07aUJBQ1QsQ0FBQyxDQUFDO1lBQ1A7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQzs7O1lBcEVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQywyeUJBQTREO2dCQUU1RCxVQUFVLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDbEIsVUFBVSxDQUFDLFFBQVEsRUFBRTs0QkFDakIsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDOzRCQUM5QixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDOzRCQUM5QyxRQUFRLENBQUM7Z0NBQ0wsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQ0FDbEMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzs2QkFDdEMsQ0FBQzt5QkFDTCxDQUFDO3FCQUNMLENBQUM7aUJBQ0w7O2FBQ0o7Ozs2QkFNSSxLQUFLO3FCQUNMLEtBQUs7NkJBQ0wsS0FBSztvQkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBRUwsTUFBTTs7OztJQVpQLDBEQUF3Qjs7SUFDeEIsaUVBQXlCOztJQUV6Qiw4REFBb0M7O0lBQ3BDLHNEQUF3Qjs7SUFDeEIsOERBQWtDOztJQUNsQyxxREFBZ0M7O0lBQ2hDLHVEQUFrQzs7SUFDbEMsdURBQTJCOztJQUMzQix1REFBMkI7O0lBQzNCLDREQUF1Qzs7SUFFdkMsNkRBQXlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBhbmltYXRlLCBzZXF1ZW5jZSwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IGRpc2FibGVIb3VycywgZGlzYWJsZU1pbnV0ZXMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1wZXJpb2QuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLXBlcmlvZC5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3NjYWxlSW5PdXQnLCBbXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgwKSd9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJy4ycycsIHN0eWxlKHt0cmFuc2Zvcm06ICdzY2FsZSgxKSd9KSksXHJcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZShbXHJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnM3MnLCBzdHlsZSh7b3BhY2l0eTogMX0pKSxcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCcuM3MnLCBzdHlsZSh7b3BhY2l0eTogMH0pKVxyXG4gICAgICAgICAgICAgICAgXSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyUGVyaW9kQ29tcG9uZW50IHtcclxuXHJcbiAgICB0aW1lUGVyaW9kID0gVGltZVBlcmlvZDtcclxuICAgIGlzUGVyaW9kQXZhaWxhYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZFBlcmlvZDogVGltZVBlcmlvZDtcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG4gICAgQElucHV0KCkgYWN0aXZlVGltZVVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgaG91cnM6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIEBJbnB1dCgpIG1pbnV0ZXM6IENsb2NrRmFjZVRpbWVbXTtcclxuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBzZWxlY3RlZEhvdXI6IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgICBAT3V0cHV0KCkgcGVyaW9kQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZVBlcmlvZD4oKTtcclxuXHJcbiAgICBjaGFuZ2VQZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc1BlcmlvZEF2YWlsYWJsZSA9IHRoaXMuaXNTd2l0Y2hQZXJpb2RBdmFpbGFibGUocGVyaW9kKTtcclxuICAgICAgICBpZiAodGhpcy5pc1BlcmlvZEF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBlcmlvZENoYW5nZWQubmV4dChwZXJpb2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRpb25Eb25lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNQZXJpb2RBdmFpbGFibGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNTd2l0Y2hQZXJpb2RBdmFpbGFibGUocGVyaW9kOiBUaW1lUGVyaW9kKTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgdGltZSA9IHRoaXMuZ2V0RGlzYWJsZWRUaW1lQnlQZXJpb2QocGVyaW9kKTtcclxuICAgICAgICByZXR1cm4gIXRpbWUuZXZlcnkodCA9PiB0LmRpc2FibGVkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldERpc2FibGVkVGltZUJ5UGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IENsb2NrRmFjZVRpbWVbXSB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmFjdGl2ZVRpbWVVbml0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuSE9VUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNhYmxlSG91cnModGhpcy5ob3Vycywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDogdGhpcy5mb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyaW9kXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2FzZSBUaW1lVW5pdC5NSU5VVEU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzYWJsZU1pbnV0ZXModGhpcy5taW51dGVzLCArdGhpcy5zZWxlY3RlZEhvdXIsIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGltZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGltZSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcmlvZFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHN1Y2ggVGltZVVuaXQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19