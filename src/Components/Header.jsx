import headerLogo from '../assets/images/laughing-emoji.png';

export default function Header() {
  return (
    <nav>
      <div className="header--left">
        <img src={headerLogo} className="header--left--logo" />
        <p className="header--left--title">Meme Generator</p>
      </div>
      <p className="header--right">React Course - Project 3</p>
    </nav>
  );
}