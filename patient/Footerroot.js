import React from "react"
import Tabs from "./components/tabs"
import { NavigationContainer } from "@react-navigation/native"
const Footerroot = () => {
    return (
        <NavigationContainer independent={true}>
            <Tabs />
        </NavigationContainer>
    )
}

export default Footerroot