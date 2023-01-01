import logo from '../images/logo.svg';

function Header({children}) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto Russia" className="header__logo" />
      <div className='header__user'>
      {children}
      </div>
    </header>
  );
}

export default Header;
