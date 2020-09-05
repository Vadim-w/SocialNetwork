import React from 'react';
import Header from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {RootState} from "../../Redux/redux-store";
import {setAuthUserDataAC} from "../../Redux/auth-reducer";
import {getAuth} from "../../api/api";

type HeaderContainerPropsType = {
    setAuthUserDataAC: (userId: string, email: string, login: string) => void
    isAuth: boolean
    login: string
}

class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        getAuth()
        // axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        //     withCredentials: true,
        //     headers: {
        //         'api-key': '1ddb00ae-87fd-4067-9570-c868a2d6ade3'
        //     }
        // })
            .then((data: any) => {
            if (data.resultCode === 0) {
                let {id, email, login} = data.data
                this.props.setAuthUserDataAC(id, email, login)
            }
        });
    }

    render() {
       return <Header {...this.props}/>
   }
}
const mapStateToProps = (state: RootState) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {setAuthUserDataAC})(HeaderContainer);