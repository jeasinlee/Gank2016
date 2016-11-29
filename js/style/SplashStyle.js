import {StyleSheet} from 'react-redux';
import {APP_MAIN_COLOR} from '../Constants';

const splash = ({
    container: {
        flex: 1,
        backgroundColor: APP_MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 15,
    },
    text1: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
    },
    text2: {
        color: '#D3D3D3',
        fontSize: 15,
    },
    text3: {
        color: '#D3D3D3',
        fontSize: 18,
        marginTop: 30,
    }
});

export default splash;