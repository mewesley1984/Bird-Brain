// import { useQuery } from '@apollo/client';
// import { GET_BIRD_POSTS } from '../utils/queries'
import PostList from '../components/PostList'
import SearchBirds from '../components/SearchBirds';

const homePage = () => {
  // const { loading, data } = useQuery(GET_BIRD_POSTS);
  // const birdPosts = data?.birdPosts || [];

  return (
    <main>
      <div>
        <p>Home Page</p>
        <PostList />
        <SearchBirds />
        {/* <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              birdPosts={birdPosts}
              title="Some Feed for Post(s)..."
            />
          )} */}
        {/* </div> */}
      </div>
    </main>
  );
}

export default homePage;