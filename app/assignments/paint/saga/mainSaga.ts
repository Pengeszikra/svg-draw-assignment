import { take, fork, call, all, delay, select, cancel, race } from 'redux-saga/effects';

export function * mainSaga() {
  yield console.log('--- << SVG draw main saga in action >> ---');
}