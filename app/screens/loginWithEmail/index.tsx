import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Header, Screen } from 'app/components';
import {
  Column,
  KeyboardAvoidingView,
  PhoneInput,
  Row,
  ScrollView,
  TextInput,
  Button,
  Text,
} from 'app/components/UI';
import { ROUTES } from 'app/navigators/routes';

type FormType = {
  email: string;
  phone: string;
  password: string;
};

const schema = Yup.object().shape(
  {
    email: Yup.string()
      .email()
      .ensure()
      .optional()
      .when('phone', {
        is: (phone) => !!phone,
        otherwise: Yup.string().email().required(),
      }),
    phone: Yup.string()
      .optional()
      .ensure()
      .when('email', {
        is: (email) => !!email,
        otherwise: Yup.string().phone().required(),
      }),
    password: Yup.string().min(8).required(),
  },
  [['phone', 'email']],
);

function LoginWithEmail() {
  const { navigate, reset } = useNavigation();

  const [emailLogin, setEmailLogin] = useState(true);

  const { handleSubmit, control, formState, setValue } = useForm<FormType>({
    resolver: yupResolver(schema),
    shouldFocusError: true,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    setValue(emailLogin ? 'phone' : 'email', '', { shouldValidate: true });
  }, [emailLogin, setValue]);

  const onNavigateHome = useCallback(() => {
    reset({
      index: 0,
      routes: [{ name: ROUTES.homeTab }],
    });
  }, [reset]);

  const onForgotPassword = useCallback(() => {}, [navigate]);

  const renderLabel = useCallback(
    (label, email = true) => (
      <Row mb={2} alignCenter justifySpaceBetween>
        <Text textAlign={'left'} fontSize={2}>
          {label}
        </Text>
        <Button
          text={email ? 'Use your phone' : 'Use your email'}
          type={'text'}
          onPress={() => setEmailLogin(!email)}
          ml={2}
          fontWeight={2}
          fontSize={2}
        />
      </Row>
    ),
    [],
  );

  return (
    <Screen stretch bg={'light'}>
      <Header />
      <KeyboardAvoidingView>
        <ScrollView>
          <Column stretch justifyCenter pb={5} px={7}>
            <Text fontWeight={3} textAlign={'left'} fontSize={8}>
              Login
            </Text>
            <Text color={'grey'} textAlign={'left'} fontSize={5} mt={4}>
              Welcome back!
            </Text>
            {emailLogin ? (
              <Controller
                key={1}
                control={control}
                name="email"
                render={({ field, ...rest }) => (
                  <TextInput
                    {...field}
                    onChangeText={field.onChange}
                    {...rest}
                    containerProps={{ mt: 10 }}
                    renderLabel={renderLabel('Email')}
                  />
                )}
              />
            ) : (
              <Controller
                key={2}
                control={control}
                name="phone"
                render={({ field, ...rest }) => (
                  <PhoneInput
                    {...field}
                    onChangeText={field.onChange}
                    {...rest}
                    containerProps={{ mt: 10 }}
                    keyboardType={'phone-pad'}
                    placeholder={'(123) 456-7890'}
                    renderLabel={renderLabel('Phone', false)}
                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="password"
              render={({ field, ...rest }) => (
                <TextInput
                  {...field}
                  onChangeText={field.onChange}
                  {...rest}
                  label={'Password'}
                  containerProps={{ mt: 7 }}
                  secureTextEntry={true}
                />
              )}
            />
            <Button
              text={'Forgot password?'}
              type={'text'}
              onPress={onForgotPassword}
              ml={2}
              fontWeight={2}
              fontSize={1}
              textColor={'grey'}
              my={5}
            />
          </Column>
        </ScrollView>
        <Button
          text={'Login'}
          onPress={handleSubmit(onNavigateHome)}
          mb={7}
          disabled={!formState.isValid}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
}

export default LoginWithEmail;
