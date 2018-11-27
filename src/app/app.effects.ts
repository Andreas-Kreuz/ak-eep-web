import {CoreEffects} from './core/store/core.effects';
import {EepDataEffects} from './eep/data/store/eep-data.effects';
import {GenericDataEffects} from './eep/generic-data/store/generic-data.effects';
import {LogFileEffects} from './eep/log-viewer/store/log-file.effects';
import {IntersectionEffects} from './eep/intersection/store/intersection.effects';
import {SignalEffects} from './eep/signals/store/signal.effects';

export const effects = [
  CoreEffects,
  EepDataEffects,
  GenericDataEffects,
  LogFileEffects,
  SignalEffects,
  IntersectionEffects,
];
