import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
  StatusBar,
  Modal,
} from 'react-native';
import {styles} from './Modal.style';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Text} from 'react-native';

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
  title,
  containerStyleOverride,
  children,
  onClose,
}) => {
  const {height} = useWindowDimensions();
  // react-native Dimentions doesn't count Android status bar for some device

  //   return (
  //     <Modal
  //       visible={modalVisible}
  //       transparent={true}
  //       animationType={'slide'}
  //       onRequestClose={() => {
  //         onClose;
  //       }}>
  //       <View style={[styles.modal, containerStyleOverride]}>
  //         {children}
  //         <View style={styles.closeIconContainer}>
  //           <TouchableOpacity onPress={onClose}>
  //             <SimpleLineIcons name="close" size={24} color="#900" />
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </Modal>
  //   );

  // };
  return (
    <Modal transparent visible={modalVisible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity onPress={onClose}>
              <SimpleLineIcons name="close" size={40} color="#900" />
            </TouchableOpacity>
          </View>
          <Text style={{alignSelf: 'center', fontSize: 24}}>{title}</Text>
          <View
            style={{
              padding: 20,
              marginTop: 20,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};
