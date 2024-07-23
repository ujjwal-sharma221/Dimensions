"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { signUpSchema, SignUpSchemaType } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SignUp from "./action";

const SignUpForm = () => {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpSchemaType) => {
    setError(undefined);

    async function submit() {
      const { error } = await SignUp(values);
      if (error) setError(error);
    }

    startTransition(submit);
    toast.promise(submit, {
      loading: "Loading...",
      success: "Request Processed",
      error: "Error while processing request",
    });

    console.log(values);
  };

  return (
    <Form {...form}>
      {error && <p className="text-center text-destructive">{error}</p>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-14">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center">
              <FormLabel className="mt-2 w-[17rem] text-xl text-[#373A40] md:text-2xl lg:text-3xl">
                Hey, my name is
              </FormLabel>
              <FormControl>
                <Input
                  className="border-none text-xl md:text-2xl"
                  placeholder=" username"
                  {...field}
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center">
              <FormLabel className="mt-2 w-[16.5rem] text-xl text-[#373A40] md:text-2xl lg:text-3xl">
                This is my email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="email"
                  {...field}
                  className="border-none text-xl md:text-2xl"
                />
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex items-center justify-center">
              <FormLabel className="mt-2 w-[30rem] text-xl text-[#373A40] md:text-2xl lg:text-3xl">
                and this is the password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  className="border-none text-xl md:text-2xl"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="float-right mt-4 font-thin tracking-wider"
        >
          Submit Form
        </Button>
      </form>
    </Form>
  );
};
export default SignUpForm;
