import AuthForm from '../AuthForm';

export default function AuthFormExample() {
  return <AuthForm mode="register" onSubmit={(email, password, name) => console.log('Auth submitted', { email, password, name })} />;
}
