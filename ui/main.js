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
    //create a request object
   var request = new XMLHttpRequest();
   //create a response and store it as variable
   request.onreadystatechange = function(){
       if(request.readyState === XMLHttpRequest.DONE){
           if(request.status === 200){
               var names = request.responseText;
               names= JSON.parse(names);
               var list='';
               for(i=0; i< names.length; i++){
                   list = '<li>' +names[i]+ '</li>';
               }
               var ul =document.getElementById('namelist');
               ul.innerHtml = list;
               //var counter = request.responseText;
               //var span = document.getElementById("count");
               //span.innerHTML = counter.toString();
           }
       }
   };
   
   var nameInput = document.getElementById("name");
   var name = nameInput.value;
   ///request.open('GET','http://bhakya3.imad.hasura-app.io/counter',true);
   request.open('GET','http://bhakya3.imad.hasura-app.io/submit-name?name=',true);
   request.send(null);
};

