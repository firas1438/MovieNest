import Image from "next/image";
import MotionWrapper from "@/components/ui/motion-wrapper";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionWrapper delay={0.1}>
        <div className="relative">
            {/* background pattern */}
            <Image src="/pattern.png" alt="pattern" fill className="object-cover opacity-50 dark:opacity-20" priority />
            {/* gradients */}
            <div>
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            </div>
            {/* content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    </MotionWrapper>
  );
}
