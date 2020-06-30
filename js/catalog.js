/* global variable */

/*var items=[
    {//first item
        code:'1tvs',
        title:'TV Samsung',
        price:1000,
        description:'This is the long description of the item',
        category:'Electronics',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbrain-images-ssl.cdn.dixons.com%2F8%2F0%2F10167708%2Fu_10167708.jpg&f=1&nofb=1'
    },
    {//second item
        code:'1ph10',
        title:'iPhone',
        price:10000,
        description:'This is the long description of the item',
        category:'Electronics',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.it_zPn7i_NpKR_C2dtI-1AHaJv%26pid%3DApi&f=1'
    },
    {//third item
        code:'2spk',
        title:'Speakers',
        price:100,
        description:'This is the long description of the item',
        category:'Sound',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.eT7RLqNGX32-MN61vShusQHaF7%26pid%3DApi&f=1'
    }
]; */

var items=[];
var serverURL="http://restclass.azurewebsites.net/API/";

function fetchCatalog(){
    //get the items from the server
    $.ajax({
        url:serverURL+"points",
        type:"GET",
        success:function(res){
            console.log("It works",res);
            for(var i=0;i<res.length;i++){
                items.push(res[i]);
            }
            displayCatalog();
        },
        error:function(details){
            console.log("Error",details);
        }
    });
}

function displayCatalog(){
    //travel the items array
    for (var i=0;i<items.length;i++){
    //get the element from the array
        var product=items[i];
    //create the string
        var layout=`
            <div class="item" id="${product.code}">
                <img src="${product.image}">
                <h4> ${product.title} </h4>
                <h6 class="itemPrice">${product.price}</h6>
                <p> ${product.description} </p>
                <button class="btn btn-primary"> Add to Cart </button>
            </div>
        `;
    //display the element on the DOM (HTML)
        $('#catalog').append(layout);
    }
}

function drawItem(product){
    var layout=`
    <div class="item" id="${product.code}">
        <img src="${product.image}">
        <h4> ${product.title} </h4>
        <h6 class="itemPrice"> $ ${product.price}</h6>
        <p> ${product.description} </p>
        <button class="btn btn-primary"> Add to Cart </button>
    </div>
    `;
    //display the element on the DOM (HTML)
        $('#catalog').append(layout);
}

function search(){
    $("#catalog").html("");
    var searchText=$("#txt-search").val();

    for(var i=0;i<items.length;i++){
        var item=items[i];
        if(item.title.toLowerCase().includes(searchText.toLowerCase())){
            drawItem(item);

        }
    }
}

/* initialization */

function init(){
    console.log('catalog page');
    fetchCatalog();
    $("#btn-search").click(search);
}

window.onload=init;