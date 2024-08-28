const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// ##### Get Routes #####
app.get("/getproduct", (req, res)=>{
  fs.readFile("./db.json", "utf-8",(err, data)=>{
    if(err){
      res.send(err); 
    }else{
      res.send(JSON.parse(data));
    }
  });
});

// ##### Post Routes #####
app.post("/addproduct",(req, res)=>{
  const newProduct = req.body;

  fs.readFile("./db.json","utf-8",(err, data)=>{
    if(err){
      res.send(err); 
    }
    const products = JSON.parse(data);
    newProduct.id = products.length + 1; // Assign a unique ID
    products.push(newProduct);

    fs.writeFile("./db.json", JSON.stringify(products, null, 2),(err)=>{
      if(err){
        res.send(err); 
      }
      res.send("Product added successfully!"); 
    });
  });
});

// ##### Put Routes (Update Product) #####
app.put("/updateproduct/:id",(req, res)=>{
  const productId = parseInt(req.params.id, 10);
  const updatedProduct = req.body;

  fs.readFile("./db.json","utf-8",(err, data)=>{
    if(err){
      res.send(err); 
    }

    const products = JSON.parse(data);
    const productIndex = products.findIndex((p) => p.id === productId);

    if(productIndex === -1){
      res.send("Product not found"); message
    }

    products[productIndex] = {...products[productIndex],...updatedProduct};

    fs.writeFile("./db.json",JSON.stringify(products, null, 2),(err)=>{
      if(err){
        res.send(err); 
      }
      res.send("Product updated successfully!"); 
    });
  });
});

// ##### Delete Routes (Delete Product) #####
app.delete("/deleteproduct/:id",(req, res)=>{
  const productId = parseInt(req.params.id, 10);

  fs.readFile("./db.json","utf-8",(err, data)=>{
    if(err){
      res.send(err); 
    }

    let products = JSON.parse(data);
    products = products.filter((p)=>p.id !== productId);

    fs.writeFile("./db.json", JSON.stringify(products, null, 2),(err)=>{
      if(err){
        res.send(err); 
      }

      res.send("Product deleted successfully!"); 
    });
  });
});

app.listen(8080,()=>{
  console.log("Server is running on port 8080");
});
