import {BinaryHeap} from './BinaryHeap.js';

class PriorityQuene {
	constructor(comparator) {
	    this.binaryHeap = new BinaryHeap(comparator);
	}
	
	enquene(el){
		this.binaryHeap.add(el);
	}
	
	dequene(){
		return this.binaryHeap.remove();
	}
	
	front(){
		return this.binaryHeap.get();
	}
	
	clear(){
		this.binaryHeap.clear();
	}
	
	size(){
		return this.binaryHeap.size;
	}
	
	isEmpty(){
		return this.binaryHeap.isEmpty();
	}
}

let priorityList = [
	{money:1000,name:'lilei'},
	{money:2000,name:'tom'},
	{money:300,name:'demo'},
	{money:1,name:'jim'}
]

let comparator = (a,b) => a.money - b.money;
let pQuene = new PriorityQuene(comparator);

priorityList.forEach(item=>{
	pQuene.enquene(item);
})
// pQuene.dequene();
// pQuene.dequene();
console.log(pQuene.clear());

console.log(pQuene);


