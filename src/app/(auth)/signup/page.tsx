import { Metadata } from "next";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import SignUpForm from "./signup-form";

export const metadata: Metadata = {
  title: "SignUp",
};

const Page = () => {
  return (
    <main className="ml-6 flex flex-col justify-center md:ml-12">
      <div>
        <div className="mt-12">
          <div className="text-2xl font-semibold uppercase md:text-4xl">
            Let&apos;s start
          </div>
          <div className="mt-2 text-2xl font-semibold uppercase md:text-4xl">
            a journey together
          </div>
        </div>

        <div className="text-color-sub mt-4">
          <p>
            {" "}
            Fill the below given form to singup your account, You can also use
            google sign up
          </p>
          <p className="flex">
            Already have an account?{" "}
            <Link href="/">
              <span className="ml-2 text-foreground underline">Login</span>{" "}
            </Link>
            <MoveUpRight className="mt-1 size-4 text-foreground" />{" "}
          </p>
        </div>
      </div>

      <div>
        <SignUpForm />
      </div>
    </main>
  );
};
export default Page;
