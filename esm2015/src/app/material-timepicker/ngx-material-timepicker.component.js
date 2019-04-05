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
const AnimationState = {
    ENTER: 'enter',
    LEAVE: 'leave',
};
export { AnimationState };
/** @type {?} */
const ESCAPE = 27;
export class NgxMaterialTimepickerComponent {
    /**
     * @param {?} timepickerService
     * @param {?} eventService
     */
    constructor(timepickerService, eventService) {
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
        this.subscriptions.push(merge(this.eventService.backdropClick, this.eventService.keydownEvent.pipe(filter(e => e.keyCode === ESCAPE && this.isEsc)))
            .subscribe(() => this.close()));
    }
    /**
     * @param {?} gap
     * @return {?}
     */
    set minutesGap(gap) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }
    /**
     * @return {?}
     */
    get minutesGap() {
        return this._minutesGap;
    }
    /**
     * @param {?} time
     * @return {?}
     */
    set defaultTime(time) {
        this.setDefaultTime(time);
    }
    /**
     * @return {?}
     */
    get minTime() {
        return this.timepickerInput && this.timepickerInput.min;
    }
    /**
     * @return {?}
     */
    get maxTime() {
        return this.timepickerInput && this.timepickerInput.max;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.timepickerInput && this.timepickerInput.disabled;
    }
    /**
     * @return {?}
     */
    get format() {
        return this.timepickerInput && this.timepickerInput.format;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscriptions.push(this.timepickerService.selectedHour
            .subscribe(hour => this.selectedHour = hour));
        this.subscriptions.push(this.timepickerService.selectedMinute
            .subscribe(minute => this.selectedMinute = minute));
        this.subscriptions.push(this.timepickerService.selectedPeriod
            .subscribe(period => this.selectedPeriod = period));
    }
    /**
     *
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     * @param {?} input
     * @return {?}
     */
    registerInput(input) {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    onHourChange(hour) {
        this.timepickerService.hour = hour;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    onHourSelected(hour) {
        this.changeTimeUnit(TimeUnit.MINUTE);
        this.hourSelected.next(hour);
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    onMinuteChange(minute) {
        this.timepickerService.minute = minute;
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.timepickerService.period = period;
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    changeTimeUnit(unit) {
        this.activeTimeUnit = unit;
    }
    /**
     * @return {?}
     */
    setTime() {
        this.timeSet.next(this.timepickerService.getFullTime(this.format));
        this.close();
    }
    /**
     * @param {?} time
     * @return {?}
     */
    setDefaultTime(time) {
        this.timepickerService.setDefaultTimeIfAvailable(time, (/** @type {?} */ (this.minTime)), (/** @type {?} */ (this.maxTime)), this.format, this.minutesGap);
    }
    /**
     * @return {?}
     */
    open() {
        this.isOpened = true;
        this.animationState = AnimationState.ENTER;
        this.opened.next();
    }
    /**
     * @return {?}
     */
    close() {
        this.animationState = AnimationState.LEAVE;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    animationDone(event) {
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.isOpened = false;
            this.activeTimeUnit = TimeUnit.HOUR;
            this.closed.next();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeydown(e) {
        this.eventService.dispatchEvent(e);
        e.stopPropagation();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
NgxMaterialTimepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker',
                template: "<div class=\"timepicker-backdrop-overlay\" *ngIf=\"isOpened\" [overlay]=\"preventOverlayClick\"></div>\r\n<div class=\"timepicker-overlay\" *ngIf=\"isOpened\">\r\n    <div class=\"timepicker\" [@timepicker]=\"animationState\" (@timepicker.done)=\"animationDone($event)\" #timepicker>\r\n        <header class=\"timepicker__header\">\r\n            <ngx-material-timepicker-dial [format]=\"format\" [hour]=\"selectedHour?.time\"\r\n                                          [minute]=\"selectedMinute?.time\"\r\n                                          [period]=\"selectedPeriod\" [activeTimeUnit]=\"activeTimeUnit\"\r\n                                          [minTime]=\"minTime\" [maxTime]=\"maxTime\"\r\n                                          [isEditable]=\"enableKeyboardInput\"\r\n                                          [editableHintTmpl]=\"editableHintTmpl\"\r\n                                          [minutesGap]=\"minutesGap\"\r\n                                          (periodChanged)=\"changePeriod($event)\"\r\n                                          (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                          (hourChanged)=\"onHourChange($event)\"\r\n                                          (minuteChanged)=\"onMinuteChange($event)\"\r\n            ></ngx-material-timepicker-dial>\r\n        </header>\r\n        <div class=\"timepicker__main-content\">\r\n            <div class=\"timepicker__body\" [ngSwitch]=\"activeTimeUnit\">\r\n                <div *ngSwitchCase=\"timeUnit.HOUR\">\r\n                    <ngx-material-timepicker-24-hours-face *ngIf=\"format === 24;else ampmHours\"\r\n                                                           (hourChange)=\"onHourChange($event)\"\r\n                                                           [selectedHour]=\"selectedHour\"\r\n                                                           [minTime]=\"minTime\"\r\n                                                           [maxTime]=\"maxTime\"\r\n                                                           [format]=\"format\"\r\n                                                           (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-24-hours-face>\r\n                    <ng-template #ampmHours>\r\n                        <ngx-material-timepicker-12-hours-face\r\n                            (hourChange)=\"onHourChange($event)\"\r\n                            [selectedHour]=\"selectedHour\"\r\n                            [period]=\"selectedPeriod\"\r\n                            [minTime]=\"minTime\"\r\n                            [maxTime]=\"maxTime\"\r\n                            (hourSelected)=\"onHourSelected($event)\"></ngx-material-timepicker-12-hours-face>\r\n                    </ng-template>\r\n                </div>\r\n                <ngx-material-timepicker-minutes-face *ngSwitchCase=\"timeUnit.MINUTE\"\r\n                                                      [selectedMinute]=\"selectedMinute\"\r\n                                                      [selectedHour]=\"selectedHour?.time\"\r\n                                                      [minTime]=\"minTime\"\r\n                                                      [maxTime]=\"maxTime\"\r\n                                                      [format]=\"format\"\r\n                                                      [period]=\"selectedPeriod\"\r\n                                                      [minutesGap]=\"minutesGap\"\r\n                                                      (minuteChange)=\"onMinuteChange($event)\"></ngx-material-timepicker-minutes-face>\r\n            </div>\r\n            <div class=\"timepicker__actions\">\r\n                <div (click)=\"close()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container *ngTemplateOutlet=\"cancelBtnTmpl ? cancelBtnTmpl : cancelBtnDefault\"></ng-container>\r\n                </div>\r\n                <div (click)=\"setTime()\">\r\n                    <!--suppress HtmlUnknownAttribute -->\r\n                    <ng-container\r\n                        *ngTemplateOutlet=\"confirmBtnTmpl ? confirmBtnTmpl : confirmBtnDefault\"></ng-container>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<ng-template #cancelBtnDefault>\r\n    <ngx-material-timepicker-button>Cancel</ngx-material-timepicker-button>\r\n</ng-template>\r\n<ng-template #confirmBtnDefault>\r\n    <ngx-material-timepicker-button>Ok</ngx-material-timepicker-button>\r\n</ng-template>\r\n",
                animations: [
                    trigger('timepicker', [
                        transition(`* => ${AnimationState.ENTER}`, [
                            style({ transform: 'translateY(-30%)' }),
                            animate('0.2s ease-out', style({ transform: 'translateY(0)' }))
                        ]),
                        transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [
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
NgxMaterialTimepickerComponent.ctorParameters = () => [
    { type: NgxMaterialTimepickerService },
    { type: NgxMaterialTimepickerEventService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHNUksT0FBTyxFQUFFLEtBQUssRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQWtCLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUYsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDckcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7SUFLcEMsT0FBUSxPQUFPO0lBQ2YsT0FBUSxPQUFPOzs7O01BSWIsTUFBTSxHQUFHLEVBQUU7QUFvQmpCLE1BQU0sT0FBTyw4QkFBOEI7Ozs7O0lBZ0R2QyxZQUFvQixpQkFBK0MsRUFDL0MsWUFBK0M7UUFEL0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE4QjtRQUMvQyxpQkFBWSxHQUFaLFlBQVksQ0FBbUM7UUEzQ25FLGFBQVEsR0FBRyxRQUFRLENBQUM7UUFDcEIsbUJBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRS9CLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFNSCxVQUFLLEdBQUcsSUFBSSxDQUFDO1FBc0JqQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNyQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNsQyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUNsQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFNNUMsa0JBQWEsR0FBbUIsRUFBRSxDQUFDO1FBS3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3BGLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXhDLENBQUM7Ozs7O0lBcENELElBQ0ksVUFBVSxDQUFDLEdBQVc7UUFDdEIsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2IsT0FBTztTQUNWO1FBQ0QsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsSUFDSSxXQUFXLENBQUMsSUFBWTtRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7SUFzQkQsSUFBSSxPQUFPO1FBQ1AsT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDO0lBQzVELENBQUM7Ozs7SUFFRCxJQUFJLE9BQU87UUFDUCxPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7SUFDNUQsQ0FBQzs7OztJQUVELElBQUksUUFBUTtRQUNSLE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDO0lBQy9ELENBQUM7Ozs7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVk7YUFDdEQsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjO2FBQ3hELFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYzthQUN4RCxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Ozs7Ozs7SUFNRCxhQUFhLENBQUMsS0FBMEI7UUFDcEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3RCLE1BQU0sS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFtQjtRQUM1QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN2QyxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLE1BQXFCO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLE1BQWtCO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQzNDLENBQUM7Ozs7O0lBRUQsY0FBYyxDQUFDLElBQWM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELE9BQU87UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxJQUFZO1FBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FDNUMsSUFBSSxFQUFFLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQVksRUFBRSxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEcsQ0FBQzs7OztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUMvQyxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxLQUFxQjtRQUMvQixJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssY0FBYyxDQUFDLEtBQUssRUFBRTtZQUN0RSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7Ozs7O0lBR0QsU0FBUyxDQUFDLENBQWdCO1FBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7O1lBMUtKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxnZ0pBQXVEO2dCQUV2RCxVQUFVLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLFlBQVksRUFBRTt3QkFDbEIsVUFBVSxDQUFDLFFBQVEsY0FBYyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUN2QyxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQzs0QkFDdEMsT0FBTyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsRUFBQyxTQUFTLEVBQUUsZUFBZSxFQUFDLENBQUMsQ0FBQzt5QkFDaEUsQ0FBQzt3QkFDRixVQUFVLENBQUMsR0FBRyxjQUFjLENBQUMsS0FBSyxPQUFPLGNBQWMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs0QkFDN0QsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7NEJBQy9DLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO3lCQUMvRSxDQUFDO3FCQUNMLENBQUM7aUJBQ0w7Z0JBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7O2FBQzVDOzs7O1lBakNRLDRCQUE0QjtZQUc1QixpQ0FBaUM7Ozs0QkEyQ3JDLEtBQUs7K0JBQ0wsS0FBSzs2QkFDTCxLQUFLO29CQUNMLEtBQUssU0FBQyxLQUFLO2tDQUNYLEtBQUs7a0NBQ0wsS0FBSzt5QkFFTCxLQUFLOzBCQWFMLEtBQUs7c0JBS0wsTUFBTTtxQkFDTixNQUFNO3FCQUNOLE1BQU07MkJBQ04sTUFBTTtrQ0FFTixTQUFTLFNBQUMsY0FBYzt3QkFzR3hCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUE5SW5DLHNEQUE0Qjs7SUFDNUIsd0RBQThCOztJQUM5Qix3REFBMkI7O0lBRTNCLGtEQUFvQjs7SUFDcEIsd0RBQStCOztJQUUvQixrREFBaUI7O0lBQ2pCLHdEQUErQjs7SUFFL0IsdURBQTBDOztJQUMxQywwREFBNkM7O0lBQzdDLHdEQUEyQzs7SUFDM0MsK0NBQTJCOztJQUMzQiw2REFBc0M7O0lBQ3RDLDZEQUFzQzs7SUFvQnRDLGlEQUErQzs7SUFDL0MsZ0RBQTRDOztJQUM1QyxnREFBNEM7O0lBQzVDLHNEQUFvRDs7SUFFcEQsNkRBQTJEOzs7OztJQUUzRCxxREFBNEI7Ozs7O0lBQzVCLHlEQUE2Qzs7Ozs7SUFDN0MsdURBQTJDOzs7OztJQUUvQiwyREFBdUQ7Ozs7O0lBQ3ZELHNEQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENsb2NrRmFjZVRpbWUgfSBmcm9tICcuL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZVBlcmlvZCB9IGZyb20gJy4vbW9kZWxzL3RpbWUtcGVyaW9kLmVudW0nO1xyXG5pbXBvcnQgeyBtZXJnZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBUaW1lVW5pdCB9IGZyb20gJy4vbW9kZWxzL3RpbWUtdW5pdC5lbnVtJztcclxuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uRXZlbnQsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZXZlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgVGltZXBpY2tlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuXHJcbmV4cG9ydCBlbnVtIEFuaW1hdGlvblN0YXRlIHtcclxuICAgIEVOVEVSID0gJ2VudGVyJyxcclxuICAgIExFQVZFID0gJ2xlYXZlJ1xyXG59XHJcblxyXG5cclxuY29uc3QgRVNDQVBFID0gMjc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcigndGltZXBpY2tlcicsIFtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbihgKiA9PiAke0FuaW1hdGlvblN0YXRlLkVOVEVSfWAsIFtcclxuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0zMCUpJ30pLFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgnMC4ycyBlYXNlLW91dCcsIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJ30pKVxyXG4gICAgICAgICAgICBdKSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbihgJHtBbmltYXRpb25TdGF0ZS5FTlRFUn0gPT4gJHtBbmltYXRpb25TdGF0ZS5MRUFWRX1gLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsIG9wYWNpdHk6IDF9KSxcclxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJzAuMnMgZWFzZS1vdXQnLCBzdHlsZSh7dHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMzAlKScsIG9wYWNpdHk6IDB9KSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW05neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgc2VsZWN0ZWRIb3VyOiBDbG9ja0ZhY2VUaW1lO1xyXG4gICAgc2VsZWN0ZWRNaW51dGU6IENsb2NrRmFjZVRpbWU7XHJcbiAgICBzZWxlY3RlZFBlcmlvZDogVGltZVBlcmlvZDtcclxuXHJcbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xyXG4gICAgYWN0aXZlVGltZVVuaXQgPSBUaW1lVW5pdC5IT1VSO1xyXG5cclxuICAgIGlzT3BlbmVkID0gZmFsc2U7XHJcbiAgICBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGU7XHJcblxyXG4gICAgQElucHV0KCkgY2FuY2VsQnRuVG1wbDogVGVtcGxhdGVSZWY8Tm9kZT47XHJcbiAgICBASW5wdXQoKSBlZGl0YWJsZUhpbnRUbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuICAgIEBJbnB1dCgpIGNvbmZpcm1CdG5UbXBsOiBUZW1wbGF0ZVJlZjxOb2RlPjtcclxuICAgIEBJbnB1dCgnRVNDJykgaXNFc2MgPSB0cnVlO1xyXG4gICAgQElucHV0KCkgZW5hYmxlS2V5Ym9hcmRJbnB1dDogYm9vbGVhbjtcclxuICAgIEBJbnB1dCgpIHByZXZlbnRPdmVybGF5Q2xpY2s6IGJvb2xlYW47XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBtaW51dGVzR2FwKGdhcDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGdhcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2FwID0gTWF0aC5mbG9vcihnYXApO1xyXG4gICAgICAgIHRoaXMuX21pbnV0ZXNHYXAgPSBnYXAgPD0gNTkgPyBnYXAgOiAxO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW51dGVzR2FwKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbnV0ZXNHYXA7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBkZWZhdWx0VGltZSh0aW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldERlZmF1bHRUaW1lKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSB0aW1lU2V0ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgICBAT3V0cHV0KCkgb3BlbmVkID0gbmV3IEV2ZW50RW1pdHRlcjxudWxsPigpO1xyXG4gICAgQE91dHB1dCgpIGNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVsbD4oKTtcclxuICAgIEBPdXRwdXQoKSBob3VyU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0aW1lcGlja2Vyd3cnKSB0aW1lcGlja2VyQ29tcG9uZW50OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHByaXZhdGUgX21pbnV0ZXNHYXA6IG51bWJlcjtcclxuICAgIHByaXZhdGUgdGltZXBpY2tlcklucHV0OiBUaW1lcGlja2VyRGlyZWN0aXZlO1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpcHRpb25zOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdGltZXBpY2tlclNlcnZpY2U6IE5neE1hdGVyaWFsVGltZXBpY2tlclNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50U2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKG1lcmdlKHRoaXMuZXZlbnRTZXJ2aWNlLmJhY2tkcm9wQ2xpY2ssXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmtleWRvd25FdmVudC5waXBlKGZpbHRlcihlID0+IGUua2V5Q29kZSA9PT0gRVNDQVBFICYmIHRoaXMuaXNFc2MpKSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1pblRpbWUoKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5taW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG1heFRpbWUoKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVwaWNrZXJJbnB1dCAmJiB0aGlzLnRpbWVwaWNrZXJJbnB1dC5kaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZXBpY2tlcklucHV0ICYmIHRoaXMudGltZXBpY2tlcklucHV0LmZvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkSG91clxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGhvdXIgPT4gdGhpcy5zZWxlY3RlZEhvdXIgPSBob3VyKSk7XHJcblxyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2VsZWN0ZWRNaW51dGVcclxuICAgICAgICAgICAgLnN1YnNjcmliZShtaW51dGUgPT4gdGhpcy5zZWxlY3RlZE1pbnV0ZSA9IG1pbnV0ZSkpO1xyXG5cclxuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLnNlbGVjdGVkUGVyaW9kXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUocGVyaW9kID0+IHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSBwZXJpb2QpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKioqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBpbnB1dCB3aXRoIHRoaXMgdGltZXBpY2tlci5cclxuICAgICAqIGlucHV0IC0gVGhlIHRpbWVwaWNrZXIgaW5wdXQgdG8gcmVnaXN0ZXIgd2l0aCB0aGlzIHRpbWVwaWNrZXJcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJJbnB1dChpbnB1dDogVGltZXBpY2tlckRpcmVjdGl2ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVwaWNrZXJJbnB1dCkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQSBUaW1lcGlja2VyIGNhbiBvbmx5IGJlIGFzc29jaWF0ZWQgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VySW5wdXQgPSBpbnB1dDtcclxuICAgIH1cclxuXHJcbiAgICBvbkhvdXJDaGFuZ2UoaG91cjogQ2xvY2tGYWNlVGltZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UuaG91ciA9IGhvdXI7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ib3VyU2VsZWN0ZWQoaG91cjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lVW5pdChUaW1lVW5pdC5NSU5VVEUpO1xyXG4gICAgICAgIHRoaXMuaG91clNlbGVjdGVkLm5leHQoaG91cik7XHJcbiAgICB9XHJcblxyXG4gICAgb25NaW51dGVDaGFuZ2UobWludXRlOiBDbG9ja0ZhY2VUaW1lKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU2VydmljZS5taW51dGUgPSBtaW51dGU7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGVyaW9kKHBlcmlvZDogVGltZVBlcmlvZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2UucGVyaW9kID0gcGVyaW9kO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVRpbWVVbml0KHVuaXQ6IFRpbWVVbml0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVUaW1lVW5pdCA9IHVuaXQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpbWVTZXQubmV4dCh0aGlzLnRpbWVwaWNrZXJTZXJ2aWNlLmdldEZ1bGxUaW1lKHRoaXMuZm9ybWF0KSk7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERlZmF1bHRUaW1lKHRpbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGltZXBpY2tlclNlcnZpY2Uuc2V0RGVmYXVsdFRpbWVJZkF2YWlsYWJsZShcclxuICAgICAgICAgICAgdGltZSwgdGhpcy5taW5UaW1lIGFzIERhdGVUaW1lLCB0aGlzLm1heFRpbWUgYXMgRGF0ZVRpbWUsIHRoaXMuZm9ybWF0LCB0aGlzLm1pbnV0ZXNHYXApO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IEFuaW1hdGlvblN0YXRlLkVOVEVSO1xyXG4gICAgICAgIHRoaXMub3BlbmVkLm5leHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gQW5pbWF0aW9uU3RhdGUuTEVBVkU7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQucGhhc2VOYW1lID09PSAnZG9uZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gQW5pbWF0aW9uU3RhdGUuTEVBVkUpIHtcclxuICAgICAgICAgICAgdGhpcy5pc09wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZVRpbWVVbml0ID0gVGltZVVuaXQuSE9VUjtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICAgIG9uS2V5ZG93bihlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2hFdmVudChlKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKSk7XHJcbiAgICB9XHJcbn1cclxuIl19