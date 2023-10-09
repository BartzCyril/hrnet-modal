import {createPortal} from "react-dom";
import React, {CSSProperties, useEffect, useRef} from "react";
import styled from 'styled-components';

type ModalProps = {
    escapeClose?: boolean
    clickClose?: boolean
    showClose?: boolean
    bgroundStyle?:CSSProperties
    modalStyle?: CSSProperties
    iconCloseStyle?: CSSProperties
    open: boolean
    onClose: () => void
    children : React.ReactNode
}

const ModalBackgroundArroud = styled.div`
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

const ModalContainer = styled.div`
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

const CloseIcon = styled.div`
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

export function Modal(
    {
        escapeClose = true,
        clickClose = true,
        showClose = true,
        bgroundStyle,
        modalStyle,
        iconCloseStyle,
        open,
        onClose,
        children
    } : ModalProps
) {

    const handleEscape = (e: { keyCode: number; }) => {
        if (e.keyCode === 27)
            onClose()
    }

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (escapeClose) {
            document.addEventListener('keydown', handleEscape)
        }
        
        if  (clickClose) {
            modalRef.current?.addEventListener('click', onClose)
        }
        
        return () => {
            if (escapeClose) {
                document.removeEventListener('keydown', handleEscape)
            }
            if  (clickClose) {
                modalRef.current?.addEventListener('click', onClose)
            }
        }
    }, [clickClose, escapeClose, handleEscape, onClose]);

    if (open) {
        return (
            createPortal(
                <ModalBackgroundArroud style={bgroundStyle}>
                    <ModalContainer style={modalStyle}>
                        {showClose && <CloseIcon style={iconCloseStyle} onClick={onClose}>X</CloseIcon>}
                        {children}
                    </ModalContainer>
                </ModalBackgroundArroud>
                ,document.body)
        )
    }

    return null

}