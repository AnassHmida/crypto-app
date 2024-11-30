import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SettingSwitch from '../../../components/common/SettingSwitch';

describe('SettingSwitch', () => {
  const defaultProps = {
    label: 'Test Setting',
    value: false,
    onValueChange: jest.fn(),
    testID: 'test-switch',
  };

  it('renders label correctly', () => {
    const {getByText} = render(<SettingSwitch {...defaultProps} />);
    expect(getByText('Test Setting')).toBeTruthy();
  });

  it('shows correct switch state', () => {
    const {getByTestId} = render(<SettingSwitch {...defaultProps} value={true} />);
    const switchComponent = getByTestId('test-switch');
    expect(switchComponent.props.value).toBe(true);
  });

  it('calls onValueChange when toggled', () => {
    const onValueChange = jest.fn();
    const {getByTestId} = render(
      <SettingSwitch {...defaultProps} onValueChange={onValueChange} />
    );
    fireEvent(getByTestId('test-switch'), 'onValueChange', true);
    expect(onValueChange).toHaveBeenCalledWith(true);
  });
});
