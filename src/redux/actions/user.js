import axios from 'axios';

export const getUsers =
  ({ pageNo }) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_REQUEST', payload: [] });

      const result = await axios.get(
        `https://reqres.in/api/users?page=${pageNo + 1}`
      );

      dispatch({ type: 'FETCH_SUCESS', payload: result?.data });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAILURE',
        payload: 'Somthing Went Wrong, We are Going to Resolve It soon',
      });

      console.log(error);
    }
  };
