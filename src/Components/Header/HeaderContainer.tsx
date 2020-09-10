import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
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
const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {setAuthUserDataAC})(HeaderContainer);