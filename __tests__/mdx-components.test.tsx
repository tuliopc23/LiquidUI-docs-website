import { render, screen } from '@testing-library/react';
import { expectAccessible } from '../lib/test-utils';

describe('Basic rendering', () => {
  test('renders simple component', async () => {
    const { container } = render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeDefined();
    await expectAccessible(<div>Hello World</div>);
  });
});
