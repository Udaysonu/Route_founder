var PathInfo=require("../models/pathmodel");


var distprice=[]
var paths=[]
var waiting_time=[]
var travelling_time=[]



class Node{
    constructor(pri,dis,start_tim,end_tim){
        this.price=pri
        this.distance=dis
        this.start_time=start_tim
        this.end_time=end_tim
    }
}
class Graph{

    constructor(nvertices){
        this.nvertices=10;
    this.flight_paths=[];
    this.sources=new Set();
    this.destinations=new Set();
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
    addedge(a,b,price,distance,start_tim,end_tim){
        this.flight_paths.push([a,b,price,distance,start_tim,end_tim]);
        a=this.mapi[a]
        b=this.mapi[b]
        var temp=new Node(price,distance,start_tim,end_tim);
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
    find_travel_time(start_time,end_time){
        console.log(start_time,end_time)
        if(start_time==null){
            start_time=end_time;
        }
        var string=""
        var start_hour,start_min,end_hour,end_min,hour_diff,min_diff;
        for(let i=0;i<start_time.length;i++){
            if(start_time[i]==":"){
                start_hour=string
                string=""
                continue
            }
            string+=start_time[i]
        }
        start_min=string
        string=""
        
        for(let i=0 ;i<end_time.length;i++){
            if(end_time[i]==":"){
                end_hour=string
                string=""
                continue
            }
            string+=end_time[i]
        }
        end_min=string;
        start_hour=parseInt(start_hour)
        start_min=parseInt(start_min)
        end_hour=parseInt(end_hour)
        end_min=parseInt(end_min)
        hour_diff=end_hour-start_hour-1
        min_diff=end_min+(60-start_min)
         
        
         
        if(min_diff>=60){
            hour_diff+=1
            min_diff-=60
        }
        if(hour_diff<0){
           hour_diff+=24;
       }
       //  console.log(start_hour,start_min,end_hour,end_min,hour_diff,min_diff)
        console.log(hour_diff*60+min_diff)
        return hour_diff*60+min_diff
    }

    get_all_flight_paths(){
        return this.flight_paths;
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
                var start_time=null;
                    
                    if(check[0]==true){ 
                        for(let z of check[1]){ 
                            z.push(a)
                             
                            var pk=[]
                            var total_waiting_time=0
                            var total_travel_time=0
                            var totalprice=0
                            var totaldistance=0
                            for(let p=z.length-1;p>0 ;p--){
                                totalprice+=(this.adjmatrix[z[p]][z[p-1]].price)
                                totaldistance+=(this.adjmatrix[z[p]][z[p-1]].distance)
                                total_travel_time+=this.find_travel_time(this.adjmatrix[z[p]][z[p-1]].start_time,this.adjmatrix[z[p]][z[p-1]].end_time)
                                total_waiting_time+=this.find_travel_time(start_time,this.adjmatrix[z[p]][z[p-1]].start_time)
                                start_time=this.adjmatrix[z[p]][z[p-1]].end_time;
                            } 
                            distprice.push([totalprice,totaldistance])
                            for(let p=z.length-1;p>=0 ;p--){
                                pk.push(this.revmapi[z[p]])
                                 
                                

                            } 
                           
                            paths.push(pk)
                            travelling_time.push(total_travel_time)
                           
                            waiting_time.push(total_waiting_time)
                            console.log()
                        }
                        
                    }
                
            }
        }
    }
}
b1=new Graph(10);

function loadpath(){
    PathInfo.find({},function(err,paths){
        for(path of paths){
            b1.addedge(path.source,path.destination,path.cost,path.distance,path.start_time,path.end_time)
        }
    })
    console.log("Databases paths loaded")
}
loadpath()

module.exports.addPath=function(req,res){

    PathInfo.create(req.body,function(err,path){
        if(err){
            console.log("Error in creating the path");
            return res.redirect("back");
        }
        console.log("Path Created Succesfully");
        return res.redirect("back");
    })   
}

module.exports.path_eval=function(req,res){
     distprice=[]
      paths=[]
      waiting_time=[]
      travelling_time=[]
    
   

    console.log(req.body.source,req.body.destination)
    b1.getallpath(req.body.source,req.body.destination) 
   
    console.log(paths,waiting_time,travelling_time)
    var journey_time=[]
    for(let i=0;i<waiting_time.length;i++){
       journey_time.push(waiting_time[i]+travelling_time[i])
   }
   var converted_waiting_time=[],converted_travelling_time=[],converted_journey_time=[];
    converter=function converter(raw_array,converted_array){
       for(i of raw_array){
           var string=""
           var hours=parseInt(i/60);
           var min=i-hours*60;
           string=hours.toString()+" hr "+min.toString()+" min"
          converted_array.push(string)
          }
    }

   converter(waiting_time,converted_waiting_time)
   converter(travelling_time,converted_travelling_time)
   converter(journey_time,converted_journey_time)
    console.log(waiting_time,converted_waiting_time)
    console.log(journey_time,converted_journey_time)
    console.log(travelling_time,converted_travelling_time)
   

   
    res.render("search",{values:paths,pric_dist:distprice,wait_time:converted_waiting_time,travel_time:converted_travelling_time,journey_time:converted_journey_time});
}

module.exports.showPaths=function(req,res){
    var paths=b1.get_all_flight_paths();
    res.render("all_flight_paths",{paths:paths});
}


module.exports.removePath=function(req,res){

}