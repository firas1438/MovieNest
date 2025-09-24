"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth";

const SignInWithGoogleButton = () => {
  return (
    <Button type="button" variant="outline" onClick={() => signInWithGoogle()} >
      <GoogleIcon />
      <span>Sign in with Google</span>
    </Button>
  );
};

export default SignInWithGoogleButton;



// google icon
const GoogleIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M533.5 278.4c0-17.6-1.5-34.5-4.3-51H272v96.7h147.4c-6.3 33.7-25.4 62.2-54.4 81.5v67.7h87.7c51.3-47.3 80.8-116.8 80.8-194.9z"
      fill="#4285F4"
    />
    <path
      d="M272 544.3c73.2 0 134.7-24.3 179.6-66l-87.7-67.7c-24.4 16.3-55.7 26-91.9 26-70.7 0-130.7-47.7-152.1-111.9H32.1v70.3C77 485.4 168.5 544.3 272 544.3z"
      fill="#34A853"
    />
    <path
      d="M119.9 326.7c-5.5-16.5-8.7-34.1-8.7-52s3.2-35.5 8.7-52V151H32.1C11.7 193.1 0 242.7 0 292.7s11.7 99.6 32.1 141.7l87.8-70.3z"
      fill="#FBBC05"
    />
    <path
      d="M272 108.3c38.7 0 73.4 13.3 100.8 39.3l75.3-75.3C406.8 24.1 345.3 0 272 0 168.5 0 77 58.9 32.1 151l87.8 70.3C141.3 155.9 201.3 108.3 272 108.3z"
      fill="#EA4335"
    />
  </svg>
);