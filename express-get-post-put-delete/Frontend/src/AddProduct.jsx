import React,{useState, useEffect} from 'react';
import axios from 'axios';
import './AddProduct.css';

const initialState={
  id:null,
  title:'',
  description:'', 
  price:0,
  image:'',
  category:'',
};

const AddProduct =({getData, selectedProduct, setSelectedProduct})=>{
  const [formData, setFormData] = useState(initialState);

  // Update formData selectedProduct changes
  useEffect(()=>{
    setFormData(selectedProduct || initialState);
  },[selectedProduct]);

  const handleChange =(e)=>{ 
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit =(e)=>{
    e.preventDefault();

    if (formData.id){
      // update the product
      axios.put(`http://localhost:8080/updateproduct/${formData.id}`, formData)
        .then((res) =>{
          console.log(res.data); 
          getData(); 
          setFormData(initialState); 
          setSelectedProduct(null); 
        })
        .catch((err)=>{
          console.error("Error updating product:", err);
        });
    } else{
      axios.post('http://localhost:8080/addproduct', formData)
        .then((res)=>{
          console.log(res.data); 
          getData(); 
          setFormData(initialState); 
        })
        .catch((err)=>{
          console.error("Error adding product:", err);
        });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {formData.id && (
          <input type="text" name="id" value={formData.id} readOnly placeholder="🆔 ID"/>
        )}
        <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="📷 Image"/>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="📝 Title"/>
        <select name="category" value={formData.category} onChange={handleChange}>  
          <option value="">📂 Select Your Category</option>
          <option value="men's clothing">👔 Men's Clothing</option>
          <option value="jewelery">💍 Jewelry</option>
          <option value="electronics">📱 Electronics</option>
          <option value="women's clothing">👗 Women's Clothing</option>
        </select>
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="💵 Price"/>
        <input name="description" type="text" value={formData.description} onChange={handleChange} placeholder="📝 Description" />
        <button type="submit">
          {formData.id ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
