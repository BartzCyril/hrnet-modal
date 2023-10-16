import {describe, it, expect} from "vitest";
import {Modal} from "../src/components";
import {render, renderHook, screen} from "@testing-library/react";
import {useToggle} from "../src/hooks/useToggle";
import {userEvent} from "@testing-library/user-event";

describe("<Modal>", () => {
    it('should render correctly', () => {
        const {result} = renderHook(() => useToggle(true))
        // @ts-ignore
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        expect(container.firstChild).toMatchInlineSnapshot(`
          <div
            class="sc-beyTiQ iMMgeE"
          >
            <div
              class="sc-guDMob edOVdi"
            >
              <button
                class="sc-dmyDmy jKbXqI"
              >
                X
              </button>
              <div>
                Salut
              </div>
            </div>
          </div>
        `)
    })
    it('should close the modal on click X icon', async () => {
        const {result} = renderHook(() => useToggle(true))
        // @ts-ignore
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        await userEvent.click(screen.getByText("X"))
        expect(result.current.show).toBeFalsy()
    })
    it('should close the modal on click the container modal', async () => {
        const {result} = renderHook(() => useToggle(true))
        // @ts-ignore
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        // @ts-ignore
        await userEvent.click(document.querySelector('.sc-beyTiQ') as HTMLElement)
        expect(result.current.show).toBeFalsy()
    })
    it('should close the modal on press ESC', async () => {
        const {result} = renderHook(() => useToggle(true))
        // @ts-ignore
        const {container} = render(<Modal open={result.current.show} onClose={result.current.toggle}><div>Salut</div></Modal>, {container: document.body})
        // @ts-ignore
        await userEvent.keyboard('{Escape}')
        expect(result.current.show).toBeFalsy()
    })
})