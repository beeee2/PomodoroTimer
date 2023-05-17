import { atom } from 'recoil';

export const workMinuteState = atom({
  key: 'workMinuteState',
  default: 60
});

export const workSecondState = atom({
    key: 'workSecondState',
    default: 60
  });

export const restMinuteState = atom({
    key: 'restMinuteState',
    default: 0
});

export const restSecondState = atom({
    key: 'restSecondState',
    default: 0
});

export const perLoop = atom({
    key: '',
    default: 0
});
