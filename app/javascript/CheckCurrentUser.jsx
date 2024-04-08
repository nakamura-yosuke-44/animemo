import { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function CheckCurrentUser({ setCurrentUser = () => {} }) {
  useEffect(() => {
    axios.get('/api/current_user')
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error('Error fetching current user:', error);
      });
  }, []);

  return null;
}

CheckCurrentUser.propTypes = {
  setCurrentUser: PropTypes.func,
};
export default CheckCurrentUser;
