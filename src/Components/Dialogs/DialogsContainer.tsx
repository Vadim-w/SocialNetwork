import {ActionsTypes, addDialogActionCreator} from '../../Redux/dialogs-reducer';
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../Redux/redux-store";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";



let mapStateToProps = (state: RootStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}
let mapDispatchToProps = (dispatch: (action: ActionsTypes) => void) => {
   return {
       addDialog: (value: string) => {
           dispatch(addDialogActionCreator(value))
       }
   }
}

export default compose<React.ComponentType>(
    connect (mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)


