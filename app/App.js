/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { WebView } from 'react-native-webview';

export default () => {
    const url = "공단 서버 공인 IP";

    return (
        <WebView
            source={{ uri: `http://${url}:9100/mobile?rwtxp5tm=l90v42hy50zmpa33&atnulzuk=0pz3j30mt64li30h&blgy8bdg=nw6fiyprxjee1oxa` }} />
    );
};
