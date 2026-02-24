import { render, screen } from "@testing-library/react";
import { useFormStatus } from "react-dom";

import { SubmitButton } from "./submit-button";

// Mock react-dom useFormStatus
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  useFormStatus: jest.fn(),
}));

describe("SubmitButton", () => {
  const mockUseFormStatus = useFormStatus as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render label when not pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: false });

    render(<SubmitButton label="Save" variant="primary" />);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("should render ellipsis and disables button when pending", () => {
    mockUseFormStatus.mockReturnValue({ pending: true });

    render(<SubmitButton label="Save" variant="primary" />);

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("…");
    expect(button).toBeDisabled();
  });
});
