import "./Menu.css"

export default function Menu(props: { 
  active: boolean,
  onCloseMenuClick : () => void
}) {
  const handleCloseMenuClick = () => {
    props.onCloseMenuClick();
  }

  return (
    props.active ? (
      <div className='menu-main-container' onClick={handleCloseMenuClick}>
        <div className="menu-container"></div>
      </div>
    ) : null
  );
}