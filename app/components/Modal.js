import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export default class ImageFileModal extends Component {
    render() {
        return (
            <Modal
                animationType="fade"
                visible={this.props.modalVisible}
                onRequestClose={this.props.onCancel} style={{ padding: 10 }}>
                <View style={{ padding: 10 }}>
                    <View><Text style={{ fontSize: 18 }}>사진</Text></View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.onCapture(this.props.index)}>
                            <Text>카메라</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onGallery(this.props.index)}>
                            <Text>이미지 선택</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', textAlign: 'right' }}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}
