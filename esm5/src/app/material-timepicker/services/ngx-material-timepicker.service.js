/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';
import { DateTime } from 'luxon';
import * as i0 from "@angular/core";
/** @type {?} */
var DEFAULT_HOUR = {
    time: 12,
    angle: 360
};
/** @type {?} */
var DEFAULT_MINUTE = {
    time: 0,
    angle: 360
};
var NgxMaterialTimepickerService = /** @class */ (function () {
    function NgxMaterialTimepickerService() {
        this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
        this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
        this.periodSubject = new BehaviorSubject(TimePeriod.AM);
    }
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "hour", {
        set: /**
         * @param {?} hour
         * @return {?}
         */
        function (hour) {
            this.hourSubject.next(hour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedHour", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hourSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "minute", {
        set: /**
         * @param {?} minute
         * @return {?}
         */
        function (minute) {
            this.minuteSubject.next(minute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedMinute", {
        get: /**
         * @return {?}
         */
        function () {
            return this.minuteSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "period", {
        set: /**
         * @param {?} period
         * @return {?}
         */
        function (period) {
            /** @type {?} */
            var isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
            if (isPeriodValid) {
                this.periodSubject.next(period);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedPeriod", {
        get: /**
         * @return {?}
         */
        function () {
            return this.periodSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} time
     * @param {?} min
     * @param {?} max
     * @param {?} format
     * @param {?=} minutesGap
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.setDefaultTimeIfAvailable = /**
     * @param {?} time
     * @param {?} min
     * @param {?} max
     * @param {?} format
     * @param {?=} minutesGap
     * @return {?}
     */
    function (time, min, max, format, minutesGap) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.setDefaultTime(TimeAdapter.formatTime(time, format), format);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * @param {?} format
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.getFullTime = /**
     * @param {?} format
     * @return {?}
     */
    function (format) {
        /** @type {?} */
        var hour = this.hourSubject.getValue().time;
        /** @type {?} */
        var minute = this.minuteSubject.getValue().time;
        /** @type {?} */
        var period = format === 12 ? this.periodSubject.getValue() : '';
        return TimeAdapter.formatTime(hour + ":" + minute + " " + period, format);
    };
    /**
     * @private
     * @param {?} time
     * @param {?} format
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.setDefaultTime = /**
     * @private
     * @param {?} time
     * @param {?} format
     * @return {?}
     */
    function (time, format) {
        /** @type {?} */
        var defaultTime = TimeAdapter.convertTimeToDateTime(time, format).toJSDate();
        if (DateTime.fromJSDate(defaultTime).isValid) {
            /** @type {?} */
            var period = time.substr(time.length - 2).toUpperCase();
            /** @type {?} */
            var hour = defaultTime.getHours();
            this.hour = tslib_1.__assign({}, DEFAULT_HOUR, { time: formatHourByPeriod(hour, (/** @type {?} */ (period))) });
            this.minute = tslib_1.__assign({}, DEFAULT_MINUTE, { time: defaultTime.getMinutes() });
            this.period = (/** @type {?} */ (period));
        }
        else {
            this.resetTime();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.resetTime = /**
     * @private
     * @return {?}
     */
    function () {
        this.hour = tslib_1.__assign({}, DEFAULT_HOUR);
        this.minute = tslib_1.__assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    };
    NgxMaterialTimepickerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ NgxMaterialTimepickerService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
    return NgxMaterialTimepickerService;
}());
export { NgxMaterialTimepickerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7SUFHM0IsWUFBWSxHQUFrQjtJQUNoQyxJQUFJLEVBQUUsRUFBRTtJQUNSLEtBQUssRUFBRSxHQUFHO0NBQ2I7O0lBQ0ssY0FBYyxHQUFrQjtJQUNsQyxJQUFJLEVBQUUsQ0FBQztJQUNQLEtBQUssRUFBRSxHQUFHO0NBQ2I7QUFFRDtJQUFBO1FBS1ksZ0JBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsWUFBWSxDQUFDLENBQUM7UUFDL0Qsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsY0FBYyxDQUFDLENBQUM7UUFDbkUsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBYSxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7S0F3RTFFO0lBckVHLHNCQUFJLDhDQUFJOzs7OztRQUFSLFVBQVMsSUFBbUI7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxzREFBWTs7OztRQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztR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LENBQUM7Ozs7O0lBRU8sZ0RBQVM7Ozs7SUFBakI7UUFDSSxJQUFJLENBQUMsSUFBSSx3QkFBTyxZQUFZLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSx3QkFBTyxjQUFjLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Z0JBOUVKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozt1Q0FuQkQ7Q0FnR0MsQUEvRUQsSUErRUM7U0E1RVksNEJBQTRCOzs7Ozs7SUFFckMsbURBQXVFOzs7OztJQUN2RSxxREFBMkU7Ozs7O0lBQzNFLHFEQUF1RTs7Ozs7Ozs7O0FBNkUzRSxTQUFTLGtCQUFrQixDQUFDLElBQVksRUFBRSxNQUFrQjtJQUN4RCxRQUFRLE1BQU0sRUFBRTtRQUNaLEtBQUssVUFBVSxDQUFDLEVBQUU7WUFDZCxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2xDLEtBQUssVUFBVSxDQUFDLEVBQUU7WUFDZCxPQUFPLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN4QztZQUNJLE9BQU8sSUFBSSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XHJcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi90aW1lLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuXHJcblxyXG5jb25zdCBERUZBVUxUX0hPVVI6IENsb2NrRmFjZVRpbWUgPSB7XHJcbiAgICB0aW1lOiAxMixcclxuICAgIGFuZ2xlOiAzNjBcclxufTtcclxuY29uc3QgREVGQVVMVF9NSU5VVEU6IENsb2NrRmFjZVRpbWUgPSB7XHJcbiAgICB0aW1lOiAwLFxyXG4gICAgYW5nbGU6IDM2MFxyXG59O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGhvdXJTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDbG9ja0ZhY2VUaW1lPihERUZBVUxUX0hPVVIpO1xyXG4gICAgcHJpdmF0ZSBtaW51dGVTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxDbG9ja0ZhY2VUaW1lPihERUZBVUxUX01JTlVURSk7XHJcbiAgICBwcml2YXRlIHBlcmlvZFN1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRpbWVQZXJpb2Q+KFRpbWVQZXJpb2QuQU0pO1xyXG5cclxuXHJcbiAgICBzZXQgaG91cihob3VyOiBDbG9ja0ZhY2VUaW1lKSB7XHJcbiAgICAgICAgdGhpcy5ob3VyU3ViamVjdC5uZXh0KGhvdXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZWxlY3RlZEhvdXIoKTogT2JzZXJ2YWJsZTxDbG9ja0ZhY2VUaW1lPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG91clN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IG1pbnV0ZShtaW51dGU6IENsb2NrRmFjZVRpbWUpIHtcclxuICAgICAgICB0aGlzLm1pbnV0ZVN1YmplY3QubmV4dChtaW51dGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzZWxlY3RlZE1pbnV0ZSgpOiBPYnNlcnZhYmxlPENsb2NrRmFjZVRpbWU+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5taW51dGVTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBwZXJpb2QocGVyaW9kOiBUaW1lUGVyaW9kKSB7XHJcbiAgICAgICAgY29uc3QgaXNQZXJpb2RWYWxpZCA9IChwZXJpb2QgPT09IFRpbWVQZXJpb2QuQU0pIHx8IChwZXJpb2QgPT09IFRpbWVQZXJpb2QuUE0pO1xyXG5cclxuICAgICAgICBpZiAoaXNQZXJpb2RWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBlcmlvZFN1YmplY3QubmV4dChwZXJpb2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2VsZWN0ZWRQZXJpb2QoKTogT2JzZXJ2YWJsZTxUaW1lUGVyaW9kPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGVyaW9kU3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgc2V0RGVmYXVsdFRpbWVJZkF2YWlsYWJsZSh0aW1lOiBzdHJpbmcsIG1pbjogRGF0ZVRpbWUsIG1heDogRGF0ZVRpbWUsIGZvcm1hdDogbnVtYmVyLCBtaW51dGVzR2FwPzogbnVtYmVyKSB7XHJcbiAgICAgICAgLyogV29ya2Fyb3VuZCB0byBkb3VibGUgZXJyb3IgbWVzc2FnZSovXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKFRpbWVBZGFwdGVyLmlzVGltZUF2YWlsYWJsZSh0aW1lLCBtaW4sIG1heCwgJ21pbnV0ZXMnLCBtaW51dGVzR2FwKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREZWZhdWx0VGltZShUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHRpbWUsIGZvcm1hdCksIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEZ1bGxUaW1lKGZvcm1hdDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBob3VyID0gdGhpcy5ob3VyU3ViamVjdC5nZXRWYWx1ZSgpLnRpbWU7XHJcbiAgICAgICAgY29uc3QgbWludXRlID0gdGhpcy5taW51dGVTdWJqZWN0LmdldFZhbHVlKCkudGltZTtcclxuICAgICAgICBjb25zdCBwZXJpb2QgPSBmb3JtYXQgPT09IDEyID8gdGhpcy5wZXJpb2RTdWJqZWN0LmdldFZhbHVlKCkgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIFRpbWVBZGFwdGVyLmZvcm1hdFRpbWUoYCR7aG91cn06JHttaW51dGV9ICR7cGVyaW9kfWAsIGZvcm1hdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXREZWZhdWx0VGltZSh0aW1lOiBzdHJpbmcsIGZvcm1hdDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgZGVmYXVsdFRpbWUgPSBUaW1lQWRhcHRlci5jb252ZXJ0VGltZVRvRGF0ZVRpbWUodGltZSwgZm9ybWF0KS50b0pTRGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoRGF0ZVRpbWUuZnJvbUpTRGF0ZShkZWZhdWx0VGltZSkuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBjb25zdCBwZXJpb2QgPSB0aW1lLnN1YnN0cih0aW1lLmxlbmd0aCAtIDIpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXIgPSBkZWZhdWx0VGltZS5nZXRIb3VycygpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5ob3VyID0gey4uLkRFRkFVTFRfSE9VUiwgdGltZTogZm9ybWF0SG91ckJ5UGVyaW9kKGhvdXIsIHBlcmlvZCBhcyBUaW1lUGVyaW9kKX07XHJcbiAgICAgICAgICAgIHRoaXMubWludXRlID0gey4uLkRFRkFVTFRfTUlOVVRFLCB0aW1lOiBkZWZhdWx0VGltZS5nZXRNaW51dGVzKCl9O1xyXG4gICAgICAgICAgICB0aGlzLnBlcmlvZCA9IHBlcmlvZCBhcyBUaW1lUGVyaW9kO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0VGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlc2V0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhvdXIgPSB7Li4uREVGQVVMVF9IT1VSfTtcclxuICAgICAgICB0aGlzLm1pbnV0ZSA9IHsuLi5ERUZBVUxUX01JTlVURX07XHJcbiAgICAgICAgdGhpcy5wZXJpb2QgPSBUaW1lUGVyaW9kLkFNO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKioqXHJcbiAqICBGb3JtYXQgaG91ciBpbiAyNGhvdXJzIGZvcm1hdCB0byBtZXJpZGlhbiAoQU0gb3IgUE0pIGZvcm1hdFxyXG4gKi9cclxuZnVuY3Rpb24gZm9ybWF0SG91ckJ5UGVyaW9kKGhvdXI6IG51bWJlciwgcGVyaW9kOiBUaW1lUGVyaW9kKTogbnVtYmVyIHtcclxuICAgIHN3aXRjaCAocGVyaW9kKSB7XHJcbiAgICAgICAgY2FzZSBUaW1lUGVyaW9kLkFNOlxyXG4gICAgICAgICAgICByZXR1cm4gaG91ciA9PT0gMCA/IDEyIDogaG91cjtcclxuICAgICAgICBjYXNlIFRpbWVQZXJpb2QuUE06XHJcbiAgICAgICAgICAgIHJldHVybiBob3VyID09PSAxMiA/IDEyIDogaG91ciAtIDEyO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBob3VyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==