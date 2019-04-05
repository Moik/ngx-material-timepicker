/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';
var TimeFormatterPipe = /** @class */ (function () {
    function TimeFormatterPipe() {
    }
    /**
     * @param {?} time
     * @param {?} timeUnit
     * @return {?}
     */
    TimeFormatterPipe.prototype.transform = /**
     * @param {?} time
     * @param {?} timeUnit
     * @return {?}
     */
    function (time, timeUnit) {
        if (time === undefined) {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return DateTime.fromObject({ hour: time }).toFormat('HH');
            case TimeUnit.MINUTE:
                return DateTime.fromObject({ minute: time }).toFormat('mm');
            default:
                throw new Error('no such time unit');
        }
    };
    TimeFormatterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'timeFormatter'
                },] }
    ];
    return TimeFormatterPipe;
}());
export { TimeFormatterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBRWpDO0lBQUE7SUFtQkEsQ0FBQzs7Ozs7O0lBZEcscUNBQVM7Ozs7O0lBQVQsVUFBVSxJQUFZLEVBQUUsUUFBa0I7UUFDdEMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxRQUFRLFFBQVEsRUFBRTtZQUNkLEtBQUssUUFBUSxDQUFDLElBQUk7Z0JBQ2QsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVELEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RDtnQkFDSSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDNUM7SUFDTCxDQUFDOztnQkFqQkosSUFBSSxTQUFDO29CQUNGLElBQUksRUFBRSxlQUFlO2lCQUN4Qjs7SUFpQkQsd0JBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQWhCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRpbWVVbml0IH0gZnJvbSAnLi4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndGltZUZvcm1hdHRlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVGb3JtYXR0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgdHJhbnNmb3JtKHRpbWU6IG51bWJlciwgdGltZVVuaXQ6IFRpbWVVbml0KTogYW55IHtcclxuICAgICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHRpbWVVbml0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuSE9VUjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBEYXRlVGltZS5mcm9tT2JqZWN0KHtob3VyOiB0aW1lfSkudG9Gb3JtYXQoJ0hIJyk7XHJcbiAgICAgICAgICAgIGNhc2UgVGltZVVuaXQuTUlOVVRFOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIERhdGVUaW1lLmZyb21PYmplY3Qoe21pbnV0ZTogdGltZX0pLnRvRm9ybWF0KCdtbScpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBzdWNoIHRpbWUgdW5pdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19