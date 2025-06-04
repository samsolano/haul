import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Navbar from '@/components/navbar';

it("should render the HAUL text", async () => {
    render(<Navbar />);

    const textElement = screen.getByText("HAUL");
    expect(textElement).toBeDefined();
});