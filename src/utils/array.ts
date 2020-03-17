/**
 * 
 * @param arr 数组
 * @param index 移动的下标
 * @param tindex 要移动到的新下标
 */
export function moveArray(arr, index, tindex) {
    if (tindex < 0 || tindex >= arr.length) return arr;
    if (index < 0 || index >= arr.length) return arr;
    //如果当前元素在拖动目标位置的下方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置的地方新增一个和当前元素值一样的元素，
    //我们再把数组之前的那个拖动的元素删除掉，所以要len+1
    if (index > tindex) {
        arr.splice(tindex, 0, arr[index]);
        arr.splice(index + 1, 1)
    }
    else {
        //如果当前元素在拖动目标位置的上方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置+1的地方新增一个和当前元素值一样的元素，
        //这时，数组len不变，我们再把数组之前的那个拖动的元素删除掉，下标还是index
        arr.splice(tindex + 1, 0, arr[index]);
        arr.splice(index, 1)
    }
    return arr;
}