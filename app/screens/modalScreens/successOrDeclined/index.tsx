import React, { useCallback } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import { declineImage } from 'assets';

import { ROUTES } from 'app/navigators/routes';
import { ModalParamList } from 'app/navigators';

import { Header, Screen } from 'app/components';
import { Column, Image, ScrollView, Text, Button } from 'app/components/UI';
import { StackNavigationProp } from '@react-navigation/stack';

export function ScreenComponent() {
  const { goBack } = useNavigation<
    StackNavigationProp<ModalParamList, ROUTES.successOrDeclined>
  >();
  const { params } = useRoute<
    RouteProp<ModalParamList, ROUTES.successOrDeclined>
  >();

  const { success, title, description, buttonText, onPress } = params ?? {};

  const onButtonPress = useCallback(() => {
    if (onPress) return onPress();
    goBack();
  }, [goBack, onPress]);

  return (
    <Screen stretch bg={'light'}>
      <Header withBack={false} />
      <ScrollView>
        <Column stretch mx={'10%'}>
          <Column alignCenter my={'20%'}>
            <Image
              source={success ? declineImage : declineImage}
              width={'80%'}
            />
          </Column>
          <Text fontSize={7} mb={4}>
            {title || (success ? 'Congratulation' : 'We are sorry :(')}
          </Text>
          <Text fontSize={4} color={'grey'}>
            {description ?? 'Something wend wrong'}
          </Text>
        </Column>
      </ScrollView>
      <Button
        text={buttonText || (success ? 'Ok' : 'Try again!')}
        onPress={onButtonPress}
        m={7}
        mt={0}
      />
    </Screen>
  );
}

export const screen = ROUTES.successOrDeclined;
