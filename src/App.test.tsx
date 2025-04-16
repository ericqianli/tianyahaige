import React from "react";

import { render } from "@testing-library/react";

import App from "./App";

test("renders learn react link", () => {
    const { getByText } = render(<App sampled={false} toggleSampled={function (collection: number, sampled: boolean): void {
        throw new Error("Function not implemented.");
    }} />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
