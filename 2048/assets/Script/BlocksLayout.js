// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
const Emitter = require('mEmitter');
const Variables = require("./Variables");
const colors = require("./Colors");
cc.Class({
    extends: cc.Component,

    properties: {
        blockPrefab: cc.Prefab  

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.emit('transBlocksLayout', this);
        this.gameInit()
    },
    gameInit() {
        this.createBlocks()
        // this.data = this.createArray2D(4, 4)

        // this.data = [];
        // this.blocks = [];
        Variables.data = []
        Variables.blocks = []
        for (let i = 0; i < 4; ++i) {
            Variables.blocks.push([null, null, null, null]);
            Variables.data.push([0, 0, 0, 0]);
        }
        // console.log(Variables.blocks);
        // console.log(Variables.data);
        this.randomBlock();
        // this.randomBlock();
    },
    createArray2D(row, col) {
        let arr = new Array()
        for (let i = 0; i < row; i++) {
            arr[i] = new Array()
            for (let j = 0; j < col; j++) {
                arr[i][j] = 0
            }
        }
        return arr
    },
    createBlocks() {
        Variables.blocks = this.createArray2D(4, 4)
        // console.log(Variables.blocks);
        let x = 100
        let y = 180
        let distance = 180


        for (let row = 0; row < Variables.blocks.length; row++) {
            Variables.positions.push([0, 0, 0, 0]);
            for (let col = 0; col < Variables.blocks.length; col++) {
                let block = cc.instantiate(this.blockPrefab)
                this.setLabel(block, 0)
                block.parent = this.node
                block.x = - distance + 20 * col+ col* x
                block.y = y
                Variables.positions[row][col] = cc.v2(block.x,block.y)

            }
            y -= 120
        }
        // console.log(ax);
    },
    setLabel(block, number) {
        if (number == 0) {
            block.getChildByName("BlockLabel").getComponent(cc.Label).string = ""
        } else {
            block.getChildByName("BlockLabel").getComponent(cc.Label).string = number
        }

        block.color = colors[number];
    },
    getEmptyLocations() {
        let locations = [];
        for (let i = 0; i < Variables.blocks.length; ++i) {
            for (let j = 0; j < Variables.blocks.length; ++j) {
                if (Variables.blocks[i][j] == null) {
                    locations.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
        // console.log(locations);
        return locations;
    },
    randomBlock() {
        let emptyLocations = this.getEmptyLocations();
        let location = emptyLocations[Math.floor(Math.random() * emptyLocations.length)];
        let x = location.x;
        let y = location.y;
        let block = cc.instantiate(this.blockPrefab);
        this.setLabel(block, 2)
        block.parent = this.node
        block.setPosition(Variables.positions[x][y]);
        Variables.blocks[x][y] = block
        console.log(Variables.blocks[x][y].getPosition());
        Variables.data[x][y] = Variables.numbers[Math.floor(Math.random() * Variables.numbers.length)];
        // console.log(Variables.blocks);
        // console.log(Variables.data[x][y]);
        this.setLabel(block, Variables.data[x][y])
        return true;
    },
    doMove(block, position) {
        let action = cc.moveTo(1, position);
        let finish = cc.callFunc(()=>{
            // callback && callback()
        });
        block.runAction(cc.sequence(action, finish));
    },
    moveNodeRight(row,col) {
        // let isZero = true
        console.log(col,row);
        console.log("Move");
        // if (col == 0) {
        //     if (this.data[row][3] == 0) {
        //         this.moveRight(row, 3);
        //     }
        //     if (this.data[row][1] != 0 && this.data[row][3] !=0 && this.data[row][2] == 0) {
        //         this.moveRight(row, 3);
        //     }
        //     this.updateBlockNum();
        //     if (this._flag) {
        //         // this.mergeBlock(row,"Right")
        //     }
        //     return
        console.log(Variables.data)
        // }
        if (Variables.data[row][col+1] == 0) {
            let block = Variables.blocks[row][col]
            let position = Variables.positions[row][col+1];
            Variables.blocks[row][col+1] = Variables.blocks[row][col];
            Variables.data[row][col+1] = Variables.data[row][col];

            Variables.data[row][col] = 0;
            Variables.blocks[row][col] = null;
            console.log(position);
            this.doMove(block, position);
            this.moveNodeRight(row, col+1);
            // this.doMove(block, position, ()=>{
            //     move(x, y+1, callback);
            // });
        }
        // this.moveRight(row, col - 1);
        // this.updateBlockNum();

        // if (y == ROWS-1 || this.data[x][y] == 0) {
        //     callback && callback();
        //     return;
        // } else if (this.data[x][y+1] == 0) {
        //     // 移动
        //     let block = this.blocks[x][y];
        //     let position = this.positions[x][y+1];
        //     this.blocks[x][y+1] = block;
        //     this.data[x][y+1] = this.data[x][y];
        //     this.data[x][y] = 0;
        //     this.blocks[x][y] = null;
        //     this.doMove(block, position, ()=>{
        //         move(x, y+1, callback);
        //     });
        //     hasMoved = true;
        // } else if (this.data[x][y+1] == this.data[x][y]) {
        //     // 合并
        //     let block = this.blocks[x][y];
        //     let position = this.positions[x][y+1];
        //     this.data[x][y+1] *= 2;
        //     this.data[x][y] = 0;
        //     this.blocks[x][y] = null;
        //     this.doMove(block, position, ()=>{
        //         this.doMerge(block, this.blocks[x][y+1], this.data[x][y+1], ()=>{
        //             callback && callback();
        //         });
        //     });
        //     hasMoved = true;
        // } else {
        //     callback && callback();
        //     return;
        // }
    },
    moveRight() {
        cc.log('move right');
        let blockMove = this.getBlockMove()
        // console.log(blockMove[1].x);
        // let counter = 0;
        for (let i=0; i<blockMove.length; ++i) {
            // console.log("MOve");
            this.moveNodeRight(blockMove[i].x, blockMove[i].y)
            // this.move(blockMove[i].x, blockMove[i].y)
        } 
        // this.moveNodeRight(1,2)
        // let hasMoved = false;    
        // let move = (x, y, callback) => {
        //     if (y == ROWS-1 || this.data[x][y] == 0) {
        //         callback && callback();
        //         return;
        //     } else if (this.data[x][y+1] == 0) {
        //         // 移动
        //         let block = this.blocks[x][y];
        //         let position = this.positions[x][y+1];
        //         this.blocks[x][y+1] = block;
        //         this.data[x][y+1] = this.data[x][y];
        //         this.data[x][y] = 0;
        //         this.blocks[x][y] = null;
        //         this.doMove(block, position, ()=>{
        //             move(x, y+1, callback);
        //         });
        //         hasMoved = true;
        //     } else if (this.data[x][y+1] == this.data[x][y]) {
        //         // 合并
        //         let block = this.blocks[x][y];
        //         let position = this.positions[x][y+1];
        //         this.data[x][y+1] *= 2;
        //         this.data[x][y] = 0;
        //         this.blocks[x][y] = null;
        //         this.doMove(block, position, ()=>{
        //             this.doMerge(block, this.blocks[x][y+1], this.data[x][y+1], ()=>{
        //                 callback && callback();
        //             });
        //         });
        //         hasMoved = true;
        //     } else {
        //         callback && callback();
        //         return;
        //     }
        // };




       
    },
    getBlockMove() {
        let blockMove = [];
        for (let i=0; i<4; ++i) {
            for (let j=0; j<4; ++j) {
                if (Variables.data[i][j] != 0) {
                    blockMove.push({x: i, y: j});
                    // console.log(blockMove);
                }
            }
        }
        return blockMove
    },
    move() {

    },
    start () {

    },

    // update (dt) {},
});
