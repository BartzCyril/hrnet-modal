import {createPortal} from "react-dom";
import React, {CSSProperties, memo, useCallback, useEffect, useRef, useState} from "react";
import {CloseIcon, ModalBackgroundArroud, ModalContainer} from "./Modal.style.css";
import {getAllChildren} from "../functions/functions";

type ModalProps = {
    escapeClose?: boolean
    clickClose?: boolean
    showClose?: boolean
    bgroundStyle?: CSSProperties
    modalStyle?: CSSProperties
    iconCloseStyle?: CSSProperties
    open: boolean
    onClose: () => void
    children: React.ReactNode
}

/**
 * Modal Component
 *
 * @component
 *
 * @param {Object} props - The component props
 * @param {boolean} [props.escapeClose=true] - Allows the user to close the modal by pressing ESC
 * @param {boolean} [props.clickClose=true] - Allows the user to close the modal by clicking inside
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
    }: ModalProps
) {

    const modalRef = useRef<HTMLDivElement>(null);
    const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([])
    const index = useRef(0)

    useEffect(() => {
        if (open && !focusableElements.length) {
            const array: HTMLElement[] = []
            getAllChildren(modalRef?.current as Element, array);
            for (let i = 0; i < array.length; i++) {
                array[i].tabIndex = 0
            }
            setFocusableElements(array)
            array[0].focus()
        }
    }, [])

    const handleEscape = (e: { keyCode: number; }) => {
        if (e.keyCode === 27)
            onClose()
    }

    const handleTab = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === 'Tab' && focusableElements.length) {
            e.preventDefault()
            focusableElements[index.current].focus()
            const newIndex = index.current + 1 >= focusableElements.length ? 0 : index.current + 1
            index.current = newIndex
        }
    }

    useEffect(() => {

        if (open) {
            window.addEventListener('keydown', handleTab)

            if (escapeClose) {
                window.addEventListener('keydown', handleEscape)
            }
        }

        return () => {
            if (open) {
                if (escapeClose) {
                    window.removeEventListener('keydown', handleEscape)
                }
                window.removeEventListener('keydown', handleTab)
            }
        }
    }, [handleTab, handleEscape, escapeClose]);

    if (open) {
        return (
            createPortal(
                <ModalBackgroundArroud
                    style={bgroundStyle}
                >
                    <ModalContainer
                        ref={modalRef}
                        style={modalStyle}
                        role="dialog"
                        aria-modal="true"
                        aria-label={clickClose ? "you can close the modal" : ""}
                        onClick={clickClose ? onClose : () => {}}
                        onKeyDown={clickClose ? (event) => {
                            if (event.key === 'Enter') {
                                onClose();
                            }
                        }: () => {}}
                    >
                        {showClose &&
                            <CloseIcon
                            style={iconCloseStyle}
                            onClick={onClose}
                            aria-label="you can close the modal"
                            >
                                X
                            </CloseIcon>}
                        {children}
                    </ModalContainer>
                </ModalBackgroundArroud>
                , document.body)
        )
    }

    return null

}
