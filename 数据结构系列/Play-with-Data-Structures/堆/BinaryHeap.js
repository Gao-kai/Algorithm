export class BinaryHeap {
	constructor(comparator) {
		this.elements = [];
		this.size = 0;
		this.capacity = 10;
		
		let defaultComparator = (a,b)=> a-b;
		this.comparator = comparator || defaultComparator;
	}

	isEmpty() {
		return this.size === 0;
	}

	clear() {
		this.elements = []
		this.size = 0;
	}

	get() {
		if (this.size === 0) {
			throw new Error('当前堆为空')
		}
		return this.elements[0];
	}

	/**
	 * 自上而下的上滤建堆 O(logN)
	 * 
	 */
	heapifyUp(elements){
		if(Array.isArray(elements) && elements.length){
			this.size = elements.length;
			this.capacity = Math.max(this.capacity,elements.length);
			// 克隆一份元素 防止外部传入元素修改污染内部数据
			for (var i = 0; i < this.size; i++) {
				this.elements[i] = elements[i];
				this._siftUpPlus(i);
			}
		}
	}
	
	
	/**
	 * 自下而上的下滤建堆 O(nlogN)
	 */
	heapifyDown(elements){
		if(Array.isArray(elements) && elements.length){
			this.size = elements.length;
			this.capacity = Math.max(this.capacity,elements.length);
			// 克隆一份元素
			for (var i = this.size - 1; i >= 0; i--) {
				this.elements[i] = elements[i];
				this._siftDown(i);
			}
		}
	}


	/**
	 * @param {Object} el新增加的元素
	 * 1. el为空校验
	 * 2. 扩容校验
	 * 3. 上滤Sift Up
	 */
	add(el) {
		if (el == null) {
			throw new Error('添加到二叉堆中的元素不能为空！')
		}

		this._ensureCapacity(this.size + 1);

		this.elements[this.size++] = el;
		this._siftUpPlus(this.size - 1);
	}

	/**
	 * 移除堆顶元素
	 * 1. 最后一个节点的值覆盖根节点
	 * 2. 删除最后一个节点（障眼法）
	 * 3. 将当前根节点进行下滤找到合适的位置
	 */
	remove() {
		if (this.size === 0) return;

		let rootNode = this.elements[0];

		let lastIndex = --this.size;
		// 最后一个节点的值覆盖根节点
		this.elements[0] = this.elements[lastIndex];

		// 将最后一个节点的值删除
		this.elements.pop();

		// 下滤
		this._siftDown(0);

		// 将删除的堆顶元素进行返回
		return this.elements[0];
	}


	/**
	 * 删除堆顶元素的同时插入一个新元素element到堆中
	 * @param {Object} element 要替换掉堆顶的元素
	 * 1.方案一 2 * logN
	 * 先删除当前堆顶的元素：执行一次下滤logN
	 * 然后再将element添加进去：执行一次上滤logN
	 * 
	 * 2. 方案二 1 * LogN
	 * 先将新元素element替换掉堆顶元素 O(1)
	 * 然后再将堆顶元素进行下滤 
	 */
	replace(element){
		if(element == null){
			throw new Error('节点不能为空！')
		}
		
		let root = null;
		
		if(this.size === 0){
			this.elements[0] = element;
			this.size++;
		}else{
			root = this.elements[0]; // 被替换掉的堆顶元素 用于返回
			this.elements[0] = element;
			this._siftDown(0);
		}
		
		return root;
	}


	/**
	 * @param {Object} index 从index开始下滤
	 * 1. 下滤的节点必须有子节点，也就是非叶子节点
	 * 2. 找到最大子节点 更新index
	 * 3. 循环完成之后更新index位置处的值
	 */
	_siftDown(index) {
		let nodeEl = this.elements[index];
		/* 
			进入while循环的条件是：节点必须为非叶子节点，也就是有子节点
			 1. 如何确定为非叶子节点？index < 第一个叶子节点
			 2. 第一个叶子节点后面必定全部为叶子节点
			 3. 第一个叶子节点的索引就是非叶子节点的个数
			 4. 非叶子节点的个数就是N1 +N2 = Math.floor(N / 2)
		 */
		while (index < Math.floor(this.size / 2)) {
			/* 
				完全二叉树的节点有子节点只有两个情况：
					1. 只有子节点
					2. 左右子节点都有
				这里默认以左子节点为最大子节点，左子节点的索引为2*index + 1
			 */
			let childIndex = 2 * index + 1;
			let childEl = this.elements[childIndex];
			
			// 如果有右子节点(索引为childIndex + 1)并且右子节点的值比左子节点的值大 大顶堆
			// 如果有右子节点(索引为childIndex + 1)并且右子节点的值比左子节点的值小 小顶堆
			let rightChildIndex = childIndex + 1;
			let rightChildEl = this.elements[rightChildIndex];
			if((rightChildIndex <= this.size -1) && rightChildEl > childEl){
				childIndex = rightChildIndex;
				childEl = rightChildEl;
			}
			
			// 对比
			if(this.comparator(childEl,nodeEl) <= 0) break;
			// if(nodeEl <= childEl) break;
			
			// 将childIndex的值保存在当前index位置
			this.elements[index] = childEl;
			
			// 更新index的值
			index = childIndex;
		}
		
		// 循环结束 确定下滤的最终位置 将值更新
		this.elements[index] = nodeEl;
	}


	// 判断是否需要扩容 如果需要扩容当前的1.5倍
	_ensureCapacity(newCapacity) {
		
		if (newCapacity && newCapacity <= this.capacity) return;
		console.log('堆需要执行扩容');
		let newElements = new Array(Math.floor(this.capacity * 1.5));
		for (var i = 0; i < newElements.length; i++) {
			newElements[i] = this.elements[i];
		}
		this.elements = newElements;
		this.capacity = newElements.length;
	}


	/**
	 * @param {Object} index 要上滤的元素的索引
	 * 1. 二叉堆中添加的元素一律是放置在数组末尾
	 * 2. 进行上滤操作
	 * 	+ 没有父节点停止上滤,只有index=0也就是根节点的时候才没有父节点
	 *  + 比父节点小停止上滤
	 */

	_siftUp(index) {
		let nodeEl = this.elements[index];

		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parentEl = this.elements[parentIndex];

			// 对比:如果父元素比自己大 符合二叉堆特点 直接return出去就可以
			if(this.comparator(parentEl,nodeEl) >= 0) break;
			// if (parentEl >= nodeEl) return;

			// 交换父节点和子节点的值
			this.elements[parentIndex] = nodeEl;
			this.elements[index] = parentEl;

			// 重新赋值index的值 index索引的值一直向上冒
			index = parentIndex;

		}
	}

	/**
	 * @param {Object} index
	 * 元素上滤的优化版本：不必每次都进行比较然后交换元素
	 * 只需要一直拿新添加的元素节点去和父元素进行对比，并且将父元素的值存储在index位置，当循环结束之后已经确定了最终要赋值的index索引
	 */
	_siftUpPlus(index) {
		let nodeEl = this.elements[index];
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parentEl = this.elements[parentIndex];

			// 对比:如果父元素比自己大 符合最大堆特点 跳出循环 但是不中止函数执行
			// 对比:如果父元素比自己小 符合最小堆特点 跳出循环 但是不中止函数执行
			if(this.comparator(parentEl,nodeEl) >= 0) break;
			// if (parentEl <= nodeEl) break;

			// 将父节点的值存储在index位置
			this.elements[index] = parentEl;

			// 重新赋值index的值
			index = parentIndex;
		}

		this.elements[index] = nodeEl;
	}
}


