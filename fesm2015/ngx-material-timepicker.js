import { BehaviorSubject, Subject, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { animate, style, transition, trigger, sequence } from '@angular/animations';
import { DateTime } from 'luxon';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Directive, ElementRef, Inject, Input, Optional, HostListener, Pipe, Component, EventEmitter, Output, ContentChild, ChangeDetectionStrategy, ViewChild, NgModule, forwardRef, defineInjectable } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const TimePeriod = {
    AM: 'AM',
    PM: 'PM',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const TimeFormat = {
    TWELVE: 'hh:mm a',
    TWELVE_SHORT: 'h:m a',
    TWENTY_FOUR: 'HH:mm',
    TWENTY_FOUR_SHORT: 'H:m',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TimepickerUtils;
(function (TimepickerUtils) {
    /**
     * @param {?} time
     * @param {?} compareWith
     * @param {?=} unit
     * @return {?}
     */
    function isSameOrAfter(time, compareWith, unit = 'minutes') {
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
    function isSameOrBefore(time, compareWith, unit = 'minutes') {
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
    function isBetween(time, before, after, unit = 'minutes') {
        if (unit === 'hours') {
            return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
        }
        if (unit === 'minutes') {
            return isSameOrBefore(time, after) && isSameOrAfter(time, before);
        }
    }
    TimepickerUtils.isBetween = isBetween;
})(TimepickerUtils || (TimepickerUtils = {}));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @dynamic
class TimeAdapter {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_HOUR = {
    time: 12,
    angle: 360
};
/** @type {?} */
const DEFAULT_MINUTE = {
    time: 0,
    angle: 360
};
class NgxMaterialTimepickerService {
    constructor() {
        this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
        this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
        this.periodSubject = new BehaviorSubject(TimePeriod.AM);
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    set hour(hour) {
        this.hourSubject.next(hour);
    }
    /**
     * @return {?}
     */
    get selectedHour() {
        return this.hourSubject.asObservable();
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    set minute(minute) {
        this.minuteSubject.next(minute);
    }
    /**
     * @return {?}
     */
    get selectedMinute() {
        return this.minuteSubject.asObservable();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    set period(period) {
        /** @type {?} */
        const isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
        if (isPeriodValid) {
            this.periodSubject.next(period);
        }
    }
    /**
     * @return {?}
     */
    get selectedPeriod() {
        return this.periodSubject.asObservable();
    }
    /**
     * @param {?} time
     * @param {?} min
     * @param {?} max
     * @param {?} format
     * @param {?=} minutesGap
     * @return {?}
     */
    setDefaultTimeIfAvailable(time, min, max, format, minutesGap) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.setDefaultTime(TimeAdapter.formatTime(time, format), format);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * @param {?} format
     * @return {?}
     */
    getFullTime(format) {
        /** @type {?} */
        const hour = this.hourSubject.getValue().time;
        /** @type {?} */
        const minute = this.minuteSubject.getValue().time;
        /** @type {?} */
        const period = format === 12 ? this.periodSubject.getValue() : '';
        return TimeAdapter.formatTime(`${hour}:${minute} ${period}`, format);
    }
    /**
     * @private
     * @param {?} time
     * @param {?} format
     * @return {?}
     */
    setDefaultTime(time, format) {
        /** @type {?} */
        const defaultTime = TimeAdapter.convertTimeToDateTime(time, format).toJSDate();
        if (DateTime.fromJSDate(defaultTime).isValid) {
            /** @type {?} */
            const period = time.substr(time.length - 2).toUpperCase();
            /** @type {?} */
            const hour = defaultTime.getHours();
            this.hour = Object.assign({}, DEFAULT_HOUR, { time: formatHourByPeriod(hour, (/** @type {?} */ (period))) });
            this.minute = Object.assign({}, DEFAULT_MINUTE, { time: defaultTime.getMinutes() });
            this.period = (/** @type {?} */ (period));
        }
        else {
            this.resetTime();
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetTime() {
        this.hour = Object.assign({}, DEFAULT_HOUR);
        this.minute = Object.assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    }
}
NgxMaterialTimepickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ NgxMaterialTimepickerService.ngInjectableDef = defineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const TimeUnit = {
    HOUR: 0,
    MINUTE: 1,
};
TimeUnit[TimeUnit.HOUR] = 'HOUR';
TimeUnit[TimeUnit.MINUTE] = 'MINUTE';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerEventService {
    constructor() {
        this.backdropClickSubject = new Subject();
        this.keydownEventSubject = new Subject();
    }
    /**
     * @return {?}
     */
    get backdropClick() {
        return this.backdropClickSubject.asObservable();
    }
    /**
     * @return {?}
     */
    get keydownEvent() {
        return this.keydownEventSubject.asObservable();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dispatchEvent(event) {
        switch (event.type) {
            case 'click':
                this.backdropClickSubject.next((/** @type {?} */ (event)));
                break;
            case 'keydown':
                this.keydownEventSubject.next((/** @type {?} */ (event)));
                break;
            default:
                throw new Error('no such event type');
        }
    }
}
NgxMaterialTimepickerEventService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ NgxMaterialTimepickerEventService.ngInjectableDef = defineInjectable({ factory: function NgxMaterialTimepickerEventService_Factory() { return new NgxMaterialTimepickerEventService(); }, token: NgxMaterialTimepickerEventService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const AnimationState = {
    ENTER: 'enter',
    LEAVE: 'leave',
};
/** @type {?} */
const ESCAPE = 27;
class NgxMaterialTimepickerComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* To override a default toggle icon */
class NgxMaterialTimepickerToggleIconDirective {
}
NgxMaterialTimepickerToggleIconDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxMaterialTimepickerToggleIcon]' },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerToggleComponent {
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    open(event) {
        if (this.timepicker) {
            this.timepicker.open();
            event.stopPropagation();
        }
    }
}
NgxMaterialTimepickerToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-toggle',
                template: "<button class=\"ngx-material-timepicker-toggle\" (click)=\"open($event)\" [disabled]=\"disabled\" type=\"button\">\r\n    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24px\" height=\"24px\" *ngIf=\"!customIcon\">\r\n        <path\r\n            d=\"M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003                   6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z\"/>\r\n    </svg>\r\n\r\n    <ng-content select=\"[ngxMaterialTimepickerToggleIcon]\"></ng-content>\r\n</button>\r\n",
                styles: [".ngx-material-timepicker-toggle{display:flex;justify-content:center;align-items:center;padding:4px;background-color:transparent;border-radius:50%;text-align:center;border:none;outline:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;transition:background-color .3s;cursor:pointer}.ngx-material-timepicker-toggle:focus{background-color:rgba(0,0,0,.07)}"]
            }] }
];
NgxMaterialTimepickerToggleComponent.propDecorators = {
    timepicker: [{ type: Input, args: ['for',] }],
    disabled: [{ type: Input }],
    customIcon: [{ type: ContentChild, args: [NgxMaterialTimepickerToggleIconDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TimepickerDirective),
    multi: true
};
class TimepickerDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this._format = 12;
        this._value = '';
        this.timepickerSubscriptions = [];
        this.onTouched = () => {
        };
        this.onChange = () => {
        };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set format(value) {
        this._format = value === 24 ? 24 : 12;
    }
    /**
     * @return {?}
     */
    get format() {
        return this._format;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        if (typeof value === 'string') {
            this._min = TimeAdapter.convertTimeToDateTime(value);
            return;
        }
        this._min = value;
    }
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        if (typeof value === 'string') {
            this._max = TimeAdapter.convertTimeToDateTime(value);
            return;
        }
        this._max = value;
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} picker
     * @return {?}
     */
    set timepicker(picker) {
        this.registerTimepicker(picker);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (!value) {
            this._value = '';
            this.updateInputValue();
            return;
        }
        /** @type {?} */
        const time = TimeAdapter.formatTime(value, this._format);
        if (TimeAdapter.isTimeAvailable(time, (/** @type {?} */ (this._min)), (/** @type {?} */ (this._max)), 'minutes', this._timepicker.minutesGap)) {
            this._value = time;
            this.updateInputValue();
            return;
        }
        console.warn('Selected time doesn\'t match min or max value');
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @private
     * @param {?} time
     * @return {?}
     */
    set defaultTime(time) {
        this._timepicker.setDefaultTime(time);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onInput(value) {
        this.value = value;
        this.onChange(value);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
        this.defaultTime = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.timepickerSubscriptions.forEach(s => s.unsubscribe());
    }
    /**
     * @private
     * @param {?} picker
     * @return {?}
     */
    registerTimepicker(picker) {
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe((time) => {
                this.value = time;
                this.onChange(this._value);
                this.onTouched();
            }));
            this.timepickerSubscriptions.push(this._timepicker.closed.subscribe(() => this.defaultTime = this._value));
        }
        else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateInputValue() {
        this.elementRef.nativeElement.value = this.value;
    }
}
TimepickerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngxTimepicker]',
                providers: [VALUE_ACCESSOR],
                host: {
                    '[disabled]': 'disabled',
                    '(input)': 'onInput($event.target.value)',
                    '(blur)': 'onTouched()',
                },
            },] }
];
/** @nocollapse */
TimepickerDirective.ctorParameters = () => [
    { type: ElementRef }
];
TimepickerDirective.propDecorators = {
    format: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    timepicker: [{ type: Input, args: ['ngxTimepicker',] }],
    value: [{ type: Input }],
    disabled: [{ type: Input }],
    disableClick: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerThemeDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.element = elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.theme) {
            this.setTheme(this.theme);
        }
    }
    /**
     * @private
     * @param {?} theme
     * @return {?}
     */
    setTheme(theme) {
        for (const val in theme) {
            if (theme.hasOwnProperty(val)) {
                if (typeof theme[val] === 'string') {
                    for (const prop in theme) {
                        if (theme.hasOwnProperty(prop)) {
                            this.element.style.setProperty(`--${camelCaseToDash(prop)}`, theme[prop]);
                        }
                    }
                    return;
                }
                this.setTheme(theme[val]);
            }
        }
    }
}
NgxMaterialTimepickerThemeDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxMaterialTimepickerTheme]' },] }
];
/** @nocollapse */
NgxMaterialTimepickerThemeDirective.ctorParameters = () => [
    { type: ElementRef }
];
NgxMaterialTimepickerThemeDirective.propDecorators = {
    theme: [{ type: Input, args: ['ngxMaterialTimepickerTheme',] }]
};
/**
 * @param {?} myStr
 * @return {?}
 */
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} format
 * @return {?}
 */
