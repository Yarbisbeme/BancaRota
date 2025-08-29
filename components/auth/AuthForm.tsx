"use client";

import { useState } from "react";
import LogoHorizon from "../LogoHorizon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormSchema } from "@/lib/utils";
import FormComponent from "./FormComponent";
import { useRouter } from "next/navigation";
import { account, ID } from "@/lib/appwrite";
import { Models } from "appwrite";
import z, { email, string } from "zod";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);

  const values =
    type === "sign-in"
      ? { email: "", password: "" }
      : {
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          dob: "",
          SSN: "",
          email: "",
          password: "",
        };

  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  const login = async ({email, password}: {email: string, password: string}) => {
    setIsLoading(true)
    try {
      await account.deleteSession("current").catch(() => {console.log('Se ha cerrado la sesion')});
      await account.createEmailPasswordSession(email, password);

      const user = await account.get();
      setLoggedInUser(user);
      console.log(user)
      router.push('/')
    } catch (error: any) {
      if (error.code === 401) {
        console.error("Credenciales Invalidas")
        alert("El correo o la Clave son incorrectas")
      } else {
        console.error("Error inesperado", error)
        alert("Ha Ocurrido un error intenta nuevamente")
      }

    }finally{
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-in") {
        await login({ email: data.email, password: data.password });
      }

      if (type === "sign-up") {
        // crear usuario
        await account.create(
          ID.unique(),
          data.email,
          data.password,
          `${data.firstName} ${data.lastName}`
        );

        await login({ email: data.email, password: data.password });
      }
    } catch (error) {
      console.error("Error en submit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <LogoHorizon />
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            Please enter your details below
          </p>
        </div>
      </header>

      <FormComponent
        type={type}
        isLoading={isLoading}
        form={form}
        onSubmit={onSubmit}
      />
    </section>
  );
};

export default AuthForm;
