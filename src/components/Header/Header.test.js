import React from "react";
import { render } from "@testing-library/react";
import Header from "./index";

test("renderizar o componente Header", () => {
  const { getByText } = render(<Header />);
  const headerElement = getByText(/ToDo List/i);
  expect(headerElement).toBeInTheDocument();
});
