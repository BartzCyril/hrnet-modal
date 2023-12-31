import styled from "styled-components";

export const ModalBackgroundArroud = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ModalContainer = styled.div`
  position: relative;
  width: 50%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CloseIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: black;
  color: white;
  font-size: 15px;
  top: -12.5px;
  right: -12.5px;
  border-radius: 100%;
`