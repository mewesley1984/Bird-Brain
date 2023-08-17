import { useLocation } from "react-router-dom";

const PostForm = () => {
  const location = useLocation();
  const selectedBird = location.state?.selectedBird;

  return <div>{JSON.stringify(selectedBird)}</div>;
};

export default PostForm;
