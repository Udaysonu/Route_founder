var PathInfo=require("../models/pathmodel");


var distprice=[]
var paths=[]
var waiting_time=[]
var travelling_time=[]
var time=[]


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
        this.nvertices=25;
    this.flight_paths=[];
    this.sources=new Set();
    this.destinations=new Set();
    var gfg = new Array(this.nvertices);  
    for (var i = 0; i < gfg.length; i++) { 
        gfg[i] = new Array(this.nvertices); 
    }
    var h = 0; 
    for (var i = 0; i < this.nvertices; i++) { 
        for (var j = 0; j < this.nvertices; j++) { 
            gfg[i][j] = null; 
        } 
    } 
      this.adjmatrix= gfg;
            
        this.mapi={"Abu Dhabi":0,"Bali":1,"Bangkok":2,"Barcelona":3,"Canberra":4,"Colombo":5,"Delhi":6,"Dhaka":7,"Dubai":8,"Hong Kong":9,"Hyderabad":10,"Islamabad":11,"Karachi":12,"Kathmandu":13,"Kuala Lampur":14,"London":15,"Los Angeles":16,"Mecca":17,"Mumbai":18,"New York":19,"Rome":20,"Seoul":21,"Shanghai":22,"Singapore":23};
        this.revmapi={0:"Abu Dhabi",1:"Bali",2:"Bangkok",3:"Barcelona",4:"Canberra",5:"Colombo",6:"Delhi",7:"Dhaka",8:"Dubai",9:"Hong Kong",10:"Hyderabad",11:"Islamabad",12:"Karachi",13:"Kathmandu",14:"Kuala Lampur",15:"London",16:"Los Angeles",17:"Mecca",18:"Mumbai",19:"New York",20:"Rome",21:"Seoul",22:"Shanghai",23:"Singapore"};

     }
    addedge(a,b,price,distance,start_tim,end_tim){
        this.flight_paths.push([a,b,price,distance,start_tim,end_tim]);
        a=this.mapi[a]
        b=this.mapi[b]
        var temp=new Node(price,distance,start_tim,end_tim);
        console.log("hello")
        this.adjmatrix[a][b]=temp;
    }
    removeedge(source,destination){
        source=this.mapi[source]
        destination=this.mapi[destination]
        this.adjmatrix[source][destination]=null;
    }
    updateedge(body){
        var source=this.mapi[body.source]
        var destination=this.mapi[body.destination]
        
        console.log(source,destination);
        console.log(body.cost)
        var temp=new Node(parseInt(body.cost),parseInt(body.distance),body.start_time,body.end_time);
        this.adjmatrix[source][destination]=temp;
        console.log(temp,"temp in algo controller")
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
        console.log(a,k)
        for(let i=0;i<this.nvertices;i++){
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
                            var start_time=null
                            var end_time=null
                            for(let p=z.length-1;p>0 ;p--){
                                if(start_time==null){
                                    console.log("test")
                                    start_time=this.adjmatrix[z[p]][z[p-1]].start_time;
                                }
                                end_time=this.adjmatrix[z[p]][z[p-1]].end_time;
                                totalprice+=(this.adjmatrix[z[p]][z[p-1]].price)
                                totaldistance+=(this.adjmatrix[z[p]][z[p-1]].distance)
                                total_travel_time+=this.find_travel_time(this.adjmatrix[z[p]][z[p-1]].start_time,this.adjmatrix[z[p]][z[p-1]].end_time)
                                total_waiting_time+=this.find_travel_time(start_time,this.adjmatrix[z[p]][z[p-1]].start_time)
                             
                            } 
                            distprice.push([totalprice,totaldistance])
                            for(let p=z.length-1;p>=0 ;p--){
                                pk.push(this.revmapi[z[p]])
                            } 
                           
                            paths.push(pk)
                            travelling_time.push(total_travel_time)
                            console.log(start_time,end_time,"test")
                            time.push([start_time,end_time])
                            
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






module.exports.deletePath=function(source,destination){
    console.log(source,destination);
    b1.removeedge(source,destination);
    return 
}




module.exports.updatePath=function(body){
    console.log(body)
    b1.updateedge(body);
    return 
}






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
    time=[]
   

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
   

   
    res.render("search",{values:paths,pric_dist:distprice,wait_time:converted_waiting_time,travel_time:converted_travelling_time,journey_time:converted_journey_time,time:time});
}

module.exports.showPaths=function(req,res){
    var paths=b1.get_all_flight_paths();
    res.render("all_flight_paths",{paths:paths});
}


module.exports.removePath=function(req,res){

}