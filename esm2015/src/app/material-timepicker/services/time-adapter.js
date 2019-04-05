/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateTime } from 'luxon';
import { TimeFormat } from '../models/time-format.enum';
import { TimePeriod } from '../models/time-period.enum';
import { TimepickerUtils } from '../utils/timepicker.utils';
// @dynamic
export class TimeAdapter {
    /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    static parseTime(time, format = 12) {
        if (time.indexOf(':') === -1) {
            return 'Invalid time';
        }
        /** @type {?} */
        let period = time.trim().substr(time.length - 2).toUpperCase();
        /** @type {?} */
        const isPeriodValid = period === TimePeriod.AM || period === TimePeriod.PM;
        const [h, m] = time.split(':');
        if (format === 24) {
            /** @type {?} */
            const formattedHours = isPeriodValid ? this.formatHour(+h, 12, (/** @type {?} */ (period))) : +h;
            return `${formattedHours}:${parseInt(m, 10)}`;
        }
        /** @type {?} */
        const isPM = +h > 12;
        /** @type {?} */
        const hours = isPM ? +h - 12 : +h;
        period = isPeriodValid ? period : isPM ? TimePeriod.PM : TimePeriod.AM;
        return `${hours}:${parseInt(m, 10)} ${period}`;
    }
    /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    static formatTime(time, format = 12) {
        /** @type {?} */
        const timeFormat = (format === 24) ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        /** @type {?} */
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        return DateTime.fromFormat(this.parseTime(time, format), timeMask).toFormat(timeFormat).toLowerCase();
    }
    /**
     * @param {?} time
     * @param {?=} format
     * @return {?}
     */
    static convertTimeToDateTime(time, format = 12) {
        /** @type {?} */
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        return DateTime.fromFormat(this.parseTime(time, format), timeMask);
    }
    /**
     * @param {?} time
     * @param {?=} min
     * @param {?=} max
     * @param {?=} granularity
     * @param {?=} minutesGap
     * @return {?}
     */
    static isTimeAvailable(time, min, max, granularity, minutesGap) {
        if (!time) {
            return;
        }
        /** @type {?} */
        const convertedTime = this.convertTimeToDateTime(time);
        /** @type {?} */
        const minutes = convertedTime.minute;
        if (minutesGap && (minutes % minutesGap !== 0)) {
            throw new Error(`Your minutes - ${minutes} doesn\'t match your minutesGap - ${minutesGap}`);
        }
        /** @type {?} */
        const isAfter = (min && !max)
            && TimepickerUtils.isSameOrAfter(convertedTime, min, granularity);
        /** @type {?} */
        const isBefore = (max && !min)
            && TimepickerUtils.isSameOrBefore(convertedTime, max, granularity);
        /** @type {?} */
        const isBetween = (min && max)
            && TimepickerUtils.isBetween(convertedTime, min, max, granularity);
        /** @type {?} */
        const isAvailable = !min && !max;
        return isAfter || isBefore || isBetween || isAvailable;
    }
    /**
     *
     *  Format hour according to time format (12 or 24)
     * @param {?} currentHour
     * @param {?} format
     * @param {?} period
     * @return {?}
     */
    static formatHour(currentHour, format, period) {
        if (format === 24) {
            return currentHour;
        }
        /** @type {?} */
        const hour = period === TimePeriod.AM ? currentHour : currentHour + 12;
        if (period === TimePeriod.AM && hour === 12) {
            return 0;
        }
        else if (period === TimePeriod.PM && hour === 24) {
            return 12;
        }
        return hour;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvc2VydmljZXMvdGltZS1hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUc1RCxNQUFNLE9BQU8sV0FBVzs7Ozs7O0lBRXBCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBWSxFQUFFLE1BQU0sR0FBRyxFQUFFO1FBQ3RDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMxQixPQUFPLGNBQWMsQ0FBQztTQUN6Qjs7WUFDRyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTs7Y0FFeEQsYUFBYSxHQUFHLE1BQU0sS0FBSyxVQUFVLENBQUMsRUFBRSxJQUFJLE1BQU0sS0FBSyxVQUFVLENBQUMsRUFBRTtjQUNwRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUk5QixJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUU7O2tCQUNULGNBQWMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLG1CQUFBLE1BQU0sRUFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMs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SSxXQUFXLENBQUM7SUFDM0QsQ0FBQzs7Ozs7Ozs7O0lBS0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFtQixFQUFFLE1BQWMsRUFBRSxNQUFrQjtRQUNyRSxJQUFJLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPLFdBQVcsQ0FBQztTQUN0Qjs7Y0FDSyxJQUFJLEdBQUcsTUFBTSxLQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEVBQUU7UUFFdEUsSUFBSSxNQUFNLEtBQUssVUFBVSxDQUFDLEVBQUUsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDO1NBQ1o7YUFBTSxJQUFJLE1BQU0sS0FBSyxVQUFVLENBQUMsRUFBRSxJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDaEQsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVUaW1lIH0gZnJvbSAnbHV4b24nO1xyXG5cclxuaW1wb3J0IHsgVGltZUZvcm1hdCB9IGZyb20gJy4uL21vZGVscy90aW1lLWZvcm1hdC5lbnVtJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4uL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgVGltZXBpY2tlclV0aWxzIH0gZnJvbSAnLi4vdXRpbHMvdGltZXBpY2tlci51dGlscyc7XHJcblxyXG4vLyBAZHluYW1pY1xyXG5leHBvcnQgY2xhc3MgVGltZUFkYXB0ZXIge1xyXG5cclxuICAgIHN0YXRpYyBwYXJzZVRpbWUodGltZTogc3RyaW5nLCBmb3JtYXQgPSAxMik6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRpbWUuaW5kZXhPZignOicpID09PSAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0ludmFsaWQgdGltZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwZXJpb2QgPSB0aW1lLnRyaW0oKS5zdWJzdHIodGltZS5sZW5ndGggLSAyKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBpc1BlcmlvZFZhbGlkID0gcGVyaW9kID09PSBUaW1lUGVyaW9kLkFNIHx8IHBlcmlvZCA9PT0gVGltZVBlcmlvZC5QTTtcclxuICAgICAgICBjb25zdCBbaCwgbV0gPSB0aW1lLnNwbGl0KCc6Jyk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gMjQpIHtcclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkSG91cnMgPSBpc1BlcmlvZFZhbGlkID8gdGhpcy5mb3JtYXRIb3VyKCtoLCAxMiwgcGVyaW9kIGFzIFRpbWVQZXJpb2QpIDogK2g7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtmb3JtYXR0ZWRIb3Vyc306JHtwYXJzZUludChtLCAxMCl9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGlzUE0gPSAraCA+IDEyO1xyXG4gICAgICAgIGNvbnN0IGhvdXJzID0gaXNQTSA/ICtoIC0gMTIgOiAraDtcclxuXHJcbiAgICAgICAgcGVyaW9kID0gaXNQZXJpb2RWYWxpZCA/IHBlcmlvZCA6IGlzUE0gPyBUaW1lUGVyaW9kLlBNIDogVGltZVBlcmlvZC5BTTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGAke2hvdXJzfToke3BhcnNlSW50KG0sIDEwKX0gJHtwZXJpb2R9YDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZm9ybWF0VGltZSh0aW1lOiBzdHJpbmcsIGZvcm1hdCA9IDEyKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCB0aW1lRm9ybWF0ID0gKGZvcm1hdCA9PT0gMjQpID8gVGltZUZvcm1hdC5UV0VOVFlfRk9VUiA6IFRpbWVGb3JtYXQuVFdFTFZFO1xyXG4gICAgICAgIGNvbnN0IHRpbWVNYXNrID0gKGZvcm1hdCA9PT0gMjQpID8gVGltZUZvcm1hdC5UV0VOVFlfRk9VUl9TSE9SVCA6IFRpbWVGb3JtYXQuVFdFTFZFX1NIT1JUO1xyXG5cclxuICAgICAgICByZXR1cm4gRGF0ZVRpbWUuZnJvbUZvcm1hdCh0aGlzLnBhcnNlVGltZSh0aW1lLCBmb3JtYXQpLCB0aW1lTWFzaykudG9Gb3JtYXQodGltZUZvcm1hdCkudG9Mb3dlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29udmVydFRpbWVUb0RhdGVUaW1lKHRpbWU6IHN0cmluZywgZm9ybWF0ID0gMTIpOiBEYXRlVGltZSB7XHJcbiAgICAgICAgY29uc3QgdGltZU1hc2sgPSAoZm9ybWF0ID09PSAyNCkgPyBUaW1lRm9ybWF0LlRXRU5UWV9GT1VSX1NIT1JUIDogVGltZUZvcm1hdC5UV0VMVkVfU0hPUlQ7XHJcbiAgICAgICAgcmV0dXJuIERhdGVUaW1lLmZyb21Gb3JtYXQodGhpcy5wYXJzZVRpbWUodGltZSwgZm9ybWF0KSwgdGltZU1hc2spO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpc1RpbWVBdmFpbGFibGUodGltZTogc3RyaW5nLCBtaW4/OiBEYXRlVGltZSwgbWF4PzogRGF0ZVRpbWUsIGdyYW51bGFyaXR5PzogJ2hvdXJzJyB8ICdtaW51dGVzJywgbWludXRlc0dhcD86IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb252ZXJ0ZWRUaW1lID0gdGhpcy5jb252ZXJ0VGltZVRvRGF0ZVRpbWUodGltZSk7XHJcbiAgICAgICAgY29uc3QgbWludXRlcyA9IGNvbnZlcnRlZFRpbWUubWludXRlO1xyXG5cclxuICAgICAgICBpZiAobWludXRlc0dhcCAmJiAobWludXRlcyAlIG1pbnV0ZXNHYXAgIT09IDApKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWW91ciBtaW51dGVzIC0gJHttaW51dGVzfSBkb2VzblxcJ3QgbWF0Y2ggeW91ciBtaW51dGVzR2FwIC0gJHttaW51dGVzR2FwfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpc0FmdGVyID0gKG1pbiAmJiAhbWF4KVxyXG4gICAgICAgICAgICAmJiBUaW1lcGlja2VyVXRpbHMuaXNTYW1lT3JBZnRlcihjb252ZXJ0ZWRUaW1lLCBtaW4sIGdyYW51bGFyaXR5KTtcclxuICAgICAgICBjb25zdCBpc0JlZm9yZSA9IChtYXggJiYgIW1pbilcclxuICAgICAgICAgICAgJiYgVGltZXBpY2tlclV0aWxzLmlzU2FtZU9yQmVmb3JlKGNvbnZlcnRlZFRpbWUsIG1heCwgZ3JhbnVsYXJpdHkpO1xyXG4gICAgICAgIGNvbnN0IGlzQmV0d2VlbiA9IChtaW4gJiYgbWF4KVxyXG4gICAgICAgICAgICAmJiBUaW1lcGlja2VyVXRpbHMuaXNCZXR3ZWVuKGNvbnZlcnRlZFRpbWUsIG1pbiwgbWF4LCBncmFudWxhcml0eSk7XHJcbiAgICAgICAgY29uc3QgaXNBdmFpbGFibGUgPSAhbWluICYmICFtYXg7XHJcblxyXG4gICAgICAgIHJldHVybiBpc0FmdGVyIHx8IGlzQmVmb3JlIHx8IGlzQmV0d2VlbiB8fCBpc0F2YWlsYWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiAgRm9ybWF0IGhvdXIgYWNjb3JkaW5nIHRvIHRpbWUgZm9ybWF0ICgxMiBvciAyNClcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGZvcm1hdEhvdXIoY3VycmVudEhvdXI6IG51bWJlciwgZm9ybWF0OiBudW1iZXIsIHBlcmlvZDogVGltZVBlcmlvZCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKGZvcm1hdCA9PT0gMjQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRIb3VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBob3VyID0gcGVyaW9kID09PSBUaW1lUGVyaW9kLkFNID8gY3VycmVudEhvdXIgOiBjdXJyZW50SG91ciArIDEyO1xyXG5cclxuICAgICAgICBpZiAocGVyaW9kID09PSBUaW1lUGVyaW9kLkFNICYmIGhvdXIgPT09IDEyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGVyaW9kID09PSBUaW1lUGVyaW9kLlBNICYmIGhvdXIgPT09IDI0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhvdXI7XHJcbiAgICB9XHJcbn1cclxuIl19