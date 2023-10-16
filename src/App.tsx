import {Modal} from "./components";
import React from "react";
import {useToggle} from "./hooks/useToggle";

export function App() {

    const {open, handleOpen} = useToggle()

    return (
        <Modal open={open} onClose={handleOpen}><div>Salut</div></Modal>
    )
}