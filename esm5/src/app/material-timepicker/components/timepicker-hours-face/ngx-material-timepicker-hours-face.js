/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { getHours } from '../../utils/timepicker-time.namespace';
var NgxMaterialTimepickerHoursFace = /** @class */ (function () {
    function NgxMaterialTimepickerHoursFace(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = getHours(format);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    NgxMaterialTimepickerHoursFace.prototype.onTimeSelected = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.hourSelected.next(time);
    };
    NgxMaterialTimepickerHoursFace.propDecorators = {
        selectedHour: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        format: [{ type: Input }],
        hourChange: [{ type: Output }],
        hourSelected: [{ type: Output }]
    };
    return NgxMaterialTimepickerHoursFace;
}());
export { NgxMaterialTimepickerHoursFace };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.selectedHour;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.minTime;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.maxTime;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.hourChange;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.hourSelected;
    /** @type {?} */
    NgxMaterialTimepickerHoursFace.prototype.hoursList;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUdqRTtJQVlJLHdDQUFzQixNQUFjO1FBTDFCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFcEQsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCx1REFBYzs7OztJQUFkLFVBQWUsSUFBWTtRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzsrQkFoQkEsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzs2QkFFTCxNQUFNOytCQUNOLE1BQU07O0lBV1gscUNBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQW5CWSw4QkFBOEI7OztJQUV2QyxzREFBcUM7O0lBQ3JDLGlEQUEyQjs7SUFDM0IsaURBQTJCOztJQUMzQixnREFBd0I7O0lBRXhCLG9EQUF5RDs7SUFDekQsc0RBQW9EOztJQUVwRCxtREFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuLi8uLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGdldEhvdXJzIH0gZnJvbSAnLi4vLi4vdXRpbHMvdGltZXBpY2tlci10aW1lLm5hbWVzcGFjZSc7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckhvdXJzRmFjZSB7XHJcblxyXG4gICAgQElucHV0KCkgc2VsZWN0ZWRIb3VyOiBDbG9ja0ZhY2VUaW1lO1xyXG4gICAgQElucHV0KCkgbWluVGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBtYXhUaW1lOiBEYXRlVGltZTtcclxuICAgIEBJbnB1dCgpIGZvcm1hdDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSBob3VyQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xyXG4gICAgQE91dHB1dCgpIGhvdXJTZWxlY3RlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICAgIGhvdXJzTGlzdDogQ2xvY2tGYWNlVGltZVtdID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGZvcm1hdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5ob3Vyc0xpc3QgPSBnZXRIb3Vycyhmb3JtYXQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVGltZVNlbGVjdGVkKHRpbWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaG91clNlbGVjdGVkLm5leHQodGltZSk7XHJcbiAgICB9XHJcbn1cclxuIl19