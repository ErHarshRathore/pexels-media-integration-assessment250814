import { Observable } from 'rxjs';

export interface MVIViewModel<
    UiEventType,
    UiStateType,
> {
    sideEffectFlow: Observable<UiStateType>;

    uiEvent(intent: UiEventType): Promise<void>;
}
