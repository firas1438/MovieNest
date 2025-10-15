import React from "react";
import { SignUpForm } from "./components/signup-form";
import MotionWrapper from '@/components/ui/motion-wrapper'

const SignUpPage = () => {
  return (
    <MotionWrapper delay={0.1}>
      <div className="flex pt-12 items-center min-h-[34rem]">
        <SignUpForm />
      </div>
    </MotionWrapper>
  );
};

export default SignUpPage;