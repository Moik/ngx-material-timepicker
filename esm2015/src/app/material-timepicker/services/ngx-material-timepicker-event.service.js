/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class NgxMaterialTimepickerEventService {
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
/** @nocollapse */ NgxMaterialTimepickerEventService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMaterialTimepickerEventService_Factory() { return new NgxMaterialTimepickerEventService(); }, token: NgxMaterialTimepickerEventService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerEventService.prototype.backdropClickSubject;
    /**
     * @type {?}
     * @private
     */
    NgxMaterialTimepickerEventService.prototype.keydownEventSubject;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdGVyaWFsLXRpbWVwaWNrZXItZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tYXRlcmlhbC10aW1lcGlja2VyLyIsInNvdXJjZXMiOlsic3JjL2FwcC9tYXRlcmlhbC10aW1lcGlja2VyL3NlcnZpY2VzL25neC1tYXRlcmlhbC10aW1lcGlja2VyLWV2ZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFhLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFLekMsTUFBTSxPQUFPLGlDQUFpQztJQUg5QztRQUtZLHlCQUFvQixHQUF3QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQzFELHdCQUFtQixHQUEyQixJQUFJLE9BQU8sRUFBRSxDQUFDO0tBdUJ2RTs7OztJQXJCRyxJQUFJLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNwRCxDQUFDOzs7O0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBaUM7UUFDM0MsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2hCLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLG1CQUFZLEtBQUssRUFBQSxDQUFDLENBQUM7Z0JBQ2xELE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBZSxLQUFLLEVBQUEsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQzs7O1lBM0JKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7Ozs7Ozs7SUFHRyxpRUFBa0U7Ozs7O0lBQ2xFLGdFQUFvRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsVGltZXBpY2tlckV2ZW50U2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBiYWNrZHJvcENsaWNrU3ViamVjdDogU3ViamVjdDxNb3VzZUV2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XHJcbiAgICBwcml2YXRlIGtleWRvd25FdmVudFN1YmplY3Q6IFN1YmplY3Q8S2V5Ym9hcmRFdmVudD4gPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAgIGdldCBiYWNrZHJvcENsaWNrKCk6IE9ic2VydmFibGU8TW91c2VFdmVudD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tkcm9wQ2xpY2tTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBrZXlkb3duRXZlbnQoKTogT2JzZXJ2YWJsZTxLZXlib2FyZEV2ZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5ZG93bkV2ZW50U3ViamVjdC5hc09ic2VydmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwYXRjaEV2ZW50KGV2ZW50OiBLZXlib2FyZEV2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdjbGljayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tkcm9wQ2xpY2tTdWJqZWN0Lm5leHQoPE1vdXNlRXZlbnQ+ZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2tleWRvd24nOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5rZXlkb3duRXZlbnRTdWJqZWN0Lm5leHQoPEtleWJvYXJkRXZlbnQ+ZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHN1Y2ggZXZlbnQgdHlwZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIl19