import { useQuery } from '@apollo/client';
import { GET_BIRD_POSTS } from '../components/PostList'
import PostList from '../components/PostList'
import PostEntry from '../components/PostEntry';

const homePage = () => {
  const { loading, data } = useQuery(GET_BIRD_POSTS);
  const birdPosts = data?.birdPosts || [];

  return (
    <main>
      <div>
        <p>Home Page</p>
        <PostEntry />
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              birdPosts={birdPosts}
              title="Some Feed for Post(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default homePage;