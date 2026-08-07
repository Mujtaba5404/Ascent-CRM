import Picklists from "src/features/picklists/Picklists";

const OrderPaymentGateways = () => {
  return (
    <Picklists featureName="order payment gateway" resource="Order" field="paymentGateway">
      <Picklists.AddButton />

      <Picklists.Modal fieldsConfig={{ isDefault: false }} />

      <Picklists.List />
    </Picklists>
  );
};

export default OrderPaymentGateways;
