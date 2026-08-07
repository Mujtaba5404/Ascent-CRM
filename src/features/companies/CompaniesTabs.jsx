import { useGetAllCompaniesQuery } from "src/api/company";
import QueryTabs from "src/components/QueryTabs";

const CompaniesTabs = () => {
  const { data: companies, isLoading } = useGetAllCompaniesQuery();

  return <QueryTabs items={companies} queryParamName="company" labelKey="title" valueKey="_id" isLoading={isLoading} />;
};
export default CompaniesTabs;
