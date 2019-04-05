/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
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
export { NgxMaterialTimepickerFaceComponent };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.timeUnit;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.isClockFaceDisabled;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.innerClockFaceSize;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.faceTime;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.selectedTime;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.unit;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.format;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.minutesGap;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.timeChange;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.timeSelected;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.clockFace;
    /** @type {?} */
    NgxMaterialTimepickerFaceComponent.prototype.clockHand;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerFaceComponent.prototype.isStarted;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerFaceComponent.prototype.touchStartHandler;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerFaceComponent.prototype.touchEndHandler;
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9jb21wb25lbnRzL3RpbWVwaWNrZXItZmFjZS9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUVILHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sRUFFTixTQUFTLEVBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQUVqRCxpQkFBaUIsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsTUFBTTtRQUNkLEdBQUcsRUFBRSxrQkFBa0I7S0FDMUI7SUFDRCxLQUFLLEVBQUU7UUFDSCxNQUFNLEVBQUUsT0FBTztRQUNmLEdBQUcsRUFBRSxtQkFBbUI7S0FDM0I7Q0FDSjtBQUVEO0lBQUE7UUFRSSxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBR3BCLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQVFkLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQUMvQyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUF1SnhELENBQUM7Ozs7SUE5SUcsNERBQWU7OztJQUFmO1FBQ0ksSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsd0RBQVc7Ozs7SUFBWCxVQUFZLE9BQXNCO1FBQWxDLGlCQWdCQzs7WUFmUyxlQUFlLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7WUFDckMsbUJBQW1CLEdBQUcs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Ozs7O0lBQzNCLCtEQUFxQzs7Ozs7SUFDckMsNkRBQW1DOzs7Ozs7O0FBa0p2QyxTQUFTLFVBQVUsQ0FBQyxLQUFhLEVBQUUsSUFBWTtJQUMzQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMzQyxDQUFDOzs7Ozs7Ozs7QUFFRCxTQUFTLGlCQUFpQixDQUFDLEVBQVUsRUFBRSxFQUFVLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxZQUFvQjtJQUN6RixJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFDLGFBQWE7UUFDakMsT0FBTyxHQUFHLEdBQUcsWUFBWSxDQUFDO0tBQzdCO1NBQU0sSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBQyxjQUFjO1FBQ3hDLE9BQU8sR0FBRyxHQUFHLFlBQVksQ0FBQztLQUM3QjtTQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUMsYUFBYTtRQUN2QyxPQUFPLEdBQUcsR0FBRyxZQUFZLENBQUM7S0FDN0I7U0FBTSxFQUFDLFlBQVk7UUFDaEIsT0FBTyxZQUFZLENBQUM7S0FDdkI7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEFmdGVyVmlld0luaXQsXHJcbiAgICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICAgIENvbXBvbmVudCxcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBIb3N0TGlzdGVuZXIsXHJcbiAgICBJbnB1dCxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSxcclxuICAgIE91dHB1dCxcclxuICAgIFNpbXBsZUNoYW5nZXMsXHJcbiAgICBWaWV3Q2hpbGRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2xvY2tGYWNlVGltZSB9IGZyb20gJy4uLy4uL21vZGVscy9jbG9jay1mYWNlLXRpbWUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgVGltZVVuaXQgfSBmcm9tICcuLi8uLi9tb2RlbHMvdGltZS11bml0LmVudW0nO1xyXG5cclxuY29uc3QgQ0xPQ0tfSEFORF9TVFlMRVMgPSB7XHJcbiAgICBzbWFsbDoge1xyXG4gICAgICAgIGhlaWdodDogJzc1cHgnLFxyXG4gICAgICAgIHRvcDogJ2NhbGMoNTAlIC0gNzVweCknXHJcbiAgICB9LFxyXG4gICAgbGFyZ2U6IHtcclxuICAgICAgICBoZWlnaHQ6ICcxMDNweCcsXHJcbiAgICAgICAgdG9wOiAnY2FsYyg1MCUgLSAxMDNweCknXHJcbiAgICB9XHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZmFjZS5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci1mYWNlLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmd4TWF0ZXJpYWxUaW1lcGlja2VyRmFjZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgICB0aW1lVW5pdCA9IFRpbWVVbml0O1xyXG5cclxuICAgIGlzQ2xvY2tGYWNlRGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBpbm5lckNsb2NrRmFjZVNpemUgPSA4NTtcclxuXHJcbiAgICBASW5wdXQoKSBmYWNlVGltZTogQ2xvY2tGYWNlVGltZVtdO1xyXG4gICAgQElucHV0KCkgc2VsZWN0ZWRUaW1lOiBDbG9ja0ZhY2VUaW1lO1xyXG4gICAgQElucHV0KCkgdW5pdDogVGltZVVuaXQ7XHJcbiAgICBASW5wdXQoKSBmb3JtYXQ6IG51bWJlcjtcclxuICAgIEBJbnB1dCgpIG1pbnV0ZXNHYXA6IG51bWJlcjtcclxuXHJcbiAgICBAT3V0cHV0KCkgdGltZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q2xvY2tGYWNlVGltZT4oKTtcclxuICAgIEBPdXRwdXQoKSB0aW1lU2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdjbG9ja0ZhY2UnKSBjbG9ja0ZhY2U6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKCdjbG9ja0hhbmQnKSBjbG9ja0hhbmQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgcHJpdmF0ZSBpc1N0YXJ0ZWQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHRvdWNoU3RhcnRIYW5kbGVyOiAoKSA9PiBhbnk7XHJcbiAgICBwcml2YXRlIHRvdWNoRW5kSGFuZGxlcjogKCkgPT4gYW55O1xyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldENsb2NrSGFuZFBvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5hZGRUb3VjaEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBjb25zdCBmYWNlVGltZUNoYW5nZXMgPSBjaGFuZ2VzWydmYWNlVGltZSddO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGltZUNoYW5nZXMgPSBjaGFuZ2VzWydzZWxlY3RlZFRpbWUnXTtcclxuXHJcbiAgICAgICAgaWYgKChmYWNlVGltZUNoYW5nZXMgJiYgZmFjZVRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSlcclxuICAgICAgICAgICAgJiYgKHNlbGVjdGVkVGltZUNoYW5nZXMgJiYgc2VsZWN0ZWRUaW1lQ2hhbmdlcy5jdXJyZW50VmFsdWUpKSB7XHJcbiAgICAgICAgICAgIC8qIFNldCB0aW1lIGFjY29yZGluZyB0byBwYXNzZWQgYW4gaW5wdXQgdmFsdWUgKi9cclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZFRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodGltZSA9PiB0aW1lLnRpbWUgPT09IHRoaXMuc2VsZWN0ZWRUaW1lLnRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZWN0ZWRUaW1lQ2hhbmdlcyAmJiBzZWxlY3RlZFRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldENsb2NrSGFuZFBvc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmYWNlVGltZUNoYW5nZXMgJiYgZmFjZVRpbWVDaGFuZ2VzLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBUbyBhdm9pZCBhbiBlcnJvciBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZWxlY3RBdmFpbGFibGVUaW1lKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgdHJhY2tCeVRpbWUoXywgdGltZTogQ2xvY2tGYWNlVGltZSk6IHN0cmluZyB8IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRpbWUudGltZTtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKVxyXG4gICAgb25Nb3VzZWRvd24oZTogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGhpcy5pc1N0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIEBIb3N0TGlzdGVuZXIoJ3RvdWNobW92ZScsIFsnJGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdJ10pXHJcbiAgICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsnJGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdJ10pXHJcbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZW1vdmUnLCBbJyRldmVudCddKVxyXG4gICAgc2VsZWN0VGltZShlOiBNb3VzZUV2ZW50IHwgVG91Y2gpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RhcnRlZCAmJiAoZSBpbnN0YW5jZW9mIE1vdXNlRXZlbnQgJiYgZS50eXBlICE9PSAnY2xpY2snKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNsb2NrRmFjZUNvcmRzID0gdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgLyogR2V0IHgwIGFuZCB5MCBvZiB0aGUgY2lyY2xlICovXHJcbiAgICAgICAgY29uc3QgY2VudGVyWCA9IGNsb2NrRmFjZUNvcmRzLmxlZnQgKyBjbG9ja0ZhY2VDb3Jkcy53aWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgY2VudGVyWSA9IGNsb2NrRmFjZUNvcmRzLnRvcCArIGNsb2NrRmFjZUNvcmRzLmhlaWdodCAvIDI7XHJcbiAgICAgICAgLyogQ291bnRpbmcgdGhlIGFyY3RhbmdlbnQgYW5kIGNvbnZlcnQgaXQgdG8gZnJvbSByYWRpYW4gdG8gZGVnICovXHJcbiAgICAgICAgY29uc3QgYXJjdGFuZ2VudCA9IE1hdGguYXRhbihNYXRoLmFicyhlLmNsaWVudFggLSBjZW50ZXJYKSAvIE1hdGguYWJzKGUuY2xpZW50WSAtIGNlbnRlclkpKSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgLyogR2V0IGFuZ2xlIGFjY29yZGluZyB0byBxdWFkcmFudCAqL1xyXG4gICAgICAgIGNvbnN0IGNpcmNsZUFuZ2xlID0gY291bnRBbmdsZUJ5Q29yZHMoY2VudGVyWCwgY2VudGVyWSwgZS5jbGllbnRYLCBlLmNsaWVudFksIGFyY3RhbmdlbnQpO1xyXG4gICAgICAgIC8qIENoZWNrIGlmIHNlbGVjdGVkIHRpbWUgZnJvbSB0aGUgaW5uZXIgY2xvY2sgZmFjZSAoMjQgaG91cnMgZm9ybWF0IG9ubHkpICovXHJcbiAgICAgICAgY29uc3QgaXNJbm5lckNsb2NrQ2hvc2VuID0gdGhpcy5mb3JtYXQgJiYgdGhpcy5pc0lubmVyQ2xvY2tGYWNlKGNlbnRlclgsIGNlbnRlclksIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgICAgICAvKiBSb3VuZCBhbmdsZSBhY2NvcmRpbmcgdG8gYW5nbGUgc3RlcCAqL1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlU3RlcCA9IHRoaXMudW5pdCA9PT0gVGltZVVuaXQuTUlOVVRFID8gNiA6IDMwO1xyXG4gICAgICAgIGNvbnN0IHJvdW5kZWRBbmdsZSA9IGlzSW5uZXJDbG9ja0Nob3NlblxyXG4gICAgICAgICAgICA/IHJvdW5kQW5nbGUoY2lyY2xlQW5nbGUsIGFuZ2xlU3RlcCkgKyAzNjBcclxuICAgICAgICAgICAgOiByb3VuZEFuZ2xlKGNpcmNsZUFuZ2xlLCBhbmdsZVN0ZXApO1xyXG4gICAgICAgIGNvbnN0IGFuZ2xlID0gcm91bmRlZEFuZ2xlID09PSAwID8gMzYwIDogcm91bmRlZEFuZ2xlO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZFRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodmFsID0+IHZhbC5hbmdsZSA9PT0gYW5nbGUpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRUaW1lICYmICFzZWxlY3RlZFRpbWUuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlLm5leHQoc2VsZWN0ZWRUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIC8qIFRvIGxldCBrbm93IHdoZXRoZXIgdXNlciBlbmRlZCBpbnRlcmFjdGlvbiB3aXRoIGNsb2NrIGZhY2UgKi9cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU3RhcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aW1lU2VsZWN0ZWQubmV4dChzZWxlY3RlZFRpbWUudGltZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNldXAnLCBbJyRldmVudCddKVxyXG4gICAgb25Nb3VzZXVwKGU6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuaXNTdGFydGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaXNIb3VyU2VsZWN0ZWQoaG91cjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIChob3VyID09PSB0aGlzLnNlbGVjdGVkVGltZS50aW1lKSAmJiAhdGhpcy5pc0Nsb2NrRmFjZURpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGlzTWludXRlU2VsZWN0ZWQobWludXRlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKCh0aGlzLnNlbGVjdGVkVGltZS50aW1lID09PSBtaW51dGUpICYmIChtaW51dGUgJSAodGhpcy5taW51dGVzR2FwIHx8IDUpID09PSAwKSkgJiYgIXRoaXMuaXNDbG9ja0ZhY2VEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVRvdWNoRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRUb3VjaEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvdWNoU3RhcnRIYW5kbGVyID0gdGhpcy5vbk1vdXNlZG93bi5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudG91Y2hFbmRIYW5kbGVyID0gdGhpcy5vbk1vdXNldXAuYmluZCh0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy50b3VjaFN0YXJ0SGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5jbG9ja0ZhY2UubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMudG91Y2hFbmRIYW5kbGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZVRvdWNoRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMudG91Y2hTdGFydEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuY2xvY2tGYWNlLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRW5kSGFuZGxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRDbG9ja0hhbmRQb3NpdGlvbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5mb3JtYXQgPT09IDI0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVGltZS50aW1lID4gMTIgfHwgdGhpcy5zZWxlY3RlZFRpbWUudGltZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZUNsb2NrSGFuZCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmNyZWFzZUNsb2NrSGFuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnNlbGVjdGVkVGltZS5hbmdsZX1kZWcpYDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbGVjdEF2YWlsYWJsZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSB0aGlzLmZhY2VUaW1lLmZpbmQodGltZSA9PiB0aGlzLnNlbGVjdGVkVGltZS50aW1lID09PSB0aW1lLnRpbWUpO1xyXG4gICAgICAgIHRoaXMuaXNDbG9ja0ZhY2VEaXNhYmxlZCA9IHRoaXMuZmFjZVRpbWUuZXZlcnkodGltZSA9PiB0aW1lLmRpc2FibGVkKTtcclxuXHJcbiAgICAgICAgaWYgKChjdXJyZW50VGltZSAmJiBjdXJyZW50VGltZS5kaXNhYmxlZCkgJiYgIXRoaXMuaXNDbG9ja0ZhY2VEaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBhdmFpbGFibGVUaW1lID0gdGhpcy5mYWNlVGltZS5maW5kKHRpbWUgPT4gIXRpbWUuZGlzYWJsZWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50aW1lQ2hhbmdlLm5leHQoYXZhaWxhYmxlVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNJbm5lckNsb2NrRmFjZSh4MDogbnVtYmVyLCB5MDogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIC8qIERldGVjdCB3aGV0aGVyIHRpbWUgZnJvbSB0aGUgaW5uZXIgY2xvY2sgZmFjZSBvciBub3QgKDI0IGZvcm1hdCBvbmx5KSAqL1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeCAtIHgwLCAyKSArIE1hdGgucG93KHkgLSB5MCwgMikpIDwgdGhpcy5pbm5lckNsb2NrRmFjZVNpemU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkZWNyZWFzZUNsb2NrSGFuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IENMT0NLX0hBTkRfU1RZTEVTLnNtYWxsLmhlaWdodDtcclxuICAgICAgICB0aGlzLmNsb2NrSGFuZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IENMT0NLX0hBTkRfU1RZTEVTLnNtYWxsLnRvcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluY3JlYXNlQ2xvY2tIYW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xvY2tIYW5kLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gQ0xPQ0tfSEFORF9TVFlMRVMubGFyZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuY2xvY2tIYW5kLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gQ0xPQ0tfSEFORF9TVFlMRVMubGFyZ2UudG9wO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByb3VuZEFuZ2xlKGFuZ2xlOiBudW1iZXIsIHN0ZXA6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChhbmdsZSAvIHN0ZXApICogc3RlcDtcclxufVxyXG5cclxuZnVuY3Rpb24gY291bnRBbmdsZUJ5Q29yZHMoeDA6IG51bWJlciwgeTA6IG51bWJlciwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGN1cnJlbnRBbmdsZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGlmICh5ID4geTAgJiYgeCA+PSB4MCkgey8vIElJIHF1YXJ0ZXJcclxuICAgICAgICByZXR1cm4gMTgwIC0gY3VycmVudEFuZ2xlO1xyXG4gICAgfSBlbHNlIGlmICh5ID4geTAgJiYgeCA8IHgwKSB7Ly8gSUlJIHF1YXJ0ZXJcclxuICAgICAgICByZXR1cm4gMTgwICsgY3VycmVudEFuZ2xlO1xyXG4gICAgfSBlbHNlIGlmICh5IDwgeTAgJiYgeCA8IHgwKSB7Ly8gSVYgcXVhcnRlclxyXG4gICAgICAgIHJldHVybiAzNjAgLSBjdXJyZW50QW5nbGU7XHJcbiAgICB9IGVsc2Ugey8vIEkgcXVhcnRlclxyXG4gICAgICAgIHJldHVybiBjdXJyZW50QW5nbGU7XHJcbiAgICB9XHJcbn1cclxuIl19