function getHours(format) {
    return Array(format).fill(1).map((v, i) => {
        /** @type {?} */
        const angleStep = 30;
        /** @type {?} */
        const time = v + i;
        /** @type {?} */
        const angle = angleStep * time;
        return { time: time === 24 ? 0 : time, angle };
    });
}
/**
 * @param {?} hours
 * @param {?} config
 * @return {?}
 */
function disableHours(hours, config) {
    if (config.min || config.max) {
        return hours.map(value => {
            /** @type {?} */
            const hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
            /** @type {?} */
            const currentTime = DateTime.fromObject({ hour }).toFormat(TimeFormat.TWELVE);
            return Object.assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours') });
        });
    }
    return hours;
}
/**
 * @param {?=} gap
 * @return {?}
 */
function getMinutes(gap = 1) {
    /** @type {?} */
    const minutesCount = 60;
    /** @type {?} */
    const angleStep = 360 / minutesCount;
    /** @type {?} */
    const minutes = [];
    for (let i = 0; i < minutesCount; i++) {
        /** @type {?} */
        const angle = angleStep * i;
        if (i % gap === 0) {
            minutes.push({ time: i, angle: angle !== 0 ? angle : 360 });
        }
    }
    return minutes;
}
/**
 * @param {?} minutes
 * @param {?} selectedHour
 * @param {?} config
 * @return {?}
 */
