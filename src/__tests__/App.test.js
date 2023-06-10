import { render, screen } from "@testing-library/react";
import App from "pages/App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/UNSOUL IMAGES/i);
  expect(linkElement).toBeInTheDocument();
});