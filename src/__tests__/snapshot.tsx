/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import HomePage from '@/app/[lang]/page';

it('renders homepage unchanged', () => {
  const { container } = render(<HomePage params={Promise.resolve({ lang: 'pt' })} />);
  expect(container).toMatchSnapshot();
});
