import spread from './spread';
import thisCards from './thisCards';

export default [
  ...spread.map(s => ({ ...s, tag: 'spread' })),
  ...thisCards.map(s => ({ ...s, tag: 'this' })),
].map((c, ix) => ({ ...c, id: ix }));