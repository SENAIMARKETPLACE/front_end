import React, { useEffect, useState } from 'react';
import styles from './UserProfileForm.module.scss';
import { useForm } from '@mantine/form';
import {
  Tabs,
  NumberInput,
  TextInput,
  Button,
  Avatar,
  MultiSelect,
} from '@mantine/core';
import PersonalData from './PersonalData';
import AccessData from './AccessData';
import AddressData from './AddressData';

const inputProps = {
  radius: 'xl',
  required: true,
  withAsterisk: false,
  mt: 'xs',
};

const UserProfileForm = () => {
  const [windowWidth, setWindowWidth] = useState(null);
  const form = useForm({
    initialValues: { name: '', email: '', age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? 'Name must have at least 2 letters' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: (value) =>
        value < 18 ? 'You must be at least 18 to register' : null,
    },
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const orientation =
    windowWidth && windowWidth >= 850 ? 'vertical' : 'horizontal';

  return (
    <Tabs defaultValue="personalData" orientation={orientation}>
      <Tabs.List>
        <Tabs.Tab value="personalData">Dados pessoais</Tabs.Tab>
        <Tabs.Tab value="accessData">Dados de acesso</Tabs.Tab>
        <Tabs.Tab value="address">Endereço</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="personalData" p="lg">
        <PersonalData inputProps={inputProps} />
      </Tabs.Panel>
      <Tabs.Panel value="accessData" p="lg">
        <AccessData inputProps={inputProps} />
      </Tabs.Panel>
      <Tabs.Panel value="address" p="lg">
        <AddressData inputProps={inputProps} />
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserProfileForm;
