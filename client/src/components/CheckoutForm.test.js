import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  const { getByText } = render(<CheckoutForm />);
  expect(getByText(/Checkout Form/i)).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
  const { getByText, getByLabelText, getByTestId } = render(<CheckoutForm />);

  fireEvent.change(getByLabelText(/First Name:/i), {
    target: { value: "Sean" },
  });
  fireEvent.change(getByLabelText(/Last Name:/i), {
    target: { value: "Coburn" },
  });
  fireEvent.change(getByLabelText(/Address:/i), {
    target: { value: "sesame street" },
  });
  fireEvent.change(getByLabelText(/City:/i), {
    target: { value: "Los Angeles" },
  });
  fireEvent.change(getByLabelText(/State:/i), { target: { value: "CA" } });
  fireEvent.change(getByLabelText(/Zip:/i), { target: { value: "12345" } });
  fireEvent.click(getByTestId(/Checkout/i));

  expect(getByTestId(/successMessage/i)).toBeInTheDocument();
  expect(getByText(/Sean/i)).toBeInTheDocument();
  expect(getByText(/ca/i)).toBeInTheDocument();
});