function disableMinutes(minutes, selectedHour, config) {
    if (config.min || config.max) {
        /** @type {?} */
        const hour = TimeAdapter.formatHour(selectedHour, config.format, config.period);
        return minutes.map(value => {
            /** @type {?} */
            const currentTime = DateTime.fromObject({ hour, minute: value.time }).toFormat(TimeFormat.TWELVE);
            return Object.assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'minutes') });
        });
    }
    return minutes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerHoursFace {
    /**
     * @protected
     * @param {?} format
     */
    constructor(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = getHours(format);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    onTimeSelected(time) {
        this.hourSelected.next(time);
    }
}
NgxMaterialTimepickerHoursFace.propDecorators = {
    selectedHour: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    hourChange: [{ type: Output }],
    hourSelected: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(24);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.hoursList = disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    }
}
NgxMaterialTimepicker24HoursFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-24-hours-face',
                template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\r\n                              (timeChange)=\"hourChange.next($event)\"\r\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n"
            }] }
];
/** @nocollapse */
NgxMaterialTimepicker24HoursFaceComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(12);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
NgxMaterialTimepicker12HoursFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-12-hours-face',
                template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\r\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n"
            }] }
];
/** @nocollapse */
NgxMaterialTimepicker12HoursFaceComponent.ctorParameters = () => [];
NgxMaterialTimepicker12HoursFaceComponent.propDecorators = {
    period: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerMinutesFaceComponent {
    constructor() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue) {
            /** @type {?} */
            const minutes = getMinutes(this.minutesGap);
            this.minutesList = disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
NgxMaterialTimepickerMinutesFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-minutes-face',
                template: "<ngx-material-timepicker-face [faceTime]=\"minutesList\" [selectedTime]=\"selectedMinute\"\r\n                              [minutesGap]=\"minutesGap\"\r\n                              (timeChange)=\"minuteChange.next($event)\" [unit]=\"timeUnit.MINUTE\"></ngx-material-timepicker-face>\r\n"
            }] }
];
NgxMaterialTimepickerMinutesFaceComponent.propDecorators = {
    selectedMinute: [{ type: Input }],
    selectedHour: [{ type: Input }],
    period: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    minuteChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
class NgxMaterialTimepickerFaceComponent {
    constructor() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setClockHandPosition();
        this.addTouchEvents();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        const faceTimeChanges = changes['faceTime'];
        /** @type {?} */
        const selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(time => time.time === this.selectedTime.time);
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => this.selectAvailableTime());
        }
    }
    /**
     * @param {?} _
     * @param {?} time
     * @return {?}
     */
    trackByTime(_, time) {
        return time.time;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMousedown(e) {
        e.preventDefault();
        this.isStarted = true;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    selectTime(e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        /** @type {?} */
        const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        /** @type {?} */
        const centerX = clockFaceCords.left + clockFaceCords.width / 2;
        /** @type {?} */
        const centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        /** @type {?} */
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        /** @type {?} */
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        /** @type {?} */
        const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        /** @type {?} */
        const angleStep = this.unit === TimeUnit.MINUTE ? 6 : 30;
        /** @type {?} */
        const roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);
        /** @type {?} */
        const angle = roundedAngle === 0 ? 360 : roundedAngle;
        /** @type {?} */
        const selectedTime = this.faceTime.find(val => val.angle === angle);
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onMouseup(e) {
        e.preventDefault();
        this.isStarted = false;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    isHourSelected(hour) {
        return (hour === this.selectedTime.time) && !this.isClockFaceDisabled;
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    isMinuteSelected(minute) {
        return ((this.selectedTime.time === minute) && (minute % (this.minutesGap || 5) === 0)) && !this.isClockFaceDisabled;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.removeTouchEvents();
    }
    /**
     * @private
     * @return {?}
     */
    addTouchEvents() {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    }
    /**
     * @private
     * @return {?}
     */
    removeTouchEvents() {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    }
    /**
     * @private
     * @return {?}
     */
    setClockHandPosition() {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }
    /**
     * @private
     * @return {?}
     */
    selectAvailableTime() {
        /** @type {?} */
        const currentTime = this.faceTime.find(time => this.selectedTime.time === time.time);
        this.isClockFaceDisabled = this.faceTime.every(time => time.disabled);
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            /** @type {?} */
            const availableTime = this.faceTime.find(time => !time.disabled);
            this.timeChange.next(availableTime);
        }
    }
    /**
     * @private
     * @param {?} x0
     * @param {?} y0
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    isInnerClockFace(x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    }
    /**
     * @private
     * @return {?}
     */
    decreaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    }
    /**
     * @private
     * @return {?}
     */
    increaseClockHand() {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    }
}
NgxMaterialTimepickerFaceComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-face',
                template: "<div class=\"clock-face\" #clockFace>\r\n    <div *ngIf=\"unit !== timeUnit.MINUTE;else minutesFace\" class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime.slice(0, 12); trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': isHourSelected(time.time), 'disabled': time.disabled}\">{{time.time}}</span>\r\n        </div>\r\n        <div class=\"clock-face__inner\" *ngIf=\"faceTime.length > 12\"\r\n             [style.top]=\"'calc(50% - ' + innerClockFaceSize + 'px)'\">\r\n            <div class=\"clock-face__number clock-face__number--inner\"\r\n                 [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n                 [style.height.px]=\"innerClockFaceSize\"\r\n                 *ngFor=\"let time of faceTime.slice(12, 24); trackBy: trackByTime\">\r\n\t\t\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n                  [ngClass]=\"{'active': isHourSelected(time.time), 'disabled': time.disabled}\">\r\n                {{time.time === 0 ? '00' : time.time}}</span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <span class=\"clock-face__clock-hand\" [ngClass]=\"{'clock-face__clock-hand_minute': unit === timeUnit.MINUTE}\"\r\n          #clockHand [hidden]=\"isClockFaceDisabled\"></span>\r\n</div>\r\n<ng-template #minutesFace>\r\n    <div class=\"clock-face__container\">\r\n        <div class=\"clock-face__number clock-face__number--outer\"\r\n             [style.transform]=\"'rotateZ('+ time.angle +'deg) translateX(-50%)' | styleSanitizer\"\r\n             *ngFor=\"let time of faceTime; trackBy: trackByTime\">\r\n\t<span [style.transform]=\"'rotateZ(-'+ time.angle +'deg)' | styleSanitizer\"\r\n          [ngClass]=\"{'active': isMinuteSelected(time.time), 'disabled': time.disabled}\">\r\n\t{{time.time === 0 ? '00' : time.time | minutesFormatter: minutesGap}}</span>\r\n        </div>\r\n    </div>\r\n</ng-template>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".clock-face{width:290px;height:290px;border-radius:50%;position:relative;display:flex;justify-content:center;padding:20px;box-sizing:border-box;background-color:#f0f0f0}@supports (background-color:var(--clock-face-background-color)){.clock-face{background-color:var(--clock-face-background-color)}}.clock-face__inner{position:absolute}.clock-face__container{margin-left:-2px}.clock-face__number{position:absolute;-webkit-transform-origin:0 100%;transform-origin:0 100%;width:50px;text-align:center;z-index:2}.clock-face__number--outer{height:calc(290px / 2 - 20px)}.clock-face__number--outer>span{font-size:16px;color:#6c6c6c}@supports (color:var(--clock-face-time-inactive-color)){.clock-face__number--outer>span{color:var(--clock-face-time-inactive-color)}}.clock-face__number--inner>span{font-size:14px;color:#929292}@supports (color:var(--clock-face-inner-time-inactive-color)){.clock-face__number--inner>span{color:var(--clock-face-inner-time-inactive-color)}}.clock-face__number>span{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:30px;height:30px;display:flex;justify-content:center;align-items:center;margin:auto;border-radius:50%;font-weight:500;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.clock-face__number>span{font-family:var(--primary-font-family)}}.clock-face__number>span.active{background-color:#00bfff;color:#fff}@supports (background-color:var(--clock-hand-color)){.clock-face__number>span.active{background-color:var(--clock-hand-color);color:var(--clock-face-time-active-color)}}.clock-face__number>span.disabled{color:#c5c5c5}@supports (color:var(--clock-face-time-disabled-color)){.clock-face__number>span.disabled{color:var(--clock-face-time-disabled-color)}}.clock-face__clock-hand{height:103px;width:2px;-webkit-transform-origin:0 100%;transform-origin:0 100%;position:absolute;top:calc(50% - 103px);z-index:1;background-color:#00bfff}@supports (background-color:var(--clock-hand-color)){.clock-face__clock-hand{background-color:var(--clock-hand-color)}}.clock-face__clock-hand:after{content:'';width:7px;height:7px;border-radius:50%;background-color:inherit;position:absolute;bottom:-3px;left:-3.5px}.clock-face__clock-hand_minute:before{content:'';width:7px;height:7px;background-color:#fff;border-radius:50%;position:absolute;top:-8px;left:calc(50% - 8px);box-sizing:content-box;border:4px solid #00bfff}@supports (border-color:var(--clock-hand-color)){.clock-face__clock-hand_minute:before{border-color:var(--clock-hand-color)}}@media (max-device-width:1023px) and (orientation:landscape){.clock-face{width:225px;height:225px;padding:5px}.clock-face__number--outer{height:calc(225px / 2 - 5px)}.clock-face__clock-hand_minute:before{top:0}}"]
            }] }
];
NgxMaterialTimepickerFaceComponent.propDecorators = {
    faceTime: [{ type: Input }],
    selectedTime: [{ type: Input }],
    unit: [{ type: Input }],
    format: [{ type: Input }],
    minutesGap: [{ type: Input }],
    timeChange: [{ type: Output }],
    timeSelected: [{ type: Output }],
    clockFace: [{ type: ViewChild, args: ['clockFace',] }],
    clockHand: [{ type: ViewChild, args: ['clockHand',] }],
    onMousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    selectTime: [{ type: HostListener, args: ['click', ['$event'],] }, { type: HostListener, args: ['touchmove', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['touchend', ['$event.changedTouches[0]'],] }, { type: HostListener, args: ['mousemove', ['$event'],] }],
    onMouseup: [{ type: HostListener, args: ['mouseup', ['$event'],] }]
};
/**
 * @param {?} angle
 * @param {?} step
 * @return {?}
 */
function roundAngle(angle, step) {
    return Math.round(angle / step) * step;
}
/**
 * @param {?} x0
 * @param {?} y0
 * @param {?} x
 * @param {?} y
 * @param {?} currentAngle
 * @return {?}
 */
function countAngleByCords(x0, y0, x, y, currentAngle) {
    if (y > y0 && x >= x0) { // II quarter
        return 180 - currentAngle;
    }
    else if (y > y0 && x < x0) { // III quarter
        return 180 + currentAngle;
    }
    else if (y < y0 && x < x0) { // IV quarter
        return 360 - currentAngle;
    }
    else { // I quarter
        return currentAngle;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerButtonComponent {
}
NgxMaterialTimepickerButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-button',
                template: "<button class=\"timepicker-button\" type=\"button\">\r\n  <span><ng-content></ng-content></span>\r\n</button>\r\n",
                styles: [".timepicker-button{display:inline-block;height:36px;min-width:88px;line-height:36px;border:12px;border-radius:2px;background-color:transparent;text-align:center;transition:450ms cubic-bezier(.23,1,.32,1);overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;cursor:pointer;outline:0;color:#00bfff}@supports (color:var(--button-color)){.timepicker-button{color:var(--button-color)}}.timepicker-button:focus,.timepicker-button:hover{background-color:rgba(153,153,153,.2)}.timepicker-button>span{font-size:14px;text-transform:uppercase;font-weight:600;padding-left:16px;padding-right:16px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-button>span{font-family:var(--primary-font-family)}}"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerDialComponent {
    constructor() {
        this.timeUnit = TimeUnit;
        this.periodChanged = new EventEmitter();
        this.timeUnitChanged = new EventEmitter();
        this.hourChanged = new EventEmitter();
        this.minuteChanged = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            /** @type {?} */
            const hours = getHours(this.format);
            this.hours = disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            /** @type {?} */
            const minutes = getMinutes(this.minutesGap);
            this.minutes = disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
    /**
     * @param {?} unit
     * @return {?}
     */
    changeTimeUnit(unit) {
        this.timeUnitChanged.next(unit);
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.periodChanged.next(period);
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    changeHour(hour) {
        this.hourChanged.next(hour);
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    changeMinute(minute) {
        this.minuteChanged.next(minute);
    }
    /**
     * @return {?}
     */
    showHint() {
        this.isHintVisible = true;
    }
    /**
     * @return {?}
     */
    hideHint() {
        this.isHintVisible = false;
    }
}
NgxMaterialTimepickerDialComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-dial',
                template: "<div class=\"timepicker-dial\">\r\n    <div class=\"timepicker-dial__container\">\r\n        <div class=\"timepicker-dial__time\">\r\n            <ngx-material-timepicker-dial-control [timeList]=\"hours\" [time]=\"hour\" [timeUnit]=\"timeUnit.HOUR\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.HOUR\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeHour($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n            <span>:</span>\r\n            <ngx-material-timepicker-dial-control [timeList]=\"minutes\" [time]=\"minute\" [timeUnit]=\"timeUnit.MINUTE\"\r\n                                                  [isActive]=\"activeTimeUnit === timeUnit.MINUTE\"\r\n                                                  [isEditable]=\"isEditable\"\r\n                                                  [minutesGap]=\"minutesGap\"\r\n                                                  (timeUnitChanged)=\"changeTimeUnit($event)\"\r\n                                                  (timeChanged)=\"changeMinute($event)\"\r\n                                                  (focused)=\"showHint()\"\r\n                                                  (unfocused)=\"hideHint()\">\r\n\r\n            </ngx-material-timepicker-dial-control>\r\n        </div>\r\n        <ngx-material-timepicker-period class=\"timepicker-dial__period\"\r\n                                        [ngClass]=\"{'timepicker-dial__period--hidden': format === 24}\"\r\n                                        [selectedPeriod]=\"period\" [activeTimeUnit]=\"activeTimeUnit\"\r\n                                        [maxTime]=\"maxTime\" [minTime]=\"minTime\" [format]=\"format\"\r\n                                        [hours]=\"hours\" [minutes]=\"minutes\" [selectedHour]=\"hour\"\r\n                                        (periodChanged)=\"changePeriod($event)\"></ngx-material-timepicker-period>\r\n    </div>\r\n    <div *ngIf=\"isEditable\" [ngClass]=\"{'timepicker-dial__hint-container--hidden': !isHintVisible}\">\r\n        <!--suppress HtmlUnknownAttribute -->\r\n        <ng-container *ngTemplateOutlet=\"editableHintTmpl ? editableHintTmpl : editableHintDefault\"></ng-container>\r\n        <ng-template #editableHintDefault>\r\n            <small class=\"timepicker-dial__hint\"> * use arrows (<span>&#8645;</span>) to change the time</small>\r\n        </ng-template>\r\n    </div>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".timepicker-dial{text-align:right}.timepicker-dial__container{display:flex;align-items:center;justify-content:flex-end;-webkit-tap-highlight-color:transparent}.timepicker-dial__time{display:flex;align-items:baseline;line-height:normal;font-size:50px;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__time{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__period{display:block;margin-left:10px}.timepicker-dial__hint-container--hidden,.timepicker-dial__period--hidden{visibility:hidden}.timepicker-dial__hint{display:inline-block;font-size:10px;color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__hint{color:var(--dial-active-color)}}.timepicker-dial__hint span{font-size:14px}@media (max-device-width:1023px) and (orientation:landscape){.timepicker-dial__container{flex-direction:column}.timepicker-dial__period{margin-left:0}}"]
            }] }
];
NgxMaterialTimepickerDialComponent.propDecorators = {
    editableHintTmpl: [{ type: Input }],
    hour: [{ type: Input }],
    minute: [{ type: Input }],
    format: [{ type: Input }],
    period: [{ type: Input }],
    activeTimeUnit: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    isEditable: [{ type: Input }],
    minutesGap: [{ type: Input }],
    periodChanged: [{ type: Output }],
    timeUnitChanged: [{ type: Output }],
    hourChanged: [{ type: Output }],
    minuteChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TimeFormatterPipe {
    /**
     * @param {?} time
     * @param {?} timeUnit
     * @return {?}
     */
    transform(time, timeUnit) {
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
    }
}
TimeFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeFormatter'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerDialControlComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerPeriodComponent {
    constructor() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    changePeriod(period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }
    /**
     * @return {?}
     */
    animationDone() {
        this.isPeriodAvailable = true;
    }
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    isSwitchPeriodAvailable(period) {
        /** @type {?} */
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    getDisabledTimeByPeriod(period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
}
NgxMaterialTimepickerPeriodComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-material-timepicker-period',
                template: "<div class=\"timepicker-period\">\r\n\t\t\t<button class=\"timepicker-dial__item timepicker-period__btn\"\r\n                  [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.AM}\"\r\n                  (click)=\"changePeriod(timePeriod.AM)\"\r\n                  type=\"button\">AM</button>\r\n    <button class=\"timepicker-dial__item timepicker-period__btn\"\r\n          [ngClass]=\"{'timepicker-dial__item_active': selectedPeriod === timePeriod.PM}\"\r\n          (click)=\"changePeriod(timePeriod.PM)\"\r\n          type=\"button\">PM</button>\r\n    <div class=\"timepicker-period__warning\" [@scaleInOut] (@scaleInOut.done)=\"animationDone()\" *ngIf=\"!isPeriodAvailable\">\r\n        <p>Current time would be invalid in this period.</p>\r\n    </div>\r\n</div>\r\n",
                animations: [
                    trigger('scaleInOut', [
                        transition(':enter', [
                            style({ transform: 'scale(0)' }),
                            animate('.2s', style({ transform: 'scale(1)' })),
                            sequence([
                                animate('3s', style({ opacity: 1 })),
                                animate('.3s', style({ opacity: 0 }))
                            ])
                        ])
                    ])
                ],
                styles: [".timepicker-dial__item{cursor:pointer;color:rgba(255,255,255,.5);font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-dial__item{font-family:var(--primary-font-family);color:var(--dial-inactive-color)}}.timepicker-dial__item_active{color:#fff}@supports (color:var(--dial-active-color)){.timepicker-dial__item_active{color:var(--dial-active-color)}}.timepicker-period{display:flex;flex-direction:column;position:relative}.timepicker-period__btn{padding:1px 3px;border:0;background-color:transparent;font-size:18px;font-weight:500;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;outline:0;border-radius:3px;transition:background-color .5s;font-family:Roboto,sans-serif}.timepicker-period__btn:focus{background-color:rgba(0,0,0,.07)}.timepicker-period__warning{padding:5px 10px;border-radius:3px;background-color:rgba(0,0,0,.55);color:#fff;position:absolute;width:200px;left:-20px;top:40px}.timepicker-period__warning>p{margin:0;font-size:12px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-period__btn,.timepicker-period__warning>p{font-family:var(--primary-font-family)}}"]
            }] }
];
NgxMaterialTimepickerPeriodComponent.propDecorators = {
    selectedPeriod: [{ type: Input }],
    format: [{ type: Input }],
    activeTimeUnit: [{ type: Input }],
    hours: [{ type: Input }],
    minutes: [{ type: Input }],
    minTime: [{ type: Input }],
    maxTime: [{ type: Input }],
    selectedHour: [{ type: Input }],
    periodChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StyleSanitizerPipe {
    /**
     * @param {?} domSanitizer
     */
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        if (!value) {
            return value;
        }
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    }
}
StyleSanitizerPipe.decorators = [
    { type: Pipe, args: [{
                name: 'styleSanitizer'
            },] }
];
/** @nocollapse */
StyleSanitizerPipe.ctorParameters = () => [
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OverlayDirective {
    /**
     * @param {?} eventService
     */
    constructor(eventService) {
        this.eventService = eventService;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onClick(e) {
        if (!this.preventClick) {
            this.eventService.dispatchEvent(e);
        }
        e.preventDefault();
    }
}
OverlayDirective.decorators = [
    { type: Directive, args: [{
                selector: '[overlay]'
            },] }
];
/** @nocollapse */
OverlayDirective.ctorParameters = () => [
    { type: NgxMaterialTimepickerEventService }
];
OverlayDirective.propDecorators = {
    preventClick: [{ type: Input, args: ['overlay',] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MinutesFormatterPipe {
    /**
     * @param {?} minute
     * @param {?=} gap
     * @return {?}
     */
    transform(minute, gap = 5) {
        if (!minute) {
            return minute;
        }
        return minute % gap === 0 ? minute : '';
    }
}
MinutesFormatterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'minutesFormatter'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AutofocusDirective {
    /**
     * @param {?} element
     * @param {?} document
     */
    constructor(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(() => this.element.nativeElement.focus());
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(() => this.activeElement.focus());
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[timepickerAutofocus]'
            },] }
];
/** @nocollapse */
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
AutofocusDirective.propDecorators = {
    isFocusActive: [{ type: Input, args: ['timepickerAutofocus',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxMaterialTimepickerModule {
}
NgxMaterialTimepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    NgxMaterialTimepickerComponent,
                    NgxMaterialTimepickerToggleComponent,
                    TimepickerDirective,
                    NgxMaterialTimepickerToggleIconDirective,
                    NgxMaterialTimepickerThemeDirective
                ],
                declarations: [
                    NgxMaterialTimepickerComponent,
                    NgxMaterialTimepicker24HoursFaceComponent,
                    NgxMaterialTimepicker12HoursFaceComponent,
                    NgxMaterialTimepickerMinutesFaceComponent,
                    NgxMaterialTimepickerFaceComponent,
                    NgxMaterialTimepickerToggleComponent,
                    NgxMaterialTimepickerButtonComponent,
                    NgxMaterialTimepickerDialComponent,
                    NgxMaterialTimepickerDialControlComponent,
                    NgxMaterialTimepickerPeriodComponent,
                    StyleSanitizerPipe,
                    TimeFormatterPipe,
                    TimepickerDirective,
                    OverlayDirective,
                    NgxMaterialTimepickerToggleIconDirective,
                    AutofocusDirective,
                    MinutesFormatterPipe,
                    NgxMaterialTimepickerThemeDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxMaterialTimepickerModule, NgxMaterialTimepickerThemeDirective, NgxMaterialTimepickerToggleIconDirective, TimepickerDirective, AnimationState, NgxMaterialTimepickerComponent, NgxMaterialTimepicker12HoursFaceComponent as ɵf, NgxMaterialTimepicker24HoursFaceComponent as ɵd, NgxMaterialTimepickerButtonComponent as ɵi, NgxMaterialTimepickerDialControlComponent as ɵk, NgxMaterialTimepickerDialComponent as ɵj, NgxMaterialTimepickerFaceComponent as ɵh, NgxMaterialTimepickerHoursFace as ɵe, NgxMaterialTimepickerMinutesFaceComponent as ɵg, NgxMaterialTimepickerPeriodComponent as ɵl, NgxMaterialTimepickerToggleComponent as ɵc, AutofocusDirective as ɵp, OverlayDirective as ɵo, MinutesFormatterPipe as ɵq, StyleSanitizerPipe as ɵm, TimeFormatterPipe as ɵn, NgxMaterialTimepickerEventService as ɵb, NgxMaterialTimepickerService as ɵa };

//# sourceMappingURL=ngx-material-timepicker.js.map