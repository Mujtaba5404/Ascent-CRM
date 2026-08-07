import { Loader } from "@mantine/core";
import { useGetAllProjectsQuery } from "src/api/project";
import Select from "src/components/Select";

const ProjectsByBrandSelect = ({ selectProps = {}, brandId = "" }) => {
  const projectsByBrand = useGetAllProjectsQuery(brandId);

  return (
    <Select
      data={projectsByBrand.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      capitalizeLabel={false}
      rightSection={projectsByBrand.isLoading && <Loader size={18} />}
      {...(projectsByBrand.isError && { disabled: true, placeholder: "Error loading projects" })}
      {...selectProps}
    />
  );
};

export default ProjectsByBrandSelect;
