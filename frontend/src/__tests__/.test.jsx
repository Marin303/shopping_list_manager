import { render, screen } from "@testing-library/react";
import FindDoneButton from "../Components/NewShoppingList/NewShoppingList.jsx"

test("Check DONE button render", () => {
  render(<FindDoneButton />);

  const element = screen.getByText(/DONE/i);

  expect(element).toBeInTheDocument();
});
