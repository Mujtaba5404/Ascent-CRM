import { Button, Image, Modal, Stack, Switch, TextInput, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconPhotoCancel, IconPhotoDown, IconPhotoPlus } from "@tabler/icons-react";
import { useCreateBrandMutation } from "src/api/brand";
import CompaniesSelect from "src/features/companies/CompaniesSelect";

const iconProps = { display: "block", size: 80, strokeWidth: 1.25 };

const AddBrandModal = ({ isOpen = false, onClose = () => {} }) => {
  const createBrandMutation = useCreateBrandMutation();

  const form = useForm({
    initialValues: {
      title: "",
      acronym: "",
      company: "",
      brandUrl: "",
      isActive: true,
      file: null,
    },
  });

  const iconPreview = () => {
    if (!!form.getValues().file) {
      const iconURL = URL.createObjectURL(form.getValues().file);

      return <Image src={iconURL} style={{ width: rem(80), height: rem(80) }} fit="contain" onLoad={() => URL.revokeObjectURL(iconURL)} />;
    }

    return <IconPhotoPlus {...iconProps} />;
  };

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("acronym", values.acronym);
    formData.append("company", values.company);
    formData.append("brandUrl", values.brandUrl);
    formData.append("isActive", values.isActive);
    formData.append("file", values.file);

    createBrandMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"create brand"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <Dropzone accept={IMAGE_MIME_TYPE} p={"xs"} w={"max-content"} mx={"auto"} multiple={false} onDrop={(files) => form.setFieldValue("file", files[0])}>
          <Dropzone.Accept>
            <IconPhotoDown {...iconProps} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconPhotoCancel {...iconProps} />
          </Dropzone.Reject>
          <Dropzone.Idle>{iconPreview()}</Dropzone.Idle>
        </Dropzone>

        <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
        <TextInput required label="acronym" {...form.getInputProps("acronym")} />
        <TextInput type="url" required label="brand URL" {...form.getInputProps("brandUrl")} />
        <CompaniesSelect selectProps={{ required: true, label: "company", ...form.getInputProps("company") }} />
        <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />

        <Button type="submit" loading={createBrandMutation.isPending}>
          Create brand
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddBrandModal;
