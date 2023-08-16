import { useQuery } from '@apollo/client';
import { GET_BIRD_POSTS } from '../utils/queries'
import PostList from '../components/PostList'
import PostEntry from '../components/PostEntry';

const Home = () => {
  const { loading, data } = useQuery(GET_BIRD_POSTS);
  const birds = data?.birds || [];

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
              birds={birds}
              title="Bird Post Results"
            />
          )} 
        </div> 
      </div>
    </main>
  );
}

export default Home;