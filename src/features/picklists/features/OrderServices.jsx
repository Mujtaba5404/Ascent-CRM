import Picklists from "src/features/picklists/Picklists";

const OrderServices = () => {
  return (
    <Picklists featureName="order service" resource="Order" field="services">
      <Picklists.AddButton />

      <Picklists.Modal fieldsConfig={{ color: false, isDefault: false }} />

      <Picklists.List />
    </Picklists>
  );
};

export default OrderServices;
