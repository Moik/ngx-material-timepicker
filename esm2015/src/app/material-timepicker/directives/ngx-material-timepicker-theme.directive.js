/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
export class NgxMaterialTimepickerThemeDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItdGhlbWUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW1hdGVyaWFsLXRpbWVwaWNrZXIvIiwic291cmNlcyI6WyJzcmMvYXBwL21hdGVyaWFsLXRpbWVwaWNrZXIvZGlyZWN0aXZlcy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJMUUsTUFBTSxPQUFPLG1DQUFtQzs7OztJQU01QyxZQUFZLFVBQXNCO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sUUFBUSxDQUFDLEtBQUs7UUFDbEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsRUFBRTtvQkFDaEMsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLEVBQUU7d0JBQ3RCLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQzdFO3FCQUNKO29CQUNELE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3QjtTQUVKO0lBQ0wsQ0FBQzs7O1lBaENKLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSw4QkFBOEIsRUFBQzs7OztZQUhuQixVQUFVOzs7b0JBTXZDLEtBQUssU0FBQyw0QkFBNEI7Ozs7SUFBbkMsb0RBQXVFOzs7OztJQUV2RSxzREFBNkI7Ozs7OztBQThCakMsU0FBUyxlQUFlLENBQUMsS0FBSztJQUMxQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Tmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWV9IGZyb20gJy4uL21vZGVscy9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci10aGVtZS5pbnRlcmZhY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWVdJ30pXHJcbmV4cG9ydCBjbGFzcyBOZ3hNYXRlcmlhbFRpbWVwaWNrZXJUaGVtZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG5cclxuICAgIEBJbnB1dCgnbmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWUnKSB0aGVtZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyVGhlbWU7XHJcblxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy50aGVtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRoZW1lKHRoaXMudGhlbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldFRoZW1lKHRoZW1lKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCB2YWwgaW4gdGhlbWUpIHtcclxuICAgICAgICAgICAgaWYgKHRoZW1lLmhhc093blByb3BlcnR5KHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhlbWVbdmFsXSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHByb3AgaW4gdGhlbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoZW1lLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoYC0tJHtjYW1lbENhc2VUb0Rhc2gocHJvcCl9YCwgdGhlbWVbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGhlbWUodGhlbWVbdmFsXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjYW1lbENhc2VUb0Rhc2gobXlTdHIpIHtcclxuICAgIHJldHVybiBteVN0ci5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xyXG59XHJcbiJdfQ==