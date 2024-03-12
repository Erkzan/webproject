import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/Navbar/Navbar";

fetchMock.enableMocks();

// Wrap the component in a Router since useNavigate is used inside
const WrappedNavBar = () => (
  <Router>
    <NavBar />
  </Router>
);

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("NavBar Component", () => {
  it("should display login link when not logged in", async () => {
    fetchMock.mockResponseOnce(JSON.stringify("")); // Simulate not logged in

    render(<WrappedNavBar />);

    // Assert login link is shown
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should display user profile and logout button when logged in", async () => {
    fetchMock.mockResponseOnce(JSON.stringify("TestUser")); // Simulate logged in

    render(<WrappedNavBar />);

    // Wait for the username to be fetched and UI to update
    await screen.findByText("My Profile");

    // Expand the dropdown to reveal the "Sign Out" option
    const dropdownToggle = screen.getByTestId("profile-dropdown-toggle");
    fireEvent.click(dropdownToggle);

    // Now that the dropdown is expanded, "Sign Out" should be visible and clickable
    const signOutOption = await screen.findByText("Sign Out");
    expect(signOutOption).toBeInTheDocument();
  });

  it("should logout successfully when logout button is clicked", async () => {
    fetchMock.mockResponses(
      [JSON.stringify("TestUser"), { status: 200 }], // Response for getUsername
      [JSON.stringify(true), { status: 200 }] // Response for logout
    );

    render(<WrappedNavBar />);

    // Wait for component to be in the logged in state
    await screen.findByText("My Profile");

    // Find the Dropdown Toggle and open the Dropdown Menu
    const dropdownToggle = screen.getByRole("button", { name: "" });
    fireEvent.click(dropdownToggle);

    // Simulate logout by clicking the "Sign Out" button
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    await waitFor(() => fireEvent.click(screen.getByText("Sign Out")));

    // Assert that after logout, the login link is shown again
    await screen.findByText("Login");
  });
});
