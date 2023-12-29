import { Button } from "@mui/joy";
import Card from "@mui/material/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const ShowList = ({ result }) => {
  if (!result) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen p-8 md:border-l md:border-solid md:border-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {result.map((item) => (
          <div key={item.id} className="mb-8">
            <Card className="w-full overflow-auto resize-x border border-solid border-gray-300 bg-white">
              <CardContent>
                <Typography variant="h6" className="text-blue-600">
                  Username: {item.username}
                </Typography>
                <Typography variant="h5" className="text-green-600">
                  Email: {item.email}
                </Typography>
                <Typography variant="h6" className="text-indigo-600">
                  Phone: {item.phone}
                </Typography>
              </CardContent>
              <CardActions className="flex flex-grow">
                <IconButton className="mr-auto text-red-500">
                  <Link to={`deleteuser/${item._id}`} className="no-underline">
                    <DeleteIcon />
                  </Link>
                </IconButton>
                <Link to={`/View-detail/${item._id}`} className="no-underline">
                  <Button
                    variant="outlined"
                    color="yellow"
                    className="mr-1"
                  >
                    View
                  </Button>
                </Link>
                <Link to={`/updateuser/${item._id}`} className="no-underline">
                  <Button variant="contained" color="purple">
                    Edit
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
