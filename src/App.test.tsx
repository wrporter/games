import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock("./stratego/image/images.service", () => ({
  ImageService: class {
      public static getInstance() {
        return {
          getPromisifiedImages: jest.fn().mockResolvedValue("success"),
          getImage: jest.fn(),
          getColorImage: jest.fn(),
          getRankImage: jest.fn(),
        }
      }
    }
}));
jest.mock("./stratego/game");
jest.mock("./stratego/setup.service");

test('renders a canvas', () => {
  const { container } = render(<App />);
  const canvas = container.querySelector('canvas');
  expect(canvas).toBeInTheDocument();
});
