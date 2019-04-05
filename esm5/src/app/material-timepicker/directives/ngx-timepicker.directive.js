/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
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
export { TimepickerDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._format;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._min;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._max;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._timepicker;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype._value;
    /** @type {?} */
    TimepickerDirective.prototype.disabled;
    /** @type {?} */
    TimepickerDirective.prototype.disableClick;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype.timepickerSubscriptions;
    /** @type {?} */
    TimepickerDirective.prototype.onTouched;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype.onChange;
    /**
     * @type {?}
     * @private
     */
    TimepickerDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztJQUdqRCxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsbUJBQW1CLEVBQW5CLENBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDZDtBQUVEO0lBNEZJLDZCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBeEVsQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBMkRiLFdBQU0sR0FBRyxFQUFFLENBQUM7UUFLWiw0QkFBdUIsR0FBbUIsRUFBRSxDQUFDO1FBRXJELGNBQVMsR0FBRztRQUNaLENBQUMsQ0FBQTtRQUVPLGFBQVEsR0FBeUI7UUFDekMsQ0FBQyxDQUFBO0lBR0QsQ0FBQztJQWxGRCxzQkFDSSx1Q0FBTTs7OztRQUlWO1lBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7Ozs7O1FBUEQsVUFDVyxLQUFhO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFD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ZFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi4vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgVGltZUFkYXB0ZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy90aW1lLWFkYXB0ZXInO1xyXG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJ2x1eG9uJztcclxuXHJcbmNvbnN0IFZBTFVFX0FDQ0VTU09SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRpbWVwaWNrZXJEaXJlY3RpdmUpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbbmd4VGltZXBpY2tlcl0nLFxyXG4gICAgcHJvdmlkZXJzOiBbVkFMVUVfQUNDRVNTT1JdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICAgICAnKGlucHV0KSc6ICdvbklucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICAgICAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJyxcclxuICAgIH0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IGZvcm1hdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fZm9ybWF0ID0gdmFsdWUgPT09IDI0ID8gMjQgOiAxMjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZm9ybWF0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9mb3JtYXQgPSAxMjtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG1pbih2YWx1ZTogc3RyaW5nIHwgRGF0ZVRpbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLl9taW4gPSBUaW1lQWRhcHRlci5jb252ZXJ0VGltZVRvRGF0ZVRpbWUodmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21pbiA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtaW4oKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9taW47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWluOiBzdHJpbmcgfCBEYXRlVGltZTtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IG1heCh2YWx1ZTogc3RyaW5nIHwgRGF0ZVRpbWUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXggPSBUaW1lQWRhcHRlci5jb252ZXJ0VGltZVRvRGF0ZVRpbWUodmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21heCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBtYXgoKTogc3RyaW5nIHwgRGF0ZVRpbWUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tYXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfbWF4OiBzdHJpbmcgfCBEYXRlVGltZTtcclxuXHJcbiAgICBASW5wdXQoJ25neFRpbWVwaWNrZXInKVxyXG4gICAgc2V0IHRpbWVwaWNrZXIocGlja2VyOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3RpbWVwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudDtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRpbWUgPSBUaW1lQWRhcHRlci5mb3JtYXRUaW1lKHZhbHVlLCB0aGlzLl9mb3JtYXQpO1xyXG4gICAgICAgIGlmIChUaW1lQWRhcHRlci5pc1RpbWVBdmFpbGFibGUodGltZSwgPERhdGVUaW1lPnRoaXMuX21pbiwgPERhdGVUaW1lPnRoaXMuX21heCwgJ21pbnV0ZXMnLCB0aGlzLl90aW1lcGlja2VyLm1pbnV0ZXNHYXApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdGltZTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnB1dFZhbHVlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdTZWxlY3RlZCB0aW1lIGRvZXNuXFwndCBtYXRjaCBtaW4gb3IgbWF4IHZhbHVlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3ZhbHVlID0gJyc7XHJcblxyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlQ2xpY2s6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSB0aW1lcGlja2VyU3Vic2NyaXB0aW9uczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuXHJcbiAgICBvblRvdWNoZWQgPSAoKSA9PiB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZTogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXQgZGVmYXVsdFRpbWUodGltZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZXBpY2tlci5zZXREZWZhdWx0VGltZSh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBvbklucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzWyd2YWx1ZSddICYmIGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxyXG4gICAgb25DbGljayhldmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5vcGVuKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0VGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLmZvckVhY2gocyA9PiBzLnVuc3Vic2NyaWJlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVnaXN0ZXJUaW1lcGlja2VyKHBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHBpY2tlcikge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyID0gcGlja2VyO1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLnJlZ2lzdGVySW5wdXQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclN1YnNjcmlwdGlvbnMucHVzaCh0aGlzLl90aW1lcGlja2VyLnRpbWVTZXQuc3Vic2NyaWJlKCh0aW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSh0aGlzLl92YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMudGltZXBpY2tlclN1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIuY2xvc2VkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmRlZmF1bHRUaW1lID0gdGhpcy5fdmFsdWUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCBpcyBub3QgZGVmaW5lZC4nICtcclxuICAgICAgICAgICAgICAgICcgUGxlYXNlIG1ha2Ugc3VyZSB5b3UgcGFzc2VkIHRoZSB0aW1lcGlja2VyIHRvIG5neFRpbWVwaWNrZXIgZGlyZWN0aXZlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXRWYWx1ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iXX0=