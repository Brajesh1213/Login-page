import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowList from './Element/ShowList';
import { Button, Select, MenuItem, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Home = () => {
  const [open, setOpen] = useState('LastModified');
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/user/usersort?sort=${open}`, {
        method: 'GET',
      });

      const data = await res.json();
      setResult(data);
    };

    fetchData();
  }, [open]);

  const handleSort = async (event) => {
    const selectedSortOption = event.target.value;
    setOpen(selectedSortOption);
  };

  const handleSearch = async () => {
    const res = await fetch(`/api/user/searchUser?searchTerm=${searchTerm}`, {
      method: 'GET',
    });

    const data = await res.json();
    setResult(data);
  };

  const options = ["descending", "ascending", "LastModified", "LastInserted"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex">
      {/* Hamburger Menu */}
      <div className="p-4 cursor-pointer" onClick={toggleMenu}>
        <MenuIcon />
      </div>

      {/* Left Part - Conditional Rendering */}
      {isMenuOpen && (
        <div className="flex-shrink-0 p-8 text-black w-64">
          <Link to="/add-details">
            <Button className="bg-transparent w-full px-4 py-2 border-b-2 border-black text-lg shadow-md">
              Add User
            </Button>
          </Link>

          <Select
            variant="outlined"
            value={open}
            onChange={handleSort}
            className="mt-4 w-full"
          >
            <MenuItem value="" disabled>
              Sort By
            </MenuItem>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 w-full"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            className="mt-4 w-full"
          >
            Search
          </Button>
        </div>
      )}

      {/* Right Part */}
      <div className="flex-1 p-8">
        <ShowList result={result} />
      </div>
    </div>
  );
};

export default Home;
