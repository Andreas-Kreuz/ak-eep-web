import {SignalEffects} from './eep/signals/store/signal.effects';
import {CoreEffects} from './core/store/core.effects';
import {IntersectionEffects} from './eep/intersection/store/intersection.effects';

export const effects = [
  CoreEffects,
  SignalEffects,
  IntersectionEffects,
];
