import Picklists from "src/features/picklists/Picklists";

const OrderStatuses = () => {
  return (
    <Picklists featureName="order status" resource="Order" field="status">
      <Picklists.AddButton />

      <Picklists.Modal fieldsConfig={{ isDefault: false }} />

      <Picklists.List />
    </Picklists>
  );
};

export default OrderStatuses;
