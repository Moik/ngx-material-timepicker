/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeFormatterPipe } from '../../pipes/time-formatter.pipe';
var NgxMaterialTimepickerDialControlComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialControlComponent() {
        this.timeUnitChanged = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.focused = new EventEmitter();
        this.unfocused = new EventEmitter();
    }
    Object.defineProperty(NgxMaterialTimepickerDialControlComponent.prototype, "selectedTime", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            if (!!this.time) {
                return this.timeList.find(function (t) { return t.time === +_this.time; });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['time'] && (changes['time'].currentValue !== undefined)) {
            if (this.isEditable && !changes['time'].firstChange) {
                return;
            }
            this.time = new TimeFormatterPipe().transform(+changes['time'].currentValue, this.timeUnit);
        }
    };
    /**
     * @param {?} event
     * @param {?} unit
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.saveTimeAndChangeTimeUnit = /**
     * @param {?} event
     * @param {?} unit
     * @return {?}
     */
    function (event, unit) {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.updateTime = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.formatTime = /**
     * @return {?}
     */
    function () {
        if (this.isEditable) {
            /** @type {?} */
            var time = this.time || this.previousTime;
            this.time = new TimeFormatterPipe().transform(+time, this.timeUnit);
            this.unfocused.next();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var char = String.fromCharCode(e.keyCode);
        if ((!isInputAllowed(e)) || isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
        if (isInputAllowed(e)) {
            this.changeTimeByArrow(e.keyCode);
        }
    };
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    NgxMaterialTimepickerDialControlComponent.prototype.changeTimeByArrow = /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    function (keyCode) {
        /** @type {?} */
        var ARROW_UP = 38;
        /** @type {?} */
        var ARROW_DOWN = 40;
        /** @type {?} */
        var time;
        if (keyCode === ARROW_UP) {
            time = String(+this.time + (this.minutesGap || 1));
        }
        else if (keyCode === ARROW_DOWN) {
            time = String(+this.time - (this.minutesGap || 1));
        }
        if (!isTimeUnavailable(time, this.timeList)) {
            this.time = time;
            this.updateTime();
        }
    };
    NgxMaterialTimepickerDialControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-dial-control',
                    template: "<!--suppress HtmlFormInputWithoutLabel -->\r\n<input class=\"timepicker-dial__control timepicker-dial__item\"\r\n       [ngClass]=\"{'timepicker-dial__item_active': isActive, 'timepicker-dial__control_editable': isEditable}\"\r\n       [(ngModel)]=\"time\" (input)=\"updateTime()\" (focus)=\"saveTimeAndChangeTimeUnit($event, timeUnit)\"\r\n       (blur)=\"formatTime()\" [readonly]=\"!isEditable\" [timepickerAutofocus]=\"isActive\" (keydown)=\"onKeyDown($event)\">\r\n",
                    styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-dial__control{border:none;background-color:transparent;font-size:50px;width:60px;padding:0;border-radius:3px}.timepicker-dial__control_editable:focus{color:#00bfff;background-color:#fff;outline:#00bfff}"]
                }] }
    ];
    NgxMaterialTimepickerDialControlComponent.propDecorators = {
        timeList: [{ type: Input }],
        timeUnit: [{ type: Input }],
        time: [{ type: Input }],
        isActive: [{ type: Input }],
        isEditable: [{ type: Input }],
        minutesGap: [{ type: Input }],
        timeUnitChanged: [{ type: Output }],
        timeChanged: [{ type: Output }],
        focused: [{ type: Output }],
        unfocused: [{ type: Output }]
    };
    return NgxMaterialTimepickerDialControlComponent;
}());
export { NgxMaterialTimepickerDialControlComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.previousTime;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeList;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.time;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.isActive;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.isEditable;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.minutesGap;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeUnitChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.timeChanged;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.focused;
    /** @type {?} */
    NgxMaterialTimepickerDialControlComponent.prototype.unfocused;
}
/**
 * @param {?} e
 * @return {?}
 */
function isInputAllowed(e) {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].some(function (n) { return n === e.keyCode; }) ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, up, down
        (e.keyCode >= 35 && e.keyCode <= 40)) {
        return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
}
/**
 * @param {?} currentTime
 * @param {?} nextTime
 * @param {?} timeList
 * @return {?}
 */
function isTimeDisabledToChange(currentTime, nextTime, timeList) {
    /** @type {?} */
    var isNumber = /\d/.test(nextTime);
    if (isNumber) {
        /** @type {?} */
        var time = currentTime + nextTime;
        return isTimeUnavailable(time, timeList);
    }
}
/**
 * @param {?} time
 * @param {?} timeList
 * @return {?}
 */
