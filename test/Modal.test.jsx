import {describe, it, expect} from "vitest";
import {Modal} from "../src/components";
import {render, renderHook, screen, fireEvent} from "@testing-library/react";
import {useToggle} from "../src/hooks/useToggle";
import {userEvent} from "@testing-library/user-event";

describe("<Modal>", () => {
    it('should render correctly if open = true', () => {
        const {result} = renderHook(() => useToggle(true))
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="sc-beyTiQ iMMgeE"
          >
            <div
              aria-label="you can close the modal"
              aria-modal="true"
              class="sc-guDMob edOVdi"
              role="dialog"
              tabindex="0"
            >
              <button
                aria-label="you can close the modal"
                class="sc-dmyDmy jKbXqI"
                tabindex="0"
              >
                X
              </button>
              <div
                tabindex="0"
              >
                Salut
              </div>
            </div>
          </div>
        `)
    })
    it('should render correctly if open = false', () => {
        const {result} = renderHook(() => useToggle(false))
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        expect(container.firstChild).toBeNull()
    })
    it('should close the modal on click X icon', async () => {
        const {result} = renderHook(() => useToggle(true))
        render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        await userEvent.click(screen.getByText("X"))
        expect(result.current.show).toBeFalsy()
    })
    it('should close the modal on click the container modal', async () => {
        const {result} = renderHook(() => useToggle(true))
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        await userEvent.click(container.querySelectorAll('div')[1])
        expect(result.current.show).toBeFalsy()
    })
    it('should close the modal upon pressing the Enter key while focusing on the modal container', () => {
        const {result} = renderHook(() => useToggle(true))
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        fireEvent.keyDown(container.querySelectorAll('div')[1], { key: 'Enter'})
        expect(result.current.show).toBeFalsy()
    })
    it('should close the modal on press ESC', () => {
        const {result} = renderHook(() => useToggle(true))
        render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        fireEvent.keyDown(window, { key: 'Escape', keyCode: 27 })
        expect(result.current.show).toBeFalsy()
    })
    it ('should focus only elements inside the modal', () => {
        const {result} = renderHook(() => useToggle(true))
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        fireEvent.keyDown(container, { key: 'Tab'})
        expect(document.activeElement).toBe(container.querySelectorAll('div')[1])
        fireEvent.keyDown(container, { key: 'Tab'})
        expect(document.activeElement).toBe(container.querySelector('button'))
        fireEvent.keyDown(container, { key: 'Tab'})
        expect(document.activeElement).toBe(screen.getByText("Salut"))
        fireEvent.keyDown(container, { key: 'Tab'})
        expect(document.activeElement).toBe(container.querySelectorAll('div')[1])
    })
})