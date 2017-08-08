console.log('Loaded!');
var img = document.getElementById("image1");
var marginLeft= 0;
function moveRight(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px' ;
}
img.onclick = function (){
   var interval = setInterval(moveRight,50);
};
var button = document.getElementById("counter");
button.onclick = function(){
    console.log('Button Clicked');
    //create a request object
   var request = new XMLHttpRequest();
   //create a response and store it as variable
   request.onreadystatechange = function(){
       console.log('onreadystate changed');
       if(request.readyState === XMLHttpRequest.DONE){
           console.log('Inside 1st if');
           if(request.status === 200){
               console.log('inside 2nd if' +request.status);
               var counter = request.responseText;
               var span = document.getElementById("counter");
               span.InnerHTML = counter.toString();
           }
       }
   };
   request.open('GET','http://bhakya3.imad.hasura-app.io/counter',true);
   request.send(null);
};