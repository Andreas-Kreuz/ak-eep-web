import {CoreEffects} from './core/store/core.effects';
import {EepDataEffects} from './eep/data/store/eep-data.effects';
import {IntersectionEffects} from './eep/intersection/store/intersection.effects';
import {SignalEffects} from './eep/signals/store/signal.effects';

export const effects = [
  CoreEffects,
  EepDataEffects,
  SignalEffects,
  IntersectionEffects,
];
