import styled from "styled-components";
import headerBackground from "./img/header-background.jpeg";

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
  top: 35%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 720px;
  width: 100%;
  margin: auto;
`;
