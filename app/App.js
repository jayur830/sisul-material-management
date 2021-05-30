/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageFileModal from './components/Modal';
import moment from 'moment';

export default class App extends Component {
    apiUrl = 'http://192.168.219.165:9100';
    // apiUrl = 'http://180.231.115.99:9100';

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
            materials: null,
            categories: null,
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
                imgFiles: [null, null, null],
                manualWorkClass: "",
                manualCategory: "",
                manualItem: "",
                manualUnit: ""
            }
        };
    }

    componentDidMount() {
        (async () => {
            // await SplashScreen.hide();
            const response = await fetch(this.apiUrl + '/api/submit/items').then(response => response.json());
            this.setState({
                workClasses: response.workClasses,
                materials: response.materials,
                categories: Object.keys(response.materials),
                units: response.units,
                formData: {
                    workClass: response.workClasses[0],
                    workerName: null,
                    category: Object.keys(response.materials)[0],
                    item: response.materials[Object.keys(response.materials)[0]][0],
                    inOut: null,
                    count: null,
                    unit: response.units[0],
                    imgFiles: [null, null, null],
                    manualWorkClass: "",
                    manualCategory: "",
                    manualItem: "",
                    manualUnit: ""
                }
            });
        })();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.clear();
        console.log('prevProps: ', prevProps);
        console.log('prevState: ', prevState);
        console.log('snapshot: ', snapshot);
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

    onSubmit = async () => {
        if (this.state.formData.workClass === '*' && this.state.formData.manualWorkClass === '')
            Alert.alert('근무반', '근무반(수기입력)을 입력하세요.');
        else if (!this.state.formData.workerName || this.state.formData.workerName === '')
            Alert.alert('성명', '작업자 성명을 입력하세요.');
        else if (this.state.formData.category === '*' && this.state.formData.manualCategory === '')
            Alert.alert('자재 종류', '자재 종류(수기입력)를 입력하세요.');
        else if (this.state.formData.item === '*' && this.state.formData.manualItem === '')
            Alert.alert('자재 제품명', '자재 제품명(수기입력)을 입력하세요.');
        else if (this.state.formData.inOut == null)
            Alert.alert('입/출고', '입/출고를 선택하세요.');
        else if (this.state.formData.count == null)
            Alert.alert('수량', '자재 수량을 입력하세요.');
        else if (this.state.formData.count === 0)
            Alert.alert('수량', '1개 이상의 자재 수량을 입력하세요.');
        else if (this.state.formData.unit === '*' && this.state.formData.manualUnit === '')
            Alert.alert('단위', '단위(수기입력)를 입력하세요.');
        else if (!this.state.formData.imgFiles[0] && !this.state.formData.imgFiles[1] && !this.state.formData.imgFiles[2])
            Alert.alert('사진 첨부', '한 장 이상의 현장 사진을 첨부하세요.');
        else {
            await new Promise(resolve => Alert.alert(
                '제출',
                '담당자에게 전송하시겠습니까?', [
                    {
                        text: 'YES',
                        onPress: resolve,
                    },
                    { text: 'NO' }
                ]));

            const data = this.state.formData;
            const formData = new FormData();
            formData.append('logTime', moment().format('YYYYMMDDhhmmss'));
            formData.append('workClass', data.workClass === '*' ? data.manualWorkClass : data.workClass);
            formData.append('workerName', data.workerName);
            formData.append('category', data.category === '*' ? data.manualCategory : data.category);
            formData.append('item', data.item === '*' ? data.manualItem : data.item);
            formData.append('inOut', data.inOut);
            formData.append('count', parseInt(data.count));
            formData.append('unit', data.unit === '*' ? data.manualUnit : data.unit);

            data.imgFiles.forEach((file, i) => {
                if (file)
                    formData.append('img' + (i + 1), {
                        name: file.fileName,
                        type: file.type,
                        uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', '')
                    });
            });

            await fetch(this.apiUrl + '/api/submit/submit', {
                method: 'POST',
                body: formData
            });
            await Alert.alert('제출', '담당자에게 성공적으로 전송되었습니다.');

            // const book = xlsx.utils.book_new();
            // xlsx.utils.book_append_sheet(
            //     book,
            //     xlsx.utils.json_to_sheet([
            //         {
            //             '근무반': $this.state.formData.workClass,
            //             '작업자명': $this.state.formData.workerName,
            //             '자재 종류': $this.state.formData.category,
            //             '자재 제품명': $this.state.formData.item,
            //             '입/출고': $this.state.formData.inOut === 0 ? '입고' : '출고',
            //             '수량': $this.state.formData.count + '개',
            //             '단위': $this.state.formData.unit
            //         }
            //     ]),
            //     `자재${$this.state.formData.inOut === 0 ? '입' : '출'}고정보`);
            // const path = RNFS.DocumentDirectoryPath + `/자재${$this.state.formData.inOut === 0 ? '입' : '출'}고정보_${$this.state.formData.workClass}_${$this.state.formData.workerName}_` + moment().format('YYYYMMDDhhmmss') + '.xlsx';
            // console.log(path);
            // await RNFS.writeFile(
            //     path,
            //     xlsx.write(book, {
            //         type: 'binary',
            //         bookType: 'xlsx'
            //     }),
            //     'ascii');

            await this.setState({
                formData: {
                    workClass: this.state.workClasses[0],
                    workerName: null,
                    category: Object.keys(this.state.materials)[0],
                    item: this.state.materials[Object.keys(this.state.materials)[0]][0],
                    inOut: null,
                    count: null,
                    unit: this.state.units[0],
                    imgFiles: [null, null, null]
                }
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={this.styles.body}>
                <ScrollView>
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
                            <View style={{ display: this.state.formData.workClass === '*' ? 'flex' : 'none' }}>
                                <TextInput
                                    style={this.styles.textInput}
                                    value={this.state.formData.manualWorkClass}
                                    onChangeText={workClass => this.setState({ formData: { ...this.state.formData, manualWorkClass: workClass } })} />
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
                                value={this.state.formData.workerName}
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
                                    onValueChange={category => {
                                        if (category === '*') this.setState({ formData: { ...this.state.formData, category, item: '*' } });
                                        else this.setState({ formData: { ...this.state.formData, category } });
                                    }}
                                    style={this.styles.picker}>
                                    {this.state.categories != null ?
                                        this.state.categories
                                            .map((category, i) => <Picker.Item key={i} label={category} value={category} />)
                                            .concat(<Picker.Item key={this.state.categories.length} label="기타(수기입력)" value="*" />) : null}
                                </Picker>
                            </View>
                            <View style={{ display: this.state.formData.category === '*' ? 'flex' : 'none' }}>
                                <TextInput
                                    style={this.styles.textInput}
                                    value={this.state.formData.manualCategory}
                                    onChangeText={category => this.setState({ formData: { ...this.state.formData, item: '*', manualCategory: category } })} />
                            </View>
                        </View>
                    </View>
                    <View style={this.styles.tr}>
                        <View style={this.styles.td0}>
                            <Text style={this.styles.td0Text}>자재 제품명</Text>
                        </View>
                        <View style={this.styles.td1}>
                            <View style={{ ...this.styles.pickerWrap, display: this.state.formData.category === '*' ? 'none' : 'flex' }}>
                                <Picker
                                    onValueChange={item => this.setState({ formData: { ...this.state.formData, item } })}
                                    style={this.styles.picker}>
                                    {this.state.materials && this.state.formData.category && this.state.materials[this.state.formData.category] ?
                                        this.state.materials[this.state.formData.category]
                                            .map((item, i) => <Picker.Item key={i} label={item} value={item} />)
                                            .concat(<Picker.Item key={this.state.materials[this.state.formData.category].length} label="기타(수기입력)" value="*" />) : null}
                                </Picker>
                            </View>
                            <View style={{ display: this.state.formData.category === '*' || this.state.formData.item === '*' ? 'flex' : 'none' }}>
                                <TextInput
                                    style={this.styles.textInput}
                                    value={this.state.formData.manualItem}
                                    onChangeText={item => this.setState({ formData: { ...this.state.formData, item: '*', manualItem: item } })} />
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
                                value={this.state.formData.count}
                                onChangeText={count => {
                                    if (!isNaN(parseInt(count)))
                                        this.setState({ formData: { ...this.state.formData, count } });
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
                            <View style={{ display: this.state.formData.unit === '*' ? 'flex' : 'none' }}>
                                <TextInput
                                    style={this.styles.textInput}
                                    value={this.state.formData.manualUnit}
                                    onChangeText={unit => this.setState({ formData: { ...this.state.formData, manualUnit: unit } })} />
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
                </ScrollView>
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
