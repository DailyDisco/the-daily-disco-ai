import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { client } from '../pages/client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';

const Feed = () => {
  const [loading, setloading] = useState(false);
  const [pins, setPins] = useState(null);
  // you can target the query string with the router
  const { categoryId } = useRouter().query;

  const userInfo = fetchUser();

  // this is the query that will be sent to sanity
  // every time that the categoryId changes
  useEffect(() => {
    setloading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setloading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
      });
    }
  }, [categoryId]);

  return (
    <div>
      <div>{pins && <MasonryLayout pins={pins} />}</div>
      {/* <div>{loading && <Spinner />}</div> */}
    </div>
  );
};

export default Feed;
