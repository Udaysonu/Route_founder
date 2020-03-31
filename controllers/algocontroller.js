module.exports.path_eval=function(req,res){
   var distprice=[]
    var paths=[]
    class Node{
        constructor(pri,dis){
            this.price=pri
            this.distance=dis
        }
    }
    class Graph{
        constructor(nvertices){
            this.nvertices=10
        
        var gfg = new Array(10);  
        for (var i = 0; i < gfg.length; i++) { 
            gfg[i] = new Array(10); 
        }
        var h = 0; 
        for (var i = 0; i < 10; i++) { 
            for (var j = 0; j < 10; j++) { 
                gfg[i][j] = null; 
            } 
        } 
          this.adjmatrix= gfg;
            this.mapi={"Banglore":0,"Hyderabad":1,"Chennai":2,"Amritsar":3,"Delhi":4,"Mumbai":5,"Pudichery":6,"Noida":7,"Gurgaon":8,"Bhopal":9}
            this.revmapi={0:"Banglore",1:"Hyderabad",2:"Chennai",3:"Amritsar",4:"Delhi",5:"Mumbai",6:"Pudichery",7:"Noida",8:"Gurgaon",9:"Bhopal"}
    
         }
        addedge(a,b,price,distance){
            a=this.mapi[a]
            b=this.mapi[b]
            var temp=new Node(price,distance);
            this.adjmatrix[a][b]=temp;
        }
        getallpathhelper(a,b,k,visited){
            if(b==k){
                return [true,[[k]]]
            }
            visited[b]=true
            var mainbool=false
            var mainlis=[]
            for(let i=0;i<10;i++){
              
             if(visited[i]==false && this.adjmatrix[b][i]!=null){
                var check=this.getallpathhelper(b,i,k,visited)
                mainbool=( check[0] || mainbool)
                 
                if(check[0]){
                    for(let i of check[1]){
                        console.log(i)
                        i.push(b)
                        mainlis.push(i)
                    }
                } 
             }    
                
            }
            return [mainbool,mainlis]
        }
        getallpath(a,k){
            a=this.mapi[a]
            k=this.mapi[k]
            for(let i=0;i<10;i++){
               var visited={}
                for(let j=0;j<10;j++){
                    visited[j]=false;
                }
                visited[a]=true;
                if(this.adjmatrix[a][i]!=null){                 
                    var check=this.getallpathhelper(a,i,k,visited)
                        console.log(check[1])
                        if(check[0]==true){ 
                            for(let z of check[1]){ 
                                z.push(a)
                                console.log(z)
                                var pk=[]
                                
                                var totalprice=0
                                var totaldistance=0
                                for(let p=z.length-1;p>0 ;p--){
                                    totalprice+=(this.adjmatrix[z[p]][z[p-1]].price)
                                    totaldistance+=(this.adjmatrix[z[p]][z[p-1]].distance)
                                } 
                                distprice.push([totalprice,totaldistance])
                                for(let p=z.length-1;p>=0 ;p--){
                                    pk.push(this.revmapi[z[p]])
                                    console.log(this.revmapi[z[p]])
                                    

                                } 
                               
                                paths.push(pk)
                                console.log()
                            }
                            
                        }
                    
                }
            }
        }
    }
    b1=new Graph(10)
    b1.addedge("Delhi","Amritsar",2000,200)
    b1.addedge("Amritsar","Delhi",2000,200)
    b1.addedge("Delhi","Mumbai",4000,600)
    b1.addedge("Mumbai","Delhi",4000,600)
    b1.addedge("Delhi","Noida",2000,100)
    b1.addedge("Noida","Gurgaon",2000,80)
    b1.addedge("Gurgaon","Delhi",1500,79)
    b1.addedge("Delhi",'Hyderabad',5500,700)
    b1.addedge("Hyderabad","Delhi",5500,700)
    b1.addedge("Mumbai","Chennai",3200,350)
    b1.addedge("Mumbai","Bhopal",3000,320)
    b1.addedge("Bhopal","Chennai",2300,200)
    b1.addedge("Chennai","Pudichery",1000,60)
    b1.addedge("Hyderabad","Banglore",1500,200)
    b1.addedge("Banglore","Chennai",2000,350)
    b1.addedge('Chennai',"Banglore",3800,1078)
    b1.addedge("Pudichery","Hyderabad",2400,130) 
    b1.getallpath(req.body.source,req.body.destination) 
    console.log(paths)
   
    res.render("search",{values:paths,pric_dist:distprice});
}