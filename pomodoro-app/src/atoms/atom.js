import { atom } from 'recoil';

const sessionStorageEffect =
  (key) =>
  // setSelf 함수는 세션스토리지에서 값을 불러와 초기값을 지정해주는 역할.
  // onSet 함수는 해당 atom값이 변경될 때마다 세션스토리지와 atom 값을 동기화해주는 역할
  ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      (typeof newValue === 'undefined') ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const workMinuteState = atom({
  key: 'workMinuteState',
  default: 60,
  effects: [sessionStorageEffect('workMinuteState')],
});

export const workSecondState = atom({
    key: 'workSecondState',
    default: 60,
    effects: [sessionStorageEffect('workSecondState')],
  });

export const resetState = atom({
  key: 'resetState',
  default:'inactive',
  effects: [sessionStorageEffect('resetState')],
})

export const restMinuteState = atom({
    key: 'restMinuteState',
    default: 0,
    effects: [sessionStorageEffect('restMinuteState')],
});

export const restSecondState = atom({
    key: 'restSecondState',
    default: 0,
    effects: [sessionStorageEffect('restSecondState')],
});

export const perLoop = atom({
    key: 'perLoopState',
    default: 0,
    effects: [sessionStorageEffect('perLoopState')],
});
export const alarmState = atom ({
  key: 'alarmState',
  default:'inactive',
  effects: [sessionStorageEffect('alarmState')],
})
export const isStartState = atom({
  key: 'isStartState',
  default: false,
  effects: [sessionStorageEffect('isStartState')],
})