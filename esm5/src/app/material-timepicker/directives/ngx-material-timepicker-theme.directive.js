/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
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
export { NgxMaterialTimepickerThemeDirective };
if (false) {
    /** @type {?} */
    NgxMaterialTimepickerThemeDirective.prototype.theme;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerThemeDirective.prototype.element;
}
/**
 * @param {?} myStr
 * @return {?}
 */
function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHMUU7SUFPSSw2Q0FBWSxVQUFzQjtRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVELDZEQUFlOzs7SUFBZjtRQUNJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sc0RBQVE7Ozs7O0lBQWhCLFVBQWlCLEtBQUs7UUFDbEIsS0FBSyxJQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsS0FBSyxJQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7d0JBQ3RCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQUssZUFBZSxDQUFDLElBQUksQ0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUM3RTtxQkFDSjtvQkFDRCxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FFSjtJQUNMLENBQUM7O2dCQWhDSixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsOEJBQThCLEVBQUM7Ozs7Z0JBSG5CLFVBQVU7Ozt3QkFNdkMsS0FBSyxTQUFDLDRCQUE0Qjs7SUE4QnZDLDBDQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0FoQ1ksbUNBQW1DOzs7SUFFNUMsb0RBQXVFOzs7OztJQUV2RSxzREFBNkI7Ozs7OztBQThCakMsU0FBUyxlQUFlLENBQUMsS0FBSztJQUMxQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWV9IGZyb20gJy4uL21vZGVscy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5pbnRlcmZhY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWVdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIEBJbnB1dCgnbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUnKSB0aGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XHJcblxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy50aGVtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRoZW1lKHRoaXMudGhlbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRoZW1lKHRoZW1lKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCB2YWwgaW4gdGhlbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoZW1lLmhhc093blByb3BlcnR5KHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbWVbdmFsXSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhlbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZW1lLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoYC0tJHtjYW1lbENhc2VUb0Rhc2gocHJvcCl9YCwgdGhlbWVbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGhlbWUodGhlbWVbdmFsXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW1lbENhc2VUb0Rhc2gobXlTdHIpIHtcclxuICAgIHJldHVybiBteVN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcbiJdfQ==