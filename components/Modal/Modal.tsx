import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  Modal,
} from 'react-native';
import {styles} from './Modal.style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export type ModalProps = {
  modalVisible: boolean;
  hasCloseIcon?: boolean;
  modalStyleOverride?: StyleProp<ViewStyle>;
  containerStyleOverride?: StyleProp<ViewStyle>;
  onClose?: () => void;
  onBackdropPress?: () => void;
  backdropOpacity?: number | undefined;
  onModalHide?: () => void;
};

export const CreateTaskModal: React.FC<ModalProps> = ({
  modalVisible,
  children,
  onClose,
}) => {
  return (
    <Modal transparent visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity onPress={onClose}>
              <SimpleLineIcons name="close" size={40} color="#900" />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};
