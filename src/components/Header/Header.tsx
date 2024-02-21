import { GoogleAuth } from "../GoogleAuth/GoogleAuth";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <GoogleAuth />
    </header>
  );
};

export default Header;
