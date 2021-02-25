
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
         addedge(a,b,price,distance,start_tim,end_tim){
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
     b1=new Graph(10)
     b1.addedge("Delhi","Amritsar",2000,200,"1:30","2:30")
     b1.addedge("Amritsar","Delhi",2000,200,"12:30","14:30")
     b1.addedge("Delhi","Mumbai",4000,600,"23:43","1:40")
     b1.addedge("Mumbai","Delhi",4000,600,"4:32","5:40")
     b1.addedge("Delhi","Noida",2000,100,"5:50","7:43")
     b1.addedge("Noida","Gurgaon",2000,80,"6:20","7:20")
     b1.addedge("Gurgaon","Delhi",1500,79,"8:50","7:30")
     b1.addedge("Delhi",'Hyderabad',5500,700,"9:45","4:43")
     b1.addedge("Hyderabad","Delhi",5500,700,"8:40","10:40")
     b1.addedge("Mumbai","Chennai",3200,350,"3:30","5:00")
     b1.addedge("Mumbai","Bhopal",3000,320,"3:21","3:42")
     b1.addedge("Bhopal","Chennai",2300,200,"7:24","6:23")
     b1.addedge("Chennai","Pudichery",1000,60,"8:09","10:30")
     b1.addedge("Hyderabad","Banglore",1500,200,"4:23","5:23")
     b1.addedge("Banglore","Chennai",2000,350,"9:43","11:30")
     b1.addedge('Chennai',"Banglore",3800,1078,"23:00","4:20")
     b1.addedge("Pudichery","Hyderabad",2400,130,"0:00","6:49") 
     b1.getallpath("Chennai","Banglore") 

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