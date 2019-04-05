/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { getHours } from '../../utils/timepicker-time.namespace';
export class NgxMaterialTimepickerHoursFace {
    /**
     * @protected
     * @param {?} format
     */
    constructor(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = getHours(format);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    onTimeSelected(time) {
        this.hourSelected.next(time);
    }
}
NgxMaterialTimepickerHoursFace.propDecorators = {
    selectedHour: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    hourChange: [{ type: Output }],
    hourSelected: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItaG91cnMtZmFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1ob3Vycy1mYWNlL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWhvdXJzLWZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUdqRSxNQUFNLE9BQU8sOEJBQThCOzs7OztJQVl2QyxZQUFzQixNQUFjO1FBTDFCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFcEQsY0FBUyxHQUFvQixFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFRCxjQUFjLENBQUMsSUFBWTtRQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7MkJBaEJBLEtBQUs7c0JBQ0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7eUJBRUwsTUFBTTsyQkFDTixNQUFNOzs7O0lBTlAsc0RBQXFDOztJQUNyQyxpREFBMkI7O0lBQzNCLGlEQUEyQjs7SUFDM0IsZ0RBQXdCOztJQUV4QixvREFBeUQ7O0lBQ3pELHNEQUFvRDs7SUFFcEQsbURBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBnZXRIb3VycyB9IGZyb20gJy4uLy4uL3V0aWxzL3RpbWVwaWNrZXItdGltZS5uYW1lc3BhY2UnO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJIb3Vyc0ZhY2Uge1xyXG5cclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkSG91cjogQ2xvY2tGYWNlVGltZTtcclxuICAgIEBJbnB1dCgpIG1pblRpbWU6IERhdGVUaW1lO1xyXG4gICAgQElucHV0KCkgbWF4VGltZTogRGF0ZVRpbWU7XHJcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcclxuXHJcbiAgICBAT3V0cHV0KCkgaG91ckNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBob3Vyc0xpc3Q6IENsb2NrRmFjZVRpbWVbXSA9IFtdO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcihmb3JtYXQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaG91cnNMaXN0ID0gZ2V0SG91cnMoZm9ybWF0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblRpbWVTZWxlY3RlZCh0aW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhvdXJTZWxlY3RlZC5uZXh0KHRpbWUpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==