import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  WebView,
  Dimensions
} from "react-native";

export default class App extends React.Component {
  state = {
    showModal: false,
    status: "Pending"
  };

  handleRespone = data => {
    if (data.title === "success") {
      this.setState({ showModal: false, status: "Complete" });
    } else if (data.title === "cancel") {
      this.setState({ showModal: false, status: "Cancelled" });
    } else {
      return;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({ showModal: false })}
        >
          <WebView
            source={{ uri: "<Server uri here>" }}
            onNavigationStateChange={data => this.handleRespone(data)}
            injectedJavaScript={`document.f1.submit()`}
            javaScriptEnabled={true}
            style={styles.webview}
          />
        </Modal>
        <TouchableOpacity
          style={{ width: 300, height: 100 }}
          onPress={() => this.setState({ showModal: true })}
        >
          <Text>Pay with PayPal</Text>
        </TouchableOpacity>
        <Text>Payment Status: {this.state.status}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
  webview: {
    flex: 1,
    width: Dimensions.get("window").width
  }
});
