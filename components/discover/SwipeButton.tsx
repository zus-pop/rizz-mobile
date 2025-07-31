import { ViewProps } from 'react-native';
import { Button } from '../ui/button';

interface SwipeButtonProps extends ViewProps {
  icon: React.ReactNode;
  onPress: () => void;
}

const SwipeButton = ({ icon, onPress, ...props }: SwipeButtonProps) => {
  return (
    <Button
      onPress={onPress}
      size="lg"
      className={`items-center justify-center rounded-full p-0 ${props.className ?? ''}`}>
      {icon}
    </Button>
  );
};

export default SwipeButton;
