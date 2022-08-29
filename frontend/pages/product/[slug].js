import { useQuery } from 'urql';
import { GET_PRODUCT_QUERY } from '../../lib/query';
import { useRouter } from 'next/router';

export default function ProductDetails() {
  // fetch slug
  const { query } = useRouter();

  // fetch GraphQL
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  // check for incoming data
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oops... {error.message}</p>;

  return (
    <div>
      <img src="" alt="" />
      <div>
        <h3>Title</h3>
        <p>Description</p>
      </div>
      <div>
        <span>Quantity</span>
        <button>Plus</button>
        <p>0</p>
        <button>Minus</button>
      </div>
      <button>Add to cart</button>
    </div>
  );
}
