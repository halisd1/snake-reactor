const LinkedListNode = function(i,j){
    this.i = i;
    this.j = j;
    this.next = null;
    this.prev = null;
}

const snakeMap = {
    [[12,4]]: ['horizontal', 'right'],  
    [[12,5]]: ['horizontal', 'right'],    
    [[12,6]]: ['horizontal', 'right'],  
}

const snakeHead = new LinkedListNode(12,6);
snakeHead.next = new LinkedListNode(12,5);
snakeHead.next.prev = snakeHead;
snakeHead.next.next = new LinkedListNode(12,4);
snakeHead.next.next.prev = snakeHead.next;
const snakeTail = snakeHead.next.next;

export {
    snakeHead,
    snakeTail,
    snakeMap,
    LinkedListNode
};