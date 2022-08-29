export default function Product({product}) {
    // extract info from props
    const { title, price, image } = product.attributes;
    
  return (
    <div>
        <div>

        </div>
        <h2>{title}</h2>
        <h3>{price}</h3>
    </div>
  );
}
