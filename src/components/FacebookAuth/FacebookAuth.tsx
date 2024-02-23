import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
const FACEBOOK_CLIENT_ID = import.meta.env.VITE_FACEBOOK_CLIENT_ID;

const FacebookAuth = () => {
  return (
    <LoginSocialFacebook
      appId={FACEBOOK_CLIENT_ID}
      onResolve={(response) => console.log(response)}
      onReject={(error) => console.log(error)}
    >
      <FacebookLoginButton style={{ width: "230px" }} />
    </LoginSocialFacebook>
  );
};

export default FacebookAuth;
