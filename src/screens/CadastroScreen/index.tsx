import React from 'react';
import Styles from './CadastroScreen.module.scss'
import InputText from '../../components/InputText'
import InputDate from '../../components/InputDate';

export default function CadastroUsuario(){
    return (
        <>
            <h1>Crie sua conta na <span>Sollaris</span></h1>
            <InputText label="Nome"></InputText>
            <InputDate></InputDate>
            <InputText label="CPF"></InputText>
            <InputText label="E-mail"></InputText>
            <InputText label="Telefone"></InputText>
            <InputText label="Senha"></InputText>
            <InputText label="Confirme Sua Senha"></InputText>

            

        </>
    )
}