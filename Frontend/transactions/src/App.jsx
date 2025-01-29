import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Pagination from './Pagination'

function App() {
  const [items, setItems] = useState([]);
  const [formData, setformData] = useState({ search: "",month: "",year:""});
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(10); 



  const handleSearch = (event) => {
    setformData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchItems(formData.search,formData.month,formData.year);
  };




  // Function to fetch items from backend
  const fetchItems = async (query = "",month = "",year = "") => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/transactions`, {
        params: {
          search: query,
          month: month,
          year:year,
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
        <label htmlFor="month">Month:</label>
            <select name="month" id="month" style={{ marginRight: "10px", marginLeft:"10px" }} value={formData.month} onChange={handleSearch}>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March" selected>March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
            </select>
            <label htmlFor="year">Year:</label>
            <select name="year" id="year" style={{ marginRight: "10px", marginLeft:"10px" }} value={formData.year} onChange={handleSearch}>
                <option value="2021" selected>2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
            </select>
        <button className='btn btn-success'>Search</button>
      </form>
    <br />
      {items.length===0? <h1>Items not Found!</h1> : <h1> Items List : </h1>}
      <br /><br />
      <div className='card-container' style=
        {{
          display: "flex",
          flexWrap: "wrap",
          flex: '200px',
          gap:"20px"
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
              <h6>Description:</h6>
              <p className="card-text">{item.description}</p>
              <h5>Price : &#8377; {item.price}</h5>
            </div>
          </div>
        ))} </div>
      <Pagination totalposts={items.length} postsperpage={postsPerPage} setcurrentPage={setcurrentPage}></Pagination>
    </>
  )
}
export default App;
