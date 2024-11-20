import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { ISignInPayload, signInFormSchema } from "@/domain/auth/validations";
import { storage } from "@/utils/storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { toast } from "sonner";

interface SignInFormProps {
  onSuccess?: () => void;
}

export default function SignInForm({ onSuccess }: SignInFormProps) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInFormSchema)
  });

  async function handleSubmit(values: ISignInPayload) {
    toast.loading("Signing In...", { id: "SIGN_IN" });
    try {
      await storage.save("MOOLAGA_PWA_CREDENTIALS", values);
      toast.success("Signed In", { id: "SIGN_IN" });
      onSuccess?.();
    } catch (err) {
      console.log(err);
      toast.error("Failed to sign in", { id: "SIGN_IN" });
    }
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <fieldset className="border-none shadow-none p-0 m-0 outline-none flex flex-col gap-3">
        <Label
          title="Email"
          error={form.formState.errors.email?.message}
        >
          <Input
            {...form.register("email")}
            placeholder="Ex. example@example.com"
          />
        </Label>

        <Label
          title="Password"
          error={form.formState.errors.password?.message}
        >
          <Input
            type="password"
            {...form.register("password")}
            placeholder="Ex. ********"
          />
        </Label>

        <div className="mt-2">
          <Button className="w-full" type="submit">Login</Button>
        </div>
      </fieldset>
    </form>
  )
}