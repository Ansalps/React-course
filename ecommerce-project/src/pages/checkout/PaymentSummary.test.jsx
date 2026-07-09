import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import { MemoryRouter,useLocation } from "react-router";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");

describe("PaymentSummary component", () => {
  let loadCart;
  let paymentSummary;
  let user;
  beforeEach(() => {
    paymentSummary = {
      totalItems: 29,
      productCostCents: 49808,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 50307,
      taxCents: 5031,
      totalCostCents: 55338,
    };

    loadCart = vi.fn();
    user=userEvent.setup();
  });

  it("display payment summary correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary loadCart={loadCart} paymentSummary={paymentSummary} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Items (29):")).toBeInTheDocument();
    expect(screen.getByText("$498.08")).toBeInTheDocument();
    const paymentSummaryRows = screen.getAllByTestId("payment-summary-row");
    expect(
      within(paymentSummaryRows[0]).getByText("Items (29):"),
    ).toBeInTheDocument();
    expect(paymentSummaryRows[0]).toHaveTextContent("Items (29):");
  });

  it("place order", async () => {
    function Location(){
        const location=useLocation();
        return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary
          paymentSummary={paymentSummary}
          loadCart={loadCart}
        />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');
    await user.click(placeOrderButton);
    expect(axios.post).toHaveBeenCalledWith('api/orders');
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

  });
    

});
