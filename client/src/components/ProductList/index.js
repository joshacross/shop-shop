import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if(data) {
      dispatch({
           type: UPDATE_PRODUCTS,
          products: data.products
        });
    }
  }, [data, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;


// import React, { useEffect } from 'react';
// import { useQuery } from '@apollo/client';
// import ProductItem from '../ProductItem';
// import { QUERY_PRODUCTS } from '../../utils/queries';
// import spinner from '../../assets/spinner.gif';
// import { useStoreContext } from '../../utils/GlobalState';
// import { UPDATE_PRODUCTS } from '../../utils/actions';

// function ProductList() {
//   const { loading, data } = useQuery(QUERY_PRODUCTS);

//   const products = data?.products || [];

//   function filterProducts() {
//     if (!currentCategory) {
//       return products;
//     }

//     return products.filter(
//       (product) => product.category._id === currentCategory
//     );
//   }

// // retrieve current global state object and the dispatch method to update state 
// const [state, dispatch] = useStoreContext();

// // destructure currentCategory data out of the state object to use in the filterProducts() function
// const { currentCategory } = state;

// const { loading, data } = useQuery(QUERY_PRODUCTS);

// // implement useEffect hook in order to wait for our useQuery() response to come in
// useEffect(() => {
//   // once data object returned, execute dispatch function to instruct reducer func that it's the UPDATE_PRODUCTS action
//   // and should save the array of proudcts data to our global store.
//   if (data) {
//     dispatch({
//       type: UPDATE_PRODUCTS,
//       products: data.products
//     });
//   }
// }, [data, dispatch]);

// function filterProducts() {
//   if (!currentCategory) {
//     return state.products;
//   }

//   return state.products.filter(product => product.category._id === currentCategory);
// }

//   return (
//     <div className="my-2">
//       <h2>Our Products:</h2>
//       {products.length ? (
//         <div className="flex-row">
//           {filterProducts().map((product) => (
//             <ProductItem
//               key={product._id}
//               _id={product._id}
//               image={product.image}
//               name={product.name}
//               price={product.price}
//               quantity={product.quantity}
//             />
//           ))}
//         </div>
//       ) : (
//         <h3>You haven't added any products yet!</h3>
//       )}
//       {loading ? <img src={spinner} alt="loading" /> : null}
//     </div>
//   );
// }

// export default ProductList;