const binaryHeap = new BinaryHeap();
let arr = [100,102,56,84,63,115,75,123,140,98]; 
arr.forEach(item=>{
	binaryHeap.add(item);
})

binaryHeap.add(58);
binaryHeap.add(200);
binaryHeap.remove();
// binaryHeap.replace(250);
console.log(binaryHeap);


let arr1 = [100,102,56,84,63,115,75,123,140,98]; 
function getTopKvalue(arr,k){
	const binaryHeap1 = new BinaryHeap();
	
	for(let i=0;i<arr.length;i++){
		
		if(binaryHeap1.size < k){  // 0 1 2 3 4
			binaryHeap1.add(arr[i]); // 1 2 3 4 5
		}else if(binaryHeap1.get() < arr[i]){
			binaryHeap1.replace(arr[i])
		}
	}
	
	return binaryHeap1.elements;
}

// console.log(getTopKvalue(arr1,3));


function getTopKvalue1(arr,k){
	let temp = [];
	for(let i=0;i<arr.length;i++){
		
		if(temp.length < k){  // 0 1 2 3 4
			temp.push(arr[i]); // 1 2 3 4 5
		}else{
			let min = Math.min.apply(null,temp);
			let index = temp.findIndex(item=>item === min);
			if(min < arr[i]){
				temp[index] = arr[i];
			}
		}
	}
	
	return temp.sort((a,b)=>a-b)
}

// console.log(getTopKvalue1(arr1,3));