function isTimeUnavailable(time, timeList) {
    /** @type {?} */
    var selectedTime = timeList.find(function (value) { return value.time === +time; });
    return !selectedTime || (selectedTime && selectedTime.disabled);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUVwRTtJQUFBO1FBZ0JjLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ25DLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBc0VuRCxDQUFDO0lBcEVHLHNCQUFZLG1FQUFZOzs7OztRQUF4QjtZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUksQ0FBQyxJQUFJLEVBQXJCLENBQXFCLENBQUMsQ0FBQzthQUN6RDtRQUNMLENBQUM7OztPQUFBOzs7OztJQUVELCtEQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFD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QUFDLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQy9ELDBDQUEwQztRQUMxQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLEVBQUU7UUFFdEMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN4RixDQUFDOzs7Ozs7O0FBRUQsU0FBUyxzQkFBc0IsQ0FBQyxXQUFtQixFQUFFLFFBQWdCLEVBQUUsUUFBeUI7O1FBQ3RGLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUVwQyxJQUFJLFFBQVEsRUFBRTs7WUFDSixJQUFJLEdBQUcsV0FBVyxHQUFHLFFBQVE7UUFDbkMsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDNUM7QUFDTCxDQUFDOzs7Ozs7QUFFRCxTQUFTLGlCQUFpQixDQUFDLElBQVksRUFBRSxRQUF5Qjs7UUFDeEQsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDO0lBQ2pFLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTp0cmlwbGUtZXF1YWxzICovXHJcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5pbXBvcnQgeyBUaW1lRm9ybWF0dGVyUGlwZSB9IGZyb20gJy4uLy4uL3BpcGVzL3RpbWUtZm9ybWF0dGVyLnBpcGUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwtY29udHJvbCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyLWRpYWwtY29udHJvbC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckRpYWxDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBwcmV2aW91c1RpbWU6IG51bWJlciB8IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSB0aW1lTGlzdDogQ2xvY2tGYWNlVGltZVtdO1xyXG4gICAgQElucHV0KCkgdGltZVVuaXQ6IFRpbWVVbml0O1xyXG4gICAgQElucHV0KCkgdGltZTogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgaXNBY3RpdmU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBpc0VkaXRhYmxlOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgbWludXRlc0dhcDogbnVtYmVyO1xyXG5cclxuICAgIEBPdXRwdXQoKSB0aW1lVW5pdENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRpbWVVbml0PigpO1xyXG4gICAgQE91dHB1dCgpIHRpbWVDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjxDbG9ja0ZhY2VUaW1lPigpO1xyXG4gICAgQE91dHB1dCgpIGZvY3VzZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgdW5mb2N1c2VkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG5cclxuICAgIHByaXZhdGUgZ2V0IHNlbGVjdGVkVGltZSgpOiBDbG9ja0ZhY2VUaW1lIHtcclxuICAgICAgICBpZiAoISF0aGlzLnRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGltZUxpc3QuZmluZCh0ID0+IHQudGltZSA9PT0gK3RoaXMudGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1sndGltZSddICYmIChjaGFuZ2VzWyd0aW1lJ10uY3VycmVudFZhbHVlICE9PSB1bmRlZmluZWQpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRWRpdGFibGUgJiYgIWNoYW5nZXNbJ3RpbWUnXS5maXJzdENoYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IG5ldyBUaW1lRm9ybWF0dGVyUGlwZSgpLnRyYW5zZm9ybSgrY2hhbmdlc1sndGltZSddLmN1cnJlbnRWYWx1ZSwgdGhpcy50aW1lVW5pdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNhdmVUaW1lQW5kQ2hhbmdlVGltZVVuaXQoZXZlbnQ6IEZvY3VzRXZlbnQsIHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLnByZXZpb3VzVGltZSA9IHRoaXMudGltZTtcclxuICAgICAgICB0aGlzLnRpbWVVbml0Q2hhbmdlZC5uZXh0KHVuaXQpO1xyXG4gICAgICAgIHRoaXMuZm9jdXNlZC5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5zZWxlY3RlZFRpbWU7XHJcbiAgICAgICAgaWYgKHRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlZC5uZXh0KHRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzVGltZSA9IHRpbWUudGltZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybWF0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VkaXRhYmxlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWUgfHwgdGhpcy5wcmV2aW91c1RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IG5ldyBUaW1lRm9ybWF0dGVyUGlwZSgpLnRyYW5zZm9ybSgrdGltZSwgdGhpcy50aW1lVW5pdCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5mb2N1c2VkLm5leHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25LZXlEb3duKGU6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLmtleUNvZGUpO1xyXG5cclxuXHJcbiAgICAgICAgaWYgKCghaXNJbnB1dEFsbG93ZWQoZSkpIHx8IGlzVGltZURpc2FibGVkVG9DaGFuZ2UodGhpcy50aW1lLCBjaGFyLCB0aGlzLnRpbWVMaXN0KSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNJbnB1dEFsbG93ZWQoZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lQnlBcnJvdyhlLmtleUNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVRpbWVCeUFycm93KGtleUNvZGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IEFSUk9XX1VQID0gMzg7XHJcbiAgICAgICAgY29uc3QgQVJST1dfRE9XTiA9IDQwO1xyXG4gICAgICAgIGxldCB0aW1lOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmIChrZXlDb2RlID09PSBBUlJPV19VUCkge1xyXG4gICAgICAgICAgICB0aW1lID0gU3RyaW5nKCt0aGlzLnRpbWUgKyAodGhpcy5taW51dGVzR2FwIHx8IDEpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGtleUNvZGUgPT09IEFSUk9XX0RPV04pIHtcclxuICAgICAgICAgICAgdGltZSA9IFN0cmluZygrdGhpcy50aW1lIC0gKHRoaXMubWludXRlc0dhcCB8fCAxKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzVGltZVVuYXZhaWxhYmxlKHRpbWUsIHRoaXMudGltZUxpc3QpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5wdXRBbGxvd2VkKGU6IEtleWJvYXJkRXZlbnQpOiBib29sZWFuIHtcclxuICAgIC8vIEFsbG93OiBiYWNrc3BhY2UsIGRlbGV0ZSwgdGFiLCBlc2NhcGUsIGVudGVyXHJcbiAgICBpZiAoWzQ2LCA4LCA5LCAyNywgMTNdLnNvbWUobiA9PiBuID09PSBlLmtleUNvZGUpIHx8XHJcbiAgICAgICAgLy8gQWxsb3c6IEN0cmwvY21kK0FcclxuICAgICAgICAoZS5rZXlDb2RlID09IDY1ICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKSkgfHxcclxuICAgICAgICAvLyBBbGxvdzogQ3RybC9jbWQrQ1xyXG4gICAgICAgIChlLmtleUNvZGUgPT0gNjcgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpKSB8fFxyXG4gICAgICAgIC8vIEFsbG93OiBDdHJsL2NtZCtYXHJcbiAgICAgICAgKGUua2V5Q29kZSA9PSA4OCAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSkpIHx8XHJcbiAgICAgICAgLy8gQWxsb3c6IGhvbWUsIGVuZCwgbGVmdCwgcmlnaHQsIHVwLCBkb3duXHJcbiAgICAgICAgKGUua2V5Q29kZSA+PSAzNSAmJiBlLmtleUNvZGUgPD0gNDApKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICEoKGUua2V5Q29kZSA8IDQ4IHx8IGUua2V5Q29kZSA+IDU3KSAmJiAoZS5rZXlDb2RlIDwgOTYgfHwgZS5rZXlDb2RlID4gMTA1KSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVGltZURpc2FibGVkVG9DaGFuZ2UoY3VycmVudFRpbWU6IHN0cmluZywgbmV4dFRpbWU6IHN0cmluZywgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaXNOdW1iZXIgPSAvXFxkLy50ZXN0KG5leHRUaW1lKTtcclxuXHJcbiAgICBpZiAoaXNOdW1iZXIpIHtcclxuICAgICAgICBjb25zdCB0aW1lID0gY3VycmVudFRpbWUgKyBuZXh0VGltZTtcclxuICAgICAgICByZXR1cm4gaXNUaW1lVW5hdmFpbGFibGUodGltZSwgdGltZUxpc3QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lOiBzdHJpbmcsIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW10pOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHNlbGVjdGVkVGltZSA9IHRpbWVMaXN0LmZpbmQodmFsdWUgPT4gdmFsdWUudGltZSA9PT0gK3RpbWUpO1xyXG4gICAgcmV0dXJuICFzZWxlY3RlZFRpbWUgfHwgKHNlbGVjdGVkVGltZSAmJiBzZWxlY3RlZFRpbWUuZGlzYWJsZWQpO1xyXG59XHJcbiJdfQ==