import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
const deviceHeight = Dimensions.get("window").height;
export class BottomPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={{ fex: 1, width: "100%" }} />;

    if (!onTouch) return view;

    return (
      <TouchableOpacity onPress={onTouch} style={{ flex: 1, width: "100%" }}>
        {view}
      </TouchableOpacity>
    );
  }

  render() {
    let { show } = this.state;
    const { onTouchOutside, title, space, body } = this.props;

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
        >
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              width: "100%",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.4,
            }}
          >
            <View>
              <Text
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#182E44",
                  fontSize: 20,
                  margin: 15,
                }}
              >
                <TouchableOpacity>{title}</TouchableOpacity>
                {space}
                <TouchableOpacity>{body}</TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
