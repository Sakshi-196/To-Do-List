const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const _=require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

const todolistSchema= new mongoose.Schema ({
    name:String
  });
const Item=mongoose.model("Item",todolistSchema);

const listSchema=new mongoose.Schema({
  name:"String",
  lists:[todolistSchema],
})
const List=mongoose.model("List",listSchema);

const item1=new Item({
 name:"Welcome",
});
const item2=new Item({
  name:"Hit the + button to add more items",
 });
 const item3=new Item({
  name:"<--Hit this to deletet this item",
 });
 const defaultItems=[item1,item2,item3];


 async function getItem(){
  const getItems=await Item.find();
  return getItems;
 }
 
 app.get("/", function(req, res) {
   
   getItem().then((foundItems)=>{
    if(foundItems.length===0)
     {
       Item.insertMany(defaultItems)
       .then(function () {
         console.log("Successfully saved defult items to DB");
       })
       .catch(function (err) {
         console.log(err);
       });
       res.redirect('/');
     }
     else
     res.render("list",{listTitle:"Today",newListItems:foundItems});
    }
   )
 });
      


app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName=req.body.list;

  const item=new Item({name:itemName}); 

  if(listName==="Today")
  {
    item.save(); 
    res.redirect('/');
  }
  else{
    async function run(){
      await List.findOne({name:listName})
      .then(function(foundItems){
        {
          foundItems.lists.push(item);
          foundItems.save();
          res.redirect("/"+listName);
        }
      })
    }
    run();
  }
  
});

app.post('/delete',function(req,res){
  
  const checkItemId=req.body.checkbox;
  const listName=req.body.listName;
  if(listName==="Today")
  {
    async function run(){
      await Item.findByIdAndRemove(checkItemId);
    }
    run();
    res.redirect('/'); 
  }
  else{
    async function run(){
      await List.findOneAndUpdate({name:listName},{$pull: {lists: {_id:checkItemId}}});
    }
    run();
    res.redirect('/'+listName);
  }
})

app.get('/:customListName',function(req,res){
 const customListName=_.capitalize(req.params.customListName);
 async function run(){
  await List.findOne({name:customListName})
  .then(function(foundlists){
    if(foundlists)
    res.render("list",{listTitle:customListName,newListItems:foundlists.lists})
    else{
      const list=new List({
        name:customListName,
        lists:defaultItems,
      })
      list.save();
      res.redirect('/'+customListName);
    }
  })
 }
 run();
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
