class LinkedListNode {
	constructor(c, pre, next) {
		this.character = c;
		this.pre = pre;
		this.next = next;
	}
}

class EMXPuzzle {
  constructor(childs) {
		let nodes = [];
		//create all of the nodes needed
		for (let i=0; i<childs.length; i++) {
			let n = new LinkedListNode(childs[i].charAt(0), null);
			nodes.push(n);
		}

		//build the relationship
		for (let i=0; i<childs.length; i++) {
			for (let k = 1; k < childs[i].length; k++) {
				let curChar = childs[i].charAt(k);
				if (curChar === '<') {
					nodes[i].next = nodes[k-1];
					nodes[k-1].pre = nodes[i];
				} else if (curChar === '>') {
					nodes[k-1].next = nodes[i];
					nodes[i].pre = nodes[k-1];
				}
			}
		}

		//find the head
		for (let n of nodes) {
			if (!n.pre) {
				this.head = n;
			}
		}
		this.nodes = nodes;
	}
	
	buildMatrix() {
		let matrix = Array(this.nodes.length).fill().map(() => 
				Array(this.nodes.length).fill('-')
		);

		for (let r=0; r<4; r++) {
			for (let c=0; c<4; c++) {
				if (r === c) {
					matrix[r][c] = '=';
				} else if (matrix[r][c] === '-') {
					let char = this.getRelationshipOfNodes(this.nodes[r], this.nodes[c]);
					matrix[r][c] = char;
					matrix[c][r] = (char === '>') ? '<' : '>';
				}
			}
		}
		return matrix;
	}

	/**
	 * get the relationship of the two nodes, node1 ? node2
	 * @param {LinkedListNode} node1 
	 * @param {LinkedListNode} node2 
	 */
	getRelationshipOfNodes(node1, node2) {
		let curNode = this.head;
		while (curNode) {
			if (curNode.character === node1.character) {
				return '<';
			} else if (curNode.character === node2.character) {
				return '>';
			}
			curNode = curNode.next;
		}
		return '-';
	}

	getMatrixString() {
		let m = this.buildMatrix();
		let result = ' ABCD\n';
		let chars = ['A', 'B', 'C', 'D'];
		for (let r=0; r<chars.length; r++) {
			let line = chars[r];
			for (let c=0; c<chars.length; c++) {
				line = line + m[r][c];
			}
			result += line + '\n';
		}
		return result;
	}
}

module.exports = EMXPuzzle;