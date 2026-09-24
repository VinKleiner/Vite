import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
    fullName: z.string().trim().regex(/^\S+(\s+\S+)+$/, "Введіть ім'я та прізвище"),
    email: z.string().email("Невірний формат email"),
    phone: z.string().regex(/^\+?\d{10,15}$/, "Введіть номер, наприклад +380501234567"),
    password: z.string().min(6, "Пароль має містити щонайменше 6 символів"),
    photo: z
        .custom<FileList>()
        .refine((files) => files?.length > 0, "Оберіть фото")
        .refine((files) => !!files?.[0]?.type.startsWith("image/"), "Файл має бути зображенням"),
});

type FormData = z.infer<typeof schema>;

const fields = [
    { name: "fullName", label: "ПІБ", type: "text", placeholder: "Ім'я Прізвище" },
    { name: "email", label: "Електронна пошта", type: "email", placeholder: "user@example.com" },
    { name: "phone", label: "Телефон", type: "tel", placeholder: "+380501234567" },
    { name: "password", label: "Пароль", type: "password", placeholder: "Мінімум 6 символів" },
] as const;

const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
        hasError
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
    }`;

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // Прев'ю фото
    const file = watch("photo")?.[0];
    const [preview, setPreview] = useState("");

    useEffect(() => {
        if (!file?.type.startsWith("image/")) return setPreview("");
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const onSubmit = (data: FormData) => {
        console.log({ ...data, photo: data.photo[0].name });
        alert("Реєстрація успішна! (демо)");
        reset();
    };

    return (
        <div className="mx-auto w-full max-w-lg px-4 pb-10">
            <h1 className="text-center text-3xl font-bold text-gray-800">Реєстрація на сайті</h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
                {fields.map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                        <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
                            {label}
                        </label>
                        <input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            className={inputClass(!!errors[name])}
                            {...register(name)}
                        />
                        {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>}
                    </div>
                ))}

                <div>
                    <label htmlFor="photo" className="mb-1 block text-sm font-medium text-gray-700">
                        Фото профілю
                    </label>
                    <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        className={inputClass(!!errors.photo)}
                        {...register("photo")}
                    />
                    {errors.photo && <p className="mt-1 text-sm text-red-600">{errors.photo.message as string}</p>}
                    {preview && <img src={preview} alt="Прев'ю фото" className="mt-2 max-h-52 rounded-lg" />}
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                >
                    Зареєструватися
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;