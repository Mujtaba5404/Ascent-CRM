import { Button, Image, Modal, Stack, Switch, TextInput, rem } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { IconPhotoCancel, IconPhotoDown, IconPhotoPlus } from "@tabler/icons-react";
import { useUpdateBrandMutation } from "src/api/brand";
import { SERVER_URL } from "src/constants/SERVER_URL";

const iconProps = { display: "block", size: 80, strokeWidth: 1.25 };

const EditBrandModal = ({ isOpen = false, onClose = () => {}, brand }) => {
  const updateBrandMutation = useUpdateBrandMutation();

  const form = useForm({
    initialValues: {
      title: brand.title,
      acronym: brand.acronym,
      brandUrl: brand?.brandUrl,
      isActive: brand?.isActive || true,
      file: brand.imgUrl,
    },
  });

  const iconPreview = () => {
    if (!!form.getValues().file) {
      switch (typeof form.getValues().file) {
        case "string":
          return <Image src={`${SERVER_URL}${form.getValues().file}`} style={{ width: rem(80), height: rem(80) }} fit="contain" />;

        case "object":
          const iconURL = URL.createObjectURL(form.getValues().file);

          return <Image src={iconURL} style={{ width: rem(80), height: rem(80) }} fit="contain" onLoad={() => URL.revokeObjectURL(iconURL)} />;

        default:
          return <IconPhotoPlus {...iconProps} />;
      }
    }
  };

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("acronym", values.acronym);
    formData.append("brandUrl", values.brandUrl);
    formData.append("isActive", values.isActive);

    if (typeof values.file === "object") {
      formData.append("file", values.file);
    }

    updateBrandMutation.mutate({ brandId: brand._id, payload: formData }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update brand"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
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
        <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />

        <Button type="submit" loading={updateBrandMutation.isPending}>
          Update brand
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditBrandModal;
