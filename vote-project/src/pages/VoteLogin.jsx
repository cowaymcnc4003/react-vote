import VoteHeader from "../components/common/VoteHeader";
import LoginForm from "../components/user/LoginForm";

const Login = () => {
  return (
    <>
      <VoteHeader
        title={"로그인"}
      />
      <LoginForm />
    </>
  );
};

export default Login;