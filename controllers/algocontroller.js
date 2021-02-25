//requiring the required models
var PathInfo=require("../models/pathmodel");

//variables that are needed to store the details;
var distprice=[]
var paths=[]
var waiting_time=[]
var travelling_time=[]
var time=[]
var all_intervals=[]
//Node to store the values

class Node{
        constructor(pri,dis,start_tim,end_tim){
            this.price=pri;
            this.distance=dis;
            this.start_time=start_tim;
            this.end_time=end_tim;
            this.next=null;
        }
    }
    
    //lists to store multiple paths
    class List{
        constructor(){
            this.head=null;
            this.tail=null;
            this.lenght=0;
        }
    }
    
    
    class Graph{
    
        constructor(nvertices){
            //setting the graph size
            this.nvertices=nvertices;
            //nouse
            this.flight_paths=[];
            //nouse
            this.sources=new Set();
            //nouse
            this.destinations=new Set();
    
            //creating 2-d array to store graph
            var mat = new Array(this.nvertices);  
            for (var i = 0; i < mat.length; i++) { 
                mat[i] = new Array(this.nvertices); 
            }
            for (var i = 0; i < this.nvertices; i++) { 
                for (var j = 0; j < this.nvertices; j++) { 
                    mat[i][j] = null; 
                } 
            } 
            this.adjmatrix= mat;
            //using mapi and revmapi to conver names to indices and vice versa     
            this.mapi={"Hyderabad":0,"Mumbai":1,"Delhi":2,"Jaipur":3,"Banglore":4,"Kochi":5,"Chennai":6,"Bhopal":7,"Amritsar":8,"Guwahati":9,"Srinagar":10,"Amaravati":11,"Vishakhapatanam":12,"Agra":13};
            this.revmapi={0:"Hyderabad",1:"Mumbai",2:"Delhi",3:"Jaipur",4:"Banglore",5:"Kochi",6:"Chennai",7:"Bhopal",8:"Amritsar",9:"Guwahati",10:"Srinagar",11:"Amaravati",12:"Vishakhapatanam",13:"Agra"};
        }
    
    
        get_head(price,distance,start_tim,end_tim,src,dest){
            if(this.adjmatrix[src][dest]==null){
                var list=new List();
                var node_=new Node(price,distance,start_tim,end_tim);
                list.head=node_;
                list.tail=node_;
                list.length=1;
                return list;
            }
            else{
                var list=this.adjmatrix[src][dest];
                var node_=new Node(price,distance,start_tim,end_tim);
                list.tail.next=node_;
                list.tail=node_;
                list.length=0;
                return list;
            }
        }
    
    
        //this funciton adds edges between two paths
        addedge(a,b,price,distance,start_tim,end_tim)
        {
            // this.flight_paths.push([a,b,price,distance,start_tim,end_tim]);
            //converts city names to indices
            a=this.mapi[a]
            b=this.mapi[b]
            //creating new node and adding it to graph
            // var temp=new Node(price,distance,start_tim,end_tim);
            var temp=this.get_head(price,distance,start_tim,end_tim,a,b);
            this.adjmatrix[a][b]=temp; 
        }
    
        //this funciton is to remove edges
        removeedge(source,destination)
        {   
            source=this.mapi[source]
            destination=this.mapi[destination]
            this.adjmatrix[source][destination]=null;
        }
    
        //this is to update path(edge) values
        updateedge(body){
            var source=this.mapi[body.source]
            var destination=this.mapi[body.destination]
            
            //creating new node and adding to the same path
            var temp=new Node(parseInt(body.cost),parseInt(body.distance),body.start_time,body.end_time);
            this.adjmatrix[source][destination]=temp;
           
        }
    
        //this function fetches all paths
        getallpathhelper(a,b,k,visited)
        {
            if(b==k)
            {   //if b==destination then we found our destination so returning true and destination
                return [true,[[k]]]
            }
    
            visited[b]=true
            var mainbool=false
            var mainlis=[] 
            
            for(let i=0;i<this.nvertices;i++)
            { 
                if(visited[i]==false && this.adjmatrix[b][i]!=null)
                {
                        var check=this.getallpathhelper(b,i,k,visited);
                        mainbool=( check[0] || mainbool);
                        
                        if(check[0])
                        {
                            for(let i of check[1])
                            {   
                                i.push(b)
                                mainlis.push(i)
                            }
                        } 
                }    
            }
            return [mainbool,mainlis]
        }
    
    
    
    
    
        //this function converts difference of start time and end time into minutes
        find_travel_time(start_time,end_time)
        {
            
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
             
            
             
            if(min_diff>=60)
            {
                hour_diff+=1
                min_diff-=60
            }
            if(hour_diff<0)
            {
               hour_diff+=24;
            }
           //  console.log(start_hour,start_min,end_hour,end_min,hour_diff,min_diff)
            
            return hour_diff*60+min_diff
        }
    
    
    
        //no use
        get_all_flight_paths()
        {
            return this.flight_paths;
        }
    
    
        //**key function** this function find all the permutations of the paths of array by referring to lists;
        get_permuatation_paths_helper(arr,st,end){
             if(st==0){
                 return [[]];
             }
            var paths=this.get_permuatation_paths_helper(arr,st-1,end);
            var list=this.adjmatrix[arr[st]][arr[st-1]]
            var head=list.head;
            var main_paths=[];
            while(head!=null){
                for(let path of paths)
                {
                    var temp_path=path.slice();
                    temp_path.unshift(head);
                    main_paths.push(temp_path);
                }
                head=head.next;
            }
            
            return main_paths;
        }
    
        //this funcitons calls the helper 
        get_permuatation_paths(arr){
            return this.get_permuatation_paths_helper(arr,arr.length-1,0);
        }
    
    
        //**key function **
        //####very important function ### TAKE CARE WHILE DEBUGGING
        //this function gets all the paths;
        getallpath(a,k)
        {
            var a=this.mapi[a];
            var k=this.mapi[k];
            //run the loop
            for(let i=0;i<this.nvertices;i++)
            {
                var visited={};
                //initialize all the vertices in visited to false
                for(let j=0;j<this.nvertices;j++)
                {
                    visited[j]=false;
                }
                //set visited of source to true 
                //to prevent a loop while searching
                visited[a]=true;
                if(this.adjmatrix[a][i]!=null)
                {    
                    //calling helper function which do dfs and get all paths from source to destination            
                    var check=this.getallpathhelper(a,i,k,visited);
                    
                    //initializing start_time to null
                    var start_time=null;
                    
                    //if path exists from source to destination
                    if(check[0]==true)
                    {       //loop on all paths from source to destination
                            for(let z of check[1])
                            {   
                                //pushing source into path 
                                z.push(a);
                                 
    
                                //this function gives all paths connecting all nodes in the list from source to destination
                                var all_paths=this.get_permuatation_paths(z);
                                 
    
                                //run loop on all_paths (since all_paths is combination of different nodes from source to destination)
                                for(let single_path of all_paths)
                                    {
                                        //initializing the required parameters
                                        var pk=[];
                                        var total_waiting_time=0
                                        var total_travel_time=0
                                        var totalprice=0
                                        var totaldistance=0
                                        var start_time=null
                                        var end_time=null;
                                        var prev_end_time=null;
                                        var intervals=[]
                                        //running loop on each node on single_path
                                        for(let i=0; i<single_path.length;i++)
                                        {                                        
                                                if(start_time==null)
                                                {
                                                    start_time=single_path[i].start_time;
                                                }
                                                intervals.push([single_path[i].start_time,single_path[i].end_time])
                                                end_time=single_path[i].end_time;
                                                totalprice+=(single_path[i].price);
                                                totaldistance+=(single_path[i].distance);
                                                total_travel_time+=this.find_travel_time(single_path[i].start_time,single_path[i].end_time);
                                                if(prev_end_time!=null)
                                                {
                                                    total_waiting_time+=this.find_travel_time(prev_end_time,single_path[i].start_time);
                                                }
                                                prev_end_time=single_path[i].end_time
                                        }
    
                                        //pushing all the required terms into their respective arrays
                                        distprice.push([totalprice,totaldistance])
                                        for(let p=z.length-1;p>=0 ;p--){
                                            pk.push(this.revmapi[z[p]])
                                
                                        } 
                                        
                                    
                                        paths.push(pk)
                                        travelling_time.push(total_travel_time)
                                        
                                        time.push([start_time,end_time])
                                        all_intervals.push(intervals)
                                        waiting_time.push(total_waiting_time)
    
    
                                }
    
    
    
    
                                       
                                
                            }
                            
                        }
                    
                }
            }
        }
    }


