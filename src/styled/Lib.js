import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import headerBackground from "./img/header-background.jpeg";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Arimo|Open+Sans&display=swap');
  
  body {
    padding: 0;
    margin: 0;
    font-family: 'Arimo', sans-serif;
    background-color: #f3f2f5;
  }
  `;

// SEARCHFORM.JS //
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

export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const Select = styled.select`
  background-color: #fff;
  height: 50px;
  width: 100%;
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

export const InputNumber = styled.input`
  background-color: #fff;
  height: 50px;
  width: 50%;
  padding: 0px 15px;
  padding-top: 20px
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

export const AlertText = styled.div`
  display: inline-block;
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-style: italic;
  color: red;
`;

export const FormLabel = styled.span`
  position: absolute;
  top: 6px;
  left: 20px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 24px;
  height: 24px;
  font-size: 12px;
  color: #98c9ee;
`;

export const FormButton = styled.input.attrs({
  type: "submit",
  value: "Show Flights"
})`
  color: #fff;
  background-color: #4fa3e3;
  cursor: pointer;
  font-weight: 400;
  height: 65px;
  font-size: 18px;
  border: none;
  width: 100%;
  border-radius: 4px;
  text-transform: uppercase;
`;

// FLIGHTOFFERS.JS //
export const FlightOffersContainer = styled.div``;
export const OrderByBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin: 10px auto;
  padding: 10px;
  width: 55%;
`;
export const FlightOffersUl = styled.ul`
  list-style: none;
  padding: 0;
`;
export const FlightOffersLi = styled.li`
  margin: 10px;
`;
export const TicketContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin: auto;
  padding: 10px;
  width: 55%;
`;
export const TicketDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;
export const FlightDetails = styled.div`
  display: flex;
  margin: 10px;
`;
export const FlightInfo = styled.div`
  display: flex;
  width: 100%;
`;
export const FlightInfoDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 10%;
  border: 1px dotted #000;
  font-size: 12px;
  font-style: italic;
`;
export const FlightInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;
export const FlightInfoBlockHeader = styled.div``;
export const FlightInfoBlockSubHeader = styled.div`
  font-size: 10px;
  text-align: center;
`;
export const FlightDuration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  font-size: 12px;
`;
export const LineUl = styled.div`
  height: 2px;
  width: 50%;
  background-color: #817b8f;
  margin: 0.375rem auto;
  padding: 0;
  position: relative;
  border-radius: 0.375rem;
  display: block;
  text-align: center;
  line-height: 0;

  &::after {
    content: "";
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    right: -0.375rem;
    top: 50%;
    margin-top: -8px;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='%23898294' d='M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.525.525 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.523.523 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.523.523 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71'/%3E%3C/svg%3E");
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: 100% 50%;
    background-size: 12px;
  }
`;

export const TicketPrice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 25%;
`;

export const TicketButton = styled.button.attrs({
  target: "_blank"
})`
  display: inline-block;
  margin: 0;
  padding: 0.375rem 1.125rem;
  border: 0;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#00d775),
    to(#00bd68)
  );
  background-image: -webkit-linear-gradient(top, #00d775, #00bd68);
  background-image: -o-linear-gradient(top, #00d775 0, #00bd68 100%);
  background-image: linear-gradient(-180deg, #00d775, #00bd68);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5rem;
  text-align: center;
  text-decoration: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  cursor: pointer;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background-color: #00d775;
  border-radius: 1.125rem;
`;

export const PriceTitle = styled.div``;
