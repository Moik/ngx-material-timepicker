/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var MinutesFormatterPipe = /** @class */ (function () {
    function MinutesFormatterPipe() {
    }
    /**
     * @param {?} minute
     * @param {?=} gap
     * @return {?}
     */
    MinutesFormatterPipe.prototype.transform = /**
     * @param {?} minute
     * @param {?=} gap
     * @return {?}
     */
    function (minute, gap) {
        if (gap === void 0) { gap = 5; }
        if (!minute) {
            return minute;
        }
        return minute % gap === 0 ? minute : '';
    };
    MinutesFormatterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'minutesFormatter'
                },] }
    ];
    return MinutesFormatterPipe;
}());
export { MinutesFormatterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludXRlcy1mb3JtYXR0ZXIucGlwZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3BpcGVzL21pbnV0ZXMtZm9ybWF0dGVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBRWxEO0lBQUE7SUFhQSxDQUFDOzs7Ozs7SUFSRyx3Q0FBUzs7Ozs7SUFBVCxVQUFVLE1BQWMsRUFBRSxHQUFPO1FBQVAsb0JBQUEsRUFBQSxPQUFPO1FBQzdCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPLE1BQU0sQ0FBQztTQUNqQjtRQUVELE9BQU8sTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVDLENBQUM7O2dCQVhKLElBQUksU0FBQztvQkFDRixJQUFJLEVBQUUsa0JBQWtCO2lCQUMzQjs7SUFXRCwyQkFBQztDQUFBLEFBYkQsSUFhQztTQVZZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAnbWludXRlc0Zvcm1hdHRlcidcclxufSlcclxuZXhwb3J0IGNsYXNzIE1pbnV0ZXNGb3JtYXR0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcblxyXG4gICAgdHJhbnNmb3JtKG1pbnV0ZTogbnVtYmVyLCBnYXAgPSA1KTogbnVtYmVyIHwgc3RyaW5nIHtcclxuICAgICAgICBpZiAoIW1pbnV0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWludXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1pbnV0ZSAlIGdhcCA9PT0gMCA/IG1pbnV0ZSA6ICcnO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=