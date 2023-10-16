import {useState} from "react";

export function useToggle(defaultValue: boolean) {
    const [show, setShow] = useState(defaultValue)

    const toggle = () => {
        setShow(!show)
    }

    return {show, toggle}
}