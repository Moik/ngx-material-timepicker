/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NgxMaterialTimepickerHoursFace } from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import { disableHours } from '../../utils/timepicker-time.namespace';
var NgxMaterialTimepicker24HoursFaceComponent = /** @class */ (function (_super) {
    tslib_1.__extends(NgxMaterialTimepicker24HoursFaceComponent, _super);
    function NgxMaterialTimepicker24HoursFaceComponent() {
        return _super.call(this, 24) || this;
    }
    /**
     * @return {?}
     */
    NgxMaterialTimepicker24HoursFaceComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.hoursList = disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    };
    NgxMaterialTimepicker24HoursFaceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-24-hours-face',
                    template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\r\n                              (timeChange)=\"hourChange.next($event)\"\r\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n"
                }] }
    ];
    /** @nocollapse */
    NgxMaterialTimepicker24HoursFaceComponent.ctorParameters = function () { return []; };
    return NgxMaterialTimepicker24HoursFaceComponent;
}(NgxMaterialTimepickerHoursFace));
export { NgxMaterialTimepicker24HoursFaceComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItMjQtaG91cnMtZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0yNC1ob3Vycy1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBbUIsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLDZEQUE2RCxDQUFDO0FBQzNHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVyRTtJQUsrRCxxRUFBOEI7SUFFekY7ZUFDSSxrQkFBTSxFQUFFLENBQUM7SUFDYixDQUFDOzs7O0lBRUQsc0VBQWtCOzs7SUFBbEI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQzFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTztZQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7O2dCQWpCSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHVDQUF1QztvQkFDakQsK1NBQW1FO2lCQUN0RTs7OztJQWVELGdEQUFDO0NBQUEsQUFsQkQsQ0FLK0QsOEJBQThCLEdBYTVGO1NBYlkseUNBQXlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge05neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZX0gZnJvbSAnLi4vdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UnO1xyXG5pbXBvcnQgeyBkaXNhYmxlSG91cnMgfSBmcm9tICcuLi8uLi91dGlscy90aW1lcGlja2VyLXRpbWUubmFtZXNwYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci0yNC1ob3Vycy1mYWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItMjQtaG91cnMtZmFjZS5jb21wb25lbnQuaHRtbCdcclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXIyNEhvdXJzRmFjZUNvbXBvbmVudCBleHRlbmRzIE5neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZSBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKDI0KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5ob3Vyc0xpc3QgPSBkaXNhYmxlSG91cnModGhpcy5ob3Vyc0xpc3QsIHtcclxuICAgICAgICAgICAgbWluOiB0aGlzLm1pblRpbWUsXHJcbiAgICAgICAgICAgIG1heDogdGhpcy5tYXhUaW1lLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuZm9ybWF0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19