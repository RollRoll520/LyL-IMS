import { Modal } from "antd";

interface ExitModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isOpen, onCancel, onOk }) => {
  return (
    <Modal
      title="确认退出？"
      centered={true}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      cancelText="确认退出"
      okText="返回当前页面"
      cancelButtonProps={{ danger: true }}
      closable={false}
    >
      <p>退出该页面将导致你目前的进度丢失，是否确认退出？</p>
    </Modal>
  );
};

export default ExitModal;