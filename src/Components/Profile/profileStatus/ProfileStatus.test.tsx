import React from 'react';
import {ProfileStatus} from "./ProfileStatus";
import { create } from 'react-test-renderer';


describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="GOOD" updateUserStatus={() => {
        }}/>);
        const instance = component.root
        expect(instance.props.status).toBe("GOOD")
    });
    test("after creation span with status should be displayed ", () => {
        const component = create(<ProfileStatus status={"GOOD"} updateUserStatus={() => {
        }}/>);
        const root = component.root
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    });
    test("after creation span should contains status", () => {
        const component = create(<ProfileStatus status={"GOOD"} updateUserStatus={() => {
        }}/>);
        const root = component.root
        let span = root.findByType("span")
        expect(span.children[1]).toBe("GOOD")
    });
    test("after creation input shouldn't be displayed ", () => {
        const component = create(<ProfileStatus status={"GOOD"} updateUserStatus={() => {}}/>);
        const root = component.root
        expect(() => { root.findByType("input")}).toThrow()
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"GOOD"} updateUserStatus={() => {}}/>);
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe("GOOD")
    });
//     test("callback should be called", () => {
//         const mokCallback = jest.fn()
//         //const component = create(<ProfileStatus status={"GOOD"} updateUserStatus={mokCallback}/>);
//         const wrapper = shallow(<ProfileStatus status={"GOOD"} updateUserStatus={mokCallback}/>);
//         const instance = wrapper.instance();
//         instance.props.deActivateEditMode()
//         expect(mokCallback.mock.calls.length).toBe(1)
//     });
 });