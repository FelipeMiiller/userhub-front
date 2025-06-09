/**
 * @jest-environment jsdom
 */
import HomePage from '@/app/page';
import { render } from '@testing-library/react';

it('renders homepage unchanged', () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});
