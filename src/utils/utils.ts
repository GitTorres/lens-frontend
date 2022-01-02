type Primitive = string | number | boolean;

export const isObject = <T>(obj: T): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

export const areIdenticalArrays = (arrOne: Primitive[], arrTwo: Primitive[]): boolean =>
  arrOne.length == arrTwo.length && arrOne.every((e, i) => arrTwo[i] === e);

export const isIdentical = <T>(itemOne: T, itemTwo: T): boolean => {
  const result = isObject(itemOne)
    ? JSON.stringify(itemOne) == JSON.stringify(itemTwo)
    : Array.isArray(itemOne) && Array.isArray(itemTwo)
    ? areIdenticalArrays(itemOne, itemTwo)
    : itemOne == itemTwo;

  return result;
};

// don't know how to do this part
// const stateHomeComponent: StateHandler<HomeComponentStateData> = Object.keys(initialHomeState).reduce(
//   (accum, curr) => ({
//     ...accum,
//     [curr]: (curr: any) => setHomeState({ ...homeState, [`${curr}`]: curr })
//   }),
//   {}
// );
