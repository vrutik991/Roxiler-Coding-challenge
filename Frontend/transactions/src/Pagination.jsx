import React from 'react'
import './Pagination.css'

const Pagination = ({totalposts,postsperpage,setcurrentPage}) => {
      let pages=[]; // empty array pages
        for (let i=1;i<= Math.ceil(totalposts/postsperpage);i++) // 60 / 8 = 7 pages 
            pages.push(i); // pages = [1,2,3,4,5,6,7]
  return (
    <div>
        {
            pages.map((page,index) =>
            {
                return <button key={index} onClick={() =>
                {
                    setcurrentPage(page)
                }
                }>{page}</button>;
            })
        }   
    </div>
  )
}

export default Pagination