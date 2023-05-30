import { atom } from 'recoil';

const PromiseId = atom({
  key: 'promiseid',
  default: '',
});

const PromiseName = atom({
  key: 'promisename',
  default: '',
});

const PromiseStartDate = atom({
  key: 'promisestartdate',
  default: new Date(),
});

const PromiseEndDate = atom({
  key: 'promiseenddate',
  default: new Date(),
});

const PromiseDescription = atom({
  key: 'promiseDescription',
  default: '',
});

const PromisePlace = atom({
  key: 'promiseplace',
  default: '',
});

const VoteName = atom({
  key: 'votename',
  default: '',
});

const VoteOptions = atom({
  key: 'voteoptions',
  default: ['', ''],
});

export {
  PromiseId,
  PromiseName,
  PromiseDescription,
  PromiseStartDate,
  PromiseEndDate,
  PromisePlace,
  VoteName,
  VoteOptions,
};
