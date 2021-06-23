import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export default class ImageFileModal extends Component {
    render() {
        return (
            <Modal
                animationType="fade"
                visible={this.props.modalVisible}
                onRequestClose={this.props.onCancel}
                transparent>
                <View style={{ height: '100%', backgroundColor: 'rgba(0,0,0,0.47)' }}>
                    <View style={{ flex: 3 }} />
                    <View style={{
                        width: 300,
                        flex: 2,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        paddingHorizontal: 23,
                        paddingVertical: 0,
                        backgroundColor: this.props.isDarkMode ? '#424242' : 'white'
                    }}>
                        <View style={{ paddingBottom: 12 }}><Text style={{ fontSize: 20, color: this.props.isDarkMode ? 'white' : 'black' }}>사진</Text></View>
                        <View>
                            <TouchableOpacity onPress={() => this.props.onCapture(this.props.index)} style={{ paddingVertical: 6 }}>
                                <Text style={{ fontSize: 16, color: this.props.isDarkMode ? 'white' : 'black' }}>카메라</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.onGallery(this.props.index)} style={{ paddingVertical: 6 }}>
                                <Text style={{ fontSize: 16, color: this.props.isDarkMode ? 'white' : 'black' }}>이미지 선택</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', textAlign: 'right' }}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={{ paddingTop: 10, textAlign: 'right', color: this.props.isDarkMode ? 'white' : 'black' }}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 3 }} />
                </View>
            </Modal>
        );
    }
}
