import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [items, setItems] = useState([]);
  const [formData, setformData] = useState({ search: "" });

  const handleSearch = (event) => {
    setformData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchItems(formData.search);
  };

  // Function to fetch items from backend
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
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="search">Search: </label>
        <input style={{ marginRight: "10px" }} type="text" placeholder='Search' id='search' value={formData.search} onChange={handleSearch} name='search' />

        <button>Search</button>
      </form>

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
    </>
  )
}

export default App;
