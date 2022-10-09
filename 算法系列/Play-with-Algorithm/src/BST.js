/**
 * BinarySearchTree(二叉搜索树，简称BST)继承自BinaryTree二叉树类
 * BST类实现了如下几个只有二叉搜索树所具有的方法：
 * 
 * 	1. add(el) 添加一个新节点 
 * 	2. remove(el) 移除一个节点
 * 	3. getNode(el) 获取节点 
 * 	4. contains(el) 判断BST上是否含有此节点
 * 
 */
import {BinaryTree,Node} from './BinaryTree.js';

export class BST extends BinaryTree{

	constructor() {
		// 继承父类必须super调用父类的构造函数
		super()
	}

	/**
	 迭代添加
	 添加的是否为根节点
		是 直接赋值
		否 判断大小 看父节点是那个
			判断是父节点的左节点还是右节点
	 */
	addNodeIterator(el) {
		this.treeNodeNullCheck(el);

		if (this.root == null) {
			this.root = new Node(el);
		} else {
			let currentNode = this.root;
			let parentNode = this.root;

			while (currentNode != null) {
				// 先记住父节点是谁
				parentNode = currentNode;
				// 判断大小
				if (currentNode.el > el) {
					// 新节点在当前遍历节点的左子树上
					currentNode = currentNode.left;
				} else if (currentNode.el < el) {
					// 新节点在当前遍历节点的右子树上
					currentNode = currentNode.right;
				} else {
					// 新节点值和某个节点一样，这里进行一次值的覆盖即可
					currentNode.el = el;
					return;
				}
			}

			// 确定了新节点的父节点parentNode 下一步确定是添加在左边还是右边
			if (parentNode.el > el) {
				parentNode.left = new Node(el, parentNode);
			} else {
				parentNode.right = new Node(el, parentNode);
			}
		}

		this.size++;
	}

	// 递归添加
	addNodeRecursion(el) {
		this.treeNodeNullCheck(el);

		if (this.root == null) {
			this.root = new Node(el);
		} else {
			this._addNodeRecursion(this.root, el);
		}
		this.size++;
	}

	// 私有方法
	_addNodeRecursion(currNode, el) {
		if (currNode == null) return;

		if (currNode.el > el) {
			// 新节点应该挂在左子树
			if (currNode.left == null) {
				currNode.left = new Node(el, currNode);
			} else {
				currNode = currNode.left;
				this._addNodeRecursion(currNode, el);
			}
		} else if (currNode.el < el) {
			// 新节点应该挂在右子树
			if (currNode.right == null) {
				currNode.right = new Node(el, currNode);
			} else {
				currNode = currNode.right;
				this._addNodeRecursion(currNode, el);
			}
		} else {
			// 新节点应该被替换
			currNode.el = el;
			return;
		}
	}

	// 查找节点
	getNode(el) {
		this.treeNodeNullCheck(el);

		let currNode = this.root;
		while (currNode != null) {
			if (currNode.el > el) {
				currNode = currNode.left;
			} else if (currNode.el < el) {
				currNode = currNode.right;
			} else {
				return currNode;
			}
		}

		// while循环结束还没有返回 代表没有找到 此时返回null
		return null;
	}

	// 判断节点是否存在于二叉树
	contains(el) {
		this.treeNodeNullCheck(el);
		return this.getNode(el) != null;
	}

	// 移除节点
	remove(el) {
		this.treeNodeNullCheck(el);
		if (this.root == null) return null;
		/*
			首先处理度为2的节点:一定可以找到前驱或者后继节点 这是必然的
			其实本质是先找到要删除的节点
			找到要删除节点的前驱或后继节点
			进行值的替换 
			将前驱或后继节点删除
			并且前驱和后继节点一定是度为0或1的节点
		*/
		let deleteNode = this.getNode(el);
		if (deleteNode) {
			// 度为2的节点 一定有前驱或者后继节点 
			if (this.hasTwoChildren(deleteNode)) {
				// 找到前驱节点
				let predecessor = this.getPredecessor(deleteNode);
				// 将前驱节点的值替换为要删除节点的值
				deleteNode.el = predecessor.el;
				// 移花接木 将要删除的节点从找到的度为2的节点变成了前驱节点
				// 这一步的目的是为了后面更加统一的删除这个度为0或者1的前驱节点
				deleteNode = predecessor;
			}
			
			// 度为0的节点
			if(this.isLeafNode(deleteNode)){
				if(deleteNode.parent == null){
					this.root = null;
				}else{
					if(deleteNode.parent.left == deleteNode){
						deleteNode.parent.left = null;
					}else if(deleteNode.parent.right == deleteNode){
						deleteNode.parent.right = null;
					}
				}
			}else{
				// 度为1的节点
				let childNode = deleteNode.left || deleteNode.right;
				let parentNode = deleteNode.parent;
				childNode.parent = parentNode;
				// 当前删除的节点是根节点
				if(parentNode == null){
					this.root = childNode;
				}else if(parentNode.left == deleteNode){
					parentNode.left = childNode;
				}else if(parentNode.right == deleteNode){
					parentNode.right = childNode;
				}
			}
			this.size--;
			return deleteNode;
			
		} else {
			// 删除的节点不在二叉树上
			return null;
		}
		
	}

	// 判断是否为度为2的节点
	hasTwoChildren(node) {
		return node.left != null && node.right != null;
	}

	// 判断是否为度为1的叶子节点
	isLeafNode(node) {
		return node.left == null && node.right == null;
	}

	
	/**
	 * 获取node节点的前驱节点
	 * 中序遍历的节点的前一个节点
	 * 有左子树-左子树的最右边节点
	 * 无左子树-一直找父节点 直到某个父节点的右子树中含有当前节点
	 * 
	 */
	getPredecessor(el) {
		this.treeNodeNullCheck(el);
		return this._getPredecessor(this.getNode(el));
	}
	
	// 获取后继节点
	getSuccessor(el) {
		this.treeNodeNullCheck(el);
		return this._getSuccessor(this.getNode(el));
	}
	
	_getPredecessor(node){
		if(node == null) return node;
		
		let currNode = node.left;
		if (currNode != null) {
			while (currNode.right != null) {
				currNode = currNode.right;
			}
			return currNode;
		} else {
			while (node.parent != null && node.parent.right != node) {
				node = node.parent;
			}
			return node.parent;
		}
	}
	
	_getSuccessor(node){
		if(node == null) return node;
		
		let currNode = node.right;
		if (currNode != null) {
			while (currNode.left) {
				currNode = currNode.left;
			}
			return currNode;
		} else {
			while (node.parent != null && node.parent.left != node) {
				node = node.parent;
			}
			return node.parent;
		}
	}
}




let bst1 = new BST();
let treeNodeList = [1,2,3];
for (var i = 0; i < treeNodeList.length; i++) {
	bst1.addNodeIterator(treeNodeList[i]);
}
// console.log(bst1.getSuccessor(19));
// console.log(bst1.getPredecessor(19));
// console.log(bst1.getTreeHeightIterator());
// console.log(bst1.getTreeHeightRecursion());
// bst1.toString();
bst1.preorderReverseIterator1();
// bst1.preorderReverseIterator2();
// bst1.inorderReverseIterator();
// bst1.postorderReverseIterator();