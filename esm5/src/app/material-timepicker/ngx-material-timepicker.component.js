/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { merge } from 'rxjs';
import { NgxMaterialTimepickerService } from './services/ngx-material-timepicker.service';
import { TimeUnit } from './models/time-unit.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxMaterialTimepickerEventService } from './services/ngx-material-timepicker-event.service';
import { filter } from 'rxjs/operators';
/** @enum {string} */
var AnimationState = {
    ENTER: 'enter',
    LEAVE: 'leave',
};
export { AnimationState };
/** @type {?} */
var ESCAPE = 27;
var NgxMaterialTimepickerComponent = /** @class */ (function () {
    function NgxMaterialTimepickerComponent(timepickerService, eventService) {
        var _this = this;
        this.timepickerService = timepickerService;
        this.eventService = eventService;
        this.timeUnit = TimeUnit;
        this.activeTimeUnit = TimeUnit.HOUR;
        this.isOpened = false;
        this.isEsc = true;
        this.timeSet = new EventEmitter();
        this.opened = new EventEmitter();
        this.closed = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.subscriptions = [];
        this.subscriptions.push(merge(this.eventService.backdropClick, this.eventService.keydownEvent.pipe(filter(function (e) { return e.keyCode === ESCAPE && _this.isEsc; })))
            .subscribe(function () { return _this.close(); }));
    }
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minutesGap", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minutesGap;
        },
        set: /**
         * @param {?} gap
         * @return {?}
         */
        function (gap) {
            if (gap == null) {
                return;
            }
            gap = Math.floor(gap);
            this._minutesGap = gap <= 59 ? gap : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "defaultTime", {
        set: /**
         * @param {?} time
         * @return {?}
         */
        function (time) {
            this.setDefaultTime(time);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "minTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this.timepickerInput && this.timepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "maxTime", {
        get: /**
         * @return {?}
         */
        function () {
            return this.timepickerInput && this.timepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this.timepickerInput && this.timepickerInput.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerComponent.prototype, "format", {
        get: /**
         * @return {?}
         */
        function () {
            return this.timepickerInput && this.timepickerInput.format;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscriptions.push(this.timepickerService.selectedHour
            .subscribe(function (hour) { return _this.selectedHour = hour; }));
        this.subscriptions.push(this.timepickerService.selectedMinute
            .subscribe(function (minute) { return _this.selectedMinute = minute; }));
        this.subscriptions.push(this.timepickerService.selectedPeriod
            .subscribe(function (period) { return _this.selectedPeriod = period; }));
    };
    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    /**
     *
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     * @param {?} input
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.registerInput = /**
     *
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     * @param {?} input
     * @return {?}
     */
    function (input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.onHourChange = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        this.timepickerService.hour = hour;
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.onHourSelected = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        this.changeTimeUnit(TimeUnit.MINUTE);
        this.hourSelected.next(hour);
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.onMinuteChange = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        this.timepickerService.minute = minute;
    };
    /**
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.changePeriod = /**
     * @param {?} period
     * @return {?}
     */
    function (period) {
        this.timepickerService.period = period;
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.changeTimeUnit = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.activeTimeUnit = unit;
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.setTime = /**
     * @return {?}
     */
    function () {
        this.timeSet.next(this.timepickerService.getFullTime(this.format));
        this.close();
    };
    /**
     * @param {?} time
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.setDefaultTime = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.timepickerService.setDefaultTimeIfAvailable(time, (/** @type {?} */ (this.minTime)), (/** @type {?} */ (this.maxTime)), this.format, this.minutesGap);
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.open = /**
     * @return {?}
     */
    function () {
        this.isOpened = true;
        this.animationState = AnimationState.ENTER;
        this.opened.next();
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.close = /**
     * @return {?}
     */
    function () {
        this.animationState = AnimationState.LEAVE;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.animationDone = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.isOpened = false;
            this.activeTimeUnit = TimeUnit.HOUR;
            this.closed.next();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.onKeydown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.eventService.dispatchEvent(e);
        e.stopPropagation();
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    NgxMaterialTimepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker',
                    template: "<div class=\"timepicker-backdrop-overlay\" *ngIf=\"isOpened\" [overlay]=\"preventOverlayClick\"></div>\r\n<div class=\"timepicker-overlay\" *ngIf=\"isOpened\">\r\n    <div class=\"timepicker\" [@timepicker]=\"animationState\" (@timepicker.done)=\"animationDone($event)\" #timepicker>\r\n        <header class=\"timepicker__header\">\r\n            <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"selectedHour?.time\"\r\n                                          [minute]=\"selectedMinute?.time\"\r\n                                          [period]=\"selectedPeriod\" [activeTimeUnit]=\"activeTimeUnit\"\r\n                                          [minTime]=\"minTime\" [maxTime]=\"maxTime\"\r\n                                          [isEditable]=\"enableKeyboardInput\"\r\n                                          [editableHintTmpl]=\"editableHintTmpl\"\r\n                                          [minutesGap]=\"minutesGap\"\r\n                                          (periodChanged)=\"changePeriod($event)\"\r\n                                          (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                          (hourChanged)=\"onHourChange($event)\"\r\n                                          (minuteChanged)=\"onMinuteChange($event)\"\r\n            ></ngx-material-timepicker-dial>\r\n        </header>\r\n        <div class=\"timepicker__main-content\">\r\n            <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\r\n                <div *ngSwitchCase=\"timeUnit.HOUR\">\r\n                    <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\r\n                                                           (hourChange)=\"onHourChange($event)\"\r\n                                                           [selectedHour]=\"selectedHour\"\r\n                                                           [minTime]=\"minTime\"\r\n                                                           [maxTime]=\"maxTime\"\r\n                                                           [format]=\"format\"\r\n                                                           (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\r\n                    <ng-template #ampmHours>\r\n                        <ngx-material-timepicker-12-hours-face\r\n                            (hourChange)=\"onHourChange($event)\"\r\n                            [selectedHour]=\"selectedHour\"\r\n                            [period]=\"selectedPeriod\"\r\n                            [minTime]=\"minTime\"\r\n                            [maxTime]=\"maxTime\"\r\n                            (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\r\n                    </ng-template>\r\n                </div>\r\n                <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\r\n                                                      [selectedMinute]=\"selectedMinute\"\r\n                                                      [selectedHour]=\"selectedHour?.time\"\r\n                                                      [minTime]=\"minTime\"\r\n                                                      [maxTime]=\"maxTime\"\r\n                                                      [format]=\"format\"\r\n                                                      [period]=\"selectedPeriod\"\r\n                                                      [minutesGap]=\"minutesGap\"\r\n                                                      (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\r\n            </div>\r\n            <div class=\"timepicker__actions\">\r\n                <div (click)=\"close()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\r\n                </div>\r\n                <div (click)=\"setTime()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container\r\n                        *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ng-template #cancelBtnDefault>\r\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\r\n</ng-template>\r\n<ng-template #confirmBtnDefault>\r\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\r\n</ng-template>\r\n",
                    animations: [
                        trigger('timepicker', [
                            transition("* => " + AnimationState.ENTER, [
                                style({ transform: 'translateY(-30%)' }),
                                animate('0.2s ease-out', style({ transform: 'translateY(0)' }))
                            ]),
                            transition(AnimationState.ENTER + " => " + AnimationState.LEAVE, [
                                style({ transform: 'translateY(0)', opacity: 1 }),
                                animate('0.2s ease-out', style({ transform: 'translateY(-30%)', opacity: 0 }))
                            ])
                        ])
                    ],
                    providers: [NgxMaterialTimepickerService],
                    styles: [":host{--body-background-color:#fff;--primary-font-family:'Roboto',sans-serif;--button-color:deepskyblue;--dial-active-color:#fff;--dial-inactive-color:rgba(255, 255, 255, .5);--dial-background-color:deepskyblue;--clock-face-time-active-color:#fff;--clock-face-time-inactive-color:#6c6c6c;--clock-face-inner-time-inactive-color:#929292;--clock-face-time-disabled-color:#c5c5c5;--clock-face-background-color:#f0f0f0;--clock-hand-color:deepskyblue}.timepicker-backdrop-overlay{position:fixed;top:0;bottom:0;right:0;left:0;background-color:rgba(0,0,0,.3);z-index:999;pointer-events:auto}.timepicker-overlay{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:999;pointer-events:none}.timepicker{width:300px;border-radius:2px;box-shadow:rgba(0,0,0,.25) 0 14px 45px,rgba(0,0,0,.22) 0 10px 18px;outline:0;position:static;z-index:999;pointer-events:auto}.timepicker__header{padding:15px 30px;background-color:#00bfff}@supports (background-color:var(--dial-background-color)){.timepicker__header{background-color:var(--dial-background-color)}}.timepicker__body{padding:15px 5px;display:flex;justify-content:center;align-items:center;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__body{background-color:var(--body-background-color)}}.timepicker__actions{display:flex;justify-content:flex-end;padding:15px;background-color:#fff}@supports (background-color:var(--body-background-color)){.timepicker__actions{background-color:var(--body-background-color)}}@media (max-device-width:1023px) and (orientation:landscape){.timepicker{display:flex;width:515px}.timepicker__header{display:flex;align-items:center}.timepicker__main-content{display:flex;flex-direction:column;width:100%}.timepicker__actions{padding:5px;margin-top:-1px}}"]
                }] }
    ];
    /** @nocollapse */
    NgxMaterialTimepickerComponent.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerService },
        { type: NgxMaterialTimepickerEventService }
    ]; };
    NgxMaterialTimepickerComponent.propDecorators = {
        cancelBtnTmpl: [{ type: Input }],
        editableHintTmpl: [{ type: Input }],
        confirmBtnTmpl: [{ type: Input }],
        isEsc: [{ type: Input, args: ['ESC',] }],
        enableKeyboardInput: [{ type: Input }],
        preventOverlayClick: [{ type: Input }],
        minutesGap: [{ type: Input }],
        defaultTime: [{ type: Input }],
        timeSet: [{ type: Output }],
        opened: [{ type: Output }],
        closed: [{ type: Output }],
        hourSelected: [{ type: Output }],
        timepickerComponent: [{ type: ViewChild, args: ['timepickerww',] }],
        onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return NgxMaterialTimepickerComponent;
}());
export { NgxMaterialTimepickerComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.selectedHour;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.selectedMinute;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.selectedPeriod;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.activeTimeUnit;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.isOpened;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.animationState;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.cancelBtnTmpl;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.editableHintTmpl;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.confirmBtnTmpl;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.isEsc;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.enableKeyboardInput;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.preventOverlayClick;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.timeSet;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.opened;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.closed;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.hourSelected;
    /** @type {?} */
    NgxMaterialTimepickerComponent.prototype.timepickerComponent;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype._minutesGap;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.timepickerInput;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.subscriptions;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.timepickerService;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerComponent.prototype.eventService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUksT0FBTyxFQUFFLEtBQUssRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQWtCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDckcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7SUFLcEMsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOzs7O0lBSWIsTUFBTSxHQUFHLEVBQUU7QUFFakI7SUFrRUksd0NBQW9CLGlCQUErQyxFQUMvQyxZQUErQztRQURuRSxpQkFPQztRQVBtQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQThCO1FBQy9DLGlCQUFZLEdBQVosWUFBWSxDQUFtQztRQTNDbkUsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQUNwQixtQkFBYyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFL0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU1ILFVBQUssR0FBRyxJQUFJLENBQUM7UUFzQmpC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SUFDMUMsMERBQTZDOztJQUM3Qyx3REFBMkM7O0lBQzNDLCtDQUEyQjs7SUFDM0IsNkRBQXNDOztJQUN0Qyw2REFBc0M7O0lBb0J0QyxpREFBK0M7O0lBQy9DLGdEQUE0Qzs7SUFDNUMsZ0RBQTRDOztJQUM1QyxzREFBb0Q7O0lBRXBELDZEQUEyRDs7Ozs7SUFFM0QscURBQTRCOzs7OztJQUM1Qix5REFBNkM7Ozs7O0lBQzdDLHVEQUEyQzs7Ozs7SUFFL0IsMkRBQXVEOzs7OztJQUN2RCxzREFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDbG9ja0ZhY2VUaW1lIH0gZnJvbSAnLi9tb2RlbHMvY2xvY2stZmFjZS10aW1lLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IFRpbWVQZXJpb2QgfSBmcm9tICcuL21vZGVscy90aW1lLXBlcmlvZC5lbnVtJztcclxuaW1wb3J0IHsgbWVyZ2UsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuL21vZGVscy90aW1lLXVuaXQuZW51bSc7XHJcbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJFdmVudFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWV2ZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcblxyXG5leHBvcnQgZW51bSBBbmltYXRpb25TdGF0ZSB7XHJcbiAgICBFTlRFUiA9ICdlbnRlcicsXHJcbiAgICBMRUFWRSA9ICdsZWF2ZSdcclxufVxyXG5cclxuXHJcbmNvbnN0IEVTQ0FQRSA9IDI3O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1tYXRlcmlhbC10aW1lcGlja2VyJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxyXG4gICAgYW5pbWF0aW9uczogW1xyXG4gICAgICAgIHRyaWdnZXIoJ3RpbWVwaWNrZXInLCBbXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oYCogPT4gJHtBbmltYXRpb25TdGF0ZS5FTlRFUn1gLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMzAlKSd9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZS1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKSd9KSlcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oYCR7QW5pbWF0aW9uU3RhdGUuRU5URVJ9ID0+ICR7QW5pbWF0aW9uU3RhdGUuTEVBVkV9YCwgW1xyXG4gICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLCBvcGFjaXR5OiAxfSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKCcwLjJzIGVhc2Utb3V0Jywgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTMwJSknLCBvcGFjaXR5OiAwfSkpXHJcbiAgICAgICAgICAgIF0pXHJcbiAgICAgICAgXSlcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIHNlbGVjdGVkSG91cjogQ2xvY2tGYWNlVGltZTtcclxuICAgIHNlbGVjdGVkTWludXRlOiBDbG9ja0ZhY2VUaW1lO1xyXG4gICAgc2VsZWN0ZWRQZXJpb2Q6IFRpbWVQZXJpb2Q7XHJcblxyXG4gICAgdGltZVVuaXQgPSBUaW1lVW5pdDtcclxuICAgIGFjdGl2ZVRpbWVVbml0ID0gVGltZVVuaXQuSE9VUjtcclxuXHJcbiAgICBpc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlO1xyXG5cclxuICAgIEBJbnB1dCgpIGNhbmNlbEJ0blRtcGw6IFRlbXBsYXRlUmVmPE5vZGU+O1xyXG4gICAgQElucHV0KCkgZWRpdGFibGVIaW50VG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoKSBjb25maXJtQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoJ0VTQycpIGlzRXNjID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGVuYWJsZUtleWJvYXJkSW5wdXQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBwcmV2ZW50T3ZlcmxheUNsaWNrOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgbWludXRlc0dhcChnYXA6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChnYXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdhcCA9IE1hdGguZmxvb3IoZ2FwKTtcclxuICAgICAgICB0aGlzLl9taW51dGVzR2FwID0gZ2FwIDw9IDU5ID8gZ2FwIDogMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWludXRlc0dhcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW51dGVzR2FwO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgZGVmYXVsdFRpbWUodGltZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0VGltZSh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgdGltZVNldCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gICAgQE91dHB1dCgpIG9wZW5lZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBjbG9zZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bGw+KCk7XHJcbiAgICBAT3V0cHV0KCkgaG91clNlbGVjdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgndGltZXBpY2tlcnd3JykgdGltZXBpY2tlckNvbXBvbmVudDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBwcml2YXRlIF9taW51dGVzR2FwOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHRpbWVwaWNrZXJJbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZTtcclxuICAgIHByaXZhdGUgc3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRpbWVwaWNrZXJTZXJ2aWNlOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBldmVudFNlcnZpY2U6IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChtZXJnZSh0aGlzLmV2ZW50U2VydmljZS5iYWNrZHJvcENsaWNrLFxyXG4gICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5rZXlkb3duRXZlbnQucGlwZShmaWx0ZXIoZSA9PiBlLmtleUNvZGUgPT09IEVTQ0FQRSAmJiB0aGlzLmlzRXNjKSkpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW5UaW1lKCk6IHN0cmluZyB8IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQubWluO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXhUaW1lKCk6IHN0cmluZyB8IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQubWF4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50aW1lcGlja2VySW5wdXQgJiYgdGhpcy50aW1lcGlja2VySW5wdXQuZGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZvcm1hdCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5mb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZEhvdXJcclxuICAgICAgICAgICAgLnN1YnNjcmliZShob3VyID0+IHRoaXMuc2VsZWN0ZWRIb3VyID0gaG91cikpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkTWludXRlXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUobWludXRlID0+IHRoaXMuc2VsZWN0ZWRNaW51dGUgPSBtaW51dGUpKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2godGhpcy50aW1lcGlja2VyU2VydmljZS5zZWxlY3RlZFBlcmlvZFxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHBlcmlvZCA9PiB0aGlzLnNlbGVjdGVkUGVyaW9kID0gcGVyaW9kKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKlxyXG4gICAgICogUmVnaXN0ZXIgYW4gaW5wdXQgd2l0aCB0aGlzIHRpbWVwaWNrZXIuXHJcbiAgICAgKiBpbnB1dCAtIFRoZSB0aW1lcGlja2VyIGlucHV0IHRvIHJlZ2lzdGVyIHdpdGggdGhpcyB0aW1lcGlja2VyXHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVySW5wdXQoaW5wdXQ6IFRpbWVwaWNrZXJEaXJlY3RpdmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lcGlja2VySW5wdXQpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0EgVGltZXBpY2tlciBjYW4gb25seSBiZSBhc3NvY2lhdGVkIHdpdGggYSBzaW5nbGUgaW5wdXQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGltZXBpY2tlcklucHV0ID0gaW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ib3VyQ2hhbmdlKGhvdXI6IENsb2NrRmFjZVRpbWUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLmhvdXIgPSBob3VyO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSG91clNlbGVjdGVkKGhvdXI6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZVVuaXQoVGltZVVuaXQuTUlOVVRFKTtcclxuICAgICAgICB0aGlzLmhvdXJTZWxlY3RlZC5uZXh0KGhvdXIpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTWludXRlQ2hhbmdlKG1pbnV0ZTogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UubWludXRlID0gbWludXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBlcmlvZChwZXJpb2Q6IFRpbWVQZXJpb2QpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnBlcmlvZCA9IHBlcmlvZDtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VUaW1lVW5pdCh1bml0OiBUaW1lVW5pdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlVGltZVVuaXQgPSB1bml0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lU2V0Lm5leHQodGhpcy50aW1lcGlja2VyU2VydmljZS5nZXRGdWxsVGltZSh0aGlzLmZvcm1hdCkpO1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXREZWZhdWx0VGltZSh0aW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNldERlZmF1bHRUaW1lSWZBdmFpbGFibGUoXHJcbiAgICAgICAgICAgIHRpbWUsIHRoaXMubWluVGltZSBhcyBEYXRlVGltZSwgdGhpcy5tYXhUaW1lIGFzIERhdGVUaW1lLCB0aGlzLmZvcm1hdCwgdGhpcy5taW51dGVzR2FwKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaXNPcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSBBbmltYXRpb25TdGF0ZS5FTlRFUjtcclxuICAgICAgICB0aGlzLm9wZW5lZC5uZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IEFuaW1hdGlvblN0YXRlLkxFQVZFO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGlvbkRvbmUoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnBoYXNlTmFtZSA9PT0gJ2RvbmUnICYmIGV2ZW50LnRvU3RhdGUgPT09IEFuaW1hdGlvblN0YXRlLkxFQVZFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPcGVuZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmVUaW1lVW5pdCA9IFRpbWVVbml0LkhPVVI7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VkLm5leHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgICBvbktleWRvd24oZTogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoRXZlbnQoZSk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMuZm9yRWFjaChzdWJzY3JpcHRpb24gPT4gc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==