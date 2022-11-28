class Node {
	constructor(el,left,right,parent) {
		this.el = el;
		this.left = left || null;
		this.right = right || null;
		this.parent = parent || null;
	}
	
}
// 右边为尊 右边是我的老大 左边是我的小弟
export class BinarySearchTree {
	constructor(arg) {
		this.root = null;
		this.size = 0;
		this.treeString = '';
		this.res = [];
	}
	
	/**
	 * 添加节点的循环写法
	 * @param {Object} el 要添加到二叉树搜索树上节点的值
	 * 1.先进行为空判断和是否为根节点判断
	 * 2.首先通过while循环从根节点开始和新节点的值比较，并不断更新当前访问节点currentNode和当前节点的父节点parentNode的值
	 * 	+ 如果当前节点大 那么新节点在左子树上
	 * 	+ 如果当前节点小 那么新节点在右子树上
	 * 3.循环往复，一直循环到访问的节点为空代表找到要插入的节点的父节点了
	 * 4.判断父节点的值和当前节点的值大小，左小右大插入即可
	 * 5.size++
	 */
	add(el){
		// 节点为空检查
		if(el == null){
			throw new Error('二叉树节点value不能为空');
		}
		
		// 如果添加的是根节点,则当前节点就是树的根节点
		if(this.root === null){
			this.root = new Node(el);
			this.size++;
			return;
		}
		
		// 查找新节点的父节点是哪一个节点
		let currentNode = this.root;
		let parentNode = null;
		while(currentNode != null){
			// 在比较给currentNode赋新的值之前 先缓存当前遍历节点的父节点
			parentNode = currentNode;
			if(currentNode.el > el){
				// 新节点小于当前节点的值 在当前节点的左子树
				currentNode = currentNode.left;
			}else if(currentNode.el < el){
				// 新节点大于当前节点的值 在当前节点的右子树
				currentNode = currentNode.right;
			}else{
				// 两节点相等 直接return或者覆盖
				return;
			}
		}
		
		// 新节点在父节点的左侧还是右侧
		if(parentNode.el > el){
			parentNode.left = new Node(el)
		}else{
			parentNode.right = new Node(el)
		}
		
		this.size++;
	}
	
	/**
	 * 添加节点的递归写法
	 * @param {Object} el 添加到二叉树搜索树上节点的值
	 * 1.先进行为空判断和是否为根节点判断
	 * 2.实现一个可被递归调用的方法insertNode
	 * 3.这种写法不需要寻找父节点，而是从根节点开始依次和新节点进行比较
	 * + 如果当前节点大，那么新节点在左边，并且如果left为空直接赋值，这也是退出递归的条件之一；否则继续进行递归调用
	 * + 如果当前节点小，那么新节点在右边，逻辑和上面一样
	 */
	insert(el){
		// 节点为空检查
		if(el == null){
			throw new Error('二叉树节点value不能为空');
		}	
		// 如果添加的是根节点,则当前节点就是树的根节点
		if(this.root === null){
			this.root = new Node(el);
			this.size++;
			return;
		}
		
		// 启动递归
		let currentNode = this.root;
		this.insertNode(currentNode,new Node(el));
		this.size++;
	}
	
	/**
	 * 将节点newNode插入到二叉搜索树上
	 * @param {Node} currentNode 当前访问的节点
	 * @param {Node} newNode 要插入到二叉树上的新节点
	 */
	insertNode(currentNode,newNode){
		// 新节点在当前节点的左子树上
		if(currentNode.el > newNode.el){
			if(currentNode.left == null){
				currentNode.left = newNode;
			}else{
				this.insertNode(currentNode.left,newNode)
			}
		}else if(currentNode.el < newNode.el){
			// 新节点在当前节点的右子树上
			if(currentNode.right == null){
				currentNode.right = newNode;
			}else{
				this.insertNode(currentNode.right,newNode)
			}
		}else{
			// 新节点和当前节点相等 不进行任何处理
			return;
		}
	}
	
	/* 根据传入的el查找节点 */
	getNode(el){
		if(el == null || this.root == null) return null;
		
		let currentNode = this.root;
		while(currentNode != null){
			if(currentNode.el > el){
				currentNode = currentNode.left;
			}else if(currentNode.el < el){
				currentNode = currentNode.right;
			}else{
				return currentNode;
			}
		}
		
		return null;
	}
	
	/**
	 * 删除树节点
	 */
	remove(el){
		let node = this.getNode(el);
		if(node == null) return; 
		
		
	}
	
	size(){
		return this.size;
	}
	
	isEmpty(){
		return this.size === 0;
	}
	
	clear(){
		this.root = null;
		this.size = 0;
	}
	
	preOrderTraversal(handler){
		handler = handler || console.log;
		this.preOrderTraversalNode(this.root,handler);
		
	}
	
	inOrderTraversal(handler){
		handler = handler || console.log;
		this.inOrderTraversalNode(this.root,handler);
	}
	
	postOrderTraversal(handler){
		handler = handler || console.log;
		this.postOrderTraversalNode(this.root,handler);
	}
	
	getTreeHeight(){
		return this.calcTreeHeight2(this.root);
	}
	
