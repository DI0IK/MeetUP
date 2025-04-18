import { auth } from '@/auth';
import SignIn from '@/components/user/signin-button';
import { SignOut } from '@/components/user/signout-button';

export default async function Login() {
  const session = await auth();
  return (
    <div>
      <h1>Login</h1>
      {!session?.user ? (
        <SignIn></SignIn>
      ) : (
        <>
          <h2>Hallo {session.user.name}</h2>
          <SignOut></SignOut>
        </>
      )}
    </div>
  );
}
