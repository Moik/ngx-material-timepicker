/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { NgxMaterialTimepickerEventService } from '../services/ngx-material-timepicker-event.service';
export class OverlayDirective {
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
if (false) {
    /** @type {?} */
    OverlayDirective.prototype.preventClick;
    /**
     * @type {?}
     * @private
     */
    OverlayDirective.prototype.eventService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWF0ZXJpYWwtdGltZXBpY2tlci8iLCJzb3VyY2VzIjpbInNyYy9hcHAvbWF0ZXJpYWwtdGltZXBpY2tlci9kaXJlY3RpdmVzL292ZXJsYXkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLGlDQUFpQyxFQUFDLE1BQU0sbURBQW1ELENBQUM7QUFLcEcsTUFBTSxPQUFPLGdCQUFnQjs7OztJQUl6QixZQUFvQixZQUErQztRQUEvQyxpQkFBWSxHQUFaLFlBQVksQ0FBbUM7SUFDbkUsQ0FBQzs7Ozs7SUFJRCxPQUFPLENBQUMsQ0FBYTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFqQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2FBQ3hCOzs7O1lBSk8saUNBQWlDOzs7MkJBT3BDLEtBQUssU0FBQyxTQUFTO3NCQU1mLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUFOakMsd0NBQXdDOzs7OztJQUU1Qix3Q0FBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtOZ3hNYXRlcmlhbFRpbWVwaWNrZXJFdmVudFNlcnZpY2V9IGZyb20gJy4uL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWV2ZW50LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tvdmVybGF5XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIE92ZXJsYXlEaXJlY3RpdmUge1xyXG5cclxuICAgIEBJbnB1dCgnb3ZlcmxheScpIHByZXZlbnRDbGljazogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGV2ZW50U2VydmljZTogTmd4TWF0ZXJpYWxUaW1lcGlja2VyRXZlbnRTZXJ2aWNlKSB7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcclxuICAgIG9uQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wcmV2ZW50Q2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2hFdmVudChlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=