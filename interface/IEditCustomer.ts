export interface EditCustomerModalProps {
    visible: boolean;
    onClose: () => void;
    onUpdate: () => void;
    customer: {
      id: number;
      clientName: string;
      clientSurname: string;
      clientPhone: string;
    } | null;
  }
  