

function genArray(n){
	// for(let i=0;i<n;i++){
    // 	arr.push(Math.floor(Math.random() * 10));
    // }
    const arr=Array.from({length: n}, () => Math.floor(Math.random() * 10));
    ///arr.fill(0,0,10)
    return arr;
}
const array=genArray(9);
console.log(array);

function freqArray(arr){

    const frequencyMap = arr.reduce((map, num) => {
        map.set(num, (map.get(num) || 0) + 1);
        return map;
      }, new Map());
      
      return frequencyMap;
    //array.forEach(element => {
      //  countMap[element]=countMap[element]===undefined?1:countMap[element]+1;
        // if (countMap[element] === undefined) {
        //   countMap[element] = 1;
        // } else {
        //   countMap[element]++;
        // }
      //});
}
const freq=freqArray(array);
console.log(freq);