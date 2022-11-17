import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { client } from '../pages/client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { feedQuery, searchQuery } from '../utils/data';

const Feed = () => {
  const [loading, setloading] = useState(false);
  const [pins, setPins] = useState(null);
  // you can target the query string with the router
  const { categoryId } = useRouter().query;

  // this is the query that will be sent to sanity
  // every time that the categoryId changes
  useEffect(() => {
    setloading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setloading(false);
        console.log('success');
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setloading(false);
      });
    }
  }, [categoryId]);

  const ideaName = categoryId || 'new';

  if (loading) {
    return (
      <Spinner message={`We are sorting by ${ideaName} ideas to your feed!`} />
    );
  }

  return (
    <div>
      <div>{pins && <MasonryLayout pins={pins} />}</div>
    </div>
  );
};

export default Feed;