b1=new Graph(15);

function loadpath()
{
    PathInfo.find({},function(err,paths){
        for(path of paths){
            b1.addedge(path.source,path.destination,path.cost,path.distance,path.start_time,path.end_time)
        }
    })
    console.log("Databases paths loaded")
}
loadpath()






module.exports.deletePath=function(source,destination)
{
 
    b1.removeedge(source,destination);
    return 
}




module.exports.updatePath=function(body)
{
  
    b1.updateedge(body);
    return 
}






module.exports.addPath=function(req,res)
{
    if(b1.mapi[req.body.source]==undefined || b1.mapi[req.body.destination]==undefined){
        console.log("error in creating the path")
            req.flash("error",'Error in creating the Path')
            return res.redirect("back");
        
    }
   
    PathInfo.create(req.body,function(err,path){
        if(err){
            req.flash("error",'Error in creating the Path')
            console.log("Error in creating the path");
            return res.redirect("back");
        }
        b1.addedge(path.source,path.destination,path.cost,path.distance,path.start_time,path.end_time)

        req.flash("success","Path created successfully!")
        console.log("Path Created Succesfully");
        return res.redirect("back");
    })   
}



//function to evaluate all paths
module.exports.path_eval=function(req,res)
{
    try
    {  res.cookie('chosenDate', req.body.date);
        //set the arrays to empty
        //because they have already sotred previous search results
        distprice=[]
        paths=[]
        waiting_time=[]
        travelling_time=[]
        all_intervals=[]
        time=[]
     
  
     
      b1.getallpath(req.body.source,req.body.destination) 
     
     
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
      
     res.render("search",{values:paths,pric_dist:distprice,wait_time:converted_waiting_time,travel_time:converted_travelling_time,journey_time:converted_journey_time,time:time,all_intervals:all_intervals});
  
    }
    catch(err)
    {
        console.log("Error in algocontroller",err);
    }
}


//function to showpaths 
module.exports.showPaths=function(req,res){
    try{
        //this attribute will get all the paths in the algorithm
        var paths=b1.get_all_flight_paths();
        res.render("all_flight_paths",{paths:paths});
    }
    catch(err)
    {
        console.log("Error in algocontroller",err);
    }
}


//funciton to remove paths
module.exports.removePath=function(req,res)
{
    //pass the function 
    //there is not error in function
}