	// 利用前序遍历打印一颗二叉树
	printTree(node,str,prefix){
		if(node == null) return;
		this.treeString += (prefix + node.el + '\n');
		// console.log(this.treeString)
		this.printTree(node.left,this.treeString,prefix + 'L--->')
		this.printTree(node.right,this.treeString,prefix + 'R--->')
		return this.treeString;
	}
	
	/**
	 * 	前序遍历二叉搜索树:先处理根节点就叫做前序 可以看做每次先处理的都是子树的根节点
	 *  1. 访问根节点
	 *  2. 先序遍历其左子树
	 *  3. 先序遍历其右子树
	 *  @param {TreeNode} node 当前遍历的节点
	 *  @param {Function} handler 遍历到当前节点后执行的函数 
	 * 	前序遍历的结果是：根节点、左子树上的所有节点、右子树上所有节点
	 */
	preOrderTraversalNode(node,handler){
		if(node == null) return;
		
		handler(node.el);
		this.preOrderTraversalNode(node.left,handler);
		this.preOrderTraversalNode(node.right,handler);
	}
	
	/**
	 * 	中序遍历二叉搜索树:中间处理根节点就叫做中序
	 *  1. 中序遍历其左子树
	 *  2. 访问根节点
	 *  3. 中序遍历其右子树
	 *  @param {TreeNode} node 当前遍历的节点
	 *  @param {Function} handler 遍历到当前节点后执行的函数 
	 */
	inOrderTraversalNode(node,handler){
		if(node == null) return;
		
		this.inOrderTraversalNode(node.left,handler);
		handler(node.el);
		this.inOrderTraversalNode(node.right,handler);
	}
	
	/**
	 * 	后序遍历二叉搜索树:最后处理根节点就叫做中序
	 *  1. 后序遍历其左子树
	 *  2. 后序遍历其右子树
	 *  3. 访问根节点
	 *  @param {TreeNode} node 当前遍历的节点
	 *  @param {Function} handler 遍历到当前节点后执行的函数 
	 */
	postOrderTraversalNode(node,handler){
		if(node == null) return;
		
		this.postOrderTraversalNode(node.left,handler);
		this.postOrderTraversalNode(node.right,handler);
		handler(node.el);
	}
	
	/**
	 * 层序遍历二叉搜索树:基于队列实现
	 * 
	 * 1. 将根节点入队
	 * 2. 将队列头部元素A先出队，然后访问
	 * 3. 将已出队的元素A的左子节点入队
	 * 4. 将已出队的元素B的右子节点入队
	 * 5. 渲染往复 直到队列为空
	 * 
	 */
	levelOrderTraversalNode(handler){
		if(this.root == null) return;
		handler  = handler || console.log;
		
		let quene = [];
		quene.push(this.root);
		
		while(quene.length){
			let node = quene.shift();
			handler(node.el);
			if(node.left){
				quene.push(node.left);
			}
			if(node.right){
				quene.push(node.right);
			}
		}
	}
	
	
	/* 计算二叉树的高度--递归实现 */
	calcTreeHeight1(node){
		if(node == null) return 0;
		let maxLeftTreeHeight = this.calcTreeHeight1(node.left);
		let maxRightTreeHeight = this.calcTreeHeight1(node.right);
		return 1 + Math.max(maxLeftTreeHeight,maxRightTreeHeight);
	}
	
	/* 计算二叉树的高度--层序遍历实现 */
	calcTreeHeight2(node){
		if(this.root == null) return 0;
		
		let quene = [];
		let height = 0;
		let levelNodeSize = 1;
		quene.push(this.root);
		
		while(quene.length){
			let currNode = quene.shift();
			// 每次从队头出队一个元素 代表当前这一层可访问元素数量-1
			levelNodeSize--;
			
			if(currNode.left){
				quene.push(currNode.left);
			}
			
			if(currNode.right){
				quene.push(currNode.right);
			}
			
			// 如果levelNodeSize为空 代表当前这一层元素访问完 即将访问下一层
			if(levelNodeSize==0){
				// 下一层的节点个数就是当前队列的长度
				levelNodeSize = quene.length;
				// 让树的高度+1
				height++;
			}
		}
		
		return height;
	}

	/* 判断是否为完全二叉树 -- 层序遍历实现 */
	isCompleteBinaryTree(){
		if(this.root==null) return false;
		
		let quene = [];
		quene.push(this.root);
		
		let needLeafNodeNext = false;
		while(quene.length){
			let node = quene.shift();
			if(needLeafNodeNext && !this.isLeafNode(node)){
				return false;
			}
			
			if(node.left != null){
				quene.push(node.left);
			}else if(node.right != null){
				return false;
			}
			
			
			if(node.right != null){
				quene.push(node.right);
			}else{
				needLeafNodeNext = true;
			}
		}

		return true;
	}	
	
	isLeafNode(node){
		return node.left == null && node.right == null;
	}
	
	isTwoChildNode(node){
		return node.left != null && node.right != null;
	}
	
	
}

const BST = new BinarySearchTree();
let treeNodeList = [31, 97, 80, 19, 15, 64, 48, 77, 26, 21];
for (var i = 0; i < treeNodeList.length; i++) {
	BST.insert(treeNodeList[i]);
}
// BST.preOrderTraversal();
// BST.inOrderTraversal();
// BST.postOrderTraversal();
// BST.levelOrderTraversalNode();
// BST.printTree(BST.root,BST.treeString,'')
// console.log(BST.getNode(100));
console.log(BST);
