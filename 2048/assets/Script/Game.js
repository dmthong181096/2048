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
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        Emitter.instance = new Emitter()
        Emitter.instance.registerEvent("transBlocksLayout", this.transBlocksLayout, this);
       

    },
    transBlocksLayout(data) {
        Variables.blocksLayout = data;
        console.log(Variables.blocksLayout);
    },
    start () {

    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.down:
                console.log('Press a key DOWN');
                for (let col = 0; col < 4; col++) {
                    // Variables.blockLayout._flag = true
                    // Variables.blockLayout.moveDown(3,col)
                    
                }
                break;
            case cc.macro.KEY.up:
                console.log('Press a key UP');
                for (let col = 0; col <= 3; col++) {
                    // Variables.blockLayout._flag = true
                    // Variables.blockLayout.moveUp(0,col)
                    
                }
                break;
            case cc.macro.KEY.left:
                console.log('Press a key LEFT');
                for (let row = 0; row < 4; row++) {
                    // Variables.blockLayout._flag = true
                    // Variables.blockLayout.moveLeft(row)
                    
                }
                break;
            case cc.macro.KEY.right:
                console.log('Press a key RIGHT');
                // for (let row = 0; row < 4; row++) {
                    // console.log(row);
                    // Variables.blockLayout._flag = true
                    Variables.blocksLayout.moveRight() 
                // }
                break;
            default : {
                return
            }
            

            
        }
        // Variables.blockLayout.countScore()
        Variables.blocksLayout.randomBlock();
    },
    // update (dt) {},
});
