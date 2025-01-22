import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Table = () => {
    const [items, setItems] = useState([]);
    const fetchItems = async (query = "") => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/transactions`, {
            params: { 
              search: query}
          });
          console.log("Fetched data:", response.data);
          setItems(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() => {
        fetchItems();
      }, []);
  return (
    <div>
        <h1>Items List</h1>
      <table border="1">
        <thead>
          <tr>
            <td>id</td>
            <td>title</td>
            <td>price</td>
            <td>description</td>
            <td>image</td>
            <td>sold</td>
            <td>dateofSale</td>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item.image}</td>
              <td>{item.sold}</td>
              <td>{item.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table