var btns=document.getElementsByClassName("submit");
 
 for(let btn of btns){
  btn.addEventListener("click",function(e){
    console.log(btn)
    
    console.log("clicked");
    var cost=document.getElementById("cost");
    var passengers=document.getElementById("passengers")
    cost.value=parseInt(cost.value)*parseInt(passengers.value)
    console.log(cost.value,passengers.value)
    ans=window.confirm("The total amout payable is "+cost.value+ ". Are you sure you want to continue?")
    if(!ans){
      e.preventDefault();
    }
    
  })
 }