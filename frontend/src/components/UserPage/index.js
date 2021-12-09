import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserData } from "../../store/data";

const UserPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userSongs = useSelector((state) => state.data.userSongs);
  const userAlbums = useSelector((state) => state.data.userAlbums);
  const userLikedSongs = useSelector((state) => state.data.userLikedSongs);
  const user = useSelector((state) => state.data.user);

  
  useEffect(() => {
    console.log("sessionUser:", sessionUser)
    console.log("userSongs:", userSongs)
    dispatch(getUserData(sessionUser.id));
  }, []);

  return <div>
    <h1>HI!</h1>
  </div>;
};

export default UserPage
