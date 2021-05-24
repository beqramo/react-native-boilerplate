import React, { useCallback, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

import { Row, Button } from 'app/components/UI';

import { longArrowLeftIcon } from 'assets';

import Text, { ITextProps } from '../UI/Text';
import { ElementPropsType } from '../UI/View';

import {
  Container,
  LeftContainer,
  MiddleContainer,
  RightContainer,
} from './styles';

interface IHeaderProps extends ElementPropsType {
  light?: boolean;
  withBack?: boolean;
  handlebackPress?: () => void;
  renderRight?: React.ReactNode;
  title?: string;
  withTitle?: boolean;
  textStyle?: ITextProps;
}

const Header = ({
  light,
  withBack,
  handlebackPress,
  renderRight,
  title,
  withTitle,
  textStyle,
  ...rest
}: IHeaderProps) => {
  const { canGoBack, goBack } = useNavigation();
  const { name } = useRoute();

  const handleBack = useCallback(() => handlebackPress?.() || goBack(), [
    goBack,
    handlebackPress,
  ]);

  const renderGoBack = useMemo(
    () =>
      canGoBack() && withBack ? (
        <LeftContainer>
          <Button
            type={'icon'}
            iconSource={longArrowLeftIcon}
            onPress={handleBack}
          />
        </LeftContainer>
      ) : null,
    [canGoBack, withBack, handleBack],
  );

  return (
    <Container as={SafeAreaView}>
      <Row
        justifySpaceBetween
        mt={ifIphoneX(0, 5)}
        stretch
        mx={7}
        minHeight={'36px'}
        alignCenter
        {...rest}
      >
        {renderGoBack}
        <MiddleContainer
          alignCenter
          justifyCenter
          pointerEvents={'none'}
          px={10}
        >
          {(title || withTitle) && (
            <Text fontSize={5} fontWeight={3} {...textStyle}>
              {title ?? name ?? ''}
            </Text>
          )}
        </MiddleContainer>
        <RightContainer>{renderRight}</RightContainer>
      </Row>
    </Container>
  );
};

Header.defaultProps = {
  light: false,
  withBack: true,
  withTitle: false,
};

export default Header;
