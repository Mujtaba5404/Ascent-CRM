import { Loader } from "@mantine/core";
import { useGetAllProjectsQuery } from "src/api/project";
import Select from "src/components/Select";

const ProjectsSelect = ({ selectProps = {}, queryObject = {} }) => {
  const projects = useGetAllProjectsQuery({ query: queryObject });

  return (
    <Select
      data={projects.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      rightSection={projects.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(projects.isError && { disabled: true, placeholder: "Error loading projects" })}
    />
  );
};

export default ProjectsSelect;
