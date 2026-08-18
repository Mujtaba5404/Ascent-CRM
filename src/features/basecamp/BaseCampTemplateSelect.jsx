import { Loader } from "@mantine/core";
import { useGetBasecampTemplateQuery } from "src/api/basecamp";
import Select from "src/components/Select";

const BaseCampTemplateSelect = ({ basecamp, selectProps = {} }) => {
  const template = useGetBasecampTemplateQuery(basecamp);
  const templateData = template.data?.map((item) => ({...item, id: String(item.id)})) || [];

  return (
    <Select
      data={templateData}
      tt="capitalize"
      selectLabel="name"
      selectValue="id"
      rightSection={template.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(template.isError && {
        disabled: true,
        placeholder: "Error loading templates",
      })}
    />
  );
};

export default BaseCampTemplateSelect;
