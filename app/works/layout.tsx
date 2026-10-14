/** `modal` shows an exploration over the grid when opened from the Works page. */
export default function WorksLayout({ children, modal }: LayoutProps<"/works">) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
