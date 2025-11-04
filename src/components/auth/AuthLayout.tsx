import { ReactNode } from "react";
// import { AuthLeftSection } from "./AuthLeftSection";
import { AuthRightSection } from "./AuthRightSection";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* <AuthLeftSection /> */}
      <AuthRightSection title={title} subtitle={subtitle}>
        {children}
      </AuthRightSection>
    </div>
  );
};
