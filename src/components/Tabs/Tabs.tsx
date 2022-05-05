import React from "react";

// https://stackoverflow.com/questions/49144169/react-typescript-parameter-props-implicitly-has-an-any-type-error
// https://stackoverflow.com/questions/52735288/why-does-parameter-props-implicitly-has-an-any-type

// type Props {}
// Generics: <Props, State>

class Tabs extends React.Component<any, any> {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Tabs;

// export const Tabs: FunctionComponent<{children}> = props => {
//     return (
//         <div>
//             {props.}
//         </div>
//     )
// }