# Modal component

### Prerequisites

[Node.js >= v14](https://nodejs.org/en/)

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

### Testing Status

The Modal component has undergone comprehensive testing to ensure the reliability and functionality of all its features.

### Accessibility

The Modal component is designed with accessibility in mind. It provides a seamless experience for all users, including those who rely on assistive technologies.

### Usage

```jsx

  const {show, toggle} = useToggle(false)

  <Modal open={show} onClose={toggle}>
    <div>Hello world!</div>
  </Modal>

```
