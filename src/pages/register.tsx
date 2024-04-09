import LoginWrapper from "@/components/LoginWrapper/LoginWrapper";
import { RegisterForm } from "@/components/Forms/Forms";
export default function Home() {
    return (
      <>
      <LoginWrapper>
        <RegisterForm/>
      </LoginWrapper>
      </>
    );
  }