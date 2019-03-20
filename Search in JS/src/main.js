/**
 * @access public
 */
class BinarySearch{
	/**
 * @param {function(arr: number[], key: number): number} binarySearch - this is function binarySearch.
 */
	binarySearch(arr,key){
		let lo=0;
		let hi=arr.length-1;
		let index=this.binaryHelper(arr,lo,hi,key);
		return index;
	}
	/**
 * @param {function(arr: number[], lo: number, hi: number, key: number): number} binaryHelper - this is function binaryHelper.
 */
	binaryHelper(arr,lo,hi,key){
		let mid=lo+Math.ceil((hi-lo)/2);
		if(lo>hi){
			return -1;
		}
		if(key<arr[mid]){
			return this.binaryHelper(arr,lo,mid-1,key);
		}else if(key>arr[mid]){
			return this.binaryHelper(arr,mid+1,hi,key);
		}else{
			return mid;
		}
	}
}
/**
 * @param {number[]} arr - this is array arr.
 */
let arr=[-1,0,1,2,4,5,6,45,90];
/**
 * @param {number} key - this is number key.
 */
let key=6;
/**
 * @param {Object} binaryObj - this is object binaryObj.
 */
let binaryObj=new BinarySearch();
console.log(binaryObj.binarySearch(arr,key));

/**
 * @access public
 */
class BubbleSort{
	/**
 * @param {function(arr: number[]): number[]} bubbleSort - this is function bubbleSort.
 */
	bubbleSort(arr){
		for(let i=0;i<arr.length;i++){
			for(let j=0;j<arr.length;j++){
				if(arr[j]>arr[j+1]){
					let temp=arr[j];
					arr[j]=arr[j+1];
					arr[j+1]=temp;
				}
			}
		}
		return arr;
	}
}

/**
 * @param {Object} b - this is object b.
 */
let b=new BubbleSort();
console.log(b.bubbleSort([1,0,20,40,5,4,2,30,-1,-3,5,10]));

/**
 * @access public
 */
class Palindrome{
	/**
 * @param {function(s: String): boolean} checkPalindrome - this is function checkPalindrome.
 */
	checkPalindrome(s){
		for(let i=0;i<parseInt(s.length/2);i++){
			if(s[i]!=s[s.length-i-1]){
				return false;
			}
		}
		return true;
	}
}

/**
 * @param {Object} p - this is object p.
 */
let p=new Palindrome();
console.log(p.checkPalindrome("aabaa"));