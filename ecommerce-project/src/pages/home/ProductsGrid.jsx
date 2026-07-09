import axios from "axios";
import { use, useState } from "react";
import {formatMoney} from "../../utils/money";
import CheckMark from "../../assets/images/icons/checkmark.png";

export function ProductsGrid({ products,loadCart }) {
  
  return (
    <div className="products-grid">
      {products.map((product) => {
        
        return (
         <Product key={product.id} product={product} loadCart={loadCart}/>
        );
      })}
    </div>
  );
}
