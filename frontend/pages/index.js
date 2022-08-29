import Head from 'next/head';
import {useQuery} from 'urql';
import { PRODUCT_QUERY } from '../lib/query';
import Product from '../components/Product';
import { Gallery } from '../styles/Gallery';

export default function Home() {
  // fetch products from strapi
  const [results] = useQuery({query: PRODUCT_QUERY});
  const {data, fetching, error} = results;

  // check for incoming data
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oops...  {error.message}</p>;
  const products = data.products.data;

  return (
    <div>
      <Head>
        <title>BLACKLUX</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>BLACKLUX</h1>
        <Gallery>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product}/>
          ))}
        </Gallery> 
      </main>
    </div>
  );
}
