export default function compareArrs<t>(arr1: t[], arr2: t[]): boolean {
  let result = true;
  arr1.forEach((e1, index) => {
    if (e1 !== arr2[index]) {
      result = false;
    }
  });
  return result;
}
