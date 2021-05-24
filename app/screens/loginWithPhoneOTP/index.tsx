import React, { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';

import { phoneToReceivedOtpImage } from 'assets';

import { Header, Screen } from 'app/components';
import {
  Column,
  Image,
  KeyboardAvoidingView,
  OTPInput,
  Row,
  ScrollView,
  Button,
  Text,
} from 'app/components/UI';

import { FUNCTIONS } from 'app/utils/functions';
import { NotLoggedParamList } from 'app/navigators';
import { ROUTES } from 'app/navigators/routes';
import { CONSTANTS } from 'app/utils';

const PhoneVerifyForm = observer(() => {
  const { params } = useRoute<
    RouteProp<NotLoggedParamList, ROUTES.introduction>
  >();
  const { navigate } = useNavigation();
  const [code, setCode] = useState('');

  const resend = useCallback(() => {}, []);

  const onVerify = useCallback((code: string) => {}, [navigate, params]);

  const getFormatedPhone = useMemo(() => FUNCTIONS.getFormatedNumber(''), []);

  return (
    <Screen stretch>
      <Header />
      <KeyboardAvoidingView>
        <ScrollView>
          <Column stretch justifyCenter>
            <Column alignCenter mb={8} mt={4}>
              <Image source={phoneToReceivedOtpImage} mr={10} />
            </Column>
            <Text fontWeight={3} fontSize={8}>
              Verify your phone
            </Text>
            <Text color={'grey'} fontSize={5} mt={4} px={7}>
              With the code sent to:
            </Text>
            <Text color={'grey'} fontSize={5} px={7}>
              {getFormatedPhone}
            </Text>
            <OTPInput
              code={code}
              onCodeChanged={setCode}
              onCodeFilled={onVerify}
            />
            <Row justifyCenter alignEnd mb={4}>
              <Text alignCenter fontSize={4} mr={2}>
                Didn't get a code?
              </Text>
              <Button
                text={'Try again'}
                type={'text'}
                onPress={resend}
                ml={2}
                fontWeight={2}
              />
            </Row>
          </Column>
        </ScrollView>
        <Button
          text={'Next'}
          onPress={onVerify}
          disabled={code.length !== 6}
          mb={CONSTANTS.IS_IOS ? 0 : 7}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
});

export default PhoneVerifyForm;
