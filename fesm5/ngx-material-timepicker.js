import { BehaviorSubject, Subject, merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { __extends, __assign, __read } from 'tslib';
import { animate, style, transition, trigger, sequence } from '@angular/animations';
import { DateTime } from 'luxon';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable, Directive, ElementRef, Inject, Input, Optional, Pipe, HostListener, Component, EventEmitter, Output, ContentChild, ChangeDetectionStrategy, ViewChild, NgModule, forwardRef, defineInjectable } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var TimePeriod = {
    AM: 'AM',
    PM: 'PM',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var TimeFormat = {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        var _a = __read(time.split(':'), 2), h = _a[0], m = _a[1];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_HOUR = {
    time: 12,
    angle: 360
};
/** @type {?} */
var DEFAULT_MINUTE = {
    time: 0,
    angle: 360
};
var NgxMaterialTimepickerService = /** @class */ (function () {
    function NgxMaterialTimepickerService() {
        this.hourSubject = new BehaviorSubject(DEFAULT_HOUR);
        this.minuteSubject = new BehaviorSubject(DEFAULT_MINUTE);
        this.periodSubject = new BehaviorSubject(TimePeriod.AM);
    }
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "hour", {
        set: /**
         * @param {?} hour
         * @return {?}
         */
        function (hour) {
            this.hourSubject.next(hour);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedHour", {
        get: /**
         * @return {?}
         */
        function () {
            return this.hourSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "minute", {
        set: /**
         * @param {?} minute
         * @return {?}
         */
        function (minute) {
            this.minuteSubject.next(minute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedMinute", {
        get: /**
         * @return {?}
         */
        function () {
            return this.minuteSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "period", {
        set: /**
         * @param {?} period
         * @return {?}
         */
        function (period) {
            /** @type {?} */
            var isPeriodValid = (period === TimePeriod.AM) || (period === TimePeriod.PM);
            if (isPeriodValid) {
                this.periodSubject.next(period);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerService.prototype, "selectedPeriod", {
        get: /**
         * @return {?}
         */
        function () {
            return this.periodSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} time
     * @param {?} min
     * @param {?} max
     * @param {?} format
     * @param {?=} minutesGap
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.setDefaultTimeIfAvailable = /**
     * @param {?} time
     * @param {?} min
     * @param {?} max
     * @param {?} format
     * @param {?=} minutesGap
     * @return {?}
     */
    function (time, min, max, format, minutesGap) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.setDefaultTime(TimeAdapter.formatTime(time, format), format);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * @param {?} format
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.getFullTime = /**
     * @param {?} format
     * @return {?}
     */
    function (format) {
        /** @type {?} */
        var hour = this.hourSubject.getValue().time;
        /** @type {?} */
        var minute = this.minuteSubject.getValue().time;
        /** @type {?} */
        var period = format === 12 ? this.periodSubject.getValue() : '';
        return TimeAdapter.formatTime(hour + ":" + minute + " " + period, format);
    };
    /**
     * @private
     * @param {?} time
     * @param {?} format
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.setDefaultTime = /**
     * @private
     * @param {?} time
     * @param {?} format
     * @return {?}
     */
    function (time, format) {
        /** @type {?} */
        var defaultTime = TimeAdapter.convertTimeToDateTime(time, format).toJSDate();
        if (DateTime.fromJSDate(defaultTime).isValid) {
            /** @type {?} */
            var period = time.substr(time.length - 2).toUpperCase();
            /** @type {?} */
            var hour = defaultTime.getHours();
            this.hour = __assign({}, DEFAULT_HOUR, { time: formatHourByPeriod(hour, (/** @type {?} */ (period))) });
            this.minute = __assign({}, DEFAULT_MINUTE, { time: defaultTime.getMinutes() });
            this.period = (/** @type {?} */ (period));
        }
        else {
            this.resetTime();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerService.prototype.resetTime = /**
     * @private
     * @return {?}
     */
    function () {
        this.hour = __assign({}, DEFAULT_HOUR);
        this.minute = __assign({}, DEFAULT_MINUTE);
        this.period = TimePeriod.AM;
    };
    NgxMaterialTimepickerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ NgxMaterialTimepickerService.ngInjectableDef = defineInjectable({ factory: function NgxMaterialTimepickerService_Factory() { return new NgxMaterialTimepickerService(); }, token: NgxMaterialTimepickerService, providedIn: "root" });
    return NgxMaterialTimepickerService;
}());
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
var TimeUnit = {
    HOUR: 0,
    MINUTE: 1,
};
TimeUnit[TimeUnit.HOUR] = 'HOUR';
TimeUnit[TimeUnit.MINUTE] = 'MINUTE';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerEventService = /** @class */ (function () {
    function NgxMaterialTimepickerEventService() {
        this.backdropClickSubject = new Subject();
        this.keydownEventSubject = new Subject();
    }
    Object.defineProperty(NgxMaterialTimepickerEventService.prototype, "backdropClick", {
        get: /**
         * @return {?}
         */
        function () {
            return this.backdropClickSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMaterialTimepickerEventService.prototype, "keydownEvent", {
        get: /**
         * @return {?}
         */
        function () {
            return this.keydownEventSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NgxMaterialTimepickerEventService.prototype.dispatchEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    NgxMaterialTimepickerEventService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ NgxMaterialTimepickerEventService.ngInjectableDef = defineInjectable({ factory: function NgxMaterialTimepickerEventService_Factory() { return new NgxMaterialTimepickerEventService(); }, token: NgxMaterialTimepickerEventService, providedIn: "root" });
    return NgxMaterialTimepickerEventService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var AnimationState = {
    ENTER: 'enter',
    LEAVE: 'leave',
};
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* To override a default toggle icon */
var NgxMaterialTimepickerToggleIconDirective = /** @class */ (function () {
    function NgxMaterialTimepickerToggleIconDirective() {
    }
    NgxMaterialTimepickerToggleIconDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngxMaterialTimepickerToggleIcon]' },] }
    ];
    return NgxMaterialTimepickerToggleIconDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerToggleComponent = /** @class */ (function () {
    function NgxMaterialTimepickerToggleComponent() {
    }
    Object.defineProperty(NgxMaterialTimepickerToggleComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    NgxMaterialTimepickerToggleComponent.prototype.open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.timepicker) {
            this.timepicker.open();
            event.stopPropagation();
        }
    };
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
    return NgxMaterialTimepickerToggleComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(function () { return TimepickerDirective; }),
    multi: true
};
var TimepickerDirective = /** @class */ (function () {
    function TimepickerDirective(elementRef) {
        this.elementRef = elementRef;
        this._format = 12;
        this._value = '';
        this.timepickerSubscriptions = [];
        this.onTouched = function () {
        };
        this.onChange = function () {
        };
    }
    Object.defineProperty(TimepickerDirective.prototype, "format", {
        get: /**
         * @return {?}
         */
        function () {
            return this._format;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._format = value === 24 ? 24 : 12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "min", {
        get: /**
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this._min = TimeAdapter.convertTimeToDateTime(value);
                return;
            }
            this._min = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "max", {
        get: /**
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === 'string') {
                this._max = TimeAdapter.convertTimeToDateTime(value);
                return;
            }
            this._max = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "timepicker", {
        set: /**
         * @param {?} picker
         * @return {?}
         */
        function (picker) {
            this.registerTimepicker(picker);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!value) {
                this._value = '';
                this.updateInputValue();
                return;
            }
            /** @type {?} */
            var time = TimeAdapter.formatTime(value, this._format);
            if (TimeAdapter.isTimeAvailable(time, (/** @type {?} */ (this._min)), (/** @type {?} */ (this._max)), 'minutes', this._timepicker.minutesGap)) {
                this._value = time;
                this.updateInputValue();
                return;
            }
            console.warn('Selected time doesn\'t match min or max value');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimepickerDirective.prototype, "defaultTime", {
        set: /**
         * @private
         * @param {?} time
         * @return {?}
         */
        function (time) {
            this._timepicker.setDefaultTime(time);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    TimepickerDirective.prototype.onInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this.onChange(value);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TimepickerDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TimepickerDirective.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TimepickerDirective.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
        this.defaultTime = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimepickerDirective.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TimepickerDirective.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    TimepickerDirective.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    TimepickerDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.timepickerSubscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    /**
     * @private
     * @param {?} picker
     * @return {?}
     */
    TimepickerDirective.prototype.registerTimepicker = /**
     * @private
     * @param {?} picker
     * @return {?}
     */
    function (picker) {
        var _this = this;
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe(function (time) {
                _this.value = time;
                _this.onChange(_this._value);
                _this.onTouched();
            }));
            this.timepickerSubscriptions.push(this._timepicker.closed.subscribe(function () { return _this.defaultTime = _this._value; }));
        }
        else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    };
    /**
     * @private
     * @return {?}
     */
    TimepickerDirective.prototype.updateInputValue = /**
     * @private
     * @return {?}
     */
    function () {
        this.elementRef.nativeElement.value = this.value;
    };
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
    TimepickerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
    return TimepickerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerThemeDirective = /** @class */ (function () {
    function NgxMaterialTimepickerThemeDirective(elementRef) {
        this.element = elementRef.nativeElement;
    }
    /**
     * @return {?}
     */
    NgxMaterialTimepickerThemeDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.theme) {
            this.setTheme(this.theme);
        }
    };
    /**
     * @private
     * @param {?} theme
     * @return {?}
     */
    NgxMaterialTimepickerThemeDirective.prototype.setTheme = /**
     * @private
     * @param {?} theme
     * @return {?}
     */
    function (theme) {
        for (var val in theme) {
            if (theme.hasOwnProperty(val)) {
                if (typeof theme[val] === 'string') {
                    for (var prop in theme) {
                        if (theme.hasOwnProperty(prop)) {
                            this.element.style.setProperty("--" + camelCaseToDash(prop), theme[prop]);
                        }
                    }
                    return;
                }
                this.setTheme(theme[val]);
            }
        }
    };
    NgxMaterialTimepickerThemeDirective.decorators = [
        { type: Directive, args: [{ selector: '[ngxMaterialTimepickerTheme]' },] }
    ];
    /** @nocollapse */
    NgxMaterialTimepickerThemeDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NgxMaterialTimepickerThemeDirective.propDecorators = {
        theme: [{ type: Input, args: ['ngxMaterialTimepickerTheme',] }]
    };
    return NgxMaterialTimepickerThemeDirective;
}());
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
    return Array(format).fill(1).map(function (v, i) {
        /** @type {?} */
        var angleStep = 30;
        /** @type {?} */
        var time = v + i;
        /** @type {?} */
        var angle = angleStep * time;
        return { time: time === 24 ? 0 : time, angle: angle };
    });
}
/**
 * @param {?} hours
 * @param {?} config
 * @return {?}
 */
function disableHours(hours, config) {
    if (config.min || config.max) {
        return hours.map(function (value) {
            /** @type {?} */
            var hour = config.format === 24 ? value.time : TimeAdapter.formatHour(value.time, config.format, config.period);
            /** @type {?} */
            var currentTime = DateTime.fromObject({ hour: hour }).toFormat(TimeFormat.TWELVE);
            return __assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours') });
        });
    }
    return hours;
}
/**
 * @param {?=} gap
 * @return {?}
 */
function getMinutes(gap) {
    if (gap === void 0) { gap = 1; }
    /** @type {?} */
    var minutesCount = 60;
    /** @type {?} */
    var angleStep = 360 / minutesCount;
    /** @type {?} */
    var minutes = [];
    for (var i = 0; i < minutesCount; i++) {
        /** @type {?} */
        var angle = angleStep * i;
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
        var hour_1 = TimeAdapter.formatHour(selectedHour, config.format, config.period);
        return minutes.map(function (value) {
            /** @type {?} */
            var currentTime = DateTime.fromObject({ hour: hour_1, minute: value.time }).toFormat(TimeFormat.TWELVE);
            return __assign({}, value, { disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'minutes') });
        });
    }
    return minutes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerHoursFace = /** @class */ (function () {
    function NgxMaterialTimepickerHoursFace(format) {
        this.hourChange = new EventEmitter();
        this.hourSelected = new EventEmitter();
        this.hoursList = [];
        this.hoursList = getHours(format);
    }
    /**
     * @param {?} time
     * @return {?}
     */
    NgxMaterialTimepickerHoursFace.prototype.onTimeSelected = /**
     * @param {?} time
     * @return {?}
     */
    function (time) {
        this.hourSelected.next(time);
    };
    NgxMaterialTimepickerHoursFace.propDecorators = {
        selectedHour: [{ type: Input }],
        minTime: [{ type: Input }],
        maxTime: [{ type: Input }],
        format: [{ type: Input }],
        hourChange: [{ type: Output }],
        hourSelected: [{ type: Output }]
    };
    return NgxMaterialTimepickerHoursFace;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepicker24HoursFaceComponent = /** @class */ (function (_super) {
    __extends(NgxMaterialTimepicker24HoursFaceComponent, _super);
    function NgxMaterialTimepicker24HoursFaceComponent() {
        return _super.call(this, 24) || this;
    }
    /**
     * @return {?}
     */
    NgxMaterialTimepicker24HoursFaceComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.hoursList = disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    };
    NgxMaterialTimepicker24HoursFaceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-24-hours-face',
                    template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\" [format]=\"format\"\r\n                              (timeChange)=\"hourChange.next($event)\"\r\n                              (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n"
                }] }
    ];
    /** @nocollapse */
    NgxMaterialTimepicker24HoursFaceComponent.ctorParameters = function () { return []; };
    return NgxMaterialTimepicker24HoursFaceComponent;
}(NgxMaterialTimepickerHoursFace));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepicker12HoursFaceComponent = /** @class */ (function (_super) {
    __extends(NgxMaterialTimepicker12HoursFaceComponent, _super);
    function NgxMaterialTimepicker12HoursFaceComponent() {
        return _super.call(this, 12) || this;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepicker12HoursFaceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
    NgxMaterialTimepicker12HoursFaceComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-12-hours-face',
                    template: "<ngx-material-timepicker-face [selectedTime]=\"selectedHour\" [faceTime]=\"hoursList\"\r\n                              (timeChange)=\"hourChange.next($event)\" (timeSelected)=\"onTimeSelected($event)\"></ngx-material-timepicker-face>\r\n"
                }] }
    ];
    /** @nocollapse */
    NgxMaterialTimepicker12HoursFaceComponent.ctorParameters = function () { return []; };
    NgxMaterialTimepicker12HoursFaceComponent.propDecorators = {
        period: [{ type: Input }]
    };
    return NgxMaterialTimepicker12HoursFaceComponent;
}(NgxMaterialTimepickerHoursFace));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerMinutesFaceComponent = /** @class */ (function () {
    function NgxMaterialTimepickerMinutesFaceComponent() {
        this.minutesList = [];
        this.timeUnit = TimeUnit;
        this.minuteChange = new EventEmitter();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepickerMinutesFaceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['period'] && changes['period'].currentValue) {
            /** @type {?} */
            var minutes = getMinutes(this.minutesGap);
            this.minutesList = disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
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
    return NgxMaterialTimepickerMinutesFaceComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};
var NgxMaterialTimepickerFaceComponent = /** @class */ (function () {
    function NgxMaterialTimepickerFaceComponent() {
        this.timeUnit = TimeUnit;
        this.innerClockFaceSize = 85;
        this.timeChange = new EventEmitter();
        this.timeSelected = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.setClockHandPosition();
        this.addTouchEvents();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        /** @type {?} */
        var faceTimeChanges = changes['faceTime'];
        /** @type {?} */
        var selectedTimeChanges = changes['selectedTime'];
        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(function (time) { return time.time === _this.selectedTime.time; });
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(function () { return _this.selectAvailableTime(); });
        }
    };
    /**
     * @param {?} _
     * @param {?} time
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.trackByTime = /**
     * @param {?} _
     * @param {?} time
     * @return {?}
     */
    function (_, time) {
        return time.time;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.onMousedown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        this.isStarted = true;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.selectTime = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        /** @type {?} */
        var clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();
        /* Get x0 and y0 of the circle */
        /** @type {?} */
        var centerX = clockFaceCords.left + clockFaceCords.width / 2;
        /** @type {?} */
        var centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        /** @type {?} */
        var arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        /** @type {?} */
        var circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        /** @type {?} */
        var isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        /** @type {?} */
        var angleStep = this.unit === TimeUnit.MINUTE ? 6 : 30;
        /** @type {?} */
        var roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);
        /** @type {?} */
        var angle = roundedAngle === 0 ? 360 : roundedAngle;
        /** @type {?} */
        var selectedTime = this.faceTime.find(function (val) { return val.angle === angle; });
        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);
            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next(selectedTime.time);
            }
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.onMouseup = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        e.preventDefault();
        this.isStarted = false;
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.isHourSelected = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        return (hour === this.selectedTime.time) && !this.isClockFaceDisabled;
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.isMinuteSelected = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        return ((this.selectedTime.time === minute) && (minute % (this.minutesGap || 5) === 0)) && !this.isClockFaceDisabled;
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.removeTouchEvents();
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.addTouchEvents = /**
     * @private
     * @return {?}
     */
    function () {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);
        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.removeTouchEvents = /**
     * @private
     * @return {?}
     */
    function () {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.setClockHandPosition = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            }
            else {
                this.increaseClockHand();
            }
        }
        this.clockHand.nativeElement.style.transform = "rotate(" + this.selectedTime.angle + "deg)";
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.selectAvailableTime = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var currentTime = this.faceTime.find(function (time) { return _this.selectedTime.time === time.time; });
        this.isClockFaceDisabled = this.faceTime.every(function (time) { return time.disabled; });
        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            /** @type {?} */
            var availableTime = this.faceTime.find(function (time) { return !time.disabled; });
            this.timeChange.next(availableTime);
        }
    };
    /**
     * @private
     * @param {?} x0
     * @param {?} y0
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.isInnerClockFace = /**
     * @private
     * @param {?} x0
     * @param {?} y0
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x0, y0, x, y) {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.decreaseClockHand = /**
     * @private
     * @return {?}
     */
    function () {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    };
    /**
     * @private
     * @return {?}
     */
    NgxMaterialTimepickerFaceComponent.prototype.increaseClockHand = /**
     * @private
     * @return {?}
     */
    function () {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    };
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
    return NgxMaterialTimepickerFaceComponent;
}());
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
var NgxMaterialTimepickerButtonComponent = /** @class */ (function () {
    function NgxMaterialTimepickerButtonComponent() {
    }
    NgxMaterialTimepickerButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-material-timepicker-button',
                    template: "<button class=\"timepicker-button\" type=\"button\">\r\n  <span><ng-content></ng-content></span>\r\n</button>\r\n",
                    styles: [".timepicker-button{display:inline-block;height:36px;min-width:88px;line-height:36px;border:12px;border-radius:2px;background-color:transparent;text-align:center;transition:450ms cubic-bezier(.23,1,.32,1);overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative;cursor:pointer;outline:0;color:#00bfff}@supports (color:var(--button-color)){.timepicker-button{color:var(--button-color)}}.timepicker-button:focus,.timepicker-button:hover{background-color:rgba(153,153,153,.2)}.timepicker-button>span{font-size:14px;text-transform:uppercase;font-weight:600;padding-left:16px;padding-right:16px;font-family:Roboto,sans-serif}@supports (font-family:var(--primary-font-family)){.timepicker-button>span{font-family:var(--primary-font-family)}}"]
                }] }
    ];
    return NgxMaterialTimepickerButtonComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerDialComponent = /** @class */ (function () {
    function NgxMaterialTimepickerDialComponent() {
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
    NgxMaterialTimepickerDialComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            /** @type {?} */
            var hours = getHours(this.format);
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
            var minutes = getMinutes(this.minutesGap);
            this.minutes = disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    };
    /**
     * @param {?} unit
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeTimeUnit = /**
     * @param {?} unit
     * @return {?}
     */
    function (unit) {
        this.timeUnitChanged.next(unit);
    };
    /**
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changePeriod = /**
     * @param {?} period
     * @return {?}
     */
    function (period) {
        this.periodChanged.next(period);
    };
    /**
     * @param {?} hour
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeHour = /**
     * @param {?} hour
     * @return {?}
     */
    function (hour) {
        this.hourChanged.next(hour);
    };
    /**
     * @param {?} minute
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.changeMinute = /**
     * @param {?} minute
     * @return {?}
     */
    function (minute) {
        this.minuteChanged.next(minute);
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.showHint = /**
     * @return {?}
     */
    function () {
        this.isHintVisible = true;
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerDialComponent.prototype.hideHint = /**
     * @return {?}
     */
    function () {
        this.isHintVisible = false;
    };
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
    return NgxMaterialTimepickerDialComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerPeriodComponent = /** @class */ (function () {
    function NgxMaterialTimepickerPeriodComponent() {
        this.timePeriod = TimePeriod;
        this.isPeriodAvailable = true;
        this.periodChanged = new EventEmitter();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.changePeriod = /**
     * @param {?} period
     * @return {?}
     */
    function (period) {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    };
    /**
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.animationDone = /**
     * @return {?}
     */
    function () {
        this.isPeriodAvailable = true;
    };
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.isSwitchPeriodAvailable = /**
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        /** @type {?} */
        var time = this.getDisabledTimeByPeriod(period);
        return !time.every(function (t) { return t.disabled; });
    };
    /**
     * @private
     * @param {?} period
     * @return {?}
     */
    NgxMaterialTimepickerPeriodComponent.prototype.getDisabledTimeByPeriod = /**
     * @private
     * @param {?} period
     * @return {?}
     */
    function (period) {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            case TimeUnit.MINUTE:
                return disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period: period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    };
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
    return NgxMaterialTimepickerPeriodComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StyleSanitizerPipe = /** @class */ (function () {
    function StyleSanitizerPipe(domSanitizer) {
        this.domSanitizer = domSanitizer;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    StyleSanitizerPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return value;
        }
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    };
    StyleSanitizerPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'styleSanitizer'
                },] }
    ];
    /** @nocollapse */
    StyleSanitizerPipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return StyleSanitizerPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OverlayDirective = /** @class */ (function () {
    function OverlayDirective(eventService) {
        this.eventService = eventService;
    }
    /**
     * @param {?} e
     * @return {?}
     */
    OverlayDirective.prototype.onClick = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!this.preventClick) {
            this.eventService.dispatchEvent(e);
        }
        e.preventDefault();
    };
    OverlayDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[overlay]'
                },] }
    ];
    /** @nocollapse */
    OverlayDirective.ctorParameters = function () { return [
        { type: NgxMaterialTimepickerEventService }
    ]; };
    OverlayDirective.propDecorators = {
        preventClick: [{ type: Input, args: ['overlay',] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }]
    };
    return OverlayDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(element, document) {
        this.element = element;
        this.document = document;
        this.activeElement = this.document.activeElement;
    }
    /**
     * @return {?}
     */
    AutofocusDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.isFocusActive) {
            // To avoid ExpressionChangedAfterItHasBeenCheckedError;
            setTimeout(function () { return _this.element.nativeElement.focus(); });
        }
    };
    /**
     * @return {?}
     */
    AutofocusDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // To avoid ExpressionChangedAfterItHasBeenCheckedError;
        setTimeout(function () { return _this.activeElement.focus(); });
    };
    AutofocusDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[timepickerAutofocus]'
                },] }
    ];
    /** @nocollapse */
    AutofocusDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    AutofocusDirective.propDecorators = {
        isFocusActive: [{ type: Input, args: ['timepickerAutofocus',] }]
    };
    return AutofocusDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxMaterialTimepickerModule = /** @class */ (function () {
    function NgxMaterialTimepickerModule() {
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
    return NgxMaterialTimepickerModule;
}());

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