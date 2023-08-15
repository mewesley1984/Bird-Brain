import React from "react";
import Container from 'react-bootstrap/Container';
import { Link} from 'react-router-dom';

  return (
    <main>
      <div>
        <p>Home Page</p>
        <PostEntry />
        <PostList />
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