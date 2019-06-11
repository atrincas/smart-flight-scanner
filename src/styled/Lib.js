import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import headerBackground from "./img/header-background.jpeg";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Arimo|Open+Sans&display=swap');
  
  body {
    padding: 0;
    margin: 0;
    font-family: 'Arimo', sans-serif;
  }
  `;
export const Header = styled.div`
  position: relative;
  background-image: url(${headerBackground});
  background-size: cover;
  background-position: center;
  min-height: 720px;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #0f2027, #203a43, #2c5364);
    background-color: #333;
    opacity: 0.7;
  }
  & > * {
    z-index: 100;
  }
`;

export const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  background: #fff;
  max-width: 642px;
  width: 100%;
  margin: auto;
  padding: 45px 25px 25px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.4);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 720px;
  min-height: 350px;
  width: 100%;
  margin: auto;
`;

export const FormRow = styled.div``;

export const Select = styled.select`
  background-color: #fff;
  height: 50px;
  padding: 0px 15px;
  padding-top: 24px;
  color: #191a1e;
  border: 2px solid #dfe5e9;
  font-size: 16px;
  font-weight: 700;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-radius: 4px;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
`;
