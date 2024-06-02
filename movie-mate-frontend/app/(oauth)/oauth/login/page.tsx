"use client";

import { loginIgracias } from "@/app/(movie-mate)/_hooks/login-igracias";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { mutateAsync: loginAsync } = loginIgracias();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<Inputs> = async ({
    username,
    password,
  }: any) => {
    const data = await loginAsync({ username, password });
    console.log({ data });
  };

  return (
    <div className="max-w-sm w-full flex">
      <div className="card bg-base-100 shadow-xl m-auto">
        <div className="card-body">
          <h2 className="card-title">Login With Igracias!</h2>
          <p className="mb-4">
            Unofficial OAuth login with Igracias credential. By{" "}
            <a className="underline" href="https://github.com/craftalpian">
              @craftalpian
            </a>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  {...register("username", { required: true })}
                  type="text"
                  className="grow"
                  placeholder="Username"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="grow"
                  placeholder="Password"
                />
              </label>
            </div>
            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-error text-white"
                type="submit"
                disabled={!isDirty || !isValid}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
