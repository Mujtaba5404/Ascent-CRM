// import { Button, Modal, NumberInput, Select, Stack } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { upperFirst } from "@mantine/hooks";
// import { useCreateContraRefundChargebackOrder } from "src/api/order";
// import PAYMENT_TYPES from "src/constants/PAYMENT_TYPES";

// const paymentTypes = [
//   { label: upperFirst(PAYMENT_TYPES.PARTIAL_CHARGEBACK), value: PAYMENT_TYPES.PARTIAL_CHARGEBACK },
//   { label: upperFirst(PAYMENT_TYPES.CHARGEBACK), value: PAYMENT_TYPES.CHARGEBACK },
//   { label: upperFirst(PAYMENT_TYPES.PARTIAL_REFUND), value: PAYMENT_TYPES.PARTIAL_REFUND },
//   { label: upperFirst(PAYMENT_TYPES.REFUND), value: PAYMENT_TYPES.REFUND },
// ];

// const ContraOrderModal = ({ isOpen = false, onClose = () => {}, orderId }) => {
//   const createContraOrderMutation = useCreateContraRefundChargebackOrder();

//   const form = useForm({ initialValues: { id: orderId, paymentType: "", amount: undefined } });

//   form.watch("paymentType", ({ dirty }) => {
//     if (dirty && form.getValues().amount) {
//       form.setFieldValue("amount", undefined);
//     }
//   });

//   const handleSubmit = (values) => {
//     createContraOrderMutation.mutate(values, {
//       onSuccess: () => {
//         form.reset();
//         onClose();
//       },
//     });
//   };

//   return (
//     <Modal title={"create R/CB order"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
//       <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
//         <Select label="select payment type" required data={paymentTypes} {...form.getInputProps("paymentType")} />

//         {[PAYMENT_TYPES.PARTIAL_CHARGEBACK, PAYMENT_TYPES.PARTIAL_REFUND].includes(form.getValues().paymentType) && (
//           <NumberInput label="amount" prefix="$" placeholder="Enter only if amount differs from order amount" {...form.getInputProps("amount")} />
//         )}

//         <Button type="submit" loading={createContraOrderMutation.isPending}>
//           Create R/CB order
//         </Button>
//       </Stack>
//     </Modal>
//   );
// };

// export default ContraOrderModal;
