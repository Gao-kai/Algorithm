/**
 * BinaryTree(二叉树)是BinarySearchTree(二叉搜索树，简称BST)的父类
 * BinaryTree类上具有以下公共的方法和属性,代表以下方法是任意类型的二叉树所共有的接口
 * 比如二叉搜索树BST、完全二叉树、完美二叉树、真二叉树、红黑树等...
 * 
 * 	1. size() 返回树节点的节点个数
 * 	2. isEmpty() 判断树是否为空
 * 	3. clear() 清空二叉树所有节点
 * 	4. isComplete() 判断是否为完全二叉树
 * 	5. getTreeHeightRecursion() 获取二叉树高度(递归实现)
 * 	6. getTreeHeightIterator() 获取二叉树高度(迭代实现)
 * 	7. preorder() 前序遍历
 * 	8. inorder()  中序遍历
 * 	9. postorder() 后续遍历
 * 	10.levelorder() 层序遍历
 * 	11.toString() 树状打印二叉树节点
 * 	12.getSuccessor() 获取后继节点
 * 	13.getProcessor() 获取前驱节点
 */

export class Node {
	constructor(el, parent, left, right) {
		this.el = el || null;
		this.parent = parent || null;
		this.left = left || null;
		this.right = right || null;
	}
}

export class BinaryTree {
	constructor() {
		this.root = null;
		this.size = 0;
		this.treeString = '';
	}

	treeNodeNullCheck(el) {
		if (el == null) {
			throw new TypeError('树节点的值不能为null')
		}
	}

	size() {
		return this.size;
	}

	isEmpty() {
		return this.size === 0;
	}

	clear() {
		this.root = null;
		this.size = 0;
	}

	// 判断是否为完全二叉树
	/*
		1. 左右都有 ok
		2. 左右都没有 后面的也都是叶子
		3. 左有右没有 ok 后面的都是叶子
		4. 左没有右有 false 不是
	*/
	isComplete() {
		if (this.root == null) return false;

		// 层序遍历
		let quene = [];
		quene.push(this.root);


	}

	// 判断是否为度为2的节点
	hasTwoChildren(node) {
		return node.left != null && node.right != null;
	}

	// 判断是否为度为1的叶子节点
	isLeafNode(node) {
		return node.left == null && node.right == null;
	}

	// 获取树的最大高度-递归 
	// 本质就是不停的计算当前子树上最大深度 不停的去更新 直到没有值
	getTreeHeightRecursion() {
		return this._getTreeHeightRecursion(this.root);
	}

	_getTreeHeightRecursion(node) {
		if (node == null) return 0;
		return 1 + Math.max(this._getTreeHeightRecursion(node.left), this._getTreeHeightRecursion(node.right))
	}

	// 获取树的最大高度-迭代
	/*
		本质就是不断的算层数
		什么时候让层数加1呢 由两个变量来实现
		每一层的节点个数为levelSize=1
		树的最大高度为treeHeight = 1
		
		
	*/
	getTreeHeightIterator() {
		if (this.root == null) return 0;

		let quene = [];
		quene.push(this.root);

		let levelSize = 1;
		let treeHeight = 0;

		while (quene.length) {
			let frontNode = quene.shift();
			levelSize--;

			// 访问 做一些事情
			if (frontNode.left) {
				quene.push(frontNode.left);
			}
			if (frontNode.right) {
				quene.push(frontNode.right);
			}

			if (levelSize == 0) {
				levelSize = quene.length;
				treeHeight++;
			}
		}

		return treeHeight;
	}

	/**
	 * 前序遍历非递归实现方案一： 基于栈将右子节点压入栈中
	 * 	@param {Object} handler
	 */
	preorderReverseIterator1(handler) {
		if (this.root == null) return;
		handler = handler || console.log;
		
		let currNode = this.root;
		let stack = [];
		while(true){
			if(currNode){
				handler(currNode.el); // 先访问
				if(currNode.right){
					stack.push(currNode.right); // 当前节点有右节点 就将压入栈中
				}
				currNode = currNode.left; // 更新下一轮循环时访问的节点Node
			}else{
				// 进入到这里代表当前currNode为null 已经访问到二叉树的最左边的节点了
				// 现在开始要处理右边的节点
				if(stack.length === 0) return; // 栈空了 代表右边的节点都访问完了
				
				currNode = stack.pop(); // 栈没空 就将栈顶元素弹出当做下一轮循环是访问的节点node
			}
		}
	}
	
