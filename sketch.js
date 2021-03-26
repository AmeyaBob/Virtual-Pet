var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTime,lastFed,feed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('foodCount');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
feed= createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime=database.ref("feedTime")
  feedTime.on("value",function(data){
    lastFed= data.val();
  })
 
  //write code to display text lastFed time here
fill(255,255,254)
textSize(15)
if(lastFed>=12){
  text("Last Fed: "+lastFed%12+" pm",350,30)
}
 else if(lastFed===0){
   text("Last Fed: 12 am",350,30)
 }
 else{
  text("Last Fed: "+lastFed+" am",350,30)

 }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var foodStockVal=foodObj.getFoodStock()
if(foodStockVal<=0){
  foodObj.updateFoodStock(foodStockVal*0)
}
else{
  foodObj.updateFoodStock(foodStockVal-1)

}
database.ref('/').update({
  foodCount:foodObj.getFoodStock(),
  feedTime: hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    foodCount:foodS
  })
}
