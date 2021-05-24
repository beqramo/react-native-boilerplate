import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Column, Row, Button, Text } from 'app/components/UI';
import { Header } from 'app/components';

import { ROUTES } from 'app/navigators/routes';

export const ScreenComponent = observer(function Introduction() {
  const { navigate } = useNavigation();

  const onAccountCreate = useCallback(() => {}, [navigate]);

  const onLogin = useCallback(() => {
    navigate(ROUTES.loginWithEmail);
  }, [navigate]);

  return (
    <Column stretch>
      <Column as={SafeAreaView} stretch>
        <Header withBack={false} />
        <Column stretch mt={'7%'}>
          <Column stretch justifyEnd>
            <Button text={'Apply Now'} onPress={onAccountCreate} />
            <Row justifyCenter alignEnd my={'7%'}>
              <Text color={'orange'} alignCenter fontSize={4}>
                I already have an
              </Text>
              <Button
                text={'account'}
                type={'text'}
                fontWeight={2}
                onPress={onLogin}
                ml={2}
              />
            </Row>
          </Column>
        </Column>
      </Column>
    </Column>
  );
});

export const screen = ROUTES.introduction;
