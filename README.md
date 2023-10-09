# Modal component

### Install package

```shell
npm install modal-cyril-bartz
```

### Props

|       Prop         |        Type       |                 Description               |
| :----------------: | :---------------: | :---------------------------------------: |
| `escapeClose = true`| `boolean`| Allows the user to close the modal by pressing `ESC`|
| `clickClose = true`| `boolean`| Allows the user to close the modal by clicking the overlay|
| `showClose = true` | `boolean`| Shows a (X) icon in the top-right corner|
| `bgroudStyle`| `CSSProperties` | Custom styles for the background around the modal|
| `modalStyle`| `CSSProperties` | Custom styles for the modal |
| `iconCloseStyle`| `CSSProperties` | Custom styles for the (X) icon|
| `open`| `boolean` | Determines if the modal is open or closed|
| `onClose`| `function` | Function used to open or close the modal|
| `children`| `React.ReactNode` | Content to be displayed within the modal|

### Usage

```jsx

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  <Modal open={open} onClose={handleOpen}>
    <div>Hello world!</div>
  </Modal>

```