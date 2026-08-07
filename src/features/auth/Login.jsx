import { Button, Paper, PasswordInput, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "src/api/auth";
import Logo from "src/components/Logo";

const Login = () => {
  const [_, setAuth] = useLocalStorage({ key: "auth", getInitialValueInEffect: false });
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const form = useForm({ initialValues: { email: "", password: "" } });

  const handleSubmit = (values) => {
    loginMutation.mutate(values, {
      onSuccess: ({ data }) => {
        setAuth(data);
        navigate(data?.indexPath || "/clients", { replace: true });
      },
    });
  };

  return (
    <SimpleGrid cols={1} style={{ minHeight: "100vh", alignItems: "center", justifyItems: "center" }} p={"lg"} className="pattern-bg">
      <Paper p={"lg"} shadow="md" w={{ base: "100%", sm: 500 }}>
        <Stack gap={4} mb={"md"}>
          <Logo w={225} />

          <Text fw={500} c={"dimmed"}>
            Please login to your account
          </Text>
        </Stack>

        <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)} tt={"capitalize"}>
          <TextInput
            type="email"
            required
            autoFocus
            label="email address"
            placeholder="johndoe@example.com"
            leftSection={<IconAt size={18} />}
            leftSectionPointerEvents="none"
            {...form.getInputProps("email")}
          />

          <PasswordInput required label="password" placeholder="your password" leftSection={<IconLock size={18} />} leftSectionPointerEvents="none" {...form.getInputProps("password")} />

          <Button type="submit" mt={"md"} loading={loginMutation.isPending}>
            Login
          </Button>
        </Stack>
      </Paper>
    </SimpleGrid>
  );
};

export default Login;
