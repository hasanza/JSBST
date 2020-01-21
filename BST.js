class Node {
    constructor(data) {
        this.left = null;
        this.data = data;
        this.right = null;
        this.printed = false;
        this.isGrandpa = false;
        this.num = 0;
        this.daddy = null;
    }
}

class BST {
    constructor () {
        this.root = null;
        this.stack=[];
        this.count = 1;
    }

   insertNode(data) {
        if (this.root == null) {
            this.root = new Node(data);
            this.root.isGrandpa = true;
            this.root.daddy = null;
            this.count++;
            this.root.num = this.count;
            console.log(`${data} inserted at root`);
        }
        else {
            //new node created. To be inserted later.
            let temp = this.root;
            let temp2 = new Node (data);
            let father;
            while(temp !=null){
                father = temp;
                temp2.daddy = father;
                //check the node size against existing nodes
                if(data == temp.data) {
                    console.log('data already exists!');
                    break;
                }
                if(data < temp.data) {
                    temp = temp.left;
                }
                else if (data > temp.data) {
                    temp = temp.right;
                }
            }
            if (temp2.data < father.data){
                father.left = temp2;
                this.count++;
                father.left.num = this.count;
                console.log(`${temp2.data} inserted at left`);
            } else if(temp2.data > father.data) {//kk
                father.right = temp2;
                this.count++;
                father.right.num = this.count;
                console.log(`${temp2.data} inserted at right`);
            }

        }
    }


inOrderRec(node){
    if(node==null){
        return
    }
    this.inOrderRec(node.left)
    console.log(node.data);
    this.inOrderRec(node.right)
}

deleteNode(node, data) {
    if (node == null) {
        return
    } else if (node.data == data) {
        this.deletion(node);
    } else {
        this.deleteNode(node.left, data);
        this.deleteNode(node.right, data);
    }
}

deletion(node) {
    console.log(`deleting ${node.data} ...`);
    if (node.daddy != null) {
        console.log(`${node.data} has a father who is ${node.daddy.data}`);
        if (node.left == null && node.right == null) {
            console.log(`${node.data} is childlesss...`);
            if (node == node.daddy.left) {
                node.daddy.left = null;
            } else {
                node.daddy.right = null;
            }
            node = null;
        } else if (node.left != null && node.right == null) {
            this.deleteHelperLC(node);
        } else if (node.right != null && node.left == null) {
            this.deleteHelperRC(node);
        } else if (node.left != null && node.right != null) {
            this.deleteHelperBoth(node);
        }
    } else {
        //grandpa deletion 
        console.log('no daddy... :(');
        this.deleteGrandpa(node);
    }
}

deleteHelperLC(node) {
    if (node == node.daddy.left) {
        node.daddy.left = node.left;
        node = null;
    } else if (node == node.daddy.right) {
        node.daddy.right = node.left;
        node = null;
    }
}

deleteHelperRC(node) {
    if (node == node.daddy.left) {
        node.daddy.left = node.right;
        node = null;
    } else if (node == node.daddy.right) {
        node.daddy.right = node.right;
        node = null;
    }
}

deleteHelperBoth(node) {
    if (node == node.daddy.left) {
        node.right.left = node.left;
        node.daddy.left = node.right;
        node = null;
    } else if (node == node.daddy.right) {
        node.left.right = node.right;
        node.daddy.right = node.left;
        node = null;
    }
}

deleteGrandpa(node) {
    console.log('deleting grandpa and selecting new one');
    if (node.left != null && node.right == null) {
        console.log('GP only has left child');
        //make LC the grandpa
        node = node.left;
        node.daddy = null;
        this.root = node;
        node = null;

    } else if (node.left == null && node.right != null) {
        //make RC the grandpa
        console.log('GP only has Right child');
        node = node.right;
        node.daddy = null;
        this.root = node;
        node = null;
    } else {
        //I choose to make RC the grandpa
        console.log('GP has 2 children');
        let RC = node.right;
        //traverse to left most LC of RC
        while(RC.left != null) {
            RC = RC.left;
        }
        RC.left = node.left;
        RC.daddy = null;
        this.root = RC;
        node = null;
    }
}

}

//main
b1 = new BST();
b1.insertNode(9);
b1.insertNode(2);
b1.insertNode(1);
b1.insertNode(3);
b1.insertNode(12);
b1.insertNode(22);
b1.insertNode(14);

b1.deleteNode(b1.root, 9);
console.log('tree after deletion');

b1.inOrderRec(b1.root);