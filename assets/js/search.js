var btns=document.getElementsByClassName("submit");
 
 for(let btn of btns){
  btn.addEventListener("click",function(e){
    console.log(btn.getAttribute("value"))
    let btnvalue=parseInt(btn.getAttribute("value"));
    console.log(btnvalue);
    console.log("clicked");
   
    let cost=document.getElementById(`cost_${btnvalue}`);
    let passengers=document.getElementById(`passengers_${btnvalue}`)
    cost.value=parseInt(cost.getAttribute("saver"))*parseInt(passengers.value)
    console.log(cost.value,passengers.value)
    ans=window.confirm("The total amout payable is "+cost.value+ ". Are you sure you want to continue?")
    if(!ans)
    {
      e.preventDefault();
    }
    
  })
 }