import { Badge, NumberInput } from "@mantine/core";
import { usePicklists } from "src/context/PicklistContext";
import Picklists from "src/features/picklists/Picklists";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import formatNumber from "src/utils/formatNumber";

const AdditionalFields = () => {
  const { form, resource } = usePicklists();

  return (
    <>
      <PicklistsSelect queryObject={{ resource, field: "orderType" }} selectProps={{ required: true, label: "order type", ...form.getInputProps("parentPicklist") }} />
      <NumberInput required label="percentage" max={100} clampBehavior="strict" suffix="%" {...form.getInputProps("meta.percentage")} />
    </>
  );
};

const OrderStages = () => {
  return (
    <Picklists featureName="order stage" resource="Order" field="orderStage">
      <Picklists.AddButton />

      <Picklists.Modal fieldsConfig={{ isDefault: false }}>
        <AdditionalFields />
      </Picklists.Modal>

      <Picklists.List>{(picklist) => <Badge color={picklist.color}>{`${picklist.title} - ${formatNumber(picklist.meta.percentage)}%`}</Badge>}</Picklists.List>
    </Picklists>
  );
};

export default OrderStages;
