/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';
import { DateTime } from 'luxon';
import * as i0 from "@angular/core";
/** @type {?} */
const DEFAULT_HOUR = {
    time: 12,
    angle: 360
};
/** @type {?} */
const DEFAULT_MINUTE = {
    time: 0,
    angle: 360
};
export class NgxMaterialTimepickerService {
    constructor() {
        this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
        this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
        this.periodSubject = new BehaviorSubject(TimePeriod.AM);
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    set hour(hour) {
        this.hourSubject.next(hour);
    }
    /**
     * @return {?}
     */
    get selectedHour() {
        return this.hourSubject.asObservable();
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    set minute(minute) {
        this.minuteSubject.next(minute);
    }
    /**
     * @return {?}
     */
    get selectedMinute() {
        return this.minuteSubject.asObservable();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    set period(period) {
        /** @type {?} */
        const isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
        if (isPeriodValid) {
            this.periodSubject.next(period);
        }
    }
    /**
     * @return {?}
     */
    get selectedPeriod() {
        return this.periodSubject.asObservable();
    }
    /**
     * @param {?} time
     * @param {?} min
     * @param {?} max
     * @param {?} format
     * @param {?=} minutesGap
     * @return {?}
     */
    setDefaultTimeIfAvailable(time, min, max, format, minutesGap) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.setDefaultTime(TimeAdapter.formatTime(time, format), format);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * @param {?} format
     * @return {?}
     */
    getFullTime(format) {
        /** @type {?} */
        const hour = this.hourSubject.getValue().time;
        /** @type {?} */
        const minute = this.minuteSubject.getValue().time;
        /** @type {?} */
        const period = format === 12 ? this.periodSubject.getValue() : '';
        return TimeAdapter.formatTime(`${hour}:${minute} ${period}`, format);
    }
    /**
     * @private
     * @param {?} time
     * @param {?} format
     * @return {?}
     */
    setDefaultTime(time, format) {
        /** @type {?} */
        const defaultTime = TimeAdapter.convertTimeToDateTime(time, format).toJSDate();
        if (DateTime.fromJSDate(defaultTime).isValid) {
            /** @type {?} */
            const period = time.substr(time.length - 2).toUpperCase();
            /** @type {?} */
            const hour = defaultTime.getHours();
            this.hour = Object.assign({}, DEFAULT_HOUR, { time: formatHourByPeriod(hour, (/** @type {?} */ (period))) });
            this.minute = Object.assign({}, DEFAULT_MINUTE, { time: defaultTime.getMinutes() });
            this.period = (/** @type {?} */ (period));
        }
        else {
            this.resetTime();
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetTime() {
        this.hour = Object.assign({}, DEFAULT_HOUR);
        this.minute = Object.assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    }
}
NgxMaterialTimepickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ NgxMaterialTimepickerService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerService.prototype.hourSubject;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerService.prototype.minuteSubject;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerService.prototype.periodSubject;
}
/**
 *
 *  Format hour in 24hours format to meridian (AM or PM) format
 * @param {?} hour
 * @param {?} period
 * @return {?}
 */
function formatHourByPeriod(hour, period) {
    switch (period) {
        case TimePeriod.AM:
            return hour === 0 ? 12 : hour;
        case TimePeriod.PM:
            return hour === 12 ? 12 : hour - 12;
        default:
            return hour;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7OztNQUczQixZQUFZLEdBQWtCO0lBQ2hDLElBQUksRUFBRSxFQUFFO0lBQ1IsS0FBSyxFQUFFLEdBQUc7Q0FDYjs7TUFDSyxjQUFjLEdBQWtCO0lBQ2xDLElBQUksRUFBRSxDQUFDO0lBQ1AsS0FBSyxFQUFFLEdBQUc7Q0FDYjtBQUtELE1BQU0sT0FBTyw0QkFBNEI7SUFIekM7UUFLWSxnQkFBVyxHQUFHLElBQUksZUFBZSxDQUFnQixZQUFZLENBQUMsQ0FBQztRQUMvRCxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFnQixjQUFjLENBQUMsQ0FBQztRQUNuRSxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUFhLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQXdFMUU7Ozs7O0lBckVHLElBQUksSUFBSSxDQUFDLElBQW1CO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0Ms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Q0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7O1lBOUVKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7Ozs7Ozs7SUFHRyxtREFBdUU7Ozs7O0lBQ3ZFLHFEQUEyRTs7Ozs7SUFDM0UscURBQXVFOzs7Ozs7Ozs7QUE2RTNFLFNBQVMsa0JBQWtCLENBQUMsSUFBWSxFQUFFLE1BQWtCO0lBQ3hELFFBQVEsTUFBTSxFQUFFO1FBQ1osS0FBSyxVQUFVLENBQUMsRUFBRTtZQUNkLE9BQU8sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbEMsS0FBSyxVQUFVLENBQUMsRUFBRTtZQUNkLE9BQU8sSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3hDO1lBQ0ksT0FBTyxJQUFJLENBQUM7S0FDbkI7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgVGltZUFkYXB0ZXIgfSBmcm9tICcuL3RpbWUtYWRhcHRlcic7XHJcbmltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5cclxuXHJcbmNvbnN0IERFRkFVTFRfSE9VUjogQ2xvY2tGYWNlVGltZSA9IHtcclxuICAgIHRpbWU6IDEyLFxyXG4gICAgYW5nbGU6IDM2MFxyXG59O1xyXG5jb25zdCBERUZBVUxUX01JTlVURTogQ2xvY2tGYWNlVGltZSA9IHtcclxuICAgIHRpbWU6IDAsXHJcbiAgICBhbmdsZTogMzYwXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgaG91clN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENsb2NrRmFjZVRpbWU+KERFRkFVTFRfSE9VUik7XHJcbiAgICBwcml2YXRlIG1pbnV0ZVN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PENsb2NrRmFjZVRpbWU+KERFRkFVTFRfTUlOVVRFKTtcclxuICAgIHByaXZhdGUgcGVyaW9kU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VGltZVBlcmlvZD4oVGltZVBlcmlvZC5BTSk7XHJcblxyXG5cclxuICAgIHNldCBob3VyKGhvdXI6IENsb2NrRmFjZVRpbWUpIHtcclxuICAgICAgICB0aGlzLmhvdXJTdWJqZWN0Lm5leHQoaG91cik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlbGVjdGVkSG91cigpOiBPYnNlcnZhYmxlPENsb2NrRmFjZVRpbWU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3VyU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgbWludXRlKG1pbnV0ZTogQ2xvY2tGYWNlVGltZSkge1xyXG4gICAgICAgIHRoaXMubWludXRlU3ViamVjdC5uZXh0KG1pbnV0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNlbGVjdGVkTWludXRlKCk6IE9ic2VydmFibGU8Q2xvY2tGYWNlVGltZT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbnV0ZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpIHtcclxuICAgICAgICBjb25zdCBpc1BlcmlvZFZhbGlkID0gKHBlcmlvZCA9PT0gVGltZVBlcmlvZC5BTSkgfHwgKHBlcmlvZCA9PT0gVGltZVBlcmlvZC5QTSk7XHJcblxyXG4gICAgICAgIGlmIChpc1BlcmlvZFZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyaW9kU3ViamVjdC5uZXh0KHBlcmlvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZWxlY3RlZFBlcmlvZCgpOiBPYnNlcnZhYmxlPFRpbWVQZXJpb2Q+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXJpb2RTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzZXREZWZhdWx0VGltZUlmQXZhaWxhYmxlKHRpbWU6IHN0cmluZywgbWluOiBEYXRlVGltZSwgbWF4OiBEYXRlVGltZSwgZm9ybWF0OiBudW1iZXIsIG1pbnV0ZXNHYXA/OiBudW1iZXIpIHtcclxuICAgICAgICAvKiBXb3JrYXJvdW5kIHRvIGRvdWJsZSBlcnJvciBtZXNzYWdlKi9cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoVGltZUFkYXB0ZXIuaXNUaW1lQXZhaWxhYmxlKHRpbWUsIG1pbiwgbWF4LCAnbWludXRlcycsIG1pbnV0ZXNHYXApKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERlZmF1bHRUaW1lKFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUodGltZSwgZm9ybWF0KSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RnVsbFRpbWUoZm9ybWF0OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGhvdXIgPSB0aGlzLmhvdXJTdWJqZWN0LmdldFZhbHVlKCkudGltZTtcclxuICAgICAgICBjb25zdCBtaW51dGUgPSB0aGlzLm1pbnV0ZVN1YmplY3QuZ2V0VmFsdWUoKS50aW1lO1xyXG4gICAgICAgIGNvbnN0IHBlcmlvZCA9IGZvcm1hdCA9PT0gMTIgPyB0aGlzLnBlcmlvZFN1YmplY3QuZ2V0VmFsdWUoKSA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gVGltZUFkYXB0ZXIuZm9ybWF0VGltZShgJHtob3VyfToke21pbnV0ZX0gJHtwZXJpb2R9YCwgZm9ybWF0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERlZmF1bHRUaW1lKHRpbWU6IHN0cmluZywgZm9ybWF0OiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBkZWZhdWx0VGltZSA9IFRpbWVBZGFwdGVyLmNvbnZlcnRUaW1lVG9EYXRlVGltZSh0aW1lLCBmb3JtYXQpLnRvSlNEYXRlKCk7XHJcblxyXG4gICAgICAgIGlmIChEYXRlVGltZS5mcm9tSlNEYXRlKGRlZmF1bHRUaW1lKS5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmlvZCA9IHRpbWUuc3Vic3RyKHRpbWUubGVuZ3RoIC0gMikudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgY29uc3QgaG91ciA9IGRlZmF1bHRUaW1lLmdldEhvdXJzKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmhvdXIgPSB7Li4uREVGQVVMVF9IT1VSLCB0aW1lOiBmb3JtYXRIb3VyQnlQZXJpb2QoaG91ciwgcGVyaW9kIGFzIFRpbWVQZXJpb2QpfTtcclxuICAgICAgICAgICAgdGhpcy5taW51dGUgPSB7Li4uREVGQVVMVF9NSU5VVEUsIHRpbWU6IGRlZmF1bHRUaW1lLmdldE1pbnV0ZXMoKX07XHJcbiAgICAgICAgICAgIHRoaXMucGVyaW9kID0gcGVyaW9kIGFzIFRpbWVQZXJpb2Q7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXRUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaG91ciA9IHsuLi5ERUZBVUxUX0hPVVJ9O1xyXG4gICAgICAgIHRoaXMubWludXRlID0gey4uLkRFRkFVTFRfTUlOVVRFfTtcclxuICAgICAgICB0aGlzLnBlcmlvZCA9IFRpbWVQZXJpb2QuQU07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKipcclxuICogIEZvcm1hdCBob3VyIGluIDI0aG91cnMgZm9ybWF0IHRvIG1lcmlkaWFuIChBTSBvciBQTSkgZm9ybWF0XHJcbiAqL1xyXG5mdW5jdGlvbiBmb3JtYXRIb3VyQnlQZXJpb2QoaG91cjogbnVtYmVyLCBwZXJpb2Q6IFRpbWVQZXJpb2QpOiBudW1iZXIge1xyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgICBjYXNlIFRpbWVQZXJpb2QuQU06XHJcbiAgICAgICAgICAgIHJldHVybiBob3VyID09PSAwID8gMTIgOiBob3VyO1xyXG4gICAgICAgIGNhc2UgVGltZVBlcmlvZC5QTTpcclxuICAgICAgICAgICAgcmV0dXJuIGhvdXIgPT09IDEyID8gMTIgOiBob3VyIC0gMTI7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XHJcbiAgICB9XHJcbn1cclxuIl19