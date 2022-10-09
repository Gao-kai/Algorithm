/**
 * 合并两个有序链表
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function (list1, list2) {
    // 构建虚拟头结点
    let dummyHead = new ListNode(-1);
    // 复制虚拟头节点的引用地址 便于后续返回
    let p = dummyHead;
    
    // 这里的这个比较条件很重要一下子解决了三种情况：
    // 1.list1为空list2有值 2. l2有值l1为空 3.list1和list2都为空
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            p.next = list1;
            list1 = list1.next;
        } else {
            p.next = list2;
            list2 = list2.next;
        }
        p = p.next;
    }

    // 遍历完成之后总是会有最大的一个节点无法遍历到
    if(list1 == null){
        p.next = list2;
    }

    if(list2 == null){
        p.next = list1;
    }

    // 这就是开头为什么将dummyHead赋值给p的原因
    return dummyHead.next;
};


