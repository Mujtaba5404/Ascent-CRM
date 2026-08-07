import { Button, Image, Modal, Stack, Switch, TextInput, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconPhotoCancel, IconPhotoDown, IconPhotoPlus } from "@tabler/icons-react";
import { useCreateCompanyMutation } from "src/api/company";

const iconProps = { display: "block", size: 80, strokeWidth: 1.25 };

const AddCompanyModal = ({ isOpen = false, onClose = () => {} }) => {
  const createCompanyMutation = useCreateCompanyMutation();

  const form = useForm({ initialValues: { title: "", acronym: "", isShared: false, file: null } });

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
    formData.append("file", values.file);

    createCompanyMutation.mutate(formData, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"create company"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
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
        <Switch label="is shared" {...form.getInputProps("isShared", { type: "checkbox" })} />

        <Button type="submit" loading={createCompanyMutation.isPending}>
          Create company
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddCompanyModal;
