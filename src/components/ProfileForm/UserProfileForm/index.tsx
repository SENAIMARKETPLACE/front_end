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
import { IResponseLoginUser } from 'compartilhado/IReponseLoginUser';

const inputProps = {
  radius: 'xl',
  required: true,
  withAsterisk: false,
  mt: 'xs',
};


interface UserProfileFormProps {
  userConnect: IResponseLoginUser
  
}

const UserProfileForm = ({userConnect}: UserProfileFormProps) => {
  const [windowWidth, setWindowWidth] = useState(null);

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
        <Tabs.Tab value="address">Endereço</Tabs.Tab>
        <Tabs.Tab value="accessData">Alterar a senha</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="personalData" p="lg">
        <PersonalData inputProps={inputProps} userConnect={userConnect} />
      </Tabs.Panel>
      <Tabs.Panel value="accessData" p="lg">
        <AccessData inputProps={inputProps} userConnect={userConnect}/>
      </Tabs.Panel>
      <Tabs.Panel value="address" p="lg">
        <AddressData inputProps={inputProps} userConnect={userConnect}/>
      </Tabs.Panel>
    </Tabs>
  );
};

export default UserProfileForm;
