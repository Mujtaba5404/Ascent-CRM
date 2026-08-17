import { Button, Modal, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateCompanyMutation } from "src/api/company";

const EditBaseCampModal = ({ isOpen = false, onClose = () => {}, company }) => {
  const updateCompanyMutation = useUpdateCompanyMutation();

  const form = useForm({
    initialValues: { title: company?.title, acronym: company?.acronym, isShared: !!company?.isShared, file: company?.imgUrl },
  });


  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("acronym", values.acronym);

    if (typeof values.file === "object") {
      formData.append("file", values.file);
    }

    updateCompanyMutation.mutate({ companyId: company._id, payload: formData }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update company"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>

        <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
        <TextInput required label="acronym" {...form.getInputProps("acronym")} />
        <Switch label="is shared" {...form.getInputProps("isShared", { type: "checkbox" })} />

        <Button type="submit" loading={updateCompanyMutation.isPending}>
          Update company
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditBaseCampModal;
