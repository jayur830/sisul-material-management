/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageFileModal from './components/Modal';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
    styles = StyleSheet.create({
        body: {
            backgroundColor: '#f2f2f2',
            height: '100%',
            textAlign: 'center'
        },
        tr: {
            flexDirection: 'row',
        },
        td0: {
            flex: 2,
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
        td0Text: {
            textAlign: 'right',
            fontSize: 20
        },
        td1: {
            flex: 4,
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
        pickerWrap: {
            backgroundColor: 'white',
            height: 30,
            borderWidth: 1,
            borderColor: '#afafaf',
            borderStyle: 'solid',
            borderRadius: 5
        },
        picker: {
            position: 'relative',
            top: -13
        },
        textInput: {
            backgroundColor: 'white',
            paddingVertical: 1,
            borderRadius: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#afafaf'
        },
        imgUploadBtn: {
            backgroundColor: '#262626',
            paddingVertical: 5,
            borderRadius: 7,
            marginVertical: 3
        },
        imgUploadBtnTxt: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center'
        },
        submit: {
            backgroundColor: '#0070c0',
            paddingVertical: 8,
            paddingHorizontal: 30,
            borderRadius: 10
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            workClasses: null,
            categories: null,
            items: null,
            units: null,

            modalVisible: false,
            imgFileIndex: null,

            formData: {
                workClass: null,
                workerName: null,
                category: null,
                item: null,
                inOut: null,
                count: null,
                unit: null,
                imgFiles: [null, null, null]
            }
        };
    }

    componentDidMount() {
        (async () => {
            // await SplashScreen.hide();
            const response = await fetch('http://192.168.219.100:9100/api/submit/items').then(response => response.json());
            this.setState(response);
        })();
    }

    componentDidUpdate() {
        console.log(this.state.formData);
    }

    onCapture = index => {
        this.setState({ modalVisible: false });
        launchCamera({
            mediaType: 'photo',
            cameraType: 'back'
        }, response => {
            if (!response.didCancel) {
                let imgFiles = this.state.formData.imgFiles.concat();
                imgFiles[index] = response;
                this.setState({ formData: { ...this.state.formData, imgFiles } });
            }
        });
    }

    onGallery = index => {
        this.setState({ modalVisible: false });
        launchImageLibrary({
            mediaType: 'photo'
        }, response => {
            if (!response.didCancel) {
                let imgFiles = this.state.formData.imgFiles.concat();
                imgFiles[index] = response;
                this.setState({ formData: { ...this.state.formData, imgFiles } });
            }
        });
    }

    onSubmit = () => {
        if (!this.state.formData.workerName || this.state.formData.workerName === '')
            Alert.alert('성명', '작업자 성명을 입력하세요.');
        else if (this.state.formData.inOut == null)
            Alert.alert('입/출고', '입/출고를 선택하세요.');
        else if (this.state.formData.count == null)
            Alert.alert('수량', '자재 수량을 입력하세요.');
        else if (this.state.formData.count === 0)
            Alert.alert('수량', '1개 이상의 자재 수량을 입력하세요.');
        else if (!this.state.formData.imgFiles[0] && !this.state.formData.imgFiles[1] && !this.state.formData.imgFiles[2])
            Alert.alert('사진 첨부', '한 장 이상의 현장 사진을 첨부하세요.');
        else {
            const $this = this;
            Alert.alert(
                '제출',
                '담당자에게 전송하시겠습니까?', [
                    {
                        text: 'YES',
                        async onPress() {
                            const formData = new FormData();
                            formData.append('workClass', $this.state.formData.workClass);
                            formData.append('workerName', $this.state.formData.workerName);
                            formData.append('category', $this.state.formData.category);
                            formData.append('item', $this.state.formData.item);
                            formData.append('inOut', $this.state.formData.inOut);
                            formData.append('count', $this.state.formData.count);
                            formData.append('unit', $this.state.formData.unit);
                            formData.append('img1', $this.state.formData.imgFiles[0]);
                            formData.append('img2', $this.state.formData.imgFiles[1]);
                            formData.append('img3', $this.state.formData.imgFiles[2]);

                            await fetch("http://192.168.219.100:9100/api/submit/submit", {
                                method: 'POST',
                                cache: 'no-cache',
                                // headers: {
                                //     'Content-Type': 'multipart/form-data'
                                // },
                                body: formData
                            });
                            await Alert.alert('제출', '담당자에게 성공적으로 전송되었습니다.');
                        },
                    },
                    { text: 'NO' },
                ]);
        }
    }

    render() {
        return (
            <SafeAreaView style={this.styles.body}>
                <View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>근무반</Text>
                        </View>
                        <View style={this.styles.td1}>
                            <View style={this.styles.pickerWrap}>
                                <Picker
                                    onValueChange={workClass => this.setState({ formData: { ...this.state.formData, workClass } })}
                                    style={this.styles.picker}>
                                    {this.state.workClasses != null ?
                                        this.state.workClasses
                                            .map((workClass, i) => <Picker.Item key={i} label={workClass} value={workClass} />)
                                            .concat(<Picker.Item key={this.state.workClasses.length} label="기타(수기입력)" value="*" />) : null}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>성명</Text>
                        </View>
                        <View style={this.styles.td1}>
                            <TextInput
                                style={this.styles.textInput}
                                onChangeText={workerName => this.setState({ formData: { ...this.state.formData, workerName } })} />
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>자재 종류</Text>
                        </View>
                        <View style={this.styles.td1}>
                            <View style={this.styles.pickerWrap}>
                                <Picker
                                    onValueChange={category => this.setState({ formData: { ...this.state.formData, category } })}
                                    style={this.styles.picker}>
                                    {this.state.categories != null ?
                                        this.state.categories
                                            .map((category, i) => <Picker.Item key={i} label={category} value={category} />)
                                            .concat(<Picker.Item key={this.state.categories.length} label="기타(수기입력)" value="*" />) : null}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>자재 제품명</Text>
                        </View>
                        <View style={this.styles.td1}>
                            <View style={this.styles.pickerWrap}>
                                <Picker
                                    onValueChange={item => this.setState({ formData: { ...this.state.formData, item } })}
                                    style={this.styles.picker}>
                                    {this.state.items != null ?
                                        this.state.items
                                            .map((item, i) => <Picker.Item key={i} label={item} value={item} />)
                                            .concat(<Picker.Item key={this.state.items.length} label="기타(수기입력)" value="*" />) : null}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>입/출고</Text>
                        </View>
                        <View style={{ ...this.styles.td1, flexDirection: 'row' }}>
                            <View style={{ height: 30, flex: 1, marginRight: 3 }}>
                                <Button
                                    key={0}
                                    title="입고"
                                    buttonStyle={{ height: '100%', paddingVertical: 0, backgroundColor: this.state.formData.inOut === 0 ? '#0070c0' : '#a6a6a6' }}
                                    onPress={() => this.setState({ formData: { ...this.state.formData, inOut: 0 } })} />
                            </View>
                            <View style={{ height: 30, flex: 1, marginLeft: 3 }}>
                                <Button
                                    key={1}
                                    title="출고"
                                    buttonStyle={{ height: '100%', paddingVertical: 0, backgroundColor: this.state.formData.inOut === 1 ? '#0070c0' : '#a6a6a6' }}
                                    onPress={() => this.setState({ formData: { ...this.state.formData, inOut: 1 } })} />
                            </View>
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>수량</Text>
                        </View>
                        <View style={this.styles.td1}>
                            <TextInput
                                keyboardType="numeric"
                                style={this.styles.textInput}
                                value={Number(this.state.formData.count)}
                                onChangeText={count => {
                                    count = parseInt(count)
                                    if (!isNaN(count)) this.setState({ formData: { ...this.state.formData, count } });
                                }} />
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>단위</Text>
                        </View>
                        <View style={this.styles.td1}>
                            <View style={this.styles.pickerWrap}>
                                <Picker
                                    onValueChange={unit => this.setState({ formData: { ...this.state.formData, unit } })}
                                    style={this.styles.picker}>
                                    {this.state.units != null ?
                                        this.state.units
                                            .map((unit, i) => <Picker.Item key={i} label={unit} value={unit} />)
                                            .concat(<Picker.Item key={this.state.units.length} label="기타(수기입력)" value="*" />) : null}
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>사진 첨부</Text>
                        </View>
                        <View style={this.styles.td1}>
                            {[0, 1, 2].map(imgFileIndex =>
                                <TouchableOpacity
                                    key={imgFileIndex}
                                    onPress={() => this.setState({ modalVisible: true, imgFileIndex })}
                                    style={this.styles.imgUploadBtn}>
                                    <Text style={this.styles.imgUploadBtnTxt}>
                                        {(() => {
                                            const imgFile = this.state.formData.imgFiles[imgFileIndex];
                                            return imgFile ? (imgFile.fileName.length > 25 ? imgFile.fileName.substring(0, 22) + '...' : imgFile.fileName) : '사진 업로드';
                                        })()}
                                    </Text>
                                </TouchableOpacity>)}
                        </View>
                    </View>
                    <View style={{ ...this.styles.tr, justifyContent: 'center', paddingVertical: 23 }}>
                        <TouchableOpacity style={this.styles.submit} onPress={this.onSubmit}>
                            <Text style={{ color: 'white', fontSize: 24 }}>담당자 전송</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ImageFileModal
                    index={this.state.imgFileIndex}
                    modalVisible={this.state.modalVisible}
                    onCapture={this.onCapture}
                    onGallery={this.onGallery}
                    onCancel={() => this.setState({ modalVisible: false })} />
            </SafeAreaView>
        );
    }
}