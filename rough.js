"use strict"
class node{
    constructor(){
        console.log(this)
    }
    gain(){
        console.log(this)
        var puk=()=>{
            console.log(this)
        }
        var self=this
        puk(self)
    }
}
var k=new node()
k.gain()