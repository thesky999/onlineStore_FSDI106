/* global variables */
var serverURL="http://restclass.azurewebsites.net/API/";
var items=[];

function init(){
    console.log("Admin page");
    $("#btn-register").on('click',function(){
        register();
    });
}

window.onload=init;

// object constructor
class Item{
    constructor(code,title,price,description,category,image){
        this.code=code;
        this.title=title;
        this.price=price;
        this.description=description;
        this.category=category;
        this.image=image;
        this.user="Trevor";
    }
}
//register function

function register(){
    // get from the form the values
    var code=$("#code").val();
    var title=$("#title").val();
    var price=$("#price").val();
    var description=$("#description").val();
    var category=$("#category").val();
    var image=$("#image").val();
    
    if(code!=""&& title!=""&& price!=""){
    // create the object
    var newItem = new Item(code,title,price,description,category,image);
    // push the item to the items array
    items.push(newItem);
    var jsonString = JSON.stringify(newItem);
    //display the item on the console

    console.log(newItem);
    console.log(jsonString);
}
else{
    alert("Add a code, title and price!");
}


$.ajax({
    url:serverURL+"points",
    type:"POST",
    contentType:"application/json",
    data:jsonString,
    success:function(response){
        //show notification
        $("#alert-box").removeClass("hidden");
        // hide the notification
        setTimeout(function(){
            $("alert-box").addClass("hidden");
        },3000);
    },
    error:function(errorDetails){
        console.log("Something went wrong ... ",errorDetails);
    }
});

}

function clearForm(){
    $("#code").val("");
    $("#title").val("");
    $("#price").val("");
    $("#description").val("");
    $("#category").val("");
    $("#image").val("");
}