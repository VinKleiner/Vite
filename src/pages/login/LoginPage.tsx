import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Невірний формат email"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
    remember: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
        hasError
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
    }`;

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        alert("Вхід успішний!");
        reset();
    };

    return (
        <div className="mx-auto w-full max-w-lg px-4 pb-10">
            <h1 className="text-center text-3xl font-bold text-gray-800">Вхід на сайт</h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
                <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                        Електронна пошта
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        autoComplete="email"
                        className={inputClass(!!errors.email)}
                        {...register("email")}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                        Пароль
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Мінімум 6 символів"
                        autoComplete="current-password"
                        className={inputClass(!!errors.password)}
                        {...register("password")}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" {...register("remember")} />
                    Запам'ятати мене
                </label>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                >
                    Увійти
                </button>
            </form>
        </div>
    );
};

export default LoginPage;