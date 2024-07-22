const express = require("express");
const mongoose = require("mongoose");
const Product = require("./Models/product.model");

const app = express();

app.use(express.json()); //middleware body
app.use(express.urlencoded({extended:false}))



mongoose
  .connect("mongodb://localhost:27017/newproject")
  .then(() => console.log("db connected"))
  .catch((error) => console.log(error));

app.listen(3000, (res, req) => {
  console.log("server is running ");
});



app.post("/api/products", async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(200).json({
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  });
  
  app.get("/api/products", async (req, res) => {
    try {
      const product = await Product.find({});
      res.status(200).json({
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  });
  
  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params; //to fetch id from url
      const product = await Product.findById(id);
      res.status(200).json({
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  });
  
  //update api
  
  app.put("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
      const updateProduct = await Product.findById(id);
      res.status(200).json(updateProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error.message,
      });
    }
  });
  
  
  
  
  //delete
  
  
  app.delete('/api/products/:id',async(req,res)=>{
  
      try{
          const {id}= req.params;
  
      const product=await Product.findByIdAndDelete(id);
          if(!product){
              return res.status(404).json({message:"product not found"})
          }
  
          res.status(200).json({message:"product deleted successfully "})
  
      }
  
  
      catch (error) {
          console.log(error);
          res.status(500).json({
            message: error.message,
          });
        }
  })


app.get("/", (req, res) => {
  res.send("hello from node api");
});
