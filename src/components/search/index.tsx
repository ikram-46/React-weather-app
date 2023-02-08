import { AsyncPaginate } from 'react-select-async-paginate';
import axios from "axios";
import { useState } from "react"; 
import {InputAdornment, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {GEO_API_URL, geoApiOptions} from "../../api";


const Search:React.FC<any> =({onSearchChange})=>{
   const [search, setSearch]=useState("tunisia");
   
   /*  const loadOptions= async(inputValue: string)=>{
        const response = await axios.get(
            `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
            geoApiOptions
        );
        return response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          })
    } */
    const handleOnChange=(searchData:any)=>{
        setSearch(searchData.target.value);
        const city= searchData.target.value||"Tunisia";
        onSearchChange(city);
        
      }
    return(
      <TextField 
        fullWidth
        placeholder="Search for city" 
        label="City Name" value={search} 
        onChange={handleOnChange}
        sx={{"& .MuiOutlinedInput-root":{
            borderRadius:"25px",
        }}}
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
            )
        }}
      />
    )
}

export default Search;
{/* <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      /> */}