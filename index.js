/*
1. Binary Search Tree
              3
              /\
            1   4
             \   \
              2   6
                  /\
                 5  9
                    /
                  7


                    E
                 /    \
               A       S
                      /   \
                      Q     Y
                    /       /
                   I        U
                     \     /
                      O   T
                    /
                  N
*/

/*
2. Remove Root
              2
              /\
            1   4
                \
                  6
                  /\
                 5  9
                    /
                  7


                    A
                      \
                        S
                      /   \
                      Q     Y
                    /       /
                   I        U
                     \     /
                      O   T
                    /
                  N
*/


class BinarySearchTree {
  constructor (key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  // worst case is O(n) on a tree that skews one way or the other so would have to iterate basically through all the nodes to figure out where to insert new node
  insert(key, value) { //average of balanced tree is O(log(n)) because each row contains twice as much data as the row above it so width grows exponentially to height
    if(this.key == null) {
      this.key = key;
      this.value = value;
    } else if(key < this.key) {
      if(this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    }
    else {
      if(this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) { //Average would be O(log(n)), worst case O(n) if tree not balanced, best case O(1) if node is the root node
    if(this.key === key) {
      return this.value;
    } else if(key < this.key && this.left) {
      return this.left.find(key);
    } else if(key > this.key && this.right) {
      return this.right.find(key);
    } else {
      throw new Error('Key error');
    }
  }

  remove(key) { //best case O(1), average is O(log(n)), worst is O(n)
    if(this.key === key) {
      if(this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if(this.left) {
        this._replaceWith(this.left);
      } else if(this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    }
    else if(key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error ('Key Error');
    }
  }

  _replaceWith(node) {
    if(this.parent) {
      if(this === this.parent.left) {
        this.parent.left = node;
      } else if(this === this.parent.right) {
        this.parent.right = node;
      }
      if(node) {
        node.parent = this.parent;
      }
    }
    else {
      if(node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
      }
    }
  }

  _findMin() {
    if(!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

function main() {
  const numBST = new BinarySearchTree();
  const alphBST = new BinarySearchTree();
  numBST.insert(3);
  numBST.insert(1);
  numBST.insert(4);
  numBST.insert(6);
  numBST.insert(9);
  numBST.insert(2);
  numBST.insert(5);
  numBST.insert(7);
  // console.log(numBST);
  alphBST.insert('E');
  alphBST.insert('A');
  alphBST.insert('S');
  alphBST.insert('Y');
  alphBST.insert('Q');
  alphBST.insert('U');
  alphBST.insert('E');
  alphBST.insert('S');
  alphBST.insert('T');
  alphBST.insert('I');
  alphBST.insert('O');
  alphBST.insert('N');
  // console.log(alphBST);
}
main();

/*
4.
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}
this function returns 0 if t doesn't exist
if it does it returns the left node the value of t and the right node
 */


//  5
const BST = new BinarySearchTree();
BST.insert(3);
BST.insert(1);
BST.insert(4);
BST.insert(6);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(7);
function height(tree) {
  if(tree.left !== null && tree.right !== null) {
    let left = height(tree.left);
    let right = height(tree.right);
    if(left <= right) {
      return right+1;
    } 
    if(left > right) {
      return left+1;
    }
  }

  if(tree.left !== null) {
    return height(tree.left)+1;
  } else if(tree.right !== null) {
    return height(tree.right)+1;
  }
  return 1;
}
height(BST);


// 6 
const correct = {key: 9, left: {key: 4, left: {key: null}, right: {key: 5, left: {key: null}, right: {key: null}}}, right: {key: 10, left: {key: null}, right: {key: null}}};
const badTree1 = {key: 4, left: {key: 5, left: {key: null}, right: {key: null}}, right: {key: null}}; 
const badTree2 = {key: 6, left: {key: 1, left: {key: null}, right: {key: 0, left: {key: null}, right: {key: null}}}, right: {key: null}};
function bstCheck(tree, min = null, max = null) {
  if(tree.right == null && tree.left == null) {
    return;
  }
  if(tree.key > tree.left.key) {
    bstCheck(tree.left, tree.left, tree.right);
  }
  if(tree.key < tree.right.key) {
    bstCheck(tree.right, tree.left, tree.right);
  }
  if((tree.key < tree.left.key) || (tree.key > tree.right.key)) {
    return false;
  }
  return true;
}
// console.log(bstCheck(correct)); //true
// console.log(bstCheck(badTree1)); //false
// console.log(bstCheck(badTree2)); //false


// 7
// function thirdLargest(tree) {
  
// }
// thirdLargest(BST);


// 8
// should be similar to height function and then just compare the two values right?
// is this how this was supposed to be done? using height function to get number of levels and then seeing if the number is greater than 1 or not
const balancedBST = new BinarySearchTree();
balancedBST.insert(9);
balancedBST.insert(5);
balancedBST.insert(13);
balancedBST.insert(3);
balancedBST.insert(7);
balancedBST.insert(11);
balancedBST.insert(15);
function balanced(tree) {
  if(tree === null) {
    return false;
  }
  let left = height(tree.left);
  let right = height(tree.right);
  let result = Math.abs(left - right);
  if(result > 1) {
    return false;
  }
  return true;
  // if(tree.left !== null && tree.right !== null) {
    
  // }
  //   console.log('left ', left, ' right ', right);
  //   // if(left <= right) {
  //   //   return right+=1;
  //   // }
  //   // if(left > right) {
  //   //   return left+=1;
  //   // }
  // // }
  // if((left-1 !== right) || (right-1 !== tree.left)) {
  //   // console.log('left', left);
  //   // console.log('right', right);
  //   result = false;
  // } else {
  //   result = true;
  // }
  // // if(tree.left !== null && tree.right !== null) {
  // //   return true;
  // // // } else if(tree.right !== null) {
  // // //   return balanced(tree.right)+1;
  // }

  // return result;
}
console.log(balanced(BST));
// currently undefined because no returns or anything happening
console.log(balanced(balancedBST));


// 9
// don't construct BST in this function 