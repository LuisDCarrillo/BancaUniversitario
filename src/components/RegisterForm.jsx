import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  padding: 20px;
  font-family: 'Montserrat Alternates';
  position: relative;
`;

const Form = styled.form`
  background-color: lightseagreen;
  border-radius: 15px;
  padding: 20px;
  width: 600px;
  max-width: 900px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-color: #085f63;
`;

const Title = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  color: #ffffff;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #ffffff;
  font-weight: bold;
  font-size: 20px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 95%;
`;

const InputWrapper2 = styled.div`
  position: relative;
  width: 95%;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #085f63;
  border-radius: 5px;
  border-color: #085f63;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 20px;
  color: #085f63;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #085f63;
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: lightseagreen;
  color: #ffffff;
  border: solid 2px;
  border-color: #085f63;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  font-family: 'Montserrat Alternates', sans-serif;

  &:hover {
    background-color: #085f63;
    border: solid 2px;
    border-color: #085f63;
  }
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: #085f63;
  border-radius: 50%;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleImage = styled.img`
  width: 70px;
  height: 70px;
`;
const RegisterFrom = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

 const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  }; 
  return (
    <Container>
      <Circle>
        <CircleImage src="/usuario.png" alt="Usuario" />  
      </Circle>
      <Form>
        <Title>Registrarse</Title>  
        <FormGroup>
          <Label htmlFor="name">Nombre:</Label>
          <InputWrapper2>
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputWrapper2>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Apellido:</Label>
          <InputWrapper2>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </InputWrapper2>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Correo:</Label>
          <InputWrapper2>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputWrapper2>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Contraseña:</Label>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ToggleButton onClick={togglePasswordVisibility}>
              <img src={showPassword ? '/ojos-cruzados.png' : '/ojo.png'} alt="Toggle visibility" />
            </ToggleButton>
          </InputWrapper>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <ToggleButton onClick={togglePasswordVisibility}>
              <img src={showPassword ? '/ojos-cruzados.png' : '/ojo.png'} alt="Toggle visibility" />
            </ToggleButton>
          </InputWrapper>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dateOfBirth">Fecha de Nacimiento:</Label>
          <InputWrapper2>
            <Input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </InputWrapper2>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phoneNumber">Telefono:</Label>
          <InputWrapper2>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </InputWrapper2>
        </FormGroup>
        <Button type="submit">Registrarse</Button>
      </Form>
    </Container>
  );
};
export default RegisterFrom;