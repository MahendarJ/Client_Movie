import React, { useEffect, useState } from "react";
import axios from "axios";

const Table = () => {
  const [fetchData, setFetchData] = useState();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setFetchData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromApi();
  }, []);
  const searchData =
    fetchData &&
    fetchData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())||String(item.id).toLowerCase().includes(search.toLowerCase())
    );
  const handleSort = (value) => {
    setSort(value);
    setSortOrder((pre) => (pre === "asc" ? "desc" : "asc"));
  };
  const sortedData = sort
    ? searchData.slice().sort((a, b) => {
        let compared;
        if (sort !== "city") {
          compared = a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        } else {
          compared =
            a.address[sort] > b.address[sort]
              ? 1
              : a.address[sort] < b.address[sort]
              ? -1
              : 0;
        }
        console.log(compared, a.address[sort], b.address[sort]);
        return sortOrder === "asc" ? compared : -compared;
      })
    : searchData;
    const [val,setVal]= useState('');
const handleChange =(value)=>{
    const va = value.split('').filter((item, index) => (index + 1) % 3 !== 0).join('');
    console.log(va)
setVal(va)
}
  return (
    <div>
      <input
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name"
      />
      <input onChange={e=>handleChange(e.target.value)} placeholder="Miss third character"/>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>id ||</th>
            <th onClick={() => handleSort("name")}>name ||</th>
            <th onClick={() => handleSort("username")}>username ||</th>
            <th onClick={() => handleSort("email")}>email ||</th>
            <th onClick={() => handleSort("city")}>city ||</th>
          </tr>
        </thead>
        <tbody>
          {sortedData &&
            sortedData.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.address.city}</td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <p>{val}</p>
    </div>
  );
};

export default Table;
