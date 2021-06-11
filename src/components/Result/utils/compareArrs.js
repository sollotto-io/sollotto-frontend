export default function compareArrs(arr1, arr2) {
  let result = true;
  arr1.forEach((e1, index) => {
    if (e1 !== arr2[index]) {
      result = false;
    }
  });
  return result;
}
