/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeFormatterPipe } from '../../pipes/time-formatter.pipe';
export class NgxMaterialTimepickerDialControlComponent {
    constructor() {
        this.timeUnitChanged = new EventEmitter();
        this.timeChanged = new EventEmitter();
        this.focused = new EventEmitter();
        this.unfocused = new EventEmitter();
    }
    /**
     * @private
     * @return {?}
     */
    get selectedTime() {
        if (!!this.time) {
            return this.timeList.find(t => t.time === +this.time);
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['time'] && (changes['time'].currentValue !== undefined)) {
            if (this.isEditable && !changes['time'].firstChange) {
                return;
            }
            this.time = new TimeFormatterPipe().transform(+changes['time'].currentValue, this.timeUnit);
        }
    }
    /**
     * @param {?} event
     * @param {?} unit
     * @return {?}
     */
    saveTimeAndChangeTimeUnit(event, unit) {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    }
    /**
     * @return {?}
     */
    updateTime() {
        /** @type {?} */
        const time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    }
    /**
     * @return {?}
     */
    formatTime() {
        if (this.isEditable) {
            /** @type {?} */
            const time = this.time || this.previousTime;
            this.time = new TimeFormatterPipe().transform(+time, this.timeUnit);
            this.unfocused.next();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeyDown(e) {
        /** @type {?} */
        const char = String.fromCharCode(e.keyCode);
        if ((!isInputAllowed(e)) || isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
        if (isInputAllowed(e)) {
            this.changeTimeByArrow(e.keyCode);
        }
    }
    /**
     * @private
     * @param {?} keyCode
     * @return {?}
     */
    changeTimeByArrow(keyCode) {
        /** @type {?} */
        const ARROW_UP = 38;
        /** @type {?} */
        const ARROW_DOWN = 40;
        /** @type {?} */
        let time;
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
    }
}
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
    if ([46, 8, 9, 27, 13].some(n => n === e.keyCode) ||
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
    const isNumber = /\d/.test(nextTime);
    if (isNumber) {
        /** @type {?} */
        const time = currentTime + nextTime;
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
    const selectedTime = timeList.find(value => value.time === +time);
    return !selectedTime || (selectedTime && selectedTime.disabled);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL2NvbXBvbmVudHMvdGltZXBpY2tlci1kaWFsLWNvbnRyb2wvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRWpHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU9wRSxNQUFNLE9BQU8seUNBQXlDO0lBTHREO1FBZ0JjLG9CQUFlLEdBQUcsSUFBSSxZQUFZLEVBQVksQ0FBQztRQUMvQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFpQixDQUFDO1FBQ2hELFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ25DLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0lBc0VuRCxDQUFDOzs7OztJQXBFRyxJQUFZLFlBQVk7UUFDcEIsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pEO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDOUIsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsWUFB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QUFPLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3hGLENBQUM7Ozs7Ozs7QUFFRCxTQUFTLHNCQUFzQixDQUFDLFdBQW1CLEVBQUUsUUFBZ0IsRUFBRSxRQUF5Qjs7VUFDdEYsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBRXBDLElBQUksUUFBUSxFQUFFOztjQUNKLElBQUksR0FBRyxXQUFXLEdBQUcsUUFBUTtRQUNuQyxPQUFPLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztLQUM1QztBQUNMLENBQUM7Ozs7OztBQUVELFNBQVMsaUJBQWlCLENBQUMsSUFBWSxFQUFFLFFBQXlCOztVQUN4RCxZQUFZLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDakUsT0FBTyxDQUFDLFlBQVksSUFBSSxDQUFDLFlBQVksSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOnRyaXBsZS1lcXVhbHMgKi9cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2Nsb2NrLWZhY2UtdGltZS5pbnRlcmZhY2UnO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4uLy4uL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IFRpbWVGb3JtYXR0ZXJQaXBlIH0gZnJvbSAnLi4vLi4vcGlwZXMvdGltZS1mb3JtYXR0ZXIucGlwZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZGlhbC1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWyduZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1kaWFsLWNvbnRyb2wuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRGlhbENvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG5cclxuICAgIHByZXZpb3VzVGltZTogbnVtYmVyIHwgc3RyaW5nO1xyXG5cclxuICAgIEBJbnB1dCgpIHRpbWVMaXN0OiBDbG9ja0ZhY2VUaW1lW107XHJcbiAgICBASW5wdXQoKSB0aW1lVW5pdDogVGltZVVuaXQ7XHJcbiAgICBASW5wdXQoKSB0aW1lOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIGlzRWRpdGFibGU6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBtaW51dGVzR2FwOiBudW1iZXI7XHJcblxyXG4gICAgQE91dHB1dCgpIHRpbWVVbml0Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGltZVVuaXQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPENsb2NrRmFjZVRpbWU+KCk7XHJcbiAgICBAT3V0cHV0KCkgZm9jdXNlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSB1bmZvY3VzZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgc2VsZWN0ZWRUaW1lKCk6IENsb2NrRmFjZVRpbWUge1xyXG4gICAgICAgIGlmICghIXRoaXMudGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aW1lTGlzdC5maW5kKHQgPT4gdC50aW1lID09PSArdGhpcy50aW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWyd0aW1lJ10gJiYgKGNoYW5nZXNbJ3RpbWUnXS5jdXJyZW50VmFsdWUgIT09IHVuZGVmaW5lZCkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFZGl0YWJsZSAmJiAhY2hhbmdlc1sndGltZSddLmZpcnN0Q2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy50aW1lID0gbmV3IFRpbWVGb3JtYXR0ZXJQaXBlKCkudHJhbnNmb3JtKCtjaGFuZ2VzWyd0aW1lJ10uY3VycmVudFZhbHVlLCB0aGlzLnRpbWVVbml0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVRpbWVBbmRDaGFuZ2VUaW1lVW5pdChldmVudDogRm9jdXNFdmVudCwgdW5pdDogVGltZVVuaXQpOiB2b2lkIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNUaW1lID0gdGhpcy50aW1lO1xyXG4gICAgICAgIHRoaXMudGltZVVuaXRDaGFuZ2VkLm5leHQodW5pdCk7XHJcbiAgICAgICAgdGhpcy5mb2N1c2VkLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcclxuICAgICAgICBpZiAodGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVDaGFuZ2VkLm5leHQodGltZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNUaW1lID0gdGltZS50aW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3JtYXRUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRWRpdGFibGUpIHtcclxuICAgICAgICAgICAgY29uc3QgdGltZSA9IHRoaXMudGltZSB8fCB0aGlzLnByZXZpb3VzVGltZTtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gbmV3IFRpbWVGb3JtYXR0ZXJQaXBlKCkudHJhbnNmb3JtKCt0aW1lLCB0aGlzLnRpbWVVbml0KTtcclxuICAgICAgICAgICAgdGhpcy51bmZvY3VzZWQubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbktleURvd24oZTogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSk7XHJcblxyXG5cclxuICAgICAgICBpZiAoKCFpc0lucHV0QWxsb3dlZChlKSkgfHwgaXNUaW1lRGlzYWJsZWRUb0NoYW5nZSh0aGlzLnRpbWUsIGNoYXIsIHRoaXMudGltZUxpc3QpKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0lucHV0QWxsb3dlZChlKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWVCeUFycm93KGUua2V5Q29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlVGltZUJ5QXJyb3coa2V5Q29kZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgQVJST1dfVVAgPSAzODtcclxuICAgICAgICBjb25zdCBBUlJPV19ET1dOID0gNDA7XHJcbiAgICAgICAgbGV0IHRpbWU6IHN0cmluZztcclxuXHJcbiAgICAgICAgaWYgKGtleUNvZGUgPT09IEFSUk9XX1VQKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBTdHJpbmcoK3RoaXMudGltZSArICh0aGlzLm1pbnV0ZXNHYXAgfHwgMSkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoa2V5Q29kZSA9PT0gQVJST1dfRE9XTikge1xyXG4gICAgICAgICAgICB0aW1lID0gU3RyaW5nKCt0aGlzLnRpbWUgLSAodGhpcy5taW51dGVzR2FwIHx8IDEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNUaW1lVW5hdmFpbGFibGUodGltZSwgdGhpcy50aW1lTGlzdCkpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lID0gdGltZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gaXNJbnB1dEFsbG93ZWQoZTogS2V5Ym9hcmRFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgLy8gQWxsb3c6IGJhY2tzcGFjZSwgZGVsZXRlLCB0YWIsIGVzY2FwZSwgZW50ZXJcclxuICAgIGlmIChbNDYsIDgsIDksIDI3LCAxM10uc29tZShuID0+IG4gPT09IGUua2V5Q29kZSkgfHxcclxuICAgICAgICAvLyBBbGxvdzogQ3RybC9jbWQrQVxyXG4gICAgICAgIChlLmtleUNvZGUgPT0gNjUgJiYgKGUuY3RybEtleSA9PT0gdHJ1ZSB8fCBlLm1ldGFLZXkgPT09IHRydWUpKSB8fFxyXG4gICAgICAgIC8vIEFsbG93OiBDdHJsL2NtZCtDXHJcbiAgICAgICAgKGUua2V5Q29kZSA9PSA2NyAmJiAoZS5jdHJsS2V5ID09PSB0cnVlIHx8IGUubWV0YUtleSA9PT0gdHJ1ZSkpIHx8XHJcbiAgICAgICAgLy8gQWxsb3c6IEN0cmwvY21kK1hcclxuICAgICAgICAoZS5rZXlDb2RlID09IDg4ICYmIChlLmN0cmxLZXkgPT09IHRydWUgfHwgZS5tZXRhS2V5ID09PSB0cnVlKSkgfHxcclxuICAgICAgICAvLyBBbGxvdzogaG9tZSwgZW5kLCBsZWZ0LCByaWdodCwgdXAsIGRvd25cclxuICAgICAgICAoZS5rZXlDb2RlID49IDM1ICYmIGUua2V5Q29kZSA8PSA0MCkpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gISgoZS5rZXlDb2RlIDwgNDggfHwgZS5rZXlDb2RlID4gNTcpICYmIChlLmtleUNvZGUgPCA5NiB8fCBlLmtleUNvZGUgPiAxMDUpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNUaW1lRGlzYWJsZWRUb0NoYW5nZShjdXJyZW50VGltZTogc3RyaW5nLCBuZXh0VGltZTogc3RyaW5nLCB0aW1lTGlzdDogQ2xvY2tGYWNlVGltZVtdKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBpc051bWJlciA9IC9cXGQvLnRlc3QobmV4dFRpbWUpO1xyXG5cclxuICAgIGlmIChpc051bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHRpbWUgPSBjdXJyZW50VGltZSArIG5leHRUaW1lO1xyXG4gICAgICAgIHJldHVybiBpc1RpbWVVbmF2YWlsYWJsZSh0aW1lLCB0aW1lTGlzdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVGltZVVuYXZhaWxhYmxlKHRpbWU6IHN0cmluZywgdGltZUxpc3Q6IENsb2NrRmFjZVRpbWVbXSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRUaW1lID0gdGltZUxpc3QuZmluZCh2YWx1ZSA9PiB2YWx1ZS50aW1lID09PSArdGltZSk7XHJcbiAgICByZXR1cm4gIXNlbGVjdGVkVGltZSB8fCAoc2VsZWN0ZWRUaW1lICYmIHNlbGVjdGVkVGltZS5kaXNhYmxlZCk7XHJcbn1cclxuIl19