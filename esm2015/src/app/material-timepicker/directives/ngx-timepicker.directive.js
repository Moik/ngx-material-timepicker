/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, forwardRef, HostListener, Input } from '@angular/core';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimeAdapter } from '../services/time-adapter';
/** @type {?} */
const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TimepickerDirective),
    multi: true
};
export class TimepickerDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtdGltZXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0RixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztNQUdqRCxjQUFjLEdBQUc7SUFDbkIsT0FBTyxFQUFFLGlCQUFpQjs7SUFFMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNsRCxLQUFLLEVBQUUsSUFBSTtDQUNkO0FBV0QsTUFBTSxPQUFPLG1CQUFtQjs7OztJQW1GNUIsWUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQXhFbEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQTJEYixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBS1osNEJBQXVCLEdBQW1CLEVBQUUsQ0FBQztRQUVyRCxjQUFTLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLENBQUMsQ0FBQTtRQUVPLGFBQVEsR0FBeUIsR0FBRyxFQUFFO1FBQzlDLENBQUMsQ0FBQTtJQUdELENBQUM7Ozs7O0lBbEZELElBQ0ksTUFBTSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJ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O1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxnREFBZ0Q7Z0JBQzVELHdFQUF3RSxDQUFDLENBQUM7U0FDakY7SUFDTCxDQUFDOzs7OztJQUVPLGdCQUFnQjtRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNyRCxDQUFDOzs7WUE5SkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQztnQkFDM0IsSUFBSSxFQUFFO29CQUNGLFlBQVksRUFBRSxVQUFVO29CQUN4QixTQUFTLEVBQUUsOEJBQThCO29CQUN6QyxRQUFRLEVBQUUsYUFBYTtpQkFDMUI7YUFDSjs7OztZQXRCbUIsVUFBVTs7O3FCQXlCekIsS0FBSztrQkFXTCxLQUFLO2tCQWVMLEtBQUs7eUJBZUwsS0FBSyxTQUFDLGVBQWU7b0JBT3JCLEtBQUs7dUJBc0JMLEtBQUs7MkJBQ0wsS0FBSztzQkE0QkwsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Ozs7OztJQTFGakMsc0NBQXFCOzs7OztJQWVyQixtQ0FBZ0M7Ozs7O0lBZWhDLG1DQUFnQzs7Ozs7SUFPaEMsMENBQW9EOzs7OztJQXNCcEQscUNBQW9COztJQUVwQix1Q0FBMkI7O0lBQzNCLDJDQUErQjs7Ozs7SUFFL0Isc0RBQXFEOztJQUVyRCx3Q0FDQzs7Ozs7SUFFRCx1Q0FDQzs7Ozs7SUFFVyx5Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4uL25neC1tYXRlcmlhbC10aW1lcGlja2VyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFRpbWVBZGFwdGVyIH0gZnJvbSAnLi4vc2VydmljZXMvdGltZS1hZGFwdGVyJztcclxuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICdsdXhvbic7XHJcblxyXG5jb25zdCBWQUxVRV9BQ0NFU1NPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUaW1lcGlja2VyRGlyZWN0aXZlKSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW25neFRpbWVwaWNrZXJdJyxcclxuICAgIHByb3ZpZGVyczogW1ZBTFVFX0FDQ0VTU09SXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2Rpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgJyhpbnB1dCknOiAnb25JbnB1dCgkZXZlbnQudGFyZ2V0LnZhbHVlKScsXHJcbiAgICAgICAgJyhibHVyKSc6ICdvblRvdWNoZWQoKScsXHJcbiAgICB9LFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZXBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBmb3JtYXQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2Zvcm1hdCA9IHZhbHVlID09PSAyNCA/IDI0IDogMTI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGZvcm1hdCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfZm9ybWF0ID0gMTI7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBtaW4odmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWluID0gVGltZUFkYXB0ZXIuY29udmVydFRpbWVUb0RhdGVUaW1lKHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9taW4gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWluKCk6IHN0cmluZyB8IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWluO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21pbjogc3RyaW5nIHwgRGF0ZVRpbWU7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBtYXgodmFsdWU6IHN0cmluZyB8IERhdGVUaW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWF4ID0gVGltZUFkYXB0ZXIuY29udmVydFRpbWVUb0RhdGVUaW1lKHZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tYXggPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbWF4KCk6IHN0cmluZyB8IERhdGVUaW1lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX21heDogc3RyaW5nIHwgRGF0ZVRpbWU7XHJcblxyXG4gICAgQElucHV0KCduZ3hUaW1lcGlja2VyJylcclxuICAgIHNldCB0aW1lcGlja2VyKHBpY2tlcjogTmd4TWF0ZXJpYWxUaW1lcGlja2VyQ29tcG9uZW50KSB7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlclRpbWVwaWNrZXIocGlja2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF90aW1lcGlja2VyOiBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQ7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0VmFsdWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB0aW1lID0gVGltZUFkYXB0ZXIuZm9ybWF0VGltZSh2YWx1ZSwgdGhpcy5fZm9ybWF0KTtcclxuICAgICAgICBpZiAoVGltZUFkYXB0ZXIuaXNUaW1lQXZhaWxhYmxlKHRpbWUsIDxEYXRlVGltZT50aGlzLl9taW4sIDxEYXRlVGltZT50aGlzLl9tYXgsICdtaW51dGVzJywgdGhpcy5fdGltZXBpY2tlci5taW51dGVzR2FwKSkge1xyXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW5wdXRWYWx1ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUud2FybignU2VsZWN0ZWQgdGltZSBkb2VzblxcJ3QgbWF0Y2ggbWluIG9yIG1heCB2YWx1ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF92YWx1ZSA9ICcnO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZUNsaWNrOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgdGltZXBpY2tlclN1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcblxyXG4gICAgb25Ub3VjaGVkID0gKCkgPT4ge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DaGFuZ2U6ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0IGRlZmF1bHRUaW1lKHRpbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX3RpbWVwaWNrZXIuc2V0RGVmYXVsdFRpbWUodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25JbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlc1sndmFsdWUnXSAmJiBjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRUaW1lID0gY2hhbmdlc1sndmFsdWUnXS5jdXJyZW50VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZUNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXIub3BlbigpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdFRpbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy50aW1lcGlja2VyU3Vic2NyaXB0aW9ucy5mb3JFYWNoKHMgPT4gcy51bnN1YnNjcmliZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdGVyVGltZXBpY2tlcihwaWNrZXI6IE5neE1hdGVyaWFsVGltZXBpY2tlckNvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChwaWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlciA9IHBpY2tlcjtcclxuICAgICAgICAgICAgdGhpcy5fdGltZXBpY2tlci5yZWdpc3RlcklucHV0KHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLnB1c2godGhpcy5fdGltZXBpY2tlci50aW1lU2V0LnN1YnNjcmliZSgodGltZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGltZTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy5fdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLnRpbWVwaWNrZXJTdWJzY3JpcHRpb25zLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90aW1lcGlja2VyLmNsb3NlZC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5kZWZhdWx0VGltZSA9IHRoaXMuX3ZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZ3hNYXRlcmlhbFRpbWVwaWNrZXJDb21wb25lbnQgaXMgbm90IGRlZmluZWQuJyArXHJcbiAgICAgICAgICAgICAgICAnIFBsZWFzZSBtYWtlIHN1cmUgeW91IHBhc3NlZCB0aGUgdGltZXBpY2tlciB0byBuZ3hUaW1lcGlja2VyIGRpcmVjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0VmFsdWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19