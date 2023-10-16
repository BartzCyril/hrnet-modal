import {createPortal} from "react-dom";
import React, {CSSProperties, useEffect, useRef} from "react";
import {CloseIcon, ModalBackgroundArroud, ModalContainer} from "./Modal.style.css";

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


/**
 * Modal Component
 *
 * @component
 *
 * @param {Object} props - The component props
 * @param {boolean} [props.escapeClose=true] - Allows the user to close the modal by pressing ESC
 * @param {boolean} [props.clickClose=true] - Allows the user to close the modal by clicking the overlay
 * @param {boolean} [props.showClose=true] - Shows a (X) icon in the top-right corner
 * @param {CSSProperties} [props.bgroundStyle] - Custom styles for the background around the modal
 * @param {CSSProperties} [props.modalStyle] - Custom styles for the modal
 * @param {CSSProperties} [props.iconCloseStyle] - Custom styles for the (X) icon
 * @param {boolean} props.open - Determines if the modal is open or closed
 * @param {Function} props.onClose - Function used to open or close the modal
 * @param {React.ReactNode} props.children - Content to be displayed within the modal
 *
 * @returns {TSX.Element|null} The Modal component
 */
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
                modalRef.current?.removeEventListener('click', onClose)
            }
        }
    }, [clickClose, escapeClose, handleEscape, onClose]);

    if (open) {
        return (
            createPortal(
                <ModalBackgroundArroud style={bgroundStyle} ref={modalRef}>
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