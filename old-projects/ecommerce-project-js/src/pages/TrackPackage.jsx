import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import "./TrackPackage.css";

export function TrackPackage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };
    fetchOrderData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find(
    (item) => item.productId === productId,
  );

  if (!orderProduct) {
    return <div>Product not found.</div>;
  }

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  let timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  deliveryPercent = Math.max(0, Math.min(deliveryPercent, 100));
  console.log(deliveryPercent);

  let isPreparing,isShipped,isDelivered;
  if (deliveryPercent<33){
    isPreparing=deliveryPercent;
  } else if (deliveryPercent>=33 && deliveryPercent<100){
    isShipped=deliveryPercent;
  } else if (deliveryPercent)
  if (deliveryPercent=== 100) {
    isDelivered = deliveryPercent;
  }
  return (
    <>
      <title>Track Package</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? "current-status" : ""}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped ? "current-status" : ""}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered ? "current-status" : ""}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