	/**
	 * 前序遍历非递归实现方案二：采用类似层序遍历的方案 但是由栈实现
	 * @param {Object} handler
	 */
	preorderReverseIterator2(handler){
		if (this.root == null) return;
		handler = handler || console.log;

		let stack = [];
		stack.push(this.root);
		
		while(stack.length){
			let currNode = stack.pop();
			handler(currNode.el); // 访问弹出的栈顶元素，stack.length-1
			
			if(currNode.right){
				stack.push(currNode.right); // 必须先将右边压入栈中 先进去的后访问 符合前序特点
			}
			
			if(currNode.left){
				stack.push(currNode.left); // 后进去的左节点优先被访问 并且会成为栈顶元素
			}
		}
	}
	
	// 中序遍历非递归实现
	inorderReverseIterator(handler){
		if (this.root == null) return;
		handler = handler || console.log;
		
		let currNode = this.root;
		let stack = [];
		
		while(true){
			if(currNode){
				stack.push(currNode);
				currNode = currNode.left; // 一直向左找
			}else{
				// 进入到这里代表已经访问到最左边的节点了
				if(stack.length === 0) return;
				
				let top = stack.pop(); // 拿到栈顶元素访问
				handler(top.el);
				
				// 更新下一次while循环的currNode节点对象
				// 1. 没有右子节点 为null 接着弹出栈顶进行访问
				// 2. 有右子节点  将右子节点当做一开始的root对象对待
				currNode = top.right;
			}
		}
	}


	// 后续遍历非递归实现
	postorderReverseIterator(handler){
		if (this.root == null) return;
		handler = handler || console.log;
		
		let currNode = this.root;
		let stack = [];
		let prev = null; // 记录上一次while循环访问过的节点对象指针
		
		stack.push(this.root);
		while(stack.length){
			// 只查看栈顶元素但是不弹出
			let top = stack[stack.length - 1];
			
			if((top.left ==null && top.right == null) || (prev && prev.parent == top)){
				prev = stack.pop(); // 将节点弹出
				handler(prev.el); // 访问
			}else{
				if(top.right){
					stack.push(top.right);
				}
				if(top.left){
					stack.push(top.left);
				}
			}
		}
	}

	// 前序遍历
	preorder(handler) {
		this._preorderReverse(this.root, handler);
		this.preorderReverseIterator(handler);
	}

	_preorderReverse(node, handler) {
		if (node == null) return node;
		handler = handler || console.log;

		// 访问节点
		handler(node.el);
		this._preorderReverse(node.left, handler);
		this._preorderReverse(node.right, handler);
	}

	// 中序遍历
	inorder(handler) {
		this._inorderReverse(this.root, handler);
	}

	_inorderReverse(node, handler) {
		if (node == null) return node;
		handler = handler || console.log;

		this._inorderReverse(node.left, handler);
		// 访问节点
		handler(node.el);
		this._inorderReverse(node.right, handler);
	}

	// 后序遍历
	postorder(handler) {
		this._postorderReverse(this.root, handler);
	}

	_postorderReverse(node, handler) {
		if (node == null) return node;
		handler = handler || console.log;

		this._preorderReverse(node.left, handler);
		this._preorderReverse(node.right, handler);
		// 访问节点
		handler(node.el);
	}

	// 层序遍历 利用队列的特点
	levelorder(handler) {
		if (this.root == null) return;
		handler = handler || console.log;

		let quene = [];
		quene.push(this.root);

		while (quene.length) {
			let frontNode = quene.shift(); // 取出当前队头元素

			// 此时访问节点
			handler(frontNode.el);

			if (frontNode.left) {
				quene.push(frontNode.left);
			}
			if (frontNode.right) {
				quene.push(frontNode.right);
			}
		}
	}

	// 打印二叉树
	toString() {
		// this._printInTree(this.root);

		this.printTree(this.root, '');
		console.log(this.treeString)
	}

	_printInTree(node) {
		if (node == null) return node;

		this.treeString += ('---' + node.el + '\n');
		console.log(this.treeString);
		this._printInTree(node.left, this.treeString);
		this._printInTree(node.right, this.treeString);
	}

	printTree(node, prefix) {
		if (node == null) return;
		this.treeString += (prefix + node.el + '\n');
		// console.log(this.treeString)
		this.printTree(node.left, prefix + 'L--->')
		this.printTree(node.right, prefix + 'R--->')
		return this.treeString;
	}
}


