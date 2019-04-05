/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export var TimepickerUtils;
(function (TimepickerUtils) {
    /**
     * @param {?} time
     * @param {?} compareWith
     * @param {?=} unit
     * @return {?}
     */
    function isSameOrAfter(time, compareWith, unit) {
        if (unit === void 0) { unit = 'minutes'; }
        if (unit === 'hours') {
            return time.hour >= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
        }
    }
    TimepickerUtils.isSameOrAfter = isSameOrAfter;
    /**
     * @param {?} time
     * @param {?} compareWith
     * @param {?=} unit
     * @return {?}
     */
    function isSameOrBefore(time, compareWith, unit) {
        if (unit === void 0) { unit = 'minutes'; }
        if (unit === 'hours') {
            return time.hour <= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
        }
    }
    TimepickerUtils.isSameOrBefore = isSameOrBefore;
    /**
     * @param {?} time
     * @param {?} before
     * @param {?} after
     * @param {?=} unit
     * @return {?}
     */
    function isBetween(time, before, after, unit) {
        if (unit === void 0) { unit = 'minutes'; }
        if (unit === 'hours') {
            return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
        }
        if (unit === 'minutes') {
            return isSameOrBefore(time, after) && isSameOrAfter(time, before);
        }
    }
    TimepickerUtils.isBetween = isBetween;
})(TimepickerUtils || (TimepickerUtils = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci51dGlscy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3V0aWxzL3RpbWVwaWNrZXIudXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU0sS0FBVyxlQUFlLENBNEIvQjtBQTVCRCxXQUFpQixlQUFlOzs7Ozs7O0lBRTVCLFNBQWdCLGFBQWEsQ0FBQyxJQUFjLEVBQUUsV0FBcUIsRUFBRSxJQUFxQztRQUFyQyxxQkFBQSxFQUFBLGdCQUFxQztRQUN0RyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDbEIsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUM7U0FDeEM7UUFDRCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3BGO0lBQ0wsQ0FBQztJQVBlLDZCQUFhLGdCQU81QixDQUFBOzs7Ozs7O0lBRUQsU0FBZ0IsY0FBYyxDQUFDLElBQWMsRUFBRSxXQUFxQixFQUFFLElBQXFDO1FBQXJDLHFCQUFBLEVBQUEsZ0JBQXFDO1FBQ3ZHLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQztTQUN4QztRQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckY7SUFDTCxDQUFDO0lBUGUsOEJBQWMsaUJBTzdCLENBQUE7Ozs7Ozs7O0lBRUQsU0FBZ0IsU0FBUyxDQUFDLElBQWMsRUFBRSxNQUFnQixFQUFFLEtBQWUsRUFBRSxJQUFxQztRQUFyQyxxQkFBQSxFQUFBLGdCQUFxQztRQUM5RyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDbEIsT0FBTyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNqRjtRQUNELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLGNBQWMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksYUFBYSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyRTtJQUNMLENBQUM7SUFQZSx5QkFBUyxZQU94QixDQUFBO0FBQ0wsQ0FBQyxFQTVCZ0IsZUFBZSxLQUFmLGVBQWUsUUE0Qi9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFRpbWVwaWNrZXJVdGlscyB7XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU9yQWZ0ZXIodGltZTogRGF0ZVRpbWUsIGNvbXBhcmVXaXRoOiBEYXRlVGltZSwgdW5pdDogJ2hvdXJzJyB8ICdtaW51dGVzJyA9ICdtaW51dGVzJyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh1bml0ID09PSAnaG91cnMnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lLmhvdXIgPj0gY29tcGFyZVdpdGguaG91cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaXQgPT09ICdtaW51dGVzJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZS5oYXNTYW1lKGNvbXBhcmVXaXRoLCB1bml0KSB8fCB0aW1lLnZhbHVlT2YoKSA+IGNvbXBhcmVXaXRoLnZhbHVlT2YoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGlzU2FtZU9yQmVmb3JlKHRpbWU6IERhdGVUaW1lLCBjb21wYXJlV2l0aDogRGF0ZVRpbWUsIHVuaXQ6ICdob3VycycgfCAnbWludXRlcycgPSAnbWludXRlcycpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodW5pdCA9PT0gJ2hvdXJzJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZS5ob3VyIDw9IGNvbXBhcmVXaXRoLmhvdXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1bml0ID09PSAnbWludXRlcycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWUuaGFzU2FtZShjb21wYXJlV2l0aCwgdW5pdCkgfHwgdGltZS52YWx1ZU9mKCkgPD0gY29tcGFyZVdpdGgudmFsdWVPZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaXNCZXR3ZWVuKHRpbWU6IERhdGVUaW1lLCBiZWZvcmU6IERhdGVUaW1lLCBhZnRlcjogRGF0ZVRpbWUsIHVuaXQ6ICdob3VycycgfCAnbWludXRlcycgPSAnbWludXRlcycpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodW5pdCA9PT0gJ2hvdXJzJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTYW1lT3JCZWZvcmUodGltZSwgYWZ0ZXIsIHVuaXQpICYmIGlzU2FtZU9yQWZ0ZXIodGltZSwgYmVmb3JlLCB1bml0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaXQgPT09ICdtaW51dGVzJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaXNTYW1lT3JCZWZvcmUodGltZSwgYWZ0ZXIpICYmIGlzU2FtZU9yQWZ0ZXIodGltZSwgYmVmb3JlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19