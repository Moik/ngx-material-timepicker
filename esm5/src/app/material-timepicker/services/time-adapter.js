/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DateTime } from 'luxon';
import { TimeFormat } from '../models/time-format.enum';
import { TimePeriod } from '../models/time-period.enum';
import { TimepickerUtils } from '../utils/timepicker.utils';
// @dynamic
var 
// @dynamic
TimeAdapter = /** @class */ (function () {
    function TimeAdapter() {
    }
    /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    TimeAdapter.parseTime = /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    function (time, format) {
        if (format === void 0) { format = 12; }
        if (time.indexOf(':') === -1) {
            return 'Invalid time';
        }
        /** @type {?} */
        var period = time.trim().substr(time.length - 2).toUpperCase();
        /** @type {?} */
        var isPeriodValid = period === TimePeriod.AM || period === TimePeriod.PM;
        var _a = tslib_1.__read(time.split(':'), 2), h = _a[0], m = _a[1];
        if (format === 24) {
            /** @type {?} */
            var formattedHours = isPeriodValid ? this.formatHour(+h, 12, (/** @type {?} */ (period))) : +h;
            return formattedHours + ":" + parseInt(m, 10);
        }
        /** @type {?} */
        var isPM = +h > 12;
        /** @type {?} */
        var hours = isPM ? +h - 12 : +h;
        period = isPeriodValid ? period : isPM ? TimePeriod.PM : TimePeriod.AM;
        return hours + ":" + parseInt(m, 10) + " " + period;
    };
    /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    TimeAdapter.formatTime = /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    function (time, format) {
        if (format === void 0) { format = 12; }
        /** @type {?} */
        var timeFormat = (format === 24) ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        /** @type {?} */
        var timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        return DateTime.fromFormat(this.parseTime(time, format), timeMask).toFormat(timeFormat).toLowerCase();
    };
    /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    TimeAdapter.convertTimeToDateTime = /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    function (time, format) {
        if (format === void 0) { format = 12; }
        /** @type {?} */
        var timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        return DateTime.fromFormat(this.parseTime(time, format), timeMask);
    };
    /**
     * @param {?} time
     * @param {?=} min
     * @param {?=} max
     * @param {?=} granularity
     * @param {?=} minutesGap
     * @return {?}
     */
    TimeAdapter.isTimeAvailable = /**
     * @param {?} time
     * @param {?=} min
     * @param {?=} max
     * @param {?=} granularity
     * @param {?=} minutesGap
     * @return {?}
     */
    function (time, min, max, granularity, minutesGap) {
        if (!time) {
            return;
        }
        /** @type {?} */
        var convertedTime = this.convertTimeToDateTime(time);
        /** @type {?} */
        var minutes = convertedTime.minute;
        if (minutesGap && (minutes % minutesGap !== 0)) {
            throw new Error("Your minutes - " + minutes + " doesn't match your minutesGap - " + minutesGap);
        }
        /** @type {?} */
        var isAfter = (min && !max)
            && TimepickerUtils.isSameOrAfter(convertedTime, min, granularity);
        /** @type {?} */
        var isBefore = (max && !min)
            && TimepickerUtils.isSameOrBefore(convertedTime, max, granularity);
        /** @type {?} */
        var isBetween = (min && max)
            && TimepickerUtils.isBetween(convertedTime, min, max, granularity);
        /** @type {?} */
        var isAvailable = !min && !max;
        return isAfter || isBefore || isBetween || isAvailable;
    };
    /***
     *  Format hour according to time format (12 or 24)
     */
    /**
     *
     *  Format hour according to time format (12 or 24)
     * @param {?} currentHour
     * @param {?} format
     * @param {?} period
     * @return {?}
     */
    TimeAdapter.formatHour = /**
     *
     *  Format hour according to time format (12 or 24)
     * @param {?} currentHour
     * @param {?} format
     * @param {?} period
     * @return {?}
     */
    function (currentHour, format, period) {
        if (format === 24) {
            return currentHour;
        }
        /** @type {?} */
        var hour = period === TimePeriod.AM ? currentHour : currentHour + 12;
        if (period === TimePeriod.AM && hour === 12) {
            return 0;
        }
        else if (period === TimePeriod.PM && hour === 24) {
            return 12;
        }
        return hour;
    };
    return TimeAdapter;
}());
// @dynamic
export { TimeAdapter };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvc2VydmljZXMvdGltZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUVqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFHNUQ7OztJQUFBO0lBNEVBLENBQUM7Ozs7OztJQTFFVSxxQkFBUzs7Ozs7SUFBaEIsVUFBaUIsSUFBWSxFQUFFLE1BQVc7UUFBWCx1QkFBQSxFQUFBLFdBQVc7UUFDdEMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzFCLE9BQU8sY0FBYyxDQUFDO1NBQ3pCOztZQUNHLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFOztZQUV4RCxhQUFhLEdBQUcsTUFBTSxLQUFLLFVBQVUsQ0FBQyxFQUFFLElBQUksTUFBTSxLQUFLLFVBQVUsQ0FBQyxFQUFFO1FBQ3BFLElBQUEsdUNBQXdCLEVBQXZCLFNBQUMsRUFBRSxTQUFvQjtRQUk5QixJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUU7O2dCQUNULGNBQWMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLG1CQUFBLE1BQU0sRUFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6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QVcsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7OztJQUNJLHNCQUFVOzs7Ozs7OztJQUFqQixVQUFrQixXQUFtQixFQUFFLE1BQWMsRUFBRSxNQUFrQjtRQUNyRSxJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPLFdBQVcsQ0FBQztTQUN0Qjs7WUFDSyxJQUFJLEdBQUcsTUFBTSxLQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEVBQUU7UUFFdEUsSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLEVBQUUsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7YUFBTSxJQUFJLE1BQU0sS0FBSyxVQUFVLENBQUMsRUFBRSxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDaEQsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUE1RUQsSUE0RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuXHJcbmltcG9ydCB7IFRpbWVGb3JtYXQgfSBmcm9tICcuLi9tb2RlbHMvdGltZS1mb3JtYXQuZW51bSc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuLi9tb2RlbHMvdGltZS1wZXJpb2QuZW51bSc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJVdGlscyB9IGZyb20gJy4uL3V0aWxzL3RpbWVwaWNrZXIudXRpbHMnO1xyXG5cclxuLy8gQGR5bmFtaWNcclxuZXhwb3J0IGNsYXNzIFRpbWVBZGFwdGVyIHtcclxuXHJcbiAgICBzdGF0aWMgcGFyc2VUaW1lKHRpbWU6IHN0cmluZywgZm9ybWF0ID0gMTIpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aW1lLmluZGV4T2YoJzonKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdJbnZhbGlkIHRpbWUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGVyaW9kID0gdGltZS50cmltKCkuc3Vic3RyKHRpbWUubGVuZ3RoIC0gMikudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaXNQZXJpb2RWYWxpZCA9IHBlcmlvZCA9PT0gVGltZVBlcmlvZC5BTSB8fCBwZXJpb2QgPT09IFRpbWVQZXJpb2QuUE07XHJcbiAgICAgICAgY29uc3QgW2gsIG1dID0gdGltZS5zcGxpdCgnOicpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChmb3JtYXQgPT09IDI0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZEhvdXJzID0gaXNQZXJpb2RWYWxpZCA/IHRoaXMuZm9ybWF0SG91cigraCwgMTIsIHBlcmlvZCBhcyBUaW1lUGVyaW9kKSA6ICtoO1xyXG4gICAgICAgICAgICByZXR1cm4gYCR7Zm9ybWF0dGVkSG91cnN9OiR7cGFyc2VJbnQobSwgMTApfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpc1BNID0gK2ggPiAxMjtcclxuICAgICAgICBjb25zdCBob3VycyA9IGlzUE0gPyAraCAtIDEyIDogK2g7XHJcblxyXG4gICAgICAgIHBlcmlvZCA9IGlzUGVyaW9kVmFsaWQgPyBwZXJpb2QgOiBpc1BNID8gVGltZVBlcmlvZC5QTSA6IFRpbWVQZXJpb2QuQU07XHJcblxyXG4gICAgICAgIHJldHVybiBgJHtob3Vyc306JHtwYXJzZUludChtLCAxMCl9ICR7cGVyaW9kfWA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZvcm1hdFRpbWUodGltZTogc3RyaW5nLCBmb3JtYXQgPSAxMik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgdGltZUZvcm1hdCA9IChmb3JtYXQgPT09IDI0KSA/IFRpbWVGb3JtYXQuVFdFTlRZX0ZPVVIgOiBUaW1lRm9ybWF0LlRXRUxWRTtcclxuICAgICAgICBjb25zdCB0aW1lTWFzayA9IChmb3JtYXQgPT09IDI0KSA/IFRpbWVGb3JtYXQuVFdFTlRZX0ZPVVJfU0hPUlQgOiBUaW1lRm9ybWF0LlRXRUxWRV9TSE9SVDtcclxuXHJcbiAgICAgICAgcmV0dXJuIERhdGVUaW1lLmZyb21Gb3JtYXQodGhpcy5wYXJzZVRpbWUodGltZSwgZm9ybWF0KSwgdGltZU1hc2spLnRvRm9ybWF0KHRpbWVGb3JtYXQpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbnZlcnRUaW1lVG9EYXRlVGltZSh0aW1lOiBzdHJpbmcsIGZvcm1hdCA9IDEyKTogRGF0ZVRpbWUge1xyXG4gICAgICAgIGNvbnN0IHRpbWVNYXNrID0gKGZvcm1hdCA9PT0gMjQpID8gVGltZUZvcm1hdC5UV0VOVFlfRk9VUl9TSE9SVCA6IFRpbWVGb3JtYXQuVFdFTFZFX1NIT1JUO1xyXG4gICAgICAgIHJldHVybiBEYXRlVGltZS5mcm9tRm9ybWF0KHRoaXMucGFyc2VUaW1lKHRpbWUsIGZvcm1hdCksIHRpbWVNYXNrKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNUaW1lQXZhaWxhYmxlKHRpbWU6IHN0cmluZywgbWluPzogRGF0ZVRpbWUsIG1heD86IERhdGVUaW1lLCBncmFudWxhcml0eT86ICdob3VycycgfCAnbWludXRlcycsIG1pbnV0ZXNHYXA/OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY29udmVydGVkVGltZSA9IHRoaXMuY29udmVydFRpbWVUb0RhdGVUaW1lKHRpbWUpO1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBjb252ZXJ0ZWRUaW1lLm1pbnV0ZTtcclxuXHJcbiAgICAgICAgaWYgKG1pbnV0ZXNHYXAgJiYgKG1pbnV0ZXMgJSBtaW51dGVzR2FwICE9PSAwKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFlvdXIgbWludXRlcyAtICR7bWludXRlc30gZG9lc25cXCd0IG1hdGNoIHlvdXIgbWludXRlc0dhcCAtICR7bWludXRlc0dhcH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaXNBZnRlciA9IChtaW4gJiYgIW1heClcclxuICAgICAgICAgICAgJiYgVGltZXBpY2tlclV0aWxzLmlzU2FtZU9yQWZ0ZXIoY29udmVydGVkVGltZSwgbWluLCBncmFudWxhcml0eSk7XHJcbiAgICAgICAgY29uc3QgaXNCZWZvcmUgPSAobWF4ICYmICFtaW4pXHJcbiAgICAgICAgICAgICYmIFRpbWVwaWNrZXJVdGlscy5pc1NhbWVPckJlZm9yZShjb252ZXJ0ZWRUaW1lLCBtYXgsIGdyYW51bGFyaXR5KTtcclxuICAgICAgICBjb25zdCBpc0JldHdlZW4gPSAobWluICYmIG1heClcclxuICAgICAgICAgICAgJiYgVGltZXBpY2tlclV0aWxzLmlzQmV0d2Vlbihjb252ZXJ0ZWRUaW1lLCBtaW4sIG1heCwgZ3JhbnVsYXJpdHkpO1xyXG4gICAgICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gIW1pbiAmJiAhbWF4O1xyXG5cclxuICAgICAgICByZXR1cm4gaXNBZnRlciB8fCBpc0JlZm9yZSB8fCBpc0JldHdlZW4gfHwgaXNBdmFpbGFibGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogIEZvcm1hdCBob3VyIGFjY29yZGluZyB0byB0aW1lIGZvcm1hdCAoMTIgb3IgMjQpXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBmb3JtYXRIb3VyKGN1cnJlbnRIb3VyOiBudW1iZXIsIGZvcm1hdDogbnVtYmVyLCBwZXJpb2Q6IFRpbWVQZXJpb2QpOiBudW1iZXIge1xyXG4gICAgICAgIGlmIChmb3JtYXQgPT09IDI0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50SG91cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgaG91ciA9IHBlcmlvZCA9PT0gVGltZVBlcmlvZC5BTSA/IGN1cnJlbnRIb3VyIDogY3VycmVudEhvdXIgKyAxMjtcclxuXHJcbiAgICAgICAgaWYgKHBlcmlvZCA9PT0gVGltZVBlcmlvZC5BTSAmJiBob3VyID09PSAxMikge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKHBlcmlvZCA9PT0gVGltZVBlcmlvZC5QTSAmJiBob3VyID09PSAyNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBob3VyO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==