import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Pagination from './Pagination'

function App() {
  const [items, setItems] = useState([]);
  const [formData, setformData] = useState({ search: "" });
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(10); // can be used as an variable.
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
          search: query
        }
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

  const lastIndex = currentPage * postsPerPage; // 1 * 8 = 8
  const firstIndex = lastIndex - postsPerPage;  // 8 - 8 = 0
  const current_transactions = items.slice(firstIndex, lastIndex);

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="search">Search : </label>
        <input style={{ marginRight: "10px", marginLeft:"10px" }} type="text" placeholder='Search' id='search' value={formData.search} onChange={handleSearch} name='search' />

        <button className='btn btn-success'>Search</button>
      </form>
    <br />
      <h1>Items List : </h1>
      <br />
      <br />
      <div className='card-container' style=
        {{
          // backgroundColor: "black",
          display: "flex",
          flexWrap: "wrap",
          flex: '200px',
          gap:"20px"
          // justifyContent:"space-around",
        }}>
        {current_transactions.map((item) => (

          <div className="card" style=
          {{ 
            width: "18rem",
            display:"flex",
            flexWrap:"wrap",
            flexDirection:"column"
            }}>
            <img src={item.image} className="card-img-top" alt="..." style={{height:"20rem"}}/>
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              {/* <p className="card-text">{item.description}</p> */}
              <h5>&#8377; {item.price}</h5>
              <a href="#" className="btn btn-primary">More details</a>
            </div>
          </div>
        ))} </div>
      <Pagination totalposts={items.length} postsperpage={postsPerPage} setcurrentPage={setcurrentPage}></Pagination>
    </>
  )
}
export default App;
