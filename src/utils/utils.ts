export const equals = (arrOne: any[], arrTwo: any[]): boolean =>
  arrOne.length == arrTwo.length && arrOne.every((e, i) => arrTwo[i] === e